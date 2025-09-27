import { Card, CardContent } from '../../ui/card';
import { Progress } from '../../ui/progress';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  Clock,
  BookOpen,
  Bell,
  ArrowRight
} from 'lucide-react';
import { User } from '../../../App';

interface StudentHomeProps {
  user: User;
}

export function StudentHome({ user }: StudentHomeProps) {
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
      status: 'upcoming'
    },
    {
      time: '10:15 AM',
      subject: 'Physics',
      teacher: 'John Smith',
      room: 'Physics Lab',
      status: 'upcoming'
    },
    {
      time: '11:30 AM',
      subject: 'English',
      teacher: 'Jane Doe',
      room: 'Room 102',
      status: 'upcoming'
    }
  ];

  const recentNotifications = [
    {
      id: 1,
      title: 'Assignment Due Tomorrow',
      message: 'Mathematics homework Chapter 5 is due tomorrow',
      time: '2 hours ago',
      type: 'assignment'
    },
    {
      id: 2,
      title: 'Class Cancelled',
      message: 'Physics lab scheduled for Friday has been cancelled',
      time: '1 day ago',
      type: 'announcement'
    },
    {
      id: 3,
      title: 'Grade Posted',
      message: 'Your English essay grade has been posted',
      time: '2 days ago',
      type: 'grade'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'assignment': return '📝';
      case 'announcement': return '📢';
      case 'grade': return '📊';
      default: return '📬';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Welcome back, {user.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-600">Here's your academic overview for today.</p>
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
              <p className="text-sm text-gray-600">Overall Attendance</p>
              <Progress value={stats.attendanceRate} className="h-2" />
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
              <p className="text-sm text-gray-600">Classes Attended</p>
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
              <p className="text-sm text-gray-600">Today's Classes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Today's Schedule
              </h2>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700 gap-1">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {todaySchedule.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.subject}</h3>
                    <p className="text-sm text-gray-600">{item.teacher} • {item.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{item.time}</p>
                    <Badge variant="outline" className="text-xs">
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {todaySchedule.length === 0 && (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No classes scheduled for today</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Bell className="h-5 w-5 text-purple-600" />
                Recent Notifications
              </h2>
              <Button variant="ghost" className="text-purple-600 hover:text-purple-700 gap-1">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {recentNotifications.map((notification) => (
                <div key={notification.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{notification.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {recentNotifications.length === 0 && (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No recent notifications</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}