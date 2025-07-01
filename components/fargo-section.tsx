"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Download,
  MoreHorizontal,
  Search,
  Truck,
  DollarSign,
  Package,
  AlertTriangle,
  CheckCircle,
  Filter,
  RotateCcw,
  CalendarIcon,
} from "lucide-react"
import { format } from "date-fns"

const fargoOrders = [
  {
    id: "FRG-001",
    clientName: "Alice Cooper",
    clientPhone: "+1-555-0123",
    paymentAmount: 45.99,
    products: ["Premium Package", "Insurance Add-on"],
    status: "in-transit",
    comments: "In transit to branch point - ETA 2 hours",
    orderDate: "2024-01-15",
    trackingId: "FRG-TRK-001",
  },
  {
    id: "FRG-002",
    clientName: "Bob Martinez",
    clientPhone: "+1-555-0124",
    paymentAmount: 29.99,
    products: ["Standard Package"],
    status: "delivered",
    comments: "Successfully delivered to client",
    orderDate: "2024-01-15",
    trackingId: "FRG-TRK-002",
  },
  {
    id: "FRG-003",
    clientName: "Carol White",
    clientPhone: "+1-555-0125",
    paymentAmount: 65.5,
    products: ["Express Package", "Weekend Delivery"],
    status: "connection-issue",
    comments: "Fargo not connected - Retrying connection",
    orderDate: "2024-01-15",
    trackingId: "FRG-TRK-003",
  },
  {
    id: "FRG-004",
    clientName: "David Kim",
    clientPhone: "+1-555-0126",
    paymentAmount: 39.99,
    products: ["Deluxe Package"],
    status: "processing",
    comments: "Processing at Fargo facility",
    orderDate: "2024-01-15",
    trackingId: "FRG-TRK-004",
  },
  {
    id: "FRG-005",
    clientName: "Emma Johnson",
    clientPhone: "+1-555-0127",
    paymentAmount: 22.5,
    products: ["Economy Package"],
    status: "returned",
    comments: "Address not found - Returned to sender",
    orderDate: "2024-01-14",
    trackingId: "FRG-TRK-005",
  },
  {
    id: "FRG-006",
    clientName: "Frank Wilson",
    clientPhone: "+1-555-0128",
    paymentAmount: 55.75,
    products: ["Business Priority", "Signature Required"],
    status: "pending",
    comments: "Awaiting pickup from Fargo hub",
    orderDate: "2024-01-15",
    trackingId: "FRG-TRK-006",
  },
]

const allProducts = [
  "Premium Package",
  "Standard Package",
  "Express Package",
  "Economy Package",
  "Business Priority",
  "Deluxe Package",
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
    "in-transit": {
      label: "In Transit",
      className: "bg-blue-50 text-blue-700 border-blue-200",
      icon: Truck,
    },
    pending: {
      label: "Pending",
      className: "bg-yellow-50 text-yellow-700 border-yellow-200",
      icon: Package,
    },
    processing: {
      label: "Processing",
      className: "bg-purple-50 text-purple-700 border-purple-200",
      icon: Package,
    },
    "connection-issue": {
      label: "Connection Issue",
      className: "bg-red-50 text-red-700 border-red-200",
      icon: AlertTriangle,
    },
    returned: {
      label: "Returned",
      className: "bg-orange-50 text-orange-700 border-orange-200",
      icon: AlertTriangle,
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

export function FargoSection() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [customerFilter, setCustomerFilter] = useState("")
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [amountRange, setAmountRange] = useState([0, 100])
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const filteredOrders = useMemo(() => {
    return fargoOrders.filter((order) => {
      // Search term filter
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.trackingId.toLowerCase().includes(searchTerm.toLowerCase())

      // Status filter
      const matchesStatus = statusFilter === "all" || order.status === statusFilter

      // Customer filter
      const matchesCustomer = !customerFilter || order.clientName.toLowerCase().includes(customerFilter.toLowerCase())

      // Date range filter
      const orderDate = new Date(order.orderDate)
      const matchesDateRange = (!dateFrom || orderDate >= dateFrom) && (!dateTo || orderDate <= dateTo)

      // Amount range filter
      const matchesAmount = order.paymentAmount >= amountRange[0] && order.paymentAmount <= amountRange[1]

      // Product filter
      const matchesProduct =
        selectedProducts.length === 0 || order.products.some((product) => selectedProducts.includes(product))

      return matchesSearch && matchesStatus && matchesCustomer && matchesDateRange && matchesAmount && matchesProduct
    })
  }, [searchTerm, statusFilter, customerFilter, dateFrom, dateTo, amountRange, selectedProducts])

  const resetFilters = () => {
    setStatusFilter("all")
    setCustomerFilter("")
    setDateFrom(undefined)
    setDateTo(undefined)
    setAmountRange([0, 100])
    setSelectedProducts([])
    setSearchTerm("")
  }

  const handleExportExcel = () => {
    console.log("Exporting filtered Fargo orders to Excel...")
  }

  const todaysOrders = filteredOrders.filter((order) => order.orderDate === "2024-01-15")
  const todaysTotalAmount = todaysOrders.reduce((sum, order) => sum + order.paymentAmount, 0)
  const returnedOrders = filteredOrders.filter((order) => order.status === "returned").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fargo Delivery Management</h1>
          <p className="text-muted-foreground">Manage out-of-city deliveries through Fargo delivery system</p>
        </div>
      </div>

      {/* Filter Panel */}
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Fargo Order Filters
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
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="in-transit">In Transit</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="connection-issue">Connection Issue</SelectItem>
                  <SelectItem value="returned">Returned</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Customer Filter */}
            <div className="space-y-2">
              <Label>Customer Name</Label>
              <Input
                placeholder="Enter customer name"
                value={customerFilter}
                onChange={(e) => setCustomerFilter(e.target.value)}
              />
            </div>

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

            {/* Amount Range */}
            <div className="space-y-2">
              <Label>
                Amount Range: ${amountRange[0]} - ${amountRange[1]}
              </Label>
              <Slider
                value={amountRange}
                onValueChange={setAmountRange}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Fargo Account Balance</CardTitle>
            <DollarSign className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">$12,450.75</div>
            <p className="text-xs text-muted-foreground mt-1">Available credit</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Filtered Orders</CardTitle>
            <Package className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{filteredOrders.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Matching filters</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Total Amount</CardTitle>
            <DollarSign className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">${todaysTotalAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Revenue today</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Truck className="h-5 w-5 text-orange-600" />
              Today's Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{todaysOrders.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Orders processed</p>
          </CardContent>
        </Card>
      </div>

      {/* Returned Orders Alert */}
      {returnedOrders > 0 && (
        <Card className="border-l-4 border-l-red-500 bg-red-50/30">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              Returned Orders Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{returnedOrders} Orders Returned</div>
                <p className="text-sm text-red-600 mt-1">Requires attention and follow-up</p>
              </div>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Orders Table */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Fargo Orders Management</CardTitle>
              <CardDescription>
                Showing {filteredOrders.length} of {fargoOrders.length} orders
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
                  <TableHead className="font-semibold">Client Details</TableHead>
                  <TableHead className="font-semibold text-right">Payment Amount</TableHead>
                  <TableHead className="font-semibold">Products</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Comments</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                    <TableCell>
                      <div>
                        <div className="font-mono font-medium">{order.id}</div>
                        <div className="text-xs text-muted-foreground">{order.trackingId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.clientName}</div>
                        <div className="text-sm text-muted-foreground">{order.clientPhone}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-mono font-semibold text-green-600">${order.paymentAmount.toFixed(2)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {order.products.map((product, index) => (
                          <Badge key={index} variant="secondary" className="text-xs mr-1">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      <div className="max-w-[200px]">
                        <p className="text-sm text-gray-700 leading-relaxed">{order.comments}</p>
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
                          <DropdownMenuItem>Track with Fargo</DropdownMenuItem>
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
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
