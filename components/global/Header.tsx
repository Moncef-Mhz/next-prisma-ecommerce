"use client";

import { Menu, Search, X } from "lucide-react";
import { Gutter } from "./Gutter";
import { navLinks } from "@/constant";
import { useState } from "react";
import Link from "next/link";
import Avatardropdown from "@/components/ui/avatardropdown";
import Cart from "@/components/ui/Cart";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const path = usePathname();
  const activePath = path.split("/");
  return (
    <Gutter className=" h-20   ">
      <div className="w-full relative h-full border-b flex items-center justify-between">
        <div className="flex items-center justify-center h-full gap-x-6">
          <Link href={"/"} className="text-xl font-bold">
            <Image
              src="/icons/logo1.svg"
              alt="logo"
              height={30}
              width={30}
              className=""
            />
          </Link>
          <ul className="flex h-full items-center justify-center gap-x-4 pt-8">
            {navLinks.map((item) => (
              <Link
                href={item.link}
                key={item.id}
                className={`text-sm font-normal trans capitalize h-full text-foreground/80 hover:text-foreground box-border ${
                  `/${activePath[1]}` == item.link
                    ? "border-b border-indigo-500 text-indigo-500 hover:text-indigo-500"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex  items-center gap-x-6">
          <Search className="cursor-pointer text-foreground/50 hover:text-foreground/70 trans" />
          <Avatardropdown />
          <div className="h-6 w-[1.4px]  bg-[#ccc]" />

          <Cart />

          <Menu
            className="cursor-pointer md:hidden hover:text-black/50 trans"
            onClick={() => setOpenMenu(true)}
          />
        </div>

        {openMenu && (
          <div className="fixed z-10 top-0 right-0 h-screen p-4 w-full">
            <ul className=" bg-slate-900 group relative  px-20 h-full w-full overflow-hidden rounded-xl m-auto  flex flex-col items-center justify-center gap-y-16">
              <button
                onClick={() => setOpenMenu(false)}
                className="p-2 absolute  top-0 my-10 bg-bakground text-foreground rounded-full -translate-y-40 group-hover:translate-y-0 duration-300 ease-in-out  cursor-pointer hover:bg-white/70"
              >
                <X />
              </button>
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.link}
                  className="text-white capitalize text-3xl hover:text-white/70 trans"
                >
                  {link.name}
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Gutter>
  );
};
export default Header;
