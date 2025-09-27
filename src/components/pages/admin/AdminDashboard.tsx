import { Card, CardContent } from '../../ui/card';
import { Progress } from '../../ui/progress';
import { Badge } from '../../ui/badge';
import { 
  Users, 
  GraduationCap, 
  Building2,
  CheckCircle,
  BarChart3,
  TrendingUp,
  TrendingDown,
  ArrowRight
} from 'lucide-react';
import { User } from '../../../App';

interface AdminDashboardProps {
  user: User;
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  // Mock data
  const stats = {
    totalStudents: 1247,
    totalTeachers: 67,
    totalBranches: 8,
    systemUptime: 99.8
  };

  const branchStats = [
    { name: 'Computer Science', students: 312, teachers: 18, color: 'bg-blue-100 text-blue-800' },
    { name: 'Electronics', students: 278, teachers: 15, color: 'bg-green-100 text-green-800' },
    { name: 'Mechanical', students: 245, teachers: 12, color: 'bg-purple-100 text-purple-800' },
    { name: 'Civil', students: 189, teachers: 10, color: 'bg-orange-100 text-orange-800' },
    { name: 'Chemical', students: 156, teachers: 8, color: 'bg-pink-100 text-pink-800' },
    { name: 'Others', students: 67, teachers: 4, color: 'bg-gray-100 text-gray-800' }
  ];

  const recentActivity = [
    { action: 'New student registered', user: 'John Doe - Computer Science', time: '5 minutes ago' },
    { action: 'Timetable updated', user: 'Prof. Smith - Electronics', time: '15 minutes ago' },
    { action: 'Branch created', user: 'Admin - Data Science', time: '1 hour ago' },
    { action: 'User role updated', user: 'Jane Smith - Teacher', time: '2 hours ago' }
  ];

  const systemMetrics = [
    { metric: 'Student Enrollment', value: 95, change: +3.2, trend: 'up' },
    { metric: 'Teacher Satisfaction', value: 87, change: +1.8, trend: 'up' },
    { metric: 'System Performance', value: 92, change: -0.5, trend: 'down' },
    { metric: 'Data Accuracy', value: 98, change: +2.1, trend: 'up' }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          System Overview 🛠️
        </h1>
        <p className="text-gray-600">Monitor and manage the Edura platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-gray-900">{stats.totalStudents.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-xs text-green-600">↗️ +12% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-gray-900">{stats.totalTeachers}</p>
              <p className="text-sm text-gray-600">Total Teachers</p>
              <p className="text-xs text-green-600">↗️ +5% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-gray-900">{stats.totalBranches}</p>
              <p className="text-sm text-gray-600">Total Branches</p>
              <p className="text-xs text-gray-600">Active departments</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-gray-900">{stats.systemUptime}%</p>
              <p className="text-sm text-gray-600">System Uptime</p>
              <p className="text-xs text-gray-600">Last 30 days</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Branch Overview */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-purple-600" />
                Branch Overview
              </h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1">
                View All
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              {branchStats.map((branch) => (
                <div key={branch.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{branch.name}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span>{branch.students} students</span>
                      <span>{branch.teachers} teachers</span>
                    </div>
                  </div>
                  <Badge className={branch.color}>
                    {branch.name.split(' ')[0]}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                Recent Activity
              </h2>
              <button className="text-green-600 hover:text-green-700 text-sm flex items-center gap-1">
                View All
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.user}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Metrics */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-orange-600" />
            System Metrics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 42 42">
                    <circle
                      cx="21"
                      cy="21"
                      r="15.915"
                      fill="transparent"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <circle
                      cx="21"
                      cy="21"
                      r="15.915"
                      fill="transparent"
                      stroke={metric.trend === 'up' ? '#10b981' : '#ef4444'}
                      strokeWidth="3"
                      strokeDasharray={`${metric.value} ${100 - metric.value}`}
                      strokeDashoffset="25"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-900">{metric.value}%</span>
                  </div>
                </div>
                <h3 className="font-medium text-gray-900">{metric.metric}</h3>
                <div className={`flex items-center justify-center gap-1 mt-1 text-sm ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span>{metric.change > 0 ? '+' : ''}{metric.change}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}