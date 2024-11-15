import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import Adminbreadcrumbs from "@/components/ui/admin-breadcrumbs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, getPermission } = await getKindeServerSession();
  const perms = getPermission("create:product");
  if (!isAuthenticated && !perms) {
    redirect("/");
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Adminbreadcrumbs />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
