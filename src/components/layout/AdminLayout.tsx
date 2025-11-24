'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, ChevronLeft, ChevronRight, LayoutDashboard, Users, FileText, Settings, LogOut, UserSearch, Briefcase, BarChart3, Shield } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import Image from "next/image";
import logo from "@/assets/aigenthix-logo.png";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navItems = [
    // Common
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: UserSearch, label: "Candidates", path: "/candidates" },
    { icon: FileText, label: "Reports", path: "/reports" },
    
    // Admin Only
    { icon: Shield, label: "Admin Dashboard", path: "/admin/dashboard", roles: ["ADMIN"] },
    { icon: Briefcase, label: "Companies", path: "/admin/companies", roles: ["ADMIN"] },
    { icon: BarChart3, label: "Audit Logs", path: "/admin/logs", roles: ["ADMIN"] },
    
    // HR Only
    { icon: BarChart3, label: "HR Dashboard", path: "/hr/dashboard", roles: ["HR"] },
    
    // Employee
    { icon: Briefcase, label: "My Interviews", path: "/employee/interviews", roles: ["EMPLOYEE"] },
    
    // Candidate
    { icon: Briefcase, label: "My Interviews", path: "/candidate/interviews", roles: ["CANDIDATE"] },
    
    // Common Bottom
    { icon: Users, label: "Employee Management", path: "/employees", roles: ["ADMIN", "HR"] },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={`flex flex-col border-r border-border bg-sidebar transition-all duration-300 ${
          sidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-sidebar-border px-4">
          {!sidebarCollapsed && (
            <Image src={logo} alt="Aigenthix" className="h-8 object-contain brightness-0 invert" />
          )}
          {sidebarCollapsed && (
            <div className="flex h-8 w-8 items-center justify-center rounded bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground">
              A
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => {
            // Check if item has role restrictions
            if (item.roles && !item.roles.includes(user?.role || "")) {
              return null;
            }

            return (
              <NavLink
                key={item.path}
                href={item.path}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Collapse Toggle */}
        <div className="border-t border-sidebar-border p-3">
          <Button
            variant="ghost"
            size="icon"
            className="w-full text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>
      </aside>
      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-card-foreground">
              {user?.role === "ADMIN" && "Admin Dashboard"}
              {user?.role === "HR" && "HR Portal"}
              {user?.role === "EMPLOYEE" && "Employee Portal"}
              {user?.role === "CANDIDATE" && "Candidate Portal"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 pl-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                      {user ? getInitials(user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                  {!sidebarCollapsed && (
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">{user?.name}</span>
                      <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-muted/30 p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
