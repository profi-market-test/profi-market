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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
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
  CalendarIcon,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { format } from "date-fns"

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
    city: "New York",
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
    city: "Los Angeles",
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
    city: "Chicago",
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
    city: "Houston",
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
    city: "Phoenix",
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
    city: "Philadelphia",
    orderCreated: "2024-01-14 10:30:00",
    deliveredTime: "2024-01-14 15:20:00",
  },
]

const allCouriers = ["Mike Johnson", "Lisa Chen", "Tom Wilson", "Alex Rodriguez", "Not assigned"]
const allProducts = [
  "Premium Package",
  "Standard Package",
  "Express Package",
  "Economy Package",
  "Business Priority",
  "Insurance Add-on",
  "Weekend Delivery",
  "Signature Required",
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

  // Filter states
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [paymentFilter, setPaymentFilter] = useState<string>("all")
  const [selectedCouriers, setSelectedCouriers] = useState<string[]>([])
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [cityFilter, setCityFilter] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize pagination from URL params
  useEffect(() => {
    const page = searchParams.get("page")
    const limit = searchParams.get("limit")
    if (page) setCurrentPage(Number.parseInt(page))
    if (limit) setPageSize(Number.parseInt(limit))
  }, [searchParams])

  const { filteredOrders, paginatedOrders, totalPages, startIndex, endIndex } = useMemo(() => {
    const filtered = orders.filter((order) => {
      // Search term filter
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.courierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.products.some((product) => product.toLowerCase().includes(searchTerm.toLowerCase()))

      // Date range filter
      const orderDate = new Date(order.orderCreated)
      const matchesDateRange = (!dateFrom || orderDate >= dateFrom) && (!dateTo || orderDate <= dateTo)

      // Status filter
      const matchesStatus = statusFilter === "all" || order.status === statusFilter

      // Payment filter
      const matchesPayment = paymentFilter === "all" || order.paymentType === paymentFilter

      // Courier filter
      const matchesCourier = selectedCouriers.length === 0 || selectedCouriers.includes(order.courierName)

      // Product filter
      const matchesProduct =
        selectedProducts.length === 0 || order.products.some((product) => selectedProducts.includes(product))

      // City filter
      const matchesCity = !cityFilter || order.city.toLowerCase().includes(cityFilter.toLowerCase())

      return (
        matchesSearch &&
        matchesDateRange &&
        matchesStatus &&
        matchesPayment &&
        matchesCourier &&
        matchesProduct &&
        matchesCity
      )
    })

    const total = filtered.length
    const totalPages = Math.ceil(total / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = Math.min(startIndex + pageSize, total)
    const paginatedOrders = filtered.slice(startIndex, endIndex)

    return { filteredOrders: filtered, paginatedOrders, totalPages, startIndex: startIndex + 1, endIndex }
  }, [
    searchTerm,
    dateFrom,
    dateTo,
    statusFilter,
    paymentFilter,
    selectedCouriers,
    selectedProducts,
    cityFilter,
    currentPage,
    pageSize,
  ])

  const resetFilters = () => {
    setDateFrom(undefined)
    setDateTo(undefined)
    setStatusFilter("all")
    setPaymentFilter("all")
    setSelectedCouriers([])
    setSelectedProducts([])
    setCityFilter("")
    setSearchTerm("")
    setCurrentPage(1)
  }

  const handleExportExcel = () => {
    console.log("Exporting filtered orders to Excel...")
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

  const totalOrders = filteredOrders.length
  const deliveredOrders = filteredOrders.filter((o) => o.status === "delivered").length
  const pendingOrders = filteredOrders.filter((o) => o.status === "pending" || o.status === "processing").length
  const totalRevenue = filteredOrders.reduce((sum, o) => sum + o.amount, 0)

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders Management</h1>
          <p className="text-muted-foreground">Track and manage all delivery orders with detailed information</p>
        </div>
      </div>

      {/* Filter Panel */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Order Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Date Range */}
            <div className="space-y-2">
              <Label>Date Range</Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "MMM dd") : "From"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "MMM dd") : "To"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="on-the-way">On the Way</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Payment Type */}
            <div className="space-y-2">
              <Label>Payment Type</Label>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All payments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All payments</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* City Filter */}
            <div className="space-y-2">
              <Label>City</Label>
              <Input placeholder="Enter city name" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Courier Multi-select */}
            <div className="space-y-2">
              <Label>Couriers</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    {selectedCouriers.length === 0 ? "All couriers" : `${selectedCouriers.length} selected`}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    {allCouriers.map((courier) => (
                      <div key={courier} className="flex items-center space-x-2">
                        <Checkbox
                          id={courier}
                          checked={selectedCouriers.includes(courier)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCouriers([...selectedCouriers, courier])
                            } else {
                              setSelectedCouriers(selectedCouriers.filter((c) => c !== courier))
                            }
                          }}
                        />
                        <Label htmlFor={courier} className="text-sm">
                          {courier}
                        </Label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Product Multi-select */}
            <div className="space-y-2">
              <Label>Products</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    {selectedProducts.length === 0 ? "All products" : `${selectedProducts.length} selected`}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {allProducts.map((product) => (
                      <div key={product} className="flex items-center space-x-2">
                        <Checkbox
                          id={product}
                          checked={selectedProducts.includes(product)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedProducts([...selectedProducts, product])
                            } else {
                              setSelectedProducts(selectedProducts.filter((p) => p !== product))
                            }
                          }}
                        />
                        <Label htmlFor={product} className="text-sm">
                          {product}
                        </Label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
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
            <Button onClick={handleExportExcel} className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4" />
              Export Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Filtered Orders</CardTitle>
            <Package className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{totalOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">Matching filters</p>
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
            <p className="text-xs text-muted-foreground mt-1">From filtered orders</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Order Management</CardTitle>
              <CardDescription>
                Showing {startIndex}–{endIndex} of {totalOrders} orders
              </CardDescription>
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
                  : paginatedOrders.map((order) => (
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

      {/* Sticky Pagination Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">
                Showing {startIndex}–{endIndex} of {totalOrders} orders
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
