import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative w-full overflow-hidden">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
