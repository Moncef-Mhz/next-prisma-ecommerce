"use client";

import * as React from "react";
import { Box, Layers3, LayoutDashboard, Tag, Users } from "lucide-react";

import { NavProjects } from "@/components/ui/nav-projects";
import { NavUser } from "@/components/ui/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      url: "/dashboard/products",
      icon: Layers3,
    },
    {
      name: "Categories",
      url: "/dashboard/categories",
      icon: Tag,
    },
    {
      name: "Orders",
      url: "/dashboard/orders",
      icon: Box,
    },
    {
      name: "Users",
      url: "/dashboard/users",
      icon: Users,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
