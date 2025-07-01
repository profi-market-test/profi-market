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
  MoreHorizontal,
  Search,
  Plus,
  Users,
  DollarSign,
  Package,
  Download,
  AlertTriangle,
  TrendingUp,
} from "lucide-react"

const sellers = [
  {
    id: "SEL-001",
    fullName: "Premium Partners LLC",
    contactPerson: "John Smith",
    phone: "+1-555-0301",
    address: "New York",
    debt: 2450.75,
    totalProductsReceived: 1250,
    avatar: "/placeholder-user.jpg",
    lastActivity: "2024-01-15",
    status: "active",
  },
  {
    id: "SEL-002",
    fullName: "Quick Supply Co",
    contactPerson: "Sarah Johnson",
    phone: "+1-555-0302",
    address: "Los Angeles",
    debt: 0.0,
    totalProductsReceived: 890,
    avatar: "/placeholder-user.jpg",
    lastActivity: "2024-01-14",
    status: "active",
  },
  {
    id: "SEL-003",
    fullName: "Express Solutions Inc",
    contactPerson: "Mike Wilson",
    phone: "+1-555-0303",
    address: "Chicago",
    debt: 1850.3,
    totalProductsReceived: 650,
    avatar: "/placeholder-user.jpg",
    lastActivity: "2024-01-13",
    status: "active",
  },
  {
    id: "SEL-004",
    fullName: "Local Distributors",
    contactPerson: "Emma Davis",
    phone: "+1-555-0304",
    address: "Houston",
    debt: 5200.0,
    totalProductsReceived: 320,
    avatar: "/placeholder-user.jpg",
    lastActivity: "2023-12-28",
    status: "overdue",
  },
  {
    id: "SEL-005",
    fullName: "Metro Wholesale",
    contactPerson: "Alex Brown",
    phone: "+1-555-0305",
    address: "Phoenix",
    debt: 750.5,
    totalProductsReceived: 1100,
    avatar: "/placeholder-user.jpg",
    lastActivity: "2024-01-15",
    status: "active",
  },
  {
    id: "SEL-006",
    fullName: "Global Trade Partners",
    contactPerson: "Lisa Chen",
    phone: "+1-555-0306",
    address: "Philadelphia",
    debt: 3100.25,
    totalProductsReceived: 2200,
    avatar: "/placeholder-user.jpg",
    lastActivity: "2024-01-12",
    status: "active",
  },
]

const getDebtBadge = (debt: number, status: string) => {
  if (debt === 0) {
    return <Badge className="bg-green-50 text-green-700 border-green-200">No Debt</Badge>
  }

  if (status === "overdue") {
    return (
      <Badge className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" />
        Overdue
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
      Outstanding
    </Badge>
  )
}

export function SellersSection() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSellers = sellers.filter(
    (seller) =>
      seller.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalDebt = sellers.reduce((sum, seller) => sum + seller.debt, 0)
  const averageProducts = sellers.reduce((sum, seller) => sum + seller.totalProductsReceived, 0) / sellers.length
  const overdueSellers = sellers.filter((s) => s.status === "overdue").length

  const handleExportExcel = () => {
    console.log("Exporting sellers data to Excel...")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sellers Management</h1>
          <p className="text-muted-foreground">
            Manage product suppliers, track debts, and monitor supply relationships
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleExportExcel} variant="outline" className="gap-2 hover:bg-accent bg-transparent">
            <Download className="h-4 w-4" />
            Export Excel
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Add Seller
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sellers</CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{sellers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Active suppliers</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Debt</CardTitle>
            <DollarSign className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">${totalDebt.toFixed(2)}</div>
            <div className="flex items-center mt-1">
              <AlertTriangle className="h-3 w-3 text-red-500 mr-1" />
              <p className="text-xs text-red-600">{overdueSellers} overdue accounts</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Products</CardTitle>
            <Package className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{Math.round(averageProducts)}</div>
            <p className="text-xs text-muted-foreground mt-1">Per seller</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Suppliers</CardTitle>
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {sellers.filter((s) => s.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Currently supplying</p>
          </CardContent>
        </Card>
      </div>

      {/* Debt Alert Card */}
      {overdueSellers > 0 && (
        <Card className="border-l-4 border-l-red-500 bg-red-50/30">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              Overdue Accounts Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{overdueSellers} Sellers</div>
                <p className="text-sm text-red-600 mt-1">Have overdue payments requiring immediate attention</p>
              </div>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
                Review Overdue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sellers Table */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Sellers Management</CardTitle>
              <CardDescription>Track supplier relationships, debts, and product deliveries</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search sellers..."
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
                  <TableHead className="font-semibold">Seller</TableHead>
                  <TableHead className="font-semibold">Contact</TableHead>
                  <TableHead className="font-semibold">Address</TableHead>
                  <TableHead className="font-semibold text-right">Debt</TableHead>
                  <TableHead className="font-semibold text-center">Products Received</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSellers.map((seller) => (
                  <TableRow key={seller.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                    <TableCell className="font-mono text-sm font-medium">{seller.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={seller.avatar || "/placeholder.svg"} alt={seller.fullName} />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {seller.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{seller.fullName}</div>
                          <div className="text-sm text-muted-foreground">{seller.contactPerson}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{seller.phone}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gray-50">
                        {seller.address}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div>
                        <div
                          className={`font-mono font-semibold ${seller.debt > 0 ? "text-red-600" : "text-green-600"}`}
                        >
                          ${seller.debt.toFixed(2)}
                        </div>
                        <div className="mt-1">{getDebtBadge(seller.debt, seller.status)}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-mono">
                        {seller.totalProductsReceived.toLocaleString()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">Last Activity:</div>
                        <div className="text-xs text-muted-foreground">{seller.lastActivity}</div>
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
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Payment History</DropdownMenuItem>
                          <DropdownMenuItem>Product Orders</DropdownMenuItem>
                          <DropdownMenuItem>Contact Seller</DropdownMenuItem>
                          <DropdownMenuItem>Edit Details</DropdownMenuItem>
                          {seller.debt > 0 && (
                            <DropdownMenuItem className="text-red-600">Send Payment Reminder</DropdownMenuItem>
                          )}
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
