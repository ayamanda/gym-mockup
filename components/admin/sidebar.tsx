"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Users,
  MapPin,
  MessageSquare,
  FileEdit,
  LogOut,
} from "lucide-react";
import { auth } from "@/lib/firebase";

const menuItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: "/admin",
  },
  {
    title: "Subscriptions",
    icon: <Users className="h-5 w-5" />,
    href: "/admin/subscriptions",
  },
  {
    title: "Trainers",
    icon: <Users className="h-5 w-5" />,
    href: "/admin/trainers",
  },
  {
    title: "Locations",
    icon: <MapPin className="h-5 w-5" />,
    href: "/admin/locations",
  },
  {
    title: "Messages",
    icon: <MessageSquare className="h-5 w-5" />,
    href: "/admin/messages",
  },
  {
    title: "Content",
    icon: <FileEdit className="h-5 w-5" />,
    href: "/admin/content",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="w-64 border-r bg-background">
      <div className="flex h-full flex-col">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        </div>
        <ScrollArea className="flex-1 p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </Button>
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}