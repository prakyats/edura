import { Card, CardContent } from '../../ui/card';
import { Progress } from '../../ui/progress';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { 
  Users, 
  TrendingUp, 
  BarChart3,
  Calendar,
  BookOpen,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { User } from '../../../App';

interface TeacherDashboardProps {
  user: User;
}

export function TeacherDashboard({ user }: TeacherDashboardProps) {
  // Mock data
  const stats = {
    totalStudents: 120,
    averageAttendance: 87,
    engagementScore: 78,
    classesToday: 4
  };

  const recentClasses = [
    {
      id: 1,
      subject: 'Mathematics',
      time: '08:10 - 09:00',
      room: 'Room 101',
      attendance: 28,
      totalStudents: 30,
      engagement: 85
    },
    {
      id: 2,
      subject: 'Physics',
      time: '10:15 - 11:05',
      room: 'Physics Lab',
      attendance: 25,
      totalStudents: 28,
      engagement: 92
    },
    {
      id: 3,
      subject: 'Mathematics (Advanced)',
      time: '14:00 - 14:50',
      room: 'Room 201',
      attendance: 18,
      totalStudents: 20,
      engagement: 76
    }
  ];

  const quickActions = [
    {
      title: 'Create Announcement',
      description: 'Send announcement to students',
      icon: MessageSquare,
      action: 'announcements'
    },
    {
      title: 'View Class Engagement',
      description: 'Check student engagement metrics',
      icon: BarChart3,
      action: 'classes'
    },
    {
      title: 'Edit Timetable',
      description: 'Modify your schedule',
      icon: Calendar,
      action: 'timetable-editor'
    }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Good morning, {user.name.split(' ')[1] || user.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-600">Here's an overview of your classes and student engagement.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-gray-900">{stats.totalStudents}</p>
              <p className="text-sm text-gray-600">Total Students</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-gray-900">{stats.averageAttendance}%</p>
              <p className="text-sm text-gray-600">Avg. Attendance</p>
              <Progress value={stats.averageAttendance} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-gray-900">{stats.engagementScore}%</p>
              <p className="text-sm text-gray-600">Engagement Score</p>
              <Progress value={stats.engagementScore} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-gray-900">{stats.classesToday}</p>
              <p className="text-sm text-gray-600">Classes Today</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Today's Classes */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Today's Classes
              </h2>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700 gap-1">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {recentClasses.map((classItem) => (
                <div key={classItem.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{classItem.subject}</h3>
                      <p className="text-sm text-gray-600">{classItem.time} • {classItem.room}</p>
                    </div>
                    <Badge variant="outline">
                      {Math.round((classItem.attendance / classItem.totalStudents) * 100)}% attendance
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Attendance</p>
                      <p className="font-medium">{classItem.attendance}/{classItem.totalStudents}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Engagement</p>
                      <p className="font-medium">{classItem.engagement}%</p>
                    </div>
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
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Overview */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-600" />
            Class Performance Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentClasses.map((classItem) => (
              <div key={classItem.id} className="text-center">
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
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeDasharray={`${classItem.engagement} ${100 - classItem.engagement}`}
                      strokeDashoffset="25"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-900">{classItem.engagement}%</span>
                  </div>
                </div>
                <h3 className="font-medium text-gray-900">{classItem.subject}</h3>
                <p className="text-sm text-gray-600">Engagement Score</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}