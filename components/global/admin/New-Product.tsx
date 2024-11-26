"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { CreateProduct } from "@/actions/Product";
import { GetAllCategories } from "@/actions/Category";

import { useEdgeStore } from "@/lib/edgestore";
import { NewProductSchema as formSchema } from "@/types/FormTypes";
import { Category } from "@/types/types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SingleImageDropzone } from "@/components/ui/singleImageDropzone";
import { useToast } from "@/hooks/use-toast";

const NewProductForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");

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
    CreateProduct({
      name: values.name,
      description: values.description,
      price: values.price,
      category: values.category,
      image: imageUrl,
    }).then((res) => {
      toast({ description: res?.success });
    });
    setImageUrl("");
    form.reset();
  }

  return (
    <div className="flex justify-center items-center bg-card">
      <div className="w-full max-w-2xl p-8 rounded-lg shadow-md border bg-card text-card-foreground space-y-8">
        <h2 className="text-2xl font-semibold text-center">New Product</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Product Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Modern Chair"
                      className="bg-input text-card-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., A sleek and modern chair for your workspace."
                      className="bg-input text-card-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g., 199.99"
                      className="bg-input text-card-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Category
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full bg-input text-card-foreground">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          {categories.map((category) => (
                            <SelectItem value={category.id} key={category.id}>
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
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Product Image
                  </FormLabel>
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
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-opacity-90 trans"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewProductForm;
