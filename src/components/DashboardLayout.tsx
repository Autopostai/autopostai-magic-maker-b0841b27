
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <div className="border-b p-4 bg-white">
            <SidebarTrigger />
          </div>
          <div className="flex-1 p-6 bg-gradient-to-b from-purple-50 to-blue-50">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
