"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Download, Edit, Trash2, Package, Store } from "lucide-react"

const products = [
  {
    id: "PROD-001",
    name: "Premium Delivery Package",
    stock: 150,
    weeklySold: 45,
    monthlySold: 180,
    isCombo: true,
    comboItems: ["Express Shipping", "Insurance", "Priority Handling"],
    costPrice: 15.5,
    sellingPrice: 29.99,
    stores: ["Downtown Store", "Mall Branch", "Online"],
    status: "in-stock",
  },
  {
    id: "PROD-002",
    name: "Standard Delivery Package",
    stock: 75,
    weeklySold: 32,
    monthlySold: 128,
    isCombo: false,
    comboItems: [],
    costPrice: 8.25,
    sellingPrice: 19.99,
    stores: ["Downtown Store", "Mall Branch"],
    status: "low-stock",
  },
  {
    id: "PROD-003",
    name: "Express Overnight Package",
    stock: 0,
    weeklySold: 0,
    monthlySold: 15,
    isCombo: true,
    comboItems: ["Overnight Shipping", "SMS Tracking", "Insurance"],
    costPrice: 22.75,
    sellingPrice: 39.99,
    stores: ["Online"],
    status: "out-of-stock",
  },
  {
    id: "PROD-004",
    name: "Economy Delivery",
    stock: 200,
    weeklySold: 28,
    monthlySold: 112,
    isCombo: false,
    comboItems: [],
    costPrice: 6.5,
    sellingPrice: 14.99,
    stores: ["Downtown Store", "Mall Branch", "Warehouse"],
    status: "in-stock",
  },
  {
    id: "PROD-005",
    name: "Business Priority Package",
    stock: 25,
    weeklySold: 18,
    monthlySold: 72,
    isCombo: true,
    comboItems: ["Priority Handling", "Business Hours Delivery", "Signature Required"],
    costPrice: 28.0,
    sellingPrice: 49.99,
    stores: ["Downtown Store", "Online"],
    status: "low-stock",
  },
  {
    id: "PROD-006",
    name: "Weekend Special Package",
    stock: 88,
    weeklySold: 22,
    monthlySold: 88,
    isCombo: true,
    comboItems: ["Weekend Delivery", "Flexible Time Slot", "SMS Updates"],
    costPrice: 18.25,
    sellingPrice: 34.99,
    stores: ["Mall Branch", "Online"],
    status: "in-stock",
  },
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

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleExportExcel = () => {
    console.log("Exporting products to Excel...")
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

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">Active products</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Items</CardTitle>
            <Package className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {products.filter((p) => p.status === "low-stock").length}
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
              {products.filter((p) => p.status === "out-of-stock").length}
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
            <div className="text-2xl font-bold text-purple-600">{products.filter((p) => p.isCombo).length}</div>
            <p className="text-xs text-muted-foreground">Bundle packages</p>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Product Catalog</CardTitle>
              <CardDescription>Comprehensive view of all products with sales data and pricing</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
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
