"use client"

import { useState, useMemo, useEffect } from "react"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  MoreHorizontal,
  Search,
  Plus,
  Users,
  DollarSign,
  Download,
  Star,
  MapPin,
  CalendarIcon,
  Filter,
  RotateCcw,
} from "lucide-react"
import { format } from "date-fns"

const clients = [
  {
    id: "CLI-001",
    fullName: "John Smith",
    phone: "+1-555-0401",
    address: "123 Main St, Manhattan, New York",
    city: "New York",
    totalOrders: 45,
    totalSpent: 1250.75,
    lastOrderDate: "2024-01-15",
    registrationDate: "2023-08-15",
    avatar: "/placeholder-user.jpg",
    rating: 4.8,
    status: "active",
  },
  {
    id: "CLI-002",
    fullName: "Sarah Wilson",
    phone: "+1-555-0402",
    address: "456 Oak Ave, Beverly Hills, Los Angeles",
    city: "Los Angeles",
    totalOrders: 32,
    totalSpent: 890.5,
    lastOrderDate: "2024-01-14",
    registrationDate: "2023-09-22",
    avatar: "/placeholder-user.jpg",
    rating: 4.5,
    status: "active",
  },
  {
    id: "CLI-003",
    fullName: "Robert Brown",
    phone: "+1-555-0403",
    address: "789 Pine St, Downtown, Chicago",
    city: "Chicago",
    totalOrders: 18,
    totalSpent: 520.25,
    lastOrderDate: "2024-01-10",
    registrationDate: "2023-11-05",
    avatar: "/placeholder-user.jpg",
    rating: 4.2,
    status: "active",
  },
  {
    id: "CLI-004",
    fullName: "Emily Davis",
    phone: "+1-555-0404",
    address: "321 Elm St, Midtown, Houston",
    city: "Houston",
    totalOrders: 8,
    totalSpent: 180.0,
    lastOrderDate: "2023-12-20",
    registrationDate: "2023-10-12",
    avatar: "/placeholder-user.jpg",
    rating: 3.9,
    status: "inactive",
  },
  {
    id: "CLI-005",
    fullName: "Michael Johnson",
    phone: "+1-555-0405",
    address: "654 Maple Dr, Scottsdale, Phoenix",
    city: "Phoenix",
    totalOrders: 67,
    totalSpent: 2150.3,
    lastOrderDate: "2024-01-15",
    registrationDate: "2023-06-30",
    avatar: "/placeholder-user.jpg",
    rating: 4.9,
    status: "vip",
  },
  {
    id: "CLI-006",
    fullName: "Lisa Anderson",
    phone: "+1-555-0406",
    address: "987 Cedar Ln, Center City, Philadelphia",
    city: "Philadelphia",
    totalOrders: 28,
    totalSpent: 750.8,
    lastOrderDate: "2024-01-13",
    registrationDate: "2023-07-18",
    avatar: "/placeholder-user.jpg",
    rating: 4.6,
    status: "active",
  },
]

const getStatusBadge = (status: string) => {
  const statusConfig = {
    active: {
      label: "Active",
      className: "bg-green-50 text-green-700 border-green-200",
    },
    inactive: {
      label: "Inactive",
      className: "bg-gray-50 text-gray-700 border-gray-200",
    },
    vip: {
      label: "VIP",
      className: "bg-purple-50 text-purple-700 border-purple-200",
    },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  )
}

const getRatingStars = (rating: number) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3 w-3 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">{rating}</span>
    </div>
  )
}

