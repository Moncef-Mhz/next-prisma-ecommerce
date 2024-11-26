import Image from "next/image";
import { Gutter } from "./Gutter";

const Hero = () => {
  return (
    <div className="w-full h-full">
      <div className="relative bg-black h-full">
        <Image
          src="/images/hero8.jpg"
          width={1000}
          height={1000}
          alt="Hero Image"
          className="w-full h-screen object-cover"
        />
        {/* Black Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
        {/* Content */}
        <div className="absolute w-full h-full top-0 px-10 left-0 grid gap-y-4 place-content-center">
          <h1 className="text-2xl text-center md:text-3xl leading-relaxed lg:text-4xl xl:text-7xl text-white font-bold">
            Discover the Perfect Blend of <br /> Elegance and Comfort
          </h1>
          <p className="text-neutral-200 text-center  text-base">
            Explore a curated collection of clothes designed to inspire and
            elevate your everyday. Quality, comfort, and style—all in one place.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Hero;
