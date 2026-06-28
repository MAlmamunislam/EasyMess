"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Home, Users, Utensils, Receipt, 
  Wallet, Settings, Store, Building, BarChart3, UserCog 
} from "lucide-react";
import { GetUser } from "@/components/action/action";

export default function Sidebar() {
  const pathname = usePathname();
  const user = GetUser();
  const role = user?.user?.role;

  const menuItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard, roles: ["member", "manager", "admin"] },
    { name: "My Mess", href: "/my-mess", icon: Home, roles: ["member", "manager"] },
    { name: "Meals", href: "/meals", icon: Utensils, roles: ["member", "manager"] },
    { name: "Bills", href: "/bills", icon: Receipt, roles: ["member", "manager"] },
    { name: "Members", href: "/members", icon: Users, roles: ["manager"] },
    { name: "Bazaar", href: "/bazaar", icon: Store, roles: ["manager"] },
    { name: "Payments", href: "/payments", icon: Wallet, roles: ["manager"] },
    { name: "All Messes", href: "/admin/messes", icon: Building, roles: ["admin"] },
    { name: "Managers", href: "/admin/managers", icon: UserCog, roles: ["admin"] },
    { name: "Users", href: "/admin/users", icon: Users, roles: ["admin"] },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3, roles: ["admin"] },
    { name: "Settings", href: "/settings", icon: Settings, roles: ["member", "manager", "admin"] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(role));

  return (
    <>
      {/* মোবাইলের জন্য: Horizontal Scrollable Menu */}
      <nav className="md:hidden flex overflow-x-auto w-full bg-white border-b border-gray-100 p-2 gap-2 scrollbar-hide">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} 
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition ${
                isActive ? "bg-orange-500 text-white" : "text-gray-600 bg-gray-50"
              }`}
            >
              <Icon size={16} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* ডেক্সটপের জন্য: Vertical Sidebar */}
      <aside className="hidden md:flex flex-col w-64 min-h-screen bg-white border-r border-gray-100 p-6">
        <div className="mb-10">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4">
            {role ? `${role} Dashboard` : "Menu"}
          </h2>
        </div>
        <nav className="flex flex-col gap-1.5">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive ? "bg-orange-500 text-white shadow-lg shadow-orange-200" : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}