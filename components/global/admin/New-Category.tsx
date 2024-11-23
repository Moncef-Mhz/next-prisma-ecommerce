"use client";

import { CreateCategory } from "@/actions/Category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { NewCategoryForm as formSchema } from "@/types/FormTypes";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const NewCategoryForm = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    CreateCategory({
      name: values.name,
    }).then((res) => {
      toast({
        description: res?.success,
      });
    });
    form.reset();
  }

  return (
    <div className="flex justify-center items-center h-screen bg-card">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md border bg-card text-card-foreground">
        <h2 className="text-xl font-semibold text-center mb-4">New Category</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Category Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Electronics"
                      className="bg-input text-card-foreground"
                      {...field}
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

export default NewCategoryForm;
