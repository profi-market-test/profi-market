"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Search, Download, Edit, Trash2, Package, Store, Filter, RotateCcw } from "lucide-react"

const products = [
  {
    id: "PROD-001",
    name: "Premium Delivery Package",
    category: "Premium",
    stock: 150,
    weeklySold: 45,
    monthlySold: 180,
    isCombo: true,
    comboItems: ["Express Shipping", "Insurance", "Priority Handling"],
    costPrice: 15.5,
    sellingPrice: 29.99,
    stores: ["Downtown Store", "Mall Branch", "Online"],
    status: "in-stock",
    seller: "Premium Partners LLC",
  },
  {
    id: "PROD-002",
    name: "Standard Delivery Package",
    category: "Standard",
    stock: 75,
    weeklySold: 32,
    monthlySold: 128,
    isCombo: false,
    comboItems: [],
    costPrice: 8.25,
    sellingPrice: 19.99,
    stores: ["Downtown Store", "Mall Branch"],
    status: "low-stock",
    seller: "Quick Supply Co",
  },
  {
    id: "PROD-003",
    name: "Express Overnight Package",
    category: "Express",
    stock: 0,
    weeklySold: 0,
    monthlySold: 15,
    isCombo: true,
    comboItems: ["Overnight Shipping", "SMS Tracking", "Insurance"],
    costPrice: 22.75,
    sellingPrice: 39.99,
    stores: ["Online"],
    status: "out-of-stock",
    seller: "Express Solutions Inc",
  },
  {
    id: "PROD-004",
    name: "Economy Delivery",
    category: "Economy",
    stock: 200,
    weeklySold: 28,
    monthlySold: 112,
    isCombo: false,
    comboItems: [],
    costPrice: 6.5,
    sellingPrice: 14.99,
    stores: ["Downtown Store", "Mall Branch", "Warehouse"],
    status: "in-stock",
    seller: "Local Distributors",
  },
  {
    id: "PROD-005",
    name: "Business Priority Package",
    category: "Business",
    stock: 25,
    weeklySold: 18,
    monthlySold: 72,
    isCombo: true,
    comboItems: ["Priority Handling", "Business Hours Delivery", "Signature Required"],
    costPrice: 28.0,
    sellingPrice: 49.99,
    stores: ["Downtown Store", "Online"],
    status: "low-stock",
    seller: "Metro Wholesale",
  },
  {
    id: "PROD-006",
    name: "Weekend Special Package",
    category: "Special",
    stock: 88,
    weeklySold: 22,
    monthlySold: 88,
    isCombo: true,
    comboItems: ["Weekend Delivery", "Flexible Time Slot", "SMS Updates"],
    costPrice: 18.25,
    sellingPrice: 34.99,
    stores: ["Mall Branch", "Online"],
    status: "in-stock",
    seller: "Global Trade Partners",
  },
]

const categories = ["Premium", "Standard", "Express", "Economy", "Business", "Special"]
const allSellers = [
  "Premium Partners LLC",
  "Quick Supply Co",
  "Express Solutions Inc",
  "Local Distributors",
  "Metro Wholesale",
  "Global Trade Partners",
]

const getStockBadge = (status: string, stock: number) => {
  const statusConfig = {
    "in-stock": {
      label: `In Stock (${stock})`,
      className: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
    },
    "low-stock": {
      label: `Low Stock (${stock})`,
      className: "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
    },
    "out-of-stock": {
      label: "Out of Stock",
      className: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
    },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig["in-stock"]
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  )
}

