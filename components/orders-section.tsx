"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Download,
  MoreHorizontal,
  Search,
  Filter,
  Package,
  Clock,
  CheckCircle,
  Truck,
  CreditCard,
  Banknote,
  MapPin,
  User,
} from "lucide-react"

const orders = [
  {
    id: "ORD-001",
    clientName: "John Smith",
    products: ["Premium Package", "Insurance Add-on"],
    paymentType: "card",
    amount: 45.99,
    status: "delivered",
    courierName: "Mike Johnson",
    address: "123 Main St, Manhattan, New York",
    orderCreated: "2024-01-15 09:30:00",
    deliveredTime: "2024-01-15 14:45:00",
  },
  {
    id: "ORD-002",
    clientName: "Sarah Wilson",
    products: ["Standard Package"],
    paymentType: "cash",
    amount: 29.99,
    status: "on-the-way",
    courierName: "Lisa Chen",
    address: "456 Oak Ave, Beverly Hills, Los Angeles",
    orderCreated: "2024-01-15 11:15:00",
    deliveredTime: null,
  },
  {
    id: "ORD-003",
    clientName: "Robert Brown",
    products: ["Express Package", "Weekend Delivery"],
    paymentType: "card",
    amount: 65.5,
    status: "processing",
    courierName: "Not assigned",
    address: "789 Pine St, Downtown, Chicago",
    orderCreated: "2024-01-15 13:20:00",
    deliveredTime: null,
  },
  {
    id: "ORD-004",
    clientName: "Emily Davis",
    products: ["Economy Package"],
    paymentType: "cash",
    amount: 19.99,
    status: "cancelled",
    courierName: "N/A",
    address: "321 Elm St, Midtown, Houston",
    orderCreated: "2024-01-14 16:45:00",
    deliveredTime: null,
  },
  {
    id: "ORD-005",
    clientName: "Michael Johnson",
    products: ["Business Priority", "Signature Required"],
    paymentType: "card",
    amount: 55.75,
    status: "pending",
    courierName: "Tom Wilson",
    address: "654 Maple Dr, Scottsdale, Phoenix",
    orderCreated: "2024-01-15 08:00:00",
    deliveredTime: null,
  },
  {
    id: "ORD-006",
    clientName: "Lisa Anderson",
    products: ["Standard Package", "Insurance"],
    paymentType: "cash",
    amount: 35.25,
    status: "delivered",
    courierName: "Alex Rodriguez",
    address: "987 Cedar Ln, Center City, Philadelphia",
    orderCreated: "2024-01-14 10:30:00",
    deliveredTime: "2024-01-14 15:20:00",
  },
]

const getStatusBadge = (status: string) => {
  const statusConfig = {
    delivered: {
      label: "Delivered",
      className: "bg-green-50 text-green-700 border-green-200",
      icon: CheckCircle,
    },
    "on-the-way": {
      label: "On the Way",
      className: "bg-blue-50 text-blue-700 border-blue-200",
      icon: Truck,
    },
    pending: {
      label: "Pending",
      className: "bg-yellow-50 text-yellow-700 border-yellow-200",
      icon: Clock,
    },
    processing: {
      label: "Processing",
      className: "bg-purple-50 text-purple-700 border-purple-200",
      icon: Package,
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-red-50 text-red-700 border-red-200",
      icon: Clock,
    },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
  const IconComponent = config.icon

  return (
    <Badge variant="outline" className={`${config.className} flex items-center gap-1`}>
      <IconComponent className="h-3 w-3" />
      {config.label}
    </Badge>
  )
}

const getPaymentBadge = (paymentType: string) => {
  const paymentConfig = {
    card: {
      label: "Card",
      className: "bg-blue-50 text-blue-700 border-blue-200",
      icon: CreditCard,
    },
    cash: {
      label: "Cash",
      className: "bg-green-50 text-green-700 border-green-200",
      icon: Banknote,
    },
  }

  const config = paymentConfig[paymentType as keyof typeof paymentConfig] || paymentConfig.cash
  const IconComponent = config.icon

  return (
    <Badge variant="outline" className={`${config.className} flex items-center gap-1`}>
      <IconComponent className="h-3 w-3" />
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
      order.courierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products.some((product) => product.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const totalOrders = orders.length
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length
  const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "processing").length
  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0)

  const handleExportExcel = () => {
    console.log("Exporting orders to Excel...")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders Management</h1>
          <p className="text-muted-foreground">Track and manage all delivery orders with detailed information</p>
        </div>
        <Button onClick={handleExportExcel} className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4" />
          Export Excel
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
            <Package className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{totalOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">All time orders</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Delivered</CardTitle>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{deliveredOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully completed</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            <Clock className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">In progress</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <CreditCard className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">From all orders</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Order Management</CardTitle>
              <CardDescription>Comprehensive view of all orders with detailed tracking information</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-[300px] focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <Button variant="outline" size="icon" className="hover:bg-accent bg-transparent">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold">Order ID</TableHead>
                  <TableHead className="font-semibold">Client</TableHead>
                  <TableHead className="font-semibold">Products</TableHead>
                  <TableHead className="font-semibold">Payment</TableHead>
                  <TableHead className="font-semibold text-right">Amount</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Courier</TableHead>
                  <TableHead className="font-semibold">Address</TableHead>
                  <TableHead className="font-semibold">Timeline</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                    <TableCell className="font-mono font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{order.clientName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {order.products.map((product, index) => (
                          <Badge key={index} variant="secondary" className="text-xs mr-1 mb-1">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{getPaymentBadge(order.paymentType)}</TableCell>
                    <TableCell className="text-right">
                      <div className="font-mono font-semibold text-green-600">${order.amount.toFixed(2)}</div>
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{order.courierName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start gap-2 max-w-[200px]">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm leading-relaxed">{order.address}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">
                          <strong>Created:</strong> {new Date(order.orderCreated).toLocaleString()}
                        </div>
                        {order.deliveredTime && (
                          <div className="text-xs text-green-600">
                            <strong>Delivered:</strong> {new Date(order.deliveredTime).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
                          <DropdownMenuItem>Assign Courier</DropdownMenuItem>
                          <DropdownMenuItem>Track Order</DropdownMenuItem>
                          <DropdownMenuItem>Contact Client</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
