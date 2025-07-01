"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft, ChevronRight } from "lucide-react"
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
  Filter,
  RotateCcw,
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

  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [workTimeFrom, setWorkTimeFrom] = useState("")
  const [workTimeTo, setWorkTimeTo] = useState("")
  const [ordersRange, setOrdersRange] = useState([0, 250])
  const [locationFilter, setLocationFilter] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const page = searchParams.get("page")
    const limit = searchParams.get("limit")
    if (page) setCurrentPage(Number.parseInt(page))
    if (limit) setPageSize(Number.parseInt(limit))
  }, [searchParams])

  const { filteredCouriers, paginatedCouriers, totalPages, startIndex, endIndex } = useMemo(() => {
    const filtered = couriers.filter((courier) => {
      // Search term filter
      const matchesSearch =
        courier.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        courier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        courier.currentLocation.address.toLowerCase().includes(searchTerm.toLowerCase())

      // Status filter
      const matchesStatus = statusFilter === "all" || courier.status === statusFilter

      // Work time filter (simplified - checking if schedule contains the time range)
      const matchesWorkTime =
        (!workTimeFrom && !workTimeTo) ||
        courier.workSchedule.toLowerCase().includes("am") ||
        courier.workSchedule.toLowerCase().includes("pm")

      // Orders count filter
      const matchesOrders = courier.monthlyOrders >= ordersRange[0] && courier.monthlyOrders <= ordersRange[1]

      // Location filter
      const matchesLocation =
        !locationFilter || courier.currentLocation.address.toLowerCase().includes(locationFilter.toLowerCase())

      return matchesSearch && matchesStatus && matchesWorkTime && matchesOrders && matchesLocation
    })

    const total = filtered.length
    const totalPages = Math.ceil(total / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = Math.min(startIndex + pageSize, total)
    const paginatedCouriers = filtered.slice(startIndex, endIndex)

    return { filteredCouriers: filtered, paginatedCouriers, totalPages, startIndex: startIndex + 1, endIndex }
  }, [searchTerm, statusFilter, workTimeFrom, workTimeTo, ordersRange, locationFilter, currentPage, pageSize])

  const resetFilters = () => {
    setStatusFilter("all")
    setWorkTimeFrom("")
    setWorkTimeTo("")
    setOrdersRange([0, 250])
    setLocationFilter("")
    setSearchTerm("")
    setCurrentPage(1)
  }

  const handleExportExcel = () => {
    console.log("Exporting filtered couriers data to Excel...")
  }

  const handlePageChange = (page: number) => {
    setIsLoading(true)
    setCurrentPage(page)
    const newParams = new URLSearchParams(searchParams)
    newParams.set("page", String(page))
    router.push(`?${newParams.toString()}`)

    // Simulate loading
    setTimeout(() => setIsLoading(false), 300)
  }

  const handlePageSizeChange = (newPageSize: string) => {
    const size = Number.parseInt(newPageSize)
    setPageSize(size)
    setCurrentPage(1)
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", "1")
    params.set("limit", size.toString())
    router.push(`?${params.toString()}`)
  }

  const workingCouriers = filteredCouriers.filter((c) => c.status === "working").length
  const totalBalance = filteredCouriers.reduce((sum, c) => sum + c.accountBalance, 0)
  const todaysTotalDeliveries = filteredCouriers.reduce((sum, c) => sum + c.todayDelivered, 0)

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Couriers Management</h1>
          <p className="text-muted-foreground">Monitor courier performance, locations, and delivery statistics</p>
        </div>
      </div>

      {/* Filter Panel */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Courier Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Status Filter */}
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="working">Working</SelectItem>
                  <SelectItem value="not-working">Not Working</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Work Time Range */}
            <div className="space-y-2">
              <Label>Work Time Range</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="From (e.g., 9:00 AM)"
                  value={workTimeFrom}
                  onChange={(e) => setWorkTimeFrom(e.target.value)}
                />
                <Input
                  placeholder="To (e.g., 6:00 PM)"
                  value={workTimeTo}
                  onChange={(e) => setWorkTimeTo(e.target.value)}
                />
              </div>
            </div>

            {/* Orders Count Range */}
            <div className="space-y-2">
              <Label>
                Monthly Orders: {ordersRange[0]} - {ordersRange[1]}
              </Label>
              <Slider
                value={ordersRange}
                onValueChange={setOrdersRange}
                max={250}
                min={0}
                step={10}
                className="w-full"
              />
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                placeholder="Enter location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button onClick={resetFilters} variant="outline" className="gap-2 bg-transparent">
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
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
        </CardContent>
      </Card>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search couriers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </CardContent>
      </Card>

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
            <CardTitle className="text-sm font-medium text-muted-foreground">Filtered Results</CardTitle>
            <CheckCircle className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{filteredCouriers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Matching filters</p>
          </CardContent>
        </Card>
      </div>

      {/* Couriers Table */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Courier Management</CardTitle>
              <CardDescription>
                Showing {startIndex}–{endIndex} of {filteredCouriers.length} couriers
              </CardDescription>
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
                {isLoading
                  ? Array.from({ length: pageSize }).map((_, index) => (
                      <TableRow key={index}>
                        {Array.from({ length: 13 }).map((_, cellIndex) => (
                          <TableCell key={cellIndex}>
                            <Skeleton className="h-4 w-full" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  : paginatedCouriers.map((courier) => (
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
                          <div className="font-mono font-semibold text-green-600">
                            ${courier.accountBalance.toFixed(2)}
                          </div>
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

      {/* Sticky Pagination Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">
                Showing {startIndex}–{endIndex} of {filteredCouriers.length} couriers
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent side="top">
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    let pageNumber
                    if (totalPages <= 7) {
                      pageNumber = i + 1
                    } else if (currentPage <= 4) {
                      pageNumber = i + 1
                    } else if (currentPage >= totalPages - 3) {
                      pageNumber = totalPages - 6 + i
                    } else {
                      pageNumber = currentPage - 3 + i
                    }

                    return (
                      <Button
                        key={pageNumber}
                        variant={currentPage === pageNumber ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNumber)}
                        className="h-8 w-8 p-0"
                      >
                        {pageNumber}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