export function ClientsSection() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [cityFilter, setCityFilter] = useState("")
  const [ordersRange, setOrdersRange] = useState([0, 100])
  const [spentRange, setSpentRange] = useState([0, 2500])
  const [ratingRange, setRatingRange] = useState([0, 5])
  const [registrationFrom, setRegistrationFrom] = useState<Date>()
  const [registrationTo, setRegistrationTo] = useState<Date>()

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

  const { filteredClients, paginatedClients, totalPages, startIndex, endIndex } = useMemo(() => {
    const filtered = clients.filter((client) => {
      // Search term filter
      const matchesSearch =
        client.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm) ||
        client.address.toLowerCase().includes(searchTerm.toLowerCase())

      // Status filter
      const matchesStatus = statusFilter === "all" || client.status === statusFilter

      // City filter
      const matchesCity = !cityFilter || client.city.toLowerCase().includes(cityFilter.toLowerCase())

      // Orders range filter
      const matchesOrders = client.totalOrders >= ordersRange[0] && client.totalOrders <= ordersRange[1]

      // Spent range filter
      const matchesSpent = client.totalSpent >= spentRange[0] && client.totalSpent <= spentRange[1]

      // Rating range filter
      const matchesRating = client.rating >= ratingRange[0] && client.rating <= ratingRange[1]

      // Registration date range filter
      const registrationDate = new Date(client.registrationDate)
      const matchesRegistration =
        (!registrationFrom || registrationDate >= registrationFrom) &&
        (!registrationTo || registrationDate <= registrationTo)

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCity &&
        matchesOrders &&
        matchesSpent &&
        matchesRating &&
        matchesRegistration
      )
    })

    const total = filtered.length
    const totalPages = Math.ceil(total / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = Math.min(startIndex + pageSize, total)
    const paginatedClients = filtered.slice(startIndex, endIndex)

    return { filteredClients: filtered, paginatedClients, totalPages, startIndex: startIndex + 1, endIndex }
  }, [
    searchTerm,
    statusFilter,
    cityFilter,
    ordersRange,
    spentRange,
    ratingRange,
    registrationFrom,
    registrationTo,
    currentPage,
    pageSize,
  ])

  const resetFilters = () => {
    setStatusFilter("all")
    setCityFilter("")
    setOrdersRange([0, 100])
    setSpentRange([0, 2500])
    setRatingRange([0, 5])
    setRegistrationFrom(undefined)
    setRegistrationTo(undefined)
    setSearchTerm("")
    setCurrentPage(1)
  }

  const handleExportExcel = () => {
    console.log("Exporting filtered clients data to Excel...")
  }

  const handlePageChange = (page: number) => {
    setIsLoading(true)
    setCurrentPage(page)
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    params.set("limit", pageSize.toString())
    router.push(`?${params.toString()}`)

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

  const totalRevenue = filteredClients.reduce((sum, c) => sum + c.totalSpent, 0)
  const vipClients = filteredClients.filter((c) => c.status === "vip").length
  const averageRating = filteredClients.reduce((sum, c) => sum + c.rating, 0) / filteredClients.length || 0

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients Management</h1>
          <p className="text-muted-foreground">Manage customer relationships, orders, and satisfaction metrics</p>
        </div>
      </div>

      {/* Filter Panel */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Client Filters
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* City Filter */}
            <div className="space-y-2">
              <Label>City</Label>
              <Input placeholder="Enter city name" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} />
            </div>

            {/* Orders Range */}
            <div className="space-y-2">
              <Label>
                Total Orders: {ordersRange[0]} - {ordersRange[1]}
              </Label>
              <Slider
                value={ordersRange}
                onValueChange={setOrdersRange}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
            </div>

            {/* Spent Range */}
            <div className="space-y-2">
              <Label>
                Total Spent: ${spentRange[0]} - ${spentRange[1]}
              </Label>
              <Slider
                value={spentRange}
                onValueChange={setSpentRange}
                max={2500}
                min={0}
                step={50}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Rating Range */}
            <div className="space-y-2">
              <Label>
                Rating: {ratingRange[0]} - {ratingRange[1]} stars
              </Label>
              <Slider
                value={ratingRange}
                onValueChange={setRatingRange}
                max={5}
                min={0}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* Registration Date Range */}
            <div className="space-y-2">
              <Label>Registration Date Range</Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {registrationFrom ? format(registrationFrom, "MMM dd") : "From"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={registrationFrom} onSelect={setRegistrationFrom} initialFocus />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {registrationTo ? format(registrationTo, "MMM dd") : "To"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={registrationTo} onSelect={setRegistrationTo} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
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
                Add Client
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
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Filtered Clients</CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{filteredClients.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Matching filters</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">From filtered clients</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">VIP Clients</CardTitle>
            <Star className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{vipClients}</div>
            <p className="text-xs text-muted-foreground mt-1">Premium customers</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
            <Star className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground mt-1">Customer satisfaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Clients Table */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Client Management</CardTitle>
              <CardDescription>
                Showing {startIndex}–{endIndex} of {filteredClients.length} clients
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
                  <TableHead className="font-semibold">Client</TableHead>
                  <TableHead className="font-semibold">Phone</TableHead>
                  <TableHead className="font-semibold">Address</TableHead>
                  <TableHead className="font-semibold text-center">Orders</TableHead>
                  <TableHead className="font-semibold text-right">Total Spent</TableHead>
                  <TableHead className="font-semibold text-center">Rating</TableHead>
                  <TableHead className="font-semibold">Last Order</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading
                  ? Array.from({ length: pageSize }).map((_, index) => (
                      <TableRow key={index}>
                        {Array.from({ length: 10 }).map((_, cellIndex) => (
                          <TableCell key={cellIndex}>
                            <Skeleton className="h-4 w-full" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  : paginatedClients.map((client) => (
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
                              <div className="text-sm text-muted-foreground">
                                Member since {new Date(client.registrationDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{client.phone}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-start gap-2 max-w-[200px]">
                            <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-sm leading-relaxed">{client.address}</div>
                              <Badge variant="outline" className="text-xs mt-1">
                                {client.city}
                              </Badge>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                            {client.totalOrders}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="font-mono font-semibold text-green-600">${client.totalSpent.toFixed(2)}</div>
                        </TableCell>
                        <TableCell className="text-center">{getRatingStars(client.rating)}</TableCell>
                        <TableCell>
                          <div className="text-sm">{new Date(client.lastOrderDate).toLocaleDateString()}</div>
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
                              <DropdownMenuItem>Upgrade to VIP</DropdownMenuItem>
                              <DropdownMenuItem>Contact Client</DropdownMenuItem>
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
                Showing {startIndex}–{endIndex} of {filteredClients.length} clients
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
