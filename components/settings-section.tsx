"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Save,
  Building2,
  Webhook,
  Key,
  Bell,
  Mail,
  Shield,
  Download,
  Upload,
  SettingsIcon,
  MessageSquare,
  Database,
  Globe,
  Smartphone,
} from "lucide-react"

export function SettingsSection() {
  // General Settings State
  const [companyName, setCompanyName] = useState("DeliveryCRM Pro")
  const [companyEmail, setCompanyEmail] = useState("admin@deliverycrm.com")
  const [companyPhone, setCompanyPhone] = useState("+1-555-0100")
  const [companyAddress, setCompanyAddress] = useState("123 Business St, City, State 12345")
  const [timezone, setTimezone] = useState("UTC-5 (Eastern)")
  const [currency, setCurrency] = useState("USD")

  // Notification Settings State
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [orderAlerts, setOrderAlerts] = useState(true)
  const [courierAlerts, setCourierAlerts] = useState(true)
  const [systemAlerts, setSystemAlerts] = useState(true)

  // Integration Settings State
  const [amoCrmApiKey, setAmoCrmApiKey] = useState("")
  const [amoCrmDomain, setAmoCrmDomain] = useState("")
  const [amoCrmWebhook, setAmoCrmWebhook] = useState("")
  const [telegramBotToken, setTelegramBotToken] = useState("")
  const [telegramChatId, setTelegramChatId] = useState("")
  const [fargoApiKey, setFargoApiKey] = useState("")

  // Export/Import Settings State
  const [autoBackup, setAutoBackup] = useState(true)
  const [backupFrequency, setBackupFrequency] = useState("daily")
  const [dataRetention, setDataRetention] = useState("12")

  const handleSaveGeneral = () => {
    console.log("Saving general settings...")
  }

  const handleSaveNotifications = () => {
    console.log("Saving notification settings...")
  }

  const handleSaveIntegrations = () => {
    console.log("Saving integration settings...")
  }

  const handleSaveExportImport = () => {
    console.log("Saving export/import settings...")
  }

  const handleExportData = () => {
    console.log("Exporting system data...")
  }

  const handleImportData = () => {
    console.log("Importing system data...")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">Configure system preferences, integrations, and notifications</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Webhook className="h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Data Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                Company Information
              </CardTitle>
              <CardDescription>Update your company details and basic system configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Company Email</Label>
                  <Input
                    id="company-email"
                    type="email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Phone Number</Label>
                  <Input id="company-phone" value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Input id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-address">Company Address</Label>
                  <Textarea
                    id="company-address"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveGeneral} className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-green-600" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure how you want to receive system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Communication Channels
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                      </div>
                      <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive push notifications in browser</p>
                      </div>
                      <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Alert Types
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">Order Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          New orders, status changes, and delivery updates
                        </p>
                      </div>
                      <Switch checked={orderAlerts} onCheckedChange={setOrderAlerts} />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">Courier Alerts</Label>
                        <p className="text-sm text-muted-foreground">Courier assignments and location updates</p>
                      </div>
                      <Switch checked={courierAlerts} onCheckedChange={setCourierAlerts} />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="space-y-0.5">
                        <Label className="text-base">System Alerts</Label>
                        <p className="text-sm text-muted-foreground">System maintenance and security notifications</p>
                      </div>
                      <Switch checked={systemAlerts} onCheckedChange={setSystemAlerts} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveNotifications} className="gap-2 bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4" />
                  Save Notification Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-purple-600" />
                amoCRM Integration
              </CardTitle>
              <CardDescription>Configure your amoCRM connection and webhook settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amocrm-domain">amoCRM Domain</Label>
                  <Input
                    id="amocrm-domain"
                    placeholder="yourcompany.amocrm.com"
                    value={amoCrmDomain}
                    onChange={(e) => setAmoCrmDomain(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amocrm-api-key">API Key</Label>
                  <Input
                    id="amocrm-api-key"
                    type="password"
                    placeholder="Enter your amoCRM API key"
                    value={amoCrmApiKey}
                    onChange={(e) => setAmoCrmApiKey(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amocrm-webhook">Webhook URL</Label>
                <Input
                  id="amocrm-webhook"
                  placeholder="https://your-webhook-url.com/amocrm"
                  value={amoCrmWebhook}
                  onChange={(e) => setAmoCrmWebhook(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  <Globe className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
                <span className="text-sm text-muted-foreground">Last sync: 2 minutes ago</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                Telegram Bot Integration
              </CardTitle>
              <CardDescription>Configure Telegram bot for notifications and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telegram-token">Bot Token</Label>
                  <Input
                    id="telegram-token"
                    type="password"
                    placeholder="Enter your Telegram bot token"
                    value={telegramBotToken}
                    onChange={(e) => setTelegramBotToken(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telegram-chat">Chat ID</Label>
                  <Input
                    id="telegram-chat"
                    placeholder="Enter chat ID for notifications"
                    value={telegramChatId}
                    onChange={(e) => setTelegramChatId(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                  <Smartphone className="h-3 w-3 mr-1" />
                  Not Connected
                </Badge>
                <Button variant="outline" size="sm">
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-5 w-5 text-orange-600" />
                Fargo Delivery Integration
              </CardTitle>
              <CardDescription>Configure Fargo delivery system API settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fargo-api-key">Fargo API Key</Label>
                <Input
                  id="fargo-api-key"
                  type="password"
                  placeholder="Enter your Fargo API key"
                  value={fargoApiKey}
                  onChange={(e) => setFargoApiKey(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  <Globe className="h-3 w-3 mr-1" />
                  Active
                </Badge>
                <span className="text-sm text-muted-foreground">Balance: $12,450.75</span>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveIntegrations} className="gap-2 bg-purple-600 hover:bg-purple-700">
                  <Save className="h-4 w-4" />
                  Save Integration Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-indigo-600" />
                Data Export & Import
              </CardTitle>
              <CardDescription>Manage system data backup, export, and import operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold">Export Data</h4>
                  <div className="space-y-3">
                    <Button
                      onClick={handleExportData}
                      variant="outline"
                      className="w-full gap-2 hover:bg-blue-50 bg-transparent"
                    >
                      <Download className="h-4 w-4" />
                      Export All Data
                    </Button>
                    <Button variant="outline" className="w-full gap-2 hover:bg-green-50 bg-transparent">
                      <Download className="h-4 w-4" />
                      Export Orders Only
                    </Button>
                    <Button variant="outline" className="w-full gap-2 hover:bg-purple-50 bg-transparent">
                      <Download className="h-4 w-4" />
                      Export Clients Only
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold">Import Data</h4>
                  <div className="space-y-3">
                    <Button
                      onClick={handleImportData}
                      variant="outline"
                      className="w-full gap-2 hover:bg-orange-50 bg-transparent"
                    >
                      <Upload className="h-4 w-4" />
                      Import from Excel
                    </Button>
                    <Button variant="outline" className="w-full gap-2 hover:bg-red-50 bg-transparent">
                      <Upload className="h-4 w-4" />
                      Import from CSV
                    </Button>
                    <Button variant="outline" className="w-full gap-2 hover:bg-yellow-50 bg-transparent">
                      <Upload className="h-4 w-4" />
                      Restore Backup
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-semibold mb-4">Automatic Backup Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-base">Enable Auto Backup</Label>
                      <p className="text-sm text-muted-foreground">Automatically backup system data</p>
                    </div>
                    <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="backup-frequency">Backup Frequency</Label>
                      <Input
                        id="backup-frequency"
                        value={backupFrequency}
                        onChange={(e) => setBackupFrequency(e.target.value)}
                        placeholder="daily, weekly, monthly"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="data-retention">Data Retention (months)</Label>
                      <Input
                        id="data-retention"
                        type="number"
                        value={dataRetention}
                        onChange={(e) => setDataRetention(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveExportImport} className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                  <Save className="h-4 w-4" />
                  Save Data Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
