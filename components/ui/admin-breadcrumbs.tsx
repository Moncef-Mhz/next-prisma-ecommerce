"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const Adminbreadcrumbs = () => {
  const path = usePathname();

  const splitpath = path.split("/");
  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden capitalize md:block">
                <BreadcrumbLink href="/dashboard">
                  {splitpath[1]}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {splitpath[2] && (
                <>
                  <BreadcrumbSeparator className="hidden  md:block" />
                  <BreadcrumbItem className="capitalize">
                    <BreadcrumbLink href={`/dashboard/${splitpath[2]}`}>
                      {splitpath[2]}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              {splitpath[3] && (
                <>
                  <BreadcrumbSeparator className="block" />
                  <BreadcrumbItem className="capitalize">
                    <BreadcrumbPage>{splitpath[3]}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
    </div>
  );
};
export default Adminbreadcrumbs;
