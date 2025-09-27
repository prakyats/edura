import { useState } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Users, 
  TrendingUp, 
  Calendar,
  Send,
  Clock,
  BookOpen,
  AlertTriangle,
  MessageSquare,
  BarChart3,
  Plus,
  Edit,
  Save
} from 'lucide-react';
import { User, CurrentPage } from '../App';
import { Chart } from './ui/chart';

interface TeacherDashboardProps {
  user: User;
  onLogout: () => void;
  onNavigate: (page: CurrentPage) => void;
}

export function TeacherDashboard({ user, onLogout, onNavigate }: TeacherDashboardProps) {
  const [currentPage] = useState<CurrentPage>('dashboard');
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementBody, setAnnouncementBody] = useState('');
  const [isEditingSchedule, setIsEditingSchedule] = useState(false);

  // Mock data
  const stats = {
    totalStudents: 156,
    averageAttendance: 82,
    engagementScore: 78,
    assignmentsGraded: 23
  };

  const notifications = [
    {
      id: 1,
      type: 'grade_request',
      message: 'Sarah Johnson submitted assignment early - Auto-grader flagged for review',
      time: '5 minutes ago',
      priority: 'high'
    },
    {
      id: 2,
      type: 'attendance',
      message: '3 students marked absent from yesterday\'s lecture',
      time: '2 hours ago',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'engagement',
      message: 'CS 4780 class engagement dropped below threshold',
      time: '1 day ago',
      priority: 'high'
    }
  ];

  const schedule = [
    { time: '09:00', monday: 'CS 4780', tuesday: '', wednesday: 'CS 4780', thursday: '', friday: 'Office Hours' },
    { time: '10:00', monday: '', tuesday: 'CS 3240', wednesday: '', thursday: 'CS 3240', friday: 'Office Hours' },
    { time: '11:00', monday: 'Research', tuesday: '', wednesday: 'Research', thursday: '', friday: '' },
    { time: '14:00', monday: '', tuesday: 'Faculty Meeting', wednesday: '', thursday: 'CS 4780 Lab', friday: '' },
    { time: '15:00', monday: 'Office Hours', tuesday: '', wednesday: 'Office Hours', thursday: '', friday: 'Prep Time' }
  ];

  const recentClasses = [
    {
      id: 1,
      course: 'CS 4780 - Machine Learning',
      topic: 'Neural Networks Introduction',
      date: '2024-09-25',
      attendance: 42,
      totalStudents: 45,
      engagement: 85,
      avgQuizScore: 78
    },
    {
      id: 2,
      course: 'CS 3240 - Software Engineering',
      topic: 'Agile Development Methodologies',
      date: '2024-09-24',
      attendance: 38,
      totalStudents: 40,
      engagement: 92,
      avgQuizScore: 82
    }
  ];

  const handleSendAnnouncement = () => {
    if (announcementTitle && announcementBody) {
      // Simulate sending announcement
      console.log('Sending announcement:', { title: announcementTitle, body: announcementBody });
      setAnnouncementTitle('');
      setAnnouncementBody('');
    }
  };

  const engagementData = [
    { name: 'Mon', value: 85 },
    { name: 'Tue', value: 78 },
    { name: 'Wed', value: 92 },
    { name: 'Thu', value: 76 },
    { name: 'Fri', value: 88 },
  ];

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
              Good morning, {user.name.split(' ')[1]}! 👋
            </h1>
            <p className="text-muted-foreground">
              Here's an overview of your classes and student engagement.
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
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.totalStudents}</div>
                <p className="text-xs text-muted-foreground mt-2">Across all courses</p>
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
                <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.averageAttendance}%</div>
                <Progress value={stats.averageAttendance} className="mt-2" />
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
                <CardTitle className="text-sm font-medium">Engagement Score</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{stats.engagementScore}%</div>
                <Progress value={stats.engagementScore} className="mt-2" />
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
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{stats.assignmentsGraded}</div>
                <p className="text-xs text-muted-foreground mt-2">Assignments to grade</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Engagement Meter */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  Weekly Engagement Trends
                </CardTitle>
                <CardDescription>
                  Student engagement levels across the week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full" viewBox="0 0 42 42">
                      <circle
                        cx="21"
                        cy="21"
                        r="15.915"
                        fill="transparent"
                        stroke="#e2e8f0"
                        strokeWidth="3"
                      />
                      <circle
                        cx="21"
                        cy="21"
                        r="15.915"
                        fill="transparent"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        strokeDasharray={`${stats.engagementScore} ${100 - stats.engagementScore}`}
                        strokeDashoffset="25"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{stats.engagementScore}%</div>
                        <div className="text-xs text-muted-foreground">Overall</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-5 gap-2 mt-4">
                  {engagementData.map((day) => (
                    <div key={day.name} className="text-center">
                      <div className="text-xs text-muted-foreground mb-1">{day.name}</div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                          style={{ width: `${day.value}%` }}
                        />
                      </div>
                      <div className="text-xs font-medium mt-1">{day.value}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Announcements Creator */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  Create Announcement
                </CardTitle>
                <CardDescription>
                  Send announcements to your students
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Input
                    placeholder="Announcement title..."
                    value={announcementTitle}
                    onChange={(e) => setAnnouncementTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Write your announcement message here..."
                    value={announcementBody}
                    onChange={(e) => setAnnouncementBody(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button 
                  onClick={handleSendAnnouncement}
                  className="w-full gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  disabled={!announcementTitle || !announcementBody}
                >
                  <Send className="h-4 w-4" />
                  Send Announcement
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Schedule Editor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-green-600" />
                      Weekly Schedule
                    </CardTitle>
                    <CardDescription>
                      Your teaching schedule for this week
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingSchedule(!isEditingSchedule)}
                    className="gap-2"
                  >
                    {isEditingSchedule ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                    {isEditingSchedule ? 'Save' : 'Edit'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">Time</th>
                        <th className="text-left p-2 font-medium">Monday</th>
                        <th className="text-left p-2 font-medium">Tuesday</th>
                        <th className="text-left p-2 font-medium">Wednesday</th>
                        <th className="text-left p-2 font-medium">Thursday</th>
                        <th className="text-left p-2 font-medium">Friday</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map((slot, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 font-medium text-muted-foreground">{slot.time}</td>
                          <td className="p-2">{slot.monday && <Badge variant="outline">{slot.monday}</Badge>}</td>
                          <td className="p-2">{slot.tuesday && <Badge variant="outline">{slot.tuesday}</Badge>}</td>
                          <td className="p-2">{slot.wednesday && <Badge variant="outline">{slot.wednesday}</Badge>}</td>
                          <td className="p-2">{slot.thursday && <Badge variant="outline">{slot.thursday}</Badge>}</td>
                          <td className="p-2">{slot.friday && <Badge variant="outline">{slot.friday}</Badge>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Recent Alerts
                </CardTitle>
                <CardDescription>
                  Important notifications requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-start justify-between">
                      <Badge 
                        variant={notification.priority === 'high' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {notification.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-sm">{notification.message}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Classes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Recent Classes
              </CardTitle>
              <CardDescription>
                Performance metrics from your latest lectures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentClasses.map((classData) => (
                  <div key={classData.id} className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <h4 className="font-medium">{classData.course}</h4>
                        <p className="text-sm text-muted-foreground">{classData.topic}</p>
                        <p className="text-xs text-muted-foreground">{classData.date}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Attendance</span>
                          <span>{classData.attendance}/{classData.totalStudents}</span>
                        </div>
                        <Progress value={(classData.attendance / classData.totalStudents) * 100} />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Engagement</span>
                          <span>{classData.engagement}%</span>
                        </div>
                        <Progress value={classData.engagement} />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Quiz Average</span>
                          <span>{classData.avgQuizScore}%</span>
                        </div>
                        <Progress value={classData.avgQuizScore} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}