"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardOverview } from "@/components/dashboard-overview"
import { OrdersSection } from "@/components/orders-section"
import { ProductsSection } from "@/components/products-section"
import { FargoSection } from "@/components/fargo-section"
import { CouriersSection } from "@/components/couriers-section"
import { SellersSection } from "@/components/sellers-section"
import { ClientsSection } from "@/components/clients-section"
import { SettingsSection } from "@/components/settings-section"

const sectionConfig = {
  dashboard: {
    component: DashboardOverview,
    searchPlaceholder: "Search dashboard data...",
  },
  orders: {
    component: OrdersSection,
    searchPlaceholder: "Search orders, clients, products...",
  },
  products: {
    component: ProductsSection,
    searchPlaceholder: "Search products, SKUs, categories...",
  },
  fargo: {
    component: FargoSection,
    searchPlaceholder: "Search Fargo orders, tracking IDs...",
  },
  couriers: {
    component: CouriersSection,
    searchPlaceholder: "Search couriers, locations...",
  },
  sellers: {
    component: SellersSection,
    searchPlaceholder: "Search sellers, partners...",
  },
  clients: {
    component: ClientsSection,
    searchPlaceholder: "Search clients, contacts...",
  },
  settings: {
    component: SettingsSection,
    searchPlaceholder: "Search settings, configurations...",
  },
}

export function CRMDashboard() {
  const [activeSection, setActiveSection] = React.useState("dashboard")

  const currentSection = sectionConfig[activeSection as keyof typeof sectionConfig] || sectionConfig.dashboard
  const CurrentComponent = currentSection.component

  return (
    <DashboardLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      searchPlaceholder={currentSection.searchPlaceholder}
      pageTitle="DeliveryCRM Pro"
    >
      <CurrentComponent />
    </DashboardLayout>
  )
}
