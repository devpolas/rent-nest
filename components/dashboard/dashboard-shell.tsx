"use client";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SiteHeader } from "@/components/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import useAuth from "@/hooks/auth/use-auth";
import { useDashboardMenu } from "@/hooks/dashboard/use-dashboard";
import DashboardLoader from "./dashboard-loader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const menu = useDashboardMenu();

  if (isLoading || !user || !menu) {
    return <DashboardLoader />;
  }
  return (
    <TooltipProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar menu={menu} user={user} variant='inset' />
        <SidebarInset className='w-full min-w-0'>
          <SiteHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
