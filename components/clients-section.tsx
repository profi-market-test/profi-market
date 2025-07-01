"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Download,
  MoreHorizontal,
  Search,
  Plus,
  Users,
  ShoppingCart,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Phone,
} from "lucide-react"

const clients = [
  {
    id: "CLI-001",
    fullName: "John Smith",
    phone: "+1-555-0401",
    address: { city: "New York", district: "Manhattan" },
    totalOrders: 24,
    returnedOrders: 2,
    lastOrderDate: "2024-01-15",
    totalSpent: 1250.5,
    status: "active",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "CLI-002",
    fullName: "Sarah Wilson",
    phone: "+1-555-0402",
    address: { city: "Los Angeles", district: "Beverly Hills" },
    totalOrders: 18,
    returnedOrders: 0,
    lastOrderDate: "2024-01-14",
    totalSpent: 890.25,
    status: "active",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "CLI-003",
    fullName: "Robert Brown",
    phone: "+1-555-0403",
    address: { city: "Chicago", district: "Downtown" },
    totalOrders: 32,
    returnedOrders: 1,
    lastOrderDate: "2024-01-13",
    totalSpent: 1680.75,
    status: "vip",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "CLI-004",
    fullName: "Emily Davis",
    phone: "+1-555-0404",
    address: { city: "Houston", district: "Midtown" },
    totalOrders: 5,
    returnedOrders: 3,
    lastOrderDate: "2023-12-20",
    totalSpent: 245.0,
    status: "inactive",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "CLI-005",
    fullName: "Michael Johnson",
    phone: "+1-555-0405",
    address: { city: "Phoenix", district: "Scottsdale" },
    totalOrders: 41,
    returnedOrders: 0,
    lastOrderDate: "2024-01-15",
    totalSpent: 2150.3,
    status: "vip",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "CLI-006",
    fullName: "Lisa Anderson",
    phone: "+1-555-0406",
    address: { city: "Philadelphia", district: "Center City" },
    totalOrders: 15,
    returnedOrders: 4,
    lastOrderDate: "2024-01-12",
    totalSpent: 675.8,
    status: "active",
    avatar: "/placeholder-user.jpg",
  },
]

const getStatusBadge = (status: string) => {
  const statusConfig = {
    active: {
      label: "Active",
      className: "bg-green-50 text-green-700 border-green-200",
    },
    vip: {
      label: "VIP",
      className: "bg-purple-50 text-purple-700 border-purple-200",
    },
    inactive: {
      label: "Inactive",
      className: "bg-gray-50 text-gray-700 border-gray-200",
    },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  )
}

const getReturnsBadge = (returns: number, total: number) => {
  const returnRate = (returns / total) * 100

  if (returns === 0) {
    return <Badge className="bg-green-50 text-green-700 border-green-200">No Returns</Badge>
  }

  if (returnRate > 20) {
    return (
      <Badge className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" />
        {returns} ({returnRate.toFixed(1)}%)
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
      {returns} ({returnRate.toFixed(1)}%)
    </Badge>
  )
}

export function ClientsSection() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredClients = clients.filter(
    (client) =>
      client.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.address.district.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalClients = clients.length
  const vipClients = clients.filter((c) => c.status === "vip").length
  const totalReturns = clients.reduce((sum, c) => sum + c.returnedOrders, 0)
  const averageOrderValue =
    clients.reduce((sum, c) => sum + c.totalSpent, 0) / clients.reduce((sum, c) => sum + c.totalOrders, 0)

  const handleExportExcel = () => {
    console.log("Exporting clients data to Excel...")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients Management</h1>
          <p className="text-muted-foreground">Manage customer relationships and track client performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleExportExcel} variant="outline" className="gap-2 hover:bg-accent bg-transparent">
            <Download className="h-4 w-4" />
            Export Excel
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Add Client
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Clients</CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{totalClients}</div>
            <p className="text-xs text-muted-foreground mt-1">Registered customers</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">VIP Clients</CardTitle>
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{vipClients}</div>
            <p className="text-xs text-muted-foreground mt-1">Premium customers</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Order Value</CardTitle>
            <ShoppingCart className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">${averageOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Per order</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Returns</CardTitle>
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{totalReturns}</div>
            <p className="text-xs text-muted-foreground mt-1">Returned orders</p>
          </CardContent>
        </Card>
      </div>

      {/* Clients Table */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Client Database</CardTitle>
              <CardDescription>Comprehensive view of all clients with order history and performance</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-[300px] focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold">ID</TableHead>
                  <TableHead className="font-semibold">Client</TableHead>
                  <TableHead className="font-semibold">Contact</TableHead>
                  <TableHead className="font-semibold">Address</TableHead>
                  <TableHead className="font-semibold text-center">Total Orders</TableHead>
                  <TableHead className="font-semibold text-center">Returned Orders</TableHead>
                  <TableHead className="font-semibold text-right">Total Spent</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                    <TableCell className="font-mono text-sm font-medium">{client.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.fullName} />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {client.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{client.fullName}</div>
                          <div className="text-sm text-muted-foreground">Last order: {client.lastOrderDate}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{client.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium">{client.address.city}</div>
                          <div className="text-xs text-muted-foreground">{client.address.district}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-mono">
                        {client.totalOrders}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {getReturnsBadge(client.returnedOrders, client.totalOrders)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-mono font-semibold text-green-600">${client.totalSpent.toFixed(2)}</div>
                    </TableCell>
                    <TableCell>{getStatusBadge(client.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Order History</DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          <DropdownMenuItem>Edit Client</DropdownMenuItem>
                          <DropdownMenuItem>Mark as VIP</DropdownMenuItem>
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
