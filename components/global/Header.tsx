"use client";

import { Menu, ShoppingCart, X } from "lucide-react";
import { Gutter } from "./Gutter";
import { navLinks } from "@/constant";
import { useState } from "react";
import Link from "next/link";
import Avatardropdown from "@/components/ui/avatardropdown";

const Header = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <Gutter className="w-full relative h-[80px] flex items-center justify-between ">
      <Link href={"/"} className="text-xl font-bold">
        Moncef Store
      </Link>

      <div className="flex  items-center gap-x-6">
        <Avatardropdown />
        <ShoppingCart className="cursor-pointer hover:text-black/50 trans" />

        <Menu
          className="cursor-pointer md:hidden hover:text-black/50 trans"
          onClick={() => setOpenMenu(true)}
        />
      </div>

      {openMenu && (
        <div className="absolute z-10 top-0 right-0 h-screen p-4 w-full">
          <ul className=" bg-slate-900 group relative  px-20 h-full w-full overflow-hidden rounded-xl m-auto  flex flex-col items-center justify-center gap-y-16">
            <button
              onClick={() => setOpenMenu(false)}
              className="p-2 absolute  top-0 my-10 bg-white rounded-full -translate-y-40 group-hover:translate-y-0 duration-300 ease-in-out  cursor-pointer hover:bg-white/70"
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
    </Gutter>
  );
};
export default Header;
