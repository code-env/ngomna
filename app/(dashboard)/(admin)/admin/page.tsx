'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bell, FileText, Home, Settings, Users } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveBar } from '@nivo/bar'

export default function VroumAdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard')

  // Mock data for demonstration purposes
  const dashboardMetrics = {
    totalSubmitted: 1250,
    pendingApprovals: 87,
    rejectedApplications: 23,
    activeLicenses: 1140,
  }

  const pendingApplications = [
    { id: 1, name: "Jean Kouam", date: "2024-03-15", status: "Pending" },
    { id: 2, name: "Marie Nguemo", date: "2024-03-14", status: "Pending" },
    { id: 3, name: "Paul Biya", date: "2024-03-13", status: "Under Review" },
    // Add more mock data as needed
  ]

  const chartData = [
    { day: 'Mon', submitted: 45, approved: 38, rejected: 7 },
    { day: 'Tue', submitted: 52, approved: 41, rejected: 11 },
    { day: 'Wed', submitted: 49, approved: 44, rejected: 5 },
    { day: 'Thu', submitted: 63, approved: 55, rejected: 8 },
    { day: 'Fri', submitted: 58, approved: 50, rejected: 8 },
    { day: 'Sat', submitted: 37, approved: 32, rejected: 5 },
    { day: 'Sun', submitted: 30, approved: 28, rejected: 2 },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-blue-600">Vroum Admin</h2>
        </div>
        <nav className="mt-6">
          <Button
            variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('dashboard')}
          >
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant={activeTab === 'pending' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('pending')}
          >
            <FileText className="mr-2 h-4 w-4" />
            Pending Applications
          </Button>
          <Button
            variant={activeTab === 'approved' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('approved')}
          >
            <FileText className="mr-2 h-4 w-4" />
            Approved Licenses
          </Button>
          <Button
            variant={activeTab === 'rejected' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('rejected')}
          >
            <FileText className="mr-2 h-4 w-4" />
            Rejected Applications
          </Button>
          <Button
            variant={activeTab === 'users' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('users')}
          >
            <Users className="mr-2 h-4 w-4" />
            User Management
          </Button>
          <Button
            variant={activeTab === 'settings' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Header with Notifications */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Welcome, Admin</h1>
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
        </header>

        {/* Dashboard Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsContent value="dashboard">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Submitted
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardMetrics.totalSubmitted}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Approvals
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardMetrics.pendingApprovals}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Rejected Applications
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardMetrics.rejectedApplications}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Licenses
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardMetrics.activeLicenses}</div>
                </CardContent>
              </Card>
            </div>
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Weekly Application Trends</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <ChartContainer
                  config={{
                    submitted: {
                      label: "Submitted",
                      color: "hsl(var(--chart-1))",
                    },
                    approved: {
                      label: "Approved",
                      color: "hsl(var(--chart-2))",
                    },
                    rejected: {
                      label: "Rejected",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveBar
                    data={chartData}
                    keys={['submitted', 'approved', 'rejected']}
                    indexBy="day"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.3}
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={{ scheme: 'nivo' }}
                    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: 'Day',
                      legendPosition: 'middle',
                      legendOffset: 32
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: 'Count',
                      legendPosition: 'middle',
                      legendOffset: -40
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    legends={[
                      {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                          {
                            on: 'hover',
                            style: {
                              itemOpacity: 1
                            }
                          }
                        ]
                      }
                    ]}
                    role="application"
                    ariaLabel="Nivo bar chart demo"
                    barAriaLabel={e=>e.id+": "+e.formattedValue+" in day: "+e.indexValue}
                  />
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Input className="max-w-sm" placeholder="Search applications..." />
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="review">Under Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>{application.name}</TableCell>
                        <TableCell>{application.date}</TableCell>
                        <TableCell>
                          <Badge variant={application.status === 'Pending' ? 'secondary' : 'default'}>
                            {application.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="mr-2">View</Button>
                          <Button size="sm">Review</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="approved">
            <Card>
              <CardHeader>
                <CardTitle>Approved Licenses</CardTitle>
              </CardHeader>
              <CardContent>
                <p>List of approved licenses will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="rejected">
            <Card>
              <CardHeader>
                <CardTitle>Rejected Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <p>List of rejected applications will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Input className="max-w-sm" placeholder="Search users..." />
                  <Button>Add New User</Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src="/placeholder.svg" alt="Avatar" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          John Doe
                        </div>
                      </TableCell>
                      <TableCell>Admin</TableCell>
                      <TableCell>2 hours ago</TableCell>

                      <TableCell>
                        <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                        <Button variant="destructive" size="sm">Deactivate</Button>
                      </TableCell>
                    </TableRow>
                    {/* Add more user rows as needed */}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="notificationEmail">Notification Email</Label>
                    <Input id="notificationEmail" type="email" placeholder="admin@vroum.cm" />
                  </div>
                  <div>
                    <Label htmlFor="dataRetention">Data Retention Period (days)</Label>
                    <Input id="dataRetention" type="number" placeholder="365" />
                  </div>
                  <div>
                    <Label htmlFor="auditLogLevel">Audit Log Level</Label>
                    <Select>
                      <SelectTrigger id="auditLogLevel">
                        <SelectValue placeholder="Select log level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Save Settings</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
