import { Card, CardContent } from '../../ui/card';
import { Progress } from '../../ui/progress';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  Clock,
  BookOpen,
  Bell,
  ArrowRight,
  FileText,
  Paperclip,
  User as UserIcon
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

  // Recent announcements from teachers (matching StudentNotifications data)
  const recentNotifications = [
    {
      id: '1',
      title: 'Mid-term Examination Schedule Released',
      message: 'Dear students, the mid-term examination schedule for all subjects has been released. Please check the attached PDF for detailed timings and examination halls.',
      timestamp: new Date('2024-01-15T10:30:00'),
      teacherName: 'Dr. Sarah Johnson',
      teacherAvatar: '',
      attachment: {
        name: 'midterm-schedule.pdf',
        type: 'pdf' as const,
        url: '#',
        size: '245 KB'
      },
      isRead: false
    },
    {
      id: '2',
      title: 'Guest Lecture on AI & Machine Learning',
      message: 'We are excited to announce a special guest lecture by Dr. Michael Chen from MIT on "The Future of AI and Machine Learning in Industry".',
      timestamp: new Date('2024-01-14T14:15:00'),
      teacherName: 'Prof. David Wilson',
      teacherAvatar: '',
      attachment: {
        name: 'guest-lecture-flyer.jpg',
        type: 'image' as const,
        url: '#',
        size: '1.2 MB'
      },
      isRead: true
    },
    {
      id: '3',
      title: 'Assignment Submission Deadline Extended',
      message: 'The deadline for Database Systems assignment has been extended to next Friday due to technical issues with the submission portal.',
      timestamp: new Date('2024-01-13T09:45:00'),
      teacherName: 'Dr. Emily Davis',
      teacherAvatar: '',
      isRead: true
    },
    {
      id: '4',
      title: 'Library Hours Extended During Exam Week',  
      message: 'To support students during the upcoming examination period, the library will extend its hours from 7:00 AM to 11:00 PM starting from next Monday.',
      timestamp: new Date('2024-01-12T16:20:00'),
      teacherName: 'Prof. Robert Brown',
      teacherAvatar: '',
      isRead: true
    }
  ];

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days === 0) {
      if (hours === 0) {
        const minutes = Math.floor((diff / (1000 * 60)));
        return minutes <= 1 ? 'Just now' : `${minutes}m ago`;
      }
      return hours === 1 ? '1h ago' : `${hours}h ago`;
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-3 w-3 text-red-500" />;
      case 'image':
        return <FileText className="h-3 w-3 text-blue-500" />;
      case 'doc':
        return <FileText className="h-3 w-3 text-blue-600" />;
      default:
        return <Paperclip className="h-3 w-3 text-gray-500" />;
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
              {recentNotifications.slice(0, 4).map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                    !notification.isRead ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src={notification.teacherAvatar} alt={notification.teacherName} />
                      <AvatarFallback className="text-xs">
                        {notification.teacherName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className={`font-medium text-gray-900 line-clamp-1 ${!notification.isRead ? 'text-blue-900' : ''}`}>
                          {notification.title}
                          {!notification.isRead && (
                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full ml-2"></span>
                          )}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                        <UserIcon className="h-3 w-3" />
                        <span>{notification.teacherName}</span>
                        <span>•</span>
                        <span>{formatDate(notification.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {notification.message}
                      </p>
                      {notification.attachment && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          {getAttachmentIcon(notification.attachment.type)}
                          <span>{notification.attachment.name}</span>
                        </div>
                      )}
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