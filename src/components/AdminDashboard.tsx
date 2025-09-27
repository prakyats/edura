import { useState } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Users, 
  Calendar,
  BarChart3,
  Bell,
  Plus,
  Edit,
  Trash,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Settings
} from 'lucide-react';
import { User, CurrentPage } from '../App';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
  onNavigate: (page: CurrentPage) => void;
}

export function AdminDashboard({ user, onLogout, onNavigate }: AdminDashboardProps) {
  const [currentPage] = useState<CurrentPage>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('users');

  // Mock data
  const stats = {
    totalUsers: 1247,
    activeClasses: 45,
    systemUptime: 99.8,
    resourceUtilization: 67
  };

  const users = [
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex.johnson@university.edu',
      role: 'student',
      status: 'active',
      lastActive: '2024-09-27',
      courses: 4
    },
    {
      id: 2,
      name: 'Dr. Sarah Chen',
      email: 'sarah.chen@university.edu',
      role: 'teacher',
      status: 'active',
      lastActive: '2024-09-27',
      courses: 3
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      email: 'michael.r@university.edu',
      role: 'admin',
      status: 'active',
      lastActive: '2024-09-26',
      courses: 0
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@university.edu',
      role: 'student',
      status: 'inactive',
      lastActive: '2024-09-20',
      courses: 2
    }
  ];

  const scheduleOptimization = {
    current: {
      roomUtilization: 65,
      conflicts: 12,
      efficiency: 72
    },
    optimized: {
      roomUtilization: 89,
      conflicts: 2,
      efficiency: 94
    }
  };

  const analyticsData = [
    {
      metric: 'Student Engagement',
      value: 78,
      change: +5.2,
      trend: 'up'
    },
    {
      metric: 'Teacher Satisfaction',
      value: 87,
      change: +2.1,
      trend: 'up'
    },
    {
      metric: 'Resource Utilization',
      value: 67,
      change: -1.8,
      trend: 'down'
    },
    {
      metric: 'System Performance',
      value: 92,
      change: +3.4,
      trend: 'up'
    }
  ];

  const flaggedStudents = [
    {
      id: 1,
      name: 'Jordan Smith',
      risk: 78,
      reasons: ['Low attendance', 'Declining grades'],
      course: 'CS 4780',
      lastActive: '3 days ago'
    },
    {
      id: 2,
      name: 'Sam Wilson',
      risk: 65,
      reasons: ['Missed assignments', 'Low engagement'],
      course: 'CS 3240',
      lastActive: '1 day ago'
    }
  ];

  const systemNotifications = [
    {
      id: 1,
      type: 'system',
      message: 'Database backup completed successfully',
      time: '10 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'alert',
      message: 'High server load detected in EU region',
      time: '2 hours ago',
      status: 'warning'
    },
    {
      id: 3,
      type: 'update',
      message: 'AI model training completed - v2.1.3 ready for deployment',
      time: '1 day ago',
      status: 'info'
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'teacher': return 'default';
      case 'student': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-green-600' : 'text-gray-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
      <Navbar user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage={currentPage} />
      
      <main className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2">
              System Overview 🛠️
            </h1>
            <p className="text-muted-foreground">
              Monitor and manage the Edura platform
            </p>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-2">↗️ +12% from last month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.activeClasses}</div>
                <p className="text-xs text-muted-foreground mt-2">Current semester</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.systemUptime}%</div>
                <p className="text-xs text-muted-foreground mt-2">Last 30 days</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resource Usage</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{stats.resourceUtilization}%</div>
                <p className="text-xs text-muted-foreground mt-2">CPU & Memory avg.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        User Management
                      </CardTitle>
                      <CardDescription>
                        Manage students, teachers, and administrators
                      </CardDescription>
                    </div>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add User
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Search and Filter */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                  </div>

                  {/* Users Table */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Courses</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getRoleColor(user.role)}>
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className={`flex items-center gap-2 ${getStatusColor(user.status)}`}>
                              <div className={`w-2 h-2 rounded-full ${
                                user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                              }`} />
                              {user.status}
                            </div>
                          </TableCell>
                          <TableCell>{user.lastActive}</TableCell>
                          <TableCell>{user.courses}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-green-600" />
                    Schedule Optimization
                  </CardTitle>
                  <CardDescription>
                    AI-powered schedule optimization and room allocation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Current Schedule */}
                    <div className="space-y-4">
                      <h3 className="font-semibold">Current Schedule</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Room Utilization</span>
                          <span className="font-medium">{scheduleOptimization.current.roomUtilization}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Schedule Conflicts</span>
                          <span className="font-medium text-red-600">{scheduleOptimization.current.conflicts}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Efficiency Score</span>
                          <span className="font-medium">{scheduleOptimization.current.efficiency}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Optimized Schedule */}
                    <div className="space-y-4">
                      <h3 className="font-semibold">AI Optimized</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Room Utilization</span>
                          <span className="font-medium text-green-600">{scheduleOptimization.optimized.roomUtilization}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Schedule Conflicts</span>
                          <span className="font-medium text-green-600">{scheduleOptimization.optimized.conflicts}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Efficiency Score</span>
                          <span className="font-medium text-green-600">{scheduleOptimization.optimized.efficiency}%</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4">
                        Apply Optimization
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Flagged Students */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    At-Risk Students
                  </CardTitle>
                  <CardDescription>
                    Students flagged by AI for potential intervention
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {flaggedStudents.map((student) => (
                      <div key={student.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-muted-foreground">{student.course}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="destructive">
                              {student.risk}% Risk
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">{student.lastActive}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Risk Factors:</p>
                          <div className="flex gap-2">
                            {student.reasons.map((reason, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {reason}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button variant="outline" className="w-full mt-3">
                          Send Intervention
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    Platform Analytics
                  </CardTitle>
                  <CardDescription>
                    Key performance metrics and trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {analyticsData.map((metric, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{metric.metric}</h4>
                          <div className={`flex items-center gap-1 ${
                            metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {metric.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                            <span className="text-sm">{metric.change > 0 ? '+' : ''}{metric.change}%</span>
                          </div>
                        </div>
                        <div className="text-2xl font-bold mb-2">{metric.value}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                            style={{ width: `${metric.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-orange-600" />
                    System Notifications
                  </CardTitle>
                  <CardDescription>
                    Recent system events and alerts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemNotifications.map((notification) => (
                      <div key={notification.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.status === 'success' ? 'bg-green-500' :
                              notification.status === 'warning' ? 'bg-orange-500' :
                              'bg-blue-500'
                            }`} />
                            <div>
                              <p className="font-medium">{notification.message}</p>
                              <p className="text-sm text-muted-foreground">{notification.time}</p>
                            </div>
                          </div>
                          <Badge variant={
                            notification.status === 'success' ? 'default' :
                            notification.status === 'warning' ? 'destructive' :
                            'secondary'
                          }>
                            {notification.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}