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
import { Slider } from "@/components/ui/slider"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MoreHorizontal,
  Search,
  Plus,
  Users,
  DollarSign,
  Package,
  Download,
  AlertTriangle,
  Filter,
  RotateCcw,
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

  // Filter states
  const [debtRange, setDebtRange] = useState([0, 6000])
  const [productsRange, setProductsRange] = useState([0, 2500])
  const [cityFilter, setCityFilter] = useState("")
  const [nameFilter, setNameFilter] = useState("")

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

  const { filteredSellers, paginatedSellers, totalPages, startIndex, endIndex } = useMemo(() => {
    const filtered = sellers.filter((seller) => {
      // Search term filter
      const matchesSearch =
        seller.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.address.toLowerCase().includes(searchTerm.toLowerCase())

      // Debt range filter
      const matchesDebt = seller.debt >= debtRange[0] && seller.debt <= debtRange[1]

      // Products range filter
      const matchesProducts =
        seller.totalProductsReceived >= productsRange[0] && seller.totalProductsReceived <= productsRange[1]

      // City filter
      const matchesCity = !cityFilter || seller.address.toLowerCase().includes(cityFilter.toLowerCase())

      // Name filter
      const matchesName =
        !nameFilter ||
        seller.fullName.toLowerCase().includes(nameFilter.toLowerCase()) ||
        seller.contactPerson.toLowerCase().includes(nameFilter.toLowerCase())

      return matchesSearch && matchesDebt && matchesProducts && matchesCity && matchesName
    })

    const total = filtered.length
    const totalPages = Math.ceil(total / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = Math.min(startIndex + pageSize, total)
    const paginatedSellers = filtered.slice(startIndex, endIndex)

    return { filteredSellers: filtered, paginatedSellers, totalPages, startIndex: startIndex + 1, endIndex }
  }, [searchTerm, debtRange, productsRange, cityFilter, nameFilter, currentPage, pageSize])

  const resetFilters = () => {
    setDebtRange([0, 6000])
    setProductsRange([0, 2500])
    setCityFilter("")
    setNameFilter("")
    setSearchTerm("")
    setCurrentPage(1)
  }

  const handleExportExcel = () => {
    console.log("Exporting filtered sellers data to Excel...")
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

  const totalDebt = filteredSellers.reduce((sum, s) => sum + s.debt, 0)
  const overdueSellers = filteredSellers.filter((s) => s.status === "overdue").length
  const totalProducts = filteredSellers.reduce((sum, s) => sum + s.totalProductsReceived, 0)

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sellers Management</h1>
          <p className="text-muted-foreground">Manage seller relationships, debts, and product distribution</p>
        </div>
      </div>

      {/* Filter Panel */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Seller Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Debt Range */}
            <div className="space-y-2">
              <Label>
                Debt Range: ${debtRange[0]} - ${debtRange[1]}
              </Label>
              <Slider value={debtRange} onValueChange={setDebtRange} max={6000} min={0} step={100} className="w-full" />
            </div>

            {/* Products Range */}
            <div className="space-y-2">
              <Label>
                Products Received: {productsRange[0]} - {productsRange[1]}
              </Label>
              <Slider
                value={productsRange}
                onValueChange={setProductsRange}
                max={2500}
                min={0}
                step={50}
                className="w-full"
              />
            </div>

            {/* City Filter */}
            <div className="space-y-2">
              <Label>City</Label>
              <Input placeholder="Enter city name" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} />
            </div>

            {/* Name Filter */}
            <div className="space-y-2">
              <Label>Company/Contact Name</Label>
              <Input placeholder="Enter name" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
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
                Add Seller
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
              placeholder="Search sellers..."
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Filtered Sellers</CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{filteredSellers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Matching filters</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Outstanding Debt</CardTitle>
            <DollarSign className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">${totalDebt.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Needs collection</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overdue Accounts</CardTitle>
            <AlertTriangle className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{overdueSellers}</div>
            <p className="text-xs text-muted-foreground mt-1">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Products Distributed</CardTitle>
            <Package className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{totalProducts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Units distributed</p>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Alert */}
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
                <div className="text-2xl font-bold text-red-600">{overdueSellers} Sellers Overdue</div>
                <p className="text-sm text-red-600 mt-1">Immediate collection action required</p>
              </div>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
                View Overdue
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
              <CardTitle className="text-xl font-semibold">Seller Management</CardTitle>
              <CardDescription>
                Showing {startIndex}–{endIndex} of {filteredSellers.length} sellers
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
                  <TableHead className="font-semibold">Company</TableHead>
                  <TableHead className="font-semibold">Contact Person</TableHead>
                  <TableHead className="font-semibold">Phone</TableHead>
                  <TableHead className="font-semibold">Address</TableHead>
                  <TableHead className="font-semibold text-right">Outstanding Debt</TableHead>
                  <TableHead className="font-semibold text-center">Products Received</TableHead>
                  <TableHead className="font-semibold">Last Activity</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading
                  ? Array.from({ length: pageSize }).map((_, index) => (
                      <TableRow key={index}>
                        {Array.from({ length: 9 }).map((_, cellIndex) => (
                          <TableCell key={cellIndex}>
                            <Skeleton className="h-4 w-full" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  : paginatedSellers.map((seller) => (
                      <TableRow key={seller.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                        <TableCell className="font-mono text-sm font-medium">{seller.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={seller.avatar || "/placeholder.svg"} alt={seller.fullName} />
                              <AvatarFallback className="bg-purple-100 text-purple-600">
                                {seller.fullName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{seller.fullName}</div>
                              <div className="text-sm text-muted-foreground">Company</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{seller.contactPerson}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{seller.phone}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {seller.address}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex flex-col items-end gap-1">
                            <div className="font-mono font-semibold text-red-600">${seller.debt.toFixed(2)}</div>
                            {getDebtBadge(seller.debt, seller.status)}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary" className="bg-green-50 text-green-700">
                            {seller.totalProductsReceived.toLocaleString()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{new Date(seller.lastActivity).toLocaleDateString()}</div>
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
                              <DropdownMenuItem>Product History</DropdownMenuItem>
                              <DropdownMenuItem>Send Invoice</DropdownMenuItem>
                              <DropdownMenuItem>Contact Seller</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Suspend Account</DropdownMenuItem>
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
                Showing {startIndex}–{endIndex} of {filteredSellers.length} sellers
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
