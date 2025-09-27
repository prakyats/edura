import { useState } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { 
  BarChart3, 
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Download
} from 'lucide-react';
import { User } from '../../../App';

interface StudentAttendanceProps {
  user: User;
}

export function StudentAttendance({ user }: StudentAttendanceProps) {
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Mock attendance data
  const subjects = [
    { id: 'math', name: 'Mathematics', totalClasses: 25, attended: 23, percentage: 92 },
    { id: 'physics', name: 'Physics', totalClasses: 22, attended: 20, percentage: 91 },
    { id: 'chemistry', name: 'Chemistry', totalClasses: 20, attended: 18, percentage: 90 },
    { id: 'english', name: 'English', totalClasses: 18, attended: 17, percentage: 94 },
    { id: 'cs', name: 'Computer Science', totalClasses: 24, attended: 22, percentage: 92 }
  ];

  const overallStats = {
    totalClasses: subjects.reduce((sum, subject) => sum + subject.totalClasses, 0),
    totalAttended: subjects.reduce((sum, subject) => sum + subject.attended, 0),
    overallPercentage: Math.round(
      (subjects.reduce((sum, subject) => sum + subject.attended, 0) / 
       subjects.reduce((sum, subject) => sum + subject.totalClasses, 0)) * 100
    )
  };

  const attendanceHistory = [
    { date: '2024-09-27', subject: 'Mathematics', status: 'present', time: '08:10 AM' },
    { date: '2024-09-27', subject: 'Physics', status: 'present', time: '09:10 AM' },
    { date: '2024-09-26', subject: 'Chemistry', status: 'absent', time: '08:10 AM' },
    { date: '2024-09-26', subject: 'English', status: 'present', time: '10:15 AM' },
    { date: '2024-09-25', subject: 'Computer Science', status: 'present', time: '08:10 AM' },
    { date: '2024-09-25', subject: 'Mathematics', status: 'late', time: '11:30 AM' },
    { date: '2024-09-24', subject: 'Physics', status: 'present', time: '09:10 AM' },
    { date: '2024-09-24', subject: 'Chemistry', status: 'present', time: '14:00 PM' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-600 bg-green-100';
      case 'absent': return 'text-red-600 bg-red-100';
      case 'late': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="h-4 w-4" />;
      case 'absent': return <XCircle className="h-4 w-4" />;
      case 'late': return <Clock className="h-4 w-4" />;
      default: return null;
    }
  };

  const filteredHistory = selectedSubject === 'all' 
    ? attendanceHistory 
    : attendanceHistory.filter(record => 
        record.subject.toLowerCase().includes(selectedSubject.toLowerCase())
      );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Attendance</h1>
        <p className="text-gray-600">Track your attendance across all subjects</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-semibold text-gray-900">{overallStats.overallPercentage}%</p>
              <p className="text-sm text-gray-600">Overall Attendance</p>
              <Progress value={overallStats.overallPercentage} className="h-2" />
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
            <div className="space-y-2">
              <p className="text-2xl font-semibold text-gray-900">{overallStats.totalAttended}</p>
              <p className="text-sm text-gray-600">Classes Attended</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-semibold text-gray-900">{overallStats.totalClasses}</p>
              <p className="text-sm text-gray-600">Total Classes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject-wise Attendance */}
      <Card className="border-0 shadow-sm mb-8">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Subject-wise Attendance</h2>
          
          <div className="space-y-4">
            {subjects.map((subject) => (
              <div key={subject.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{subject.name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>{subject.attended}/{subject.totalClasses} classes</span>
                    <span>{subject.percentage}%</span>
                  </div>
                  <Progress value={subject.percentage} className="mt-2 h-2" />
                </div>
                <div className="text-right ml-4">
                  <Badge 
                    variant={subject.percentage >= 90 ? 'default' : subject.percentage >= 75 ? 'secondary' : 'destructive'}
                    className="mb-2"
                  >
                    {subject.percentage}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Attendance History */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Attendance History</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Subject Filter */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            <Button 
              variant={selectedSubject === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSubject('all')}
            >
              All Subjects
            </Button>
            {subjects.map((subject) => (
              <Button
                key={subject.id}
                variant={selectedSubject === subject.name ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSubject(subject.name)}
              >
                {subject.name}
              </Button>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {new Date(record.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </TableCell>
                    <TableCell>{record.subject}</TableCell>
                    <TableCell>{record.time}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(record.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(record.status)}
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </div>
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {filteredHistory.map((record, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{record.subject}</h3>
                  <Badge variant="outline" className={getStatusColor(record.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(record.status)}
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </div>
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(record.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {record.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No attendance records found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}