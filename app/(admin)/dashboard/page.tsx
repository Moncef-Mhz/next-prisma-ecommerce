import prisma from "@/lib/db";
import { BoxIcon, Layers3, ListOrdered, Tag, Tags } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const productsCount = await prisma.product.count();
  const categoriesCount = await prisma.category.count();
  const ordersCount = await prisma.order.count();

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50 relative overflow-hidden p-4">
          <Link
            href={"/dashboard/products"}
            className="flex flex-col justify-between h-full w-full "
          >
            <h1 className="text-3xl font-bold z-10">Products</h1>
            <p className="text-foreground/70 z-10">
              <span className="font-bold text-5xl text-foreground">
                {productsCount}
              </span>{" "}
              products in total
            </p>

            <Layers3
              size={200}
              className="absolute text-slate-200 -right-16 -bottom-16 "
            />
          </Link>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 relative overflow-hidden p-4">
          <Link
            href={"/dashboard/categories"}
            className="flex flex-col justify-between h-full w-full "
          >
            <h1 className="text-3xl font-bold z-10">Categories</h1>
            <p className="text-foreground/70 z-10">
              <span className="font-bold text-5xl text-foreground">
                {categoriesCount}
              </span>{" "}
              category in total
            </p>

            <Tag
              size={200}
              className="absolute text-slate-200 -right-16 -bottom-16 "
            />
          </Link>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 relative overflow-hidden p-4">
          <Link
            href={"/dashboard/orders"}
            className="flex flex-col justify-between h-full w-full "
          >
            <h1 className="text-3xl font-bold z-10">Orders</h1>
            <p className="text-foreground/70 z-10">
              <span className="font-bold text-5xl text-foreground">
                {ordersCount}
              </span>{" "}
              Orders in total
            </p>

            <BoxIcon
              size={200}
              className="absolute text-slate-200 -right-16 -bottom-16 "
            />
          </Link>
        </div>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </>
  );
}
