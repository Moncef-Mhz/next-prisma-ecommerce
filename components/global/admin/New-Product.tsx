"use client";

import { useEdgeStore } from "@/lib/edgestore";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SingleImageDropzone } from "@/components/ui/singleImageDropzone";
import { useState } from "react";
import { CreateProduct } from "@/actions/Product";

// form Schema
const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(50),
  description: z.string().min(3, "Description must be at least 3 characters"),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number")
    .transform((val) => parseFloat(val)),
  category: z.string().min(3, "Category must be at least 3 characters"),
  image: z.string().url("Image must be a valid URL"),
});

const NewProductForm = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  // const [progress, setProgress] = useState<string>("");

  const { edgestore } = useEdgeStore();

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
        onProgressChange: (progress) => console.log(progress),
      });
      const uploadedImageUrl = uploadResponse.url;

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
    });
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
                  <Input placeholder="ex: Shoes" {...field} />
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
