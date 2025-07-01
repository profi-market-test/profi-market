"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, MoreHorizontal, Search, Filter } from "lucide-react"

const orders = [
  {
    id: "ORD-001",
    clientName: "John Smith",
    product: "Premium Package",
    address: "123 Main St, Downtown",
    status: "delivered",
    date: "2024-01-15",
    courier: "Mike Johnson",
  },
  {
    id: "ORD-002",
    clientName: "Sarah Wilson",
    product: "Standard Package",
    address: "456 Oak Ave, Uptown",
    status: "in-transit",
    date: "2024-01-15",
    courier: "Lisa Chen",
  },
  {
    id: "ORD-003",
    clientName: "Robert Brown",
    product: "Express Package",
    address: "789 Pine St, Midtown",
    status: "pending",
    date: "2024-01-14",
    courier: "Not assigned",
  },
  {
    id: "ORD-004",
    clientName: "Emily Davis",
    product: "Premium Package",
    address: "321 Elm St, Southside",
    status: "cancelled",
    date: "2024-01-14",
    courier: "N/A",
  },
  {
    id: "ORD-005",
    clientName: "Michael Johnson",
    product: "Standard Package",
    address: "654 Maple Dr, Westside",
    status: "processing",
    date: "2024-01-13",
    courier: "Tom Wilson",
  },
]

const getStatusBadge = (status: string) => {
  const statusConfig = {
    delivered: { label: "Delivered", variant: "default" as const, className: "bg-green-100 text-green-800" },
    "in-transit": { label: "In Transit", variant: "secondary" as const, className: "bg-blue-100 text-blue-800" },
    pending: { label: "Pending", variant: "outline" as const, className: "bg-yellow-100 text-yellow-800" },
    processing: { label: "Processing", variant: "secondary" as const, className: "bg-purple-100 text-purple-800" },
    cancelled: { label: "Cancelled", variant: "destructive" as const, className: "bg-red-100 text-red-800" },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  )
}

export function OrdersSection() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleExportExcel = () => {
    // In a real app, this would generate and download an Excel file
    console.log("Exporting orders to Excel...")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage and track all delivery orders</p>
        </div>
        <Button onClick={handleExportExcel} className="gap-2">
          <Download className="h-4 w-4" />
          Export Excel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>View and manage all delivery orders</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-[300px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Courier</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.clientName}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{order.address}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.courier}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuItem>Assign Courier</DropdownMenuItem>
                        <DropdownMenuItem>Edit Order</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
