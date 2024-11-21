import { z } from "zod";

export const NewProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(50),
  description: z.string().min(3, "Description must be at least 3 characters"),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number")
    .transform((val) => parseFloat(val)),
  category: z.string().min(3, "Category must be at least 3 characters"),
  image: z.string().url("Image must be a valid URL"),
});

export const NewCategoryForm = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(50),
});


export const NewOrderForm = z.object({
  street: z.string().min(3, "Street must be at least 3 characters"),
  city: z.string().min(3, "City must be at least 3 characters"),
  state: z.string().min(3, "State must be at least 3 characters"),
  zip: z.string().min(2, "Zip must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
});