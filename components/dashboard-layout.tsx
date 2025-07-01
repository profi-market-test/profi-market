"use client"

import type * as React from "react"
import { Building2, Home, MapPin, Package, Settings, ShoppingCart, Truck, Users, UserCheck } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

const navigationItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
    id: "dashboard",
  },
  {
    title: "Orders",
    url: "#",
    icon: ShoppingCart,
    id: "orders",
  },
  {
    title: "Products",
    url: "#",
    icon: Package,
    id: "products",
  },
  {
    title: "Fargo",
    url: "#",
    icon: MapPin,
    id: "fargo",
  },
  {
    title: "Couriers",
    url: "#",
    icon: Truck,
    id: "couriers",
  },
  {
    title: "Sellers",
    url: "#",
    icon: UserCheck,
    id: "sellers",
  },
  {
    title: "Clients",
    url: "#",
    icon: Users,
    id: "clients",
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    id: "settings",
  },
]

interface DashboardLayoutProps {
  children: React.ReactNode
  activeSection: string
  onSectionChange: (section: string) => void
  searchPlaceholder?: string
  pageTitle?: string
}

export function DashboardLayout({
  children,
  activeSection,
  onSectionChange,
  searchPlaceholder,
  pageTitle = "DeliveryCRM Pro",
}: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar className="border-r">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Building2 className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">{pageTitle}</span>
                  <span className="text-xs">Professional Order Management</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={activeSection === item.id}
                      onClick={() => onSectionChange(item.id)}
                    >
                      <button className="w-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <DashboardHeader
          searchPlaceholder={searchPlaceholder}
          notificationCount={3}
          user={{
            name: "John Doe",
            email: "john@company.com",
            initials: "JD",
          }}
        />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
