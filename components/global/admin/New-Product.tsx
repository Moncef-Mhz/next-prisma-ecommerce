"use client";

import { useEffect, useState } from "react";
import { CreateProduct } from "@/actions/Product";
import { useEdgeStore } from "@/lib/edgestore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SingleImageDropzone } from "@/components/ui/singleImageDropzone";
import { GetAllCategories } from "@/actions/Category";
import { NewProductSchema as formSchema } from "@/types/FormTypes";
import { Category } from "@/types/types";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const NewProductForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await GetAllCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    loadCategories();
  }, []);

  const { edgestore } = useEdgeStore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      image: imageUrl,
    },
  });

  const handleImageUpload = async (file: any) => {
    try {
      const uploadResponse = await edgestore.publicFiles.upload({ file });
      const uploadedImageUrl = uploadResponse.url;
      setImageUrl(uploadedImageUrl);
      form.setValue("image", uploadedImageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await CreateProduct({
        name: values.name,
        description: values.description,
        price: values.price,
        category: values.category,
        image: imageUrl,
      });

      toast({ description: res.success || "Product created successfully!" });
      setImageUrl("");
      form.reset();
    } catch (error) {
      console.error("Error creating product:", error);
      toast({ description: "Failed to create product. Try again later." });
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10">
      <Card className="shadow-lg rounded-lg border border-gray-200">
        <CardHeader className="bg-gray-50 border-b p-6 rounded-t-lg">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Create New Product
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Fill out the form below to add a new product to your inventory.
          </p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Red Sneakers"
                          className="rounded-md"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 99.99"
                          className="rounded-md"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., A pair of trendy and comfortable sneakers."
                        className="rounded-md"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="rounded-md">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image Upload */}
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>Product Image</FormLabel>
                    <FormControl>
                      <SingleImageDropzone
                        onChange={handleImageUpload}
                        value={imageUrl}
                        width={300}
                        height={300}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="bg-gray-50 border-t p-6 rounded-b-lg">
          <Button
            type="submit"
            className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
            onClick={form.handleSubmit(onSubmit)}
          >
            Submit Product
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewProductForm;
