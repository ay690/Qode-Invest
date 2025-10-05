import { Home, TrendingUp, FlaskConical, Archive, UserPlus, Gift, User, ChevronDown } from "lucide-react";
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
import { motion } from "framer-motion";

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

  // shared item animation; direction depends on index (even -> from left, odd -> from right)
  const itemVariants = (index: number) => ({
    hidden: { x: index % 2 === 0 ? -28 : 28, opacity: 0, scale: 0.98 },
    visible: { x: 0, opacity: 1, scale: 1 },
    exit: { x: index % 2 === 0 ? -20 : 20, opacity: 0, scale: 0.98 },
  });

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarContent>
        {/* Logo + Branding (animated) */}
        <motion.div
          initial={{ x: -16, opacity: 0 }}
          animate={open ? { x: 0, opacity: 1 } : { x: -8, opacity: 0.8 }}
          transition={{ duration: 0.35 }}
          className="p-4"
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                <h1
                  className="font-extrabold text-2xl"
                  style={{ fontFamily: "initial" }}
                >
                  C,
                </h1>
              </div>

              {open && (
                <motion.div
                  initial={{ x: -8, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.35, delay: 0.06 }}
                  className="flex flex-col"
                >
                  <span className="text-sm font-semibold">capitalmind</span>
                  <span className="text-xs text-emerald-600 font-bold">premium</span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Sidebar Menu */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items?.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <motion.div
                    initial="hidden"
                    animate={open ? "visible" : "hidden"}
                    exit="exit"
                    variants={itemVariants(index)}
                    transition={{
                      duration: 0.42,
                      ease: "easeOut",
                      delay: 0.06 * index,
                    }}
                    className="w-full"
                  >
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
                           ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        {open && <span>{item.title}</span>}
                      </NavLink>
                    )}
                  </motion.div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="border-t p-3 cursor-pointer hover:bg-gray-500/5">
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={open ? { y: 0, opacity: 1 } : { y: 4, opacity: 0.9 }}
          transition={{ duration: 0.35, delay: 0.06 * items.length }}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-500 text-white font-bold">
              RN
            </div>
            {open && <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </div>

          {open && (
            <motion.div
              initial={{ x: 12, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.08 * items.length }}
              className="flex flex-col items-end"
            >
              <span className="text-sm font-semibold">CMPY1</span>
              <span className="text-xs text-muted-foreground">Valid till 25th April, 2025</span>
            </motion.div>
          )}
        </motion.div>
      </SidebarFooter>
    </Sidebar>
  );
}
