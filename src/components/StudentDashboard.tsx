import { Sidebar } from './Sidebar';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  Clock,
  FileText,
  BarChart3,
  BookOpen,
  Eye
} from 'lucide-react';
import { User, CurrentPage } from '../App';

interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
  onNavigate: (page: CurrentPage) => void;
}

export function StudentDashboard({ user, onLogout, onNavigate }: StudentDashboardProps) {
  // Mock data
  const stats = {
    attendanceRate: 92.5,
    totalClasses: 20,
    present: 18,
    upcoming: 3
  };

  const todaySchedule = [
    {
      time: '08:10 AM',
      subject: 'Mathematics',
      teacher: 'Jane Smith',
      room: 'Room 101',
      status: 'Today'
    },
    {
      time: '10:15 AM',
      subject: 'Physics',
      teacher: 'John Smith',
      room: 'Physics Lab',
      status: 'Today'
    },
    {
      time: '11:30 AM',
      subject: 'English',
      teacher: 'Jane Doe',
      room: 'Room 102',
      status: 'Today'
    }
  ];

  const quickActions = [
    {
      title: 'View Timetable',
      description: 'Check your weekly schedule',
      icon: Calendar
    },
    {
      title: 'Attendance Report',
      description: 'View your attendance history',
      icon: BarChart3
    },
    {
      title: 'View Grades',
      description: 'Check your academic progress',
      icon: FileText
    }
  ];

  const attendanceSummary = {
    present: 18,
    absent: 2,
    overall: 92.5
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage="dashboard" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Student Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your academic overview.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-semibold text-gray-900">{stats.attendanceRate}%</p>
                  <p className="text-sm text-gray-600">Attendance Rate</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalClasses}</p>
                  <p className="text-sm text-gray-600">Total Classes</p>
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
                  <p className="text-2xl font-semibold text-gray-900">{stats.present}</p>
                  <p className="text-sm text-gray-600">Present</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-semibold text-gray-900">{stats.upcoming}</p>
                  <p className="text-sm text-gray-600">Upcoming</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Today's Schedule */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                    View Full Timetable
                  </Button>
                </div>

                <div className="space-y-4">
                  {todaySchedule.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.subject}</h3>
                        <p className="text-sm text-gray-600">{item.teacher} • {item.room}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{item.time}</p>
                        <p className="text-sm text-gray-600">{item.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>

                <div className="space-y-4">
                  {quickActions.map((action, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <action.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Summary */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Attendance Summary</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Present Classes */}
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
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
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeDasharray="90 10"
                        strokeDashoffset="25"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-1" />
                        <p className="text-xl font-semibold text-gray-900">{attendanceSummary.present}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Present Classes</p>
                </div>

                {/* Absent Classes */}
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
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
                        stroke="#ef4444"
                        strokeWidth="3"
                        strokeDasharray="10 90"
                        strokeDashoffset="25"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-6 h-6 bg-red-600 rounded-full mx-auto mb-1 flex items-center justify-center">
                          <div className="w-3 h-0.5 bg-white rounded"></div>
                        </div>
                        <p className="text-xl font-semibold text-gray-900">{attendanceSummary.absent}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Absent Classes</p>
                </div>

                {/* Overall Attendance */}
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
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
                        stroke="#3b82f6"
                        strokeWidth="3"
                        strokeDasharray={`${attendanceSummary.overall} ${100 - attendanceSummary.overall}`}
                        strokeDashoffset="25"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                        <p className="text-lg font-semibold text-gray-900">{attendanceSummary.overall}%</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Overall Attendance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}