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
  MapPin,
  Clock,
  CheckCircle,
  Download,
  Users,
  DollarSign,
  Truck,
} from "lucide-react"

const couriers = [
  {
    id: "CUR-001",
    fullName: "Michael Johnson",
    status: "working",
    phone: "+1-555-0201",
    email: "mike.j@company.com",
    accountBalance: 450.75,
    workSchedule: "9:00 AM - 6:00 PM",
    currentLocation: { lat: 40.7128, lng: -74.006, address: "Downtown District" },
    todayDelivered: 8,
    weeklyOrders: 45,
    monthlyOrders: 180,
    handedToClientsToday: 6,
    handedToFargoToday: 2,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "CUR-002",
    fullName: "Lisa Chen",
    status: "working",
    phone: "+1-555-0202",
    email: "lisa.c@company.com",
    accountBalance: 620.3,
    workSchedule: "8:00 AM - 5:00 PM",
    currentLocation: { lat: 40.7589, lng: -73.9851, address: "Uptown Area" },
    todayDelivered: 12,
    weeklyOrders: 52,
    monthlyOrders: 208,
    handedToClientsToday: 10,
    handedToFargoToday: 2,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "CUR-003",
    fullName: "Thomas Wilson",
    status: "not-working",
    phone: "+1-555-0203",
    email: "tom.w@company.com",
    accountBalance: 125.5,
    workSchedule: "10:00 AM - 7:00 PM",
    currentLocation: { lat: 40.7282, lng: -74.0776, address: "Westside" },
    todayDelivered: 0,
    weeklyOrders: 28,
    monthlyOrders: 112,
    handedToClientsToday: 0,
    handedToFargoToday: 0,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "CUR-004",
    fullName: "Sarah Davis",
    status: "not-working",
    phone: "+1-555-0204",
    email: "sarah.d@company.com",
    accountBalance: 0.0,
    workSchedule: "Off Today",
    currentLocation: { lat: 0, lng: 0, address: "Offline" },
    todayDelivered: 0,
    weeklyOrders: 0,
    monthlyOrders: 85,
    handedToClientsToday: 0,
    handedToFargoToday: 0,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "CUR-005",
    fullName: "Alexander Rodriguez",
    status: "working",
    phone: "+1-555-0205",
    email: "alex.r@company.com",
    accountBalance: 380.25,
    workSchedule: "7:00 AM - 4:00 PM",
    currentLocation: { lat: 40.6892, lng: -74.0445, address: "Southside" },
    todayDelivered: 9,
    weeklyOrders: 41,
    monthlyOrders: 164,
    handedToClientsToday: 7,
    handedToFargoToday: 2,
    avatar: "/placeholder-user.jpg",
  },
]

const getStatusBadge = (status: string) => {
  const statusConfig = {
    working: {
      label: "Working",
      className: "bg-green-50 text-green-700 border-green-200",
      icon: CheckCircle,
    },
    "not-working": {
      label: "Not Working",
      className: "bg-gray-50 text-gray-700 border-gray-200",
      icon: Clock,
    },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig["not-working"]
  const IconComponent = config.icon

  return (
    <Badge variant="outline" className={`${config.className} flex items-center gap-1`}>
      <IconComponent className="h-3 w-3" />
      {config.label}
    </Badge>
  )
}

export function CouriersSection() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCouriers = couriers.filter(
    (courier) =>
      courier.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      courier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      courier.currentLocation.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const workingCouriers = couriers.filter((c) => c.status === "working").length
  const totalBalance = couriers.reduce((sum, c) => sum + c.accountBalance, 0)
  const todaysTotalDeliveries = couriers.reduce((sum, c) => sum + c.todayDelivered, 0)

  const handleExportExcel = () => {
    console.log("Exporting couriers data to Excel...")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Couriers Management</h1>
          <p className="text-muted-foreground">Monitor courier performance, locations, and delivery statistics</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleExportExcel} variant="outline" className="gap-2 hover:bg-accent bg-transparent">
            <Download className="h-4 w-4" />
            Export Excel
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Add Courier
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Couriers</CardTitle>
            <Users className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{workingCouriers}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently working</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
            <DollarSign className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">${totalBalance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Combined account balance</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Deliveries</CardTitle>
            <Truck className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{todaysTotalDeliveries}</div>
            <p className="text-xs text-muted-foreground mt-1">Orders delivered today</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Performance</CardTitle>
            <CheckCircle className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">94.2%</div>
            <p className="text-xs text-muted-foreground mt-1">Delivery success rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Couriers Table */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Courier Management</CardTitle>
              <CardDescription>Track courier status, locations, and performance metrics</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search couriers..."
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
                  <TableHead className="font-semibold">Courier</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Contact</TableHead>
                  <TableHead className="font-semibold text-right">Balance</TableHead>
                  <TableHead className="font-semibold">Schedule</TableHead>
                  <TableHead className="font-semibold">Location</TableHead>
                  <TableHead className="font-semibold text-center">Today</TableHead>
                  <TableHead className="font-semibold text-center">Weekly</TableHead>
                  <TableHead className="font-semibold text-center">Monthly</TableHead>
                  <TableHead className="font-semibold text-center">To Clients</TableHead>
                  <TableHead className="font-semibold text-center">To Fargo</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCouriers.map((courier) => (
                  <TableRow key={courier.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                    <TableCell className="font-mono text-sm font-medium">{courier.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={courier.avatar || "/placeholder.svg"} alt={courier.fullName} />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {courier.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{courier.fullName}</div>
                          <div className="text-sm text-muted-foreground">{courier.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(courier.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">{courier.phone}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-mono font-semibold text-green-600">${courier.accountBalance.toFixed(2)}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {courier.workSchedule}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <div>
                          <div className="text-sm font-medium">{courier.currentLocation.address}</div>
                          {courier.currentLocation.lat !== 0 && (
                            <div className="text-xs text-muted-foreground font-mono">
                              {courier.currentLocation.lat.toFixed(4)}, {courier.currentLocation.lng.toFixed(4)}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                        {courier.todayDelivered}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="bg-green-50 text-green-700">
                        {courier.weeklyOrders}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="bg-purple-50 text-purple-700">
                        {courier.monthlyOrders}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                        {courier.handedToClientsToday}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                        {courier.handedToFargoToday}
                      </Badge>
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
                          <DropdownMenuItem>View Location</DropdownMenuItem>
                          <DropdownMenuItem>Assign Orders</DropdownMenuItem>
                          <DropdownMenuItem>Performance Report</DropdownMenuItem>
                          <DropdownMenuItem>Contact Courier</DropdownMenuItem>
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
