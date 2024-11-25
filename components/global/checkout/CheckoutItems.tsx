import { useStateContext } from "@/context/StateContext";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CheckoutItems = () => {
  const { cartItems, removeFromCart } = useStateContext();
  return (
    <>
      <h1 className="text-2xl font-bold p-4 border-b">Your Cart</h1>

      {cartItems.length > 0 ? (
        <div className=" flex flex-col ">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex border-b last:border-0 p-4 items-center justify-between"
            >
              <div className="flex gap-4 items-center">
                <Image
                  src={item.image}
                  width={500}
                  height={500}
                  alt={item.name}
                  lazyBoundary="true"
                  className="w-[120px] md:w-[150px] h-[120px] md:h-[150px] object-cover rounded-xl"
                />
                <div className="flex flex-col gap-1 md:gap-2">
                  <h2 className="text-xl font-medium">{item.name}</h2>
                  <p className="text-foreground/50 ">
                    Price:{" "}
                    <span className="text-foreground">
                      ${item.price.toFixed(2)}
                    </span>
                  </p>
                  <p className="text-foreground/50 ">
                    Quantity:{" "}
                    <span className="text-foreground">{item.quantity}</span>
                  </p>
                  <p className="text-foreground/50 ">
                    Subtotal:{" "}
                    <span className="text-foreground">
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <Trash
                  className="cursor-pointer"
                  onClick={() => removeFromCart(item)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4">
          your cart is empty{" "}
          <Link
            href={"/"}
            className="hover:border-b-2 hover:border-foreground "
          >
            Go Shopping
          </Link>
        </div>
      )}
    </>
  );
};
export default CheckoutItems;
