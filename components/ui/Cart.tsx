import { useStateContext } from "@/context/StateContext";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Cart = () => {
  const { cartItems, clearCart, getCartTotal } = useStateContext();

  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative flex items-center gap-x-4 justify-center text-foreground/50 hover:text-foreground/70">
          <ShoppingCart className="cursor-pointer  trans" />
          {cartItems.length}
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full ">
        <SheetHeader>
          {cartItems.length > 0 ? (
            <div className="flex flex-col flex-grow">
              <SheetTitle>Your Cart Items ({cartItems.length})</SheetTitle>
              <div className="flex-grow w-full overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-4 flex gap-2">
                    <Image
                      src={item.image}
                      width={500}
                      height={500}
                      alt={item.name}
                      lazyBoundary="true"
                      className="w-[100px] h-[100px] object-cover rounded-xl"
                    />
                    <div className="flex justify-between">
                      <div className="py-1 capitalize flex flex-col gap-1">
                        <h1 className="text-foreground">
                          {item.name} ({item.quantity})
                        </h1>
                        <p className="text-foreground/50 text-sm">
                          {item.category?.name}
                        </p>
                        <p className="text-foreground/50 text-sm">
                          ${item.price * (item?.quantity || 1)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full border-t flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between p-1">
                  <h1 className="text-lg">Total:</h1>
                  <h1 className="text-xl font-bold text-foreground">
                    {cartItems ? <>${getCartTotal()}</> : <>$0</>}
                  </h1>
                </div>
                <div className="flex flex-col gap-4">
                  <Link href={"/checkout"}>
                    <Button className="w-full">Check Out</Button>
                  </Link>
                  <Button
                    variant={"destructive"}
                    onClick={() => clearCart()}
                    className="w-full"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <SheetTitle>Return shopping</SheetTitle>
              <SheetDescription>
                Your cart is currently empty. Add some items to get started.
              </SheetDescription>
            </>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
export default Cart;
