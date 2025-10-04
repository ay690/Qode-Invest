import {
  Home,
  TrendingUp,
  FlaskConical,
  Archive,
  UserPlus,
  Gift,
  User,
  ChevronDown,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Portfolios", url: "/portfolio", icon: TrendingUp },
  { title: "Experimentals", url: "#", icon: FlaskConical },
  { title: "Slack Archives", url: "#", icon: Archive },
  { title: "Refer a friend", url: "#", icon: UserPlus },
  { title: "Gift a subscription", url: "#", icon: Gift },
  { title: "Account", url: "#", icon: User },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarContent>
        {/* Logo + Branding */}
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <h1
                className="font-extrabold text-2xl"
                style={{ fontFamily: "initial" }}
              >
                C,
              </h1>
              {open && (
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">capitalmind</span>
                  <span className="text-xs text-emerald-600 font-bold">
                    premium
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Menu */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items?.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.url === "#" ? (
                    <SidebarMenuButton className="flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </SidebarMenuButton>
                  ) : (
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-2 rounded-md transition-colors 
                         hover:bg-sidebar-accent hover:text-sidebar-accent-foreground 
                         ${
                           isActive
                             ? "bg-sidebar-accent text-sidebar-accent-foreground"
                             : ""
                         }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="border-t p-3 cursor-pointer hover:bg-gray-500/5">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-500 text-white font-bold">
              RN
            </div>
            {open && <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </div>

          {open && (
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold">CMPY1</span>
              <span className="text-xs text-muted-foreground">
                Valid till 25th April, 2025
              </span>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
