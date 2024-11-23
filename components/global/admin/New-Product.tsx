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
      const uploadResponse = await edgestore.publicFiles.upload({
        file,
        // onProgressChange: (progress) => console.log(progress),
      });
      const uploadedImageUrl = uploadResponse.url;
      console.log(uploadResponse);
      setImageUrl(uploadedImageUrl); // Set the image URL
      form.setValue("image", uploadedImageUrl); // Set the image URL in form field
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
      image: imageUrl, // Assuming this is the image URL after upload
    }).then((res) => {
      toast({
        description: res.success,
      });
    });
    setImageUrl("");
    form.reset();
  }

  return (
    <div className="w-full h-full space-y-6">
      <h2 className="text-2xl md:text-3xl">Create New Product</h2>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="ex: Red Sneakers" {...field} />
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
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="ex: Cool Sneakers" {...field} />
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
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="ex: 99.99" {...field} />
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
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select Categoty</SelectLabel>
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
            render={({ field }) => (
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

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
export default NewProductForm;
