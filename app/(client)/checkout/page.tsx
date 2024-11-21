"use client";
import CheckoutForm from "@/components/global/checkout/CheckoutForm";
import CheckoutItems from "@/components/global/checkout/CheckoutItems";
import { Gutter } from "@/components/global/Gutter";

const CheckoutPage = () => {
  return (
    <Gutter className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 lg:gap-x-6 ">
      {/* items */}
      <div className="col-span-2  flex flex-col border h-fit rounded-xl">
        <CheckoutItems />
      </div>

      {/* info */}
      <div className="col-span-1 flex flex-col border h-fit  rounded-xl">
        <CheckoutForm />
      </div>
    </Gutter>
  );
};
export default CheckoutPage;