export function ProductsSection() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState<string>("All categories")
  const [stockRange, setStockRange] = useState([0, 200])
  const [selectedSellers, setSelectedSellers] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 50])
  const [weeklyMin, setWeeklyMin] = useState("")
  const [weeklyMax, setWeeklyMax] = useState("")
  const [monthlyMin, setMonthlyMin] = useState("")
  const [monthlyMax, setMonthlyMax] = useState("")

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search term filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toLowerCase().includes(searchTerm.toLowerCase())

      // Category filter
      const matchesCategory = categoryFilter === "All categories" || product.category === categoryFilter

      // Stock range filter
      const matchesStock = product.stock >= stockRange[0] && product.stock <= stockRange[1]

      // Seller filter
      const matchesSeller = selectedSellers.length === 0 || selectedSellers.includes(product.seller)

      // Price range filter
      const matchesPrice = product.sellingPrice >= priceRange[0] && product.sellingPrice <= priceRange[1]

      // Weekly sales filter
      const matchesWeekly =
        (!weeklyMin || product.weeklySold >= Number.parseInt(weeklyMin)) &&
        (!weeklyMax || product.weeklySold <= Number.parseInt(weeklyMax))

      // Monthly sales filter
      const matchesMonthly =
        (!monthlyMin || product.monthlySold >= Number.parseInt(monthlyMin)) &&
        (!monthlyMax || product.monthlySold <= Number.parseInt(monthlyMax))

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStock &&
        matchesSeller &&
        matchesPrice &&
        matchesWeekly &&
        matchesMonthly
      )
    })
  }, [
    searchTerm,
    categoryFilter,
    stockRange,
    selectedSellers,
    priceRange,
    weeklyMin,
    weeklyMax,
    monthlyMin,
    monthlyMax,
  ])

  const resetFilters = () => {
    setCategoryFilter("All categories")
    setStockRange([0, 200])
    setSelectedSellers([])
    setPriceRange([0, 50])
    setWeeklyMin("")
    setWeeklyMax("")
    setMonthlyMin("")
    setMonthlyMax("")
    setSearchTerm("")
  }

  const handleExportExcel = () => {
    console.log("Exporting filtered products to Excel...")
  }

  const calculateProfit = (selling: number, cost: number) => {
    const profit = selling - cost
    const margin = ((profit / selling) * 100).toFixed(1)
    return { profit: profit.toFixed(2), margin }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products Management</h1>
          <p className="text-muted-foreground">Manage your product catalog, inventory, and pricing</p>
        </div>
      </div>

      {/* Filter Panel */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Product Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Category Filter */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All categories">All categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Stock Range */}
            <div className="space-y-2">
              <Label>
                Stock Quantity: {stockRange[0]} - {stockRange[1]}
              </Label>
              <Slider value={stockRange} onValueChange={setStockRange} max={200} min={0} step={10} className="w-full" />
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <Label>
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </Label>
              <Slider value={priceRange} onValueChange={setPriceRange} max={50} min={0} step={1} className="w-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Seller Multi-select */}
            <div className="space-y-2">
              <Label>Sellers</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    {selectedSellers.length === 0 ? "All sellers" : `${selectedSellers.length} selected`}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {allSellers.map((seller) => (
                      <div key={seller} className="flex items-center space-x-2">
                        <Checkbox
                          id={seller}
                          checked={selectedSellers.includes(seller)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedSellers([...selectedSellers, seller])
                            } else {
                              setSelectedSellers(selectedSellers.filter((s) => s !== seller))
                            }
                          }}
                        />
                        <Label htmlFor={seller} className="text-sm">
                          {seller}
                        </Label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Weekly Sales Range */}
            <div className="space-y-2">
              <Label>Weekly Sales Range</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Min"
                  type="number"
                  value={weeklyMin}
                  onChange={(e) => setWeeklyMin(e.target.value)}
                />
                <Input
                  placeholder="Max"
                  type="number"
                  value={weeklyMax}
                  onChange={(e) => setWeeklyMax(e.target.value)}
                />
              </div>
            </div>

            {/* Monthly Sales Range */}
            <div className="space-y-2">
              <Label>Monthly Sales Range</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Min"
                  type="number"
                  value={monthlyMin}
                  onChange={(e) => setMonthlyMin(e.target.value)}
                />
                <Input
                  placeholder="Max"
                  type="number"
                  value={monthlyMax}
                  onChange={(e) => setMonthlyMax(e.target.value)}
                />
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
                Add Product
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
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Filtered Products</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredProducts.length}</div>
            <p className="text-xs text-muted-foreground">Matching filters</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Items</CardTitle>
            <Package className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {filteredProducts.filter((p) => p.status === "low-stock").length}
            </div>
            <p className="text-xs text-muted-foreground">Need restocking</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Out of Stock</CardTitle>
            <Package className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {filteredProducts.filter((p) => p.status === "out-of-stock").length}
            </div>
            <p className="text-xs text-muted-foreground">Unavailable</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Combo Products</CardTitle>
            <Store className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{filteredProducts.filter((p) => p.isCombo).length}</div>
            <p className="text-xs text-muted-foreground">Bundle packages</p>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Product Catalog</CardTitle>
              <CardDescription>
                Showing {filteredProducts.length} of {products.length} products
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
                  <TableHead className="font-semibold">Product Name</TableHead>
                  <TableHead className="font-semibold text-center">Stock</TableHead>
                  <TableHead className="font-semibold text-center">Weekly Sold</TableHead>
                  <TableHead className="font-semibold text-center">Monthly Sold</TableHead>
                  <TableHead className="font-semibold">Combo Items</TableHead>
                  <TableHead className="font-semibold text-right">Cost Price</TableHead>
                  <TableHead className="font-semibold text-right">Selling Price</TableHead>
                  <TableHead className="font-semibold text-right">Profit</TableHead>
                  <TableHead className="font-semibold">Stores</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const { profit, margin } = calculateProfit(product.sellingPrice, product.costPrice)
                  return (
                    <TableRow key={product.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                      <TableCell className="font-mono text-sm font-medium">{product.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="font-medium">{product.name}</div>
                            {product.isCombo && (
                              <Badge variant="secondary" className="text-xs mt-1">
                                Combo Package
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{getStockBadge(product.status, product.stock)}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {product.weeklySold}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {product.monthlySold}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {product.isCombo ? (
                          <div className="space-y-1">
                            {product.comboItems.slice(0, 2).map((item, index) => (
                              <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                                {item}
                              </div>
                            ))}
                            {product.comboItems.length > 2 && (
                              <div className="text-xs text-muted-foreground">+{product.comboItems.length - 2} more</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">Single item</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-mono">${product.costPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-mono font-medium">
                        ${product.sellingPrice.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="text-right">
                          <div className="font-mono font-medium text-green-600">${profit}</div>
                          <div className="text-xs text-muted-foreground">{margin}% margin</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {product.stores.slice(0, 2).map((store, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {store}
                            </Badge>
                          ))}
                          {product.stores.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.stores.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-100 hover:text-blue-600">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-100 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
