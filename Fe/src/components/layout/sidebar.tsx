"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Settings,
  PanelRightClose,
  PanelLeft,
} from "lucide-react";
import { useState } from "react";
import Logo from "../../../public/images/logo.png";
import { Button } from "../ui/button";
// ---- Types
type Role = "ADMIN" | "USER";

interface MenuItem {
  title: string;
  href: string;
  icon: React.ElementType;
  roles?: Role[];
}

// ---- Menu config (1 chỗ duy nhất)
const SIDEBAR_MENU: MenuItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
    roles: ["ADMIN"],
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: ShoppingCart,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const role: Role = "ADMIN";
 
  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-68"
      } transition-all duration-500 ease-in-out shadow-[4px_0_12px_rgba(0,0,0,0.12)]`}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!collapsed && (
          <div className="flex items-center gap-3 text-primary font-semibold text-2xl">
            <Image src={Logo} alt="Logo" width={50} height={40} />
            Admin Pro
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          {!collapsed ? <PanelLeft size={16} /> : <PanelRightClose size={16} />}
        </Button>
      </div>

      {/* Menu */}
      <nav className="p-2">
        {SIDEBAR_MENU.filter(
          (item) => !item.roles || item.roles.includes(role)
        ).map((item) => {
          const isActive =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-4 py-3 text-[15px] 
                ${
                  isActive
                    ? "bg-[#f6f9fc] text-primary"
                    : "text-muted-foreground hover:bg-[#f6f9fc]"
                }
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <item.icon className="h-4 w-4" />

              {!collapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
