import Image from "next/image";
import { Gutter } from "./Gutter";

const Hero = () => {
  return (
    <Gutter className="w-full  h-auto ">
      <div className="relative">
        <Image
          src={"/images/hero7.jpg"}
          width={5000}
          height={5000}
          alt="Hero Image"
          className="rounded-xl w-full min-h-[300px]  object-cover max-h-[600px]"
        />
        <div className="absolute m-14 top-0 left-0 flex flex-col gap-y-6">
          <h1 className="text-2xl md:text-3xl leading-relaxed lg:text-4xl xl:text-5xl text-white font-bold">
            You can find anything in <br />
            this store
          </h1>
          <p className="text-neutral-200 text-base">u can find anything here</p>
        </div>
      </div>
    </Gutter>
  );
};
export default Hero;
