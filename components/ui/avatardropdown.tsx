"use client";

import { User } from "lucide-react";

import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";

const Avatardropdown = () => {
  const { isAuthenticated, getUser, getPermission } = useKindeBrowserClient();

  const user = getUser();
  const perms = getPermission("create:product");

  const avatarFallback = user?.email?.slice(0, 2);

  const DropdownItems = (
    <>
      {perms?.isGranted ? (
        <>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={"/dashboard"}>
            <DropdownMenuItem className="cursor-pointer">
              Dashboard
            </DropdownMenuItem>
          </Link>
          <Link href={"/orders"}>
            <DropdownMenuItem className="cursor-pointer">
              My Orders
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="cursor-pointer">
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <LogoutLink>
            <DropdownMenuItem className="cursor-pointer">
              Log out
            </DropdownMenuItem>
          </LogoutLink>
        </>
      ) : (
        <>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            My Orders
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogoutLink>Log out</LogoutLink>
          </DropdownMenuItem>
        </>
      )}
    </>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {/*  */}
        <Avatar className=" select-none outline-none">
          {user?.picture && <AvatarImage src={user.picture} />}

          <AvatarFallback>
            <User className="text-black/70" />
          </AvatarFallback>
        </Avatar>
        {/*  */}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {!isAuthenticated ? (
          <DropdownMenuItem>
            <LoginLink postLoginRedirectURL="/api/auth/success">
              Sign In
            </LoginLink>
          </DropdownMenuItem>
        ) : (
          <>{DropdownItems}</>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default Avatardropdown;
