import { type ReactNode, useEffect, useState, Suspense } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";

interface LayoutProps {
  children: ReactNode;
  delayMs?: number;
}

export function Layout({ children, delayMs = 2500 }: LayoutProps) {
  const [showChildren, setShowChildren] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowChildren(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b flex items-center px-4 bg-background sticky top-0 z-10">
            <SidebarTrigger className="cursor-pointer" />
          </header>

          <main className="flex-1">
            {!showChildren ? (
              <div className="w-full h-full flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <Spinner />
                  </div>
                }
              >
                {children}
              </Suspense>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default Layout;
