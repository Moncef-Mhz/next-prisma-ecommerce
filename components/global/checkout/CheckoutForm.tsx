"use client";

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
import { Input } from "@/components/ui/input";
import { CreateOrder } from "@/actions/Order";
import { useStateContext } from "@/context/StateContext";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const formSchema = z.object({
  street: z.string().min(3, "Street must be at least 3 characters"),
  city: z.string().min(3, "City must be at least 3 characters"),
  state: z.string().min(3, "State must be at least 3 characters"),
  zip: z.string().min(2, "Zip must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
});

const CheckoutForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      street: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
    },
  });

  const { cartItems, clearCart, getCartTotal } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  const products = cartItems;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (products.length === 0) {
      toast({ description: "Your cart is empty!", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    try {
      const order = await CreateOrder(values, getCartTotal(), products);
      toast({ description: "Order created successfully!" });
      clearCart();
    } catch (error) {
      console.error("Error creating order:", error);
      toast({
        description: "Failed to create order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold p-4 border-b">Your Information</h1>
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Your City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="Your State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Zip" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="lg:w-full float-right"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Continue to Payment"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CheckoutForm;
