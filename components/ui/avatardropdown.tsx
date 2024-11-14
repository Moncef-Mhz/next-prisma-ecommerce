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

const Avatardropdown = () => {
  const { isAuthenticated, getUser } = useKindeBrowserClient();
  const user = getUser();

  console.log(user);

  const avatarFallback = user?.email?.slice(0, 2);

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
            <LoginLink postLoginRedirectURL="/">Sign In</LoginLink>
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Orders</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutLink>Log out</LogoutLink>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default Avatardropdown;
