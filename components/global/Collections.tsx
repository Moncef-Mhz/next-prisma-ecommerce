import { collections } from "@/constant";
import { Gutter } from "./Gutter";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const Collections = () => {
  return (
    <Gutter className="flex flex-col gap-y-10">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl md:text-3xl font-semibold">Collections</h1>
        <p className="text-sm cursor-pointer md:text-base hover:text-blue-300 trans text-blue-400 flex items-center">
          See All
          <ArrowRight size={20} />
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 ">
        {collections.map((item) => (
          <div key={item.id} className="relative group w-full h-full">
            {/* Image */}
            <Image
              src={item.image}
              alt={item.name}
              width={700}
              height={700}
              className="rounded-xl w-full h-[500px] object-cover"
            />

            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-xl"></div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <h2 className="text-2xl font-semibold">{item.name}</h2>
              <p className="text-sm mt-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Gutter>
  );
};
export default Collections;
