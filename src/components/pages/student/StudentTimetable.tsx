import { useState } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { 
  Calendar, 
  Clock,
  MapPin,
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { User as UserType } from '../../../App';

interface StudentTimetableProps {
  user: UserType;
}

export function StudentTimetable({ user }: StudentTimetableProps) {
  const [currentWeek, setCurrentWeek] = useState(0);

  // Mock timetable data
  const timetable = {
    Monday: [
      { time: '08:10 - 09:00', subject: 'Mathematics', teacher: 'Jane Smith', room: 'Room 101', type: 'lecture' },
      { time: '09:10 - 10:00', subject: 'Physics', teacher: 'John Smith', room: 'Physics Lab', type: 'lab' },
      { time: '11:30 - 12:20', subject: 'English', teacher: 'Jane Doe', room: 'Room 102', type: 'lecture' }
    ],
    Tuesday: [
      { time: '08:10 - 09:00', subject: 'Chemistry', teacher: 'Dr. Brown', room: 'Chem Lab', type: 'lab' },
      { time: '10:15 - 11:05', subject: 'Mathematics', teacher: 'Jane Smith', room: 'Room 101', type: 'tutorial' },
      { time: '14:00 - 14:50', subject: 'Computer Science', teacher: 'Prof. Wilson', room: 'CS Lab', type: 'practical' }
    ],
    Wednesday: [
      { time: '09:10 - 10:00', subject: 'Physics', teacher: 'John Smith', room: 'Room 201', type: 'lecture' },
      { time: '10:15 - 11:05', subject: 'English', teacher: 'Jane Doe', room: 'Room 102', type: 'lecture' },
      { time: '11:30 - 12:20', subject: 'Mathematics', teacher: 'Jane Smith', room: 'Room 101', type: 'lecture' }
    ],
    Thursday: [
      { time: '08:10 - 09:00', subject: 'Computer Science', teacher: 'Prof. Wilson', room: 'CS Lab', type: 'lecture' },
      { time: '09:10 - 10:00', subject: 'Chemistry', teacher: 'Dr. Brown', room: 'Room 301', type: 'lecture' },
      { time: '14:00 - 15:40', subject: 'Physics', teacher: 'John Smith', room: 'Physics Lab', type: 'lab' }
    ],
    Friday: [
      { time: '08:10 - 09:00', subject: 'English', teacher: 'Jane Doe', room: 'Room 102', type: 'lecture' },
      { time: '10:15 - 11:05', subject: 'Computer Science', teacher: 'Prof. Wilson', room: 'CS Lab', type: 'tutorial' },
      { time: '11:30 - 12:20', subject: 'Mathematics', teacher: 'Jane Smith', room: 'Room 101', type: 'tutorial' }
    ]
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['08:10', '09:10', '10:15', '11:30', '14:00', '15:10'];

  const getClassTypeColor = (type: string) => {
    switch (type) {
      case 'lecture': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'lab': return 'bg-green-100 text-green-800 border-green-200';
      case 'tutorial': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'practical': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCurrentWeekDates = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1 + (currentWeek * 7)); // Monday
    
    return days.map((_, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return date;
    });
  };

  const weekDates = getCurrentWeekDates();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">My Timetable</h1>
            <p className="text-gray-600">Your weekly class schedule</p>
          </div>
          
          {/* Week Navigation */}
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentWeek(currentWeek - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              {weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {' '}
              {weekDates[4].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentWeek(currentWeek + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentWeek(0)}
            >
              Today
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Timetable */}
      <div className="hidden lg:block">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="p-4 text-left text-sm font-medium text-gray-900 w-24">Time</th>
                    {days.map((day, index) => (
                      <th key={day} className="p-4 text-left text-sm font-medium text-gray-900">
                        <div>
                          <div>{day}</div>
                          <div className="text-xs text-gray-500 font-normal">
                            {weekDates[index].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((timeSlot) => (
                    <tr key={timeSlot} className="border-b border-gray-100">
                      <td className="p-4 text-sm text-gray-600 font-medium align-top">
                        {timeSlot}
                      </td>
                      {days.map((day) => {
                        const dayClasses = timetable[day as keyof typeof timetable] || [];
                        const classForSlot = dayClasses.find(cls => cls.time.startsWith(timeSlot));
                        
                        return (
                          <td key={`${day}-${timeSlot}`} className="p-2 align-top">
                            {classForSlot ? (
                              <div className={`p-3 rounded-lg border ${getClassTypeColor(classForSlot.type)}`}>
                                <h4 className="font-medium text-sm">{classForSlot.subject}</h4>
                                <div className="flex items-center gap-1 mt-1">
                                  <User className="h-3 w-3" />
                                  <span className="text-xs">{classForSlot.teacher}</span>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                  <MapPin className="h-3 w-3" />
                                  <span className="text-xs">{classForSlot.room}</span>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                  <Clock className="h-3 w-3" />
                                  <span className="text-xs">{classForSlot.time}</span>
                                </div>
                                <Badge variant="outline" className="mt-2 text-xs">
                                  {classForSlot.type}
                                </Badge>
                              </div>
                            ) : (
                              <div className="h-20"></div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Timetable */}
      <div className="lg:hidden space-y-4">
        {days.map((day, dayIndex) => {
          const dayClasses = timetable[day as keyof typeof timetable] || [];
          const isToday = weekDates[dayIndex].toDateString() === new Date().toDateString();
          
          return (
            <Card key={day} className={`border-0 shadow-sm ${isToday ? 'ring-2 ring-blue-500' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{day}</h3>
                    <p className="text-sm text-gray-500">
                      {weekDates[dayIndex].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  {isToday && (
                    <Badge className="bg-blue-600">Today</Badge>
                  )}
                </div>
                
                <div className="space-y-3">
                  {dayClasses.length > 0 ? (
                    dayClasses.map((classItem, index) => (
                      <div key={index} className={`p-3 rounded-lg border ${getClassTypeColor(classItem.type)}`}>
                        <h4 className="font-medium">{classItem.subject}</h4>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{classItem.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{classItem.room}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-sm">
                          <User className="h-4 w-4" />
                          <span>{classItem.teacher}</span>
                        </div>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {classItem.type}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No classes scheduled</p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Legend */}
      <Card className="border-0 shadow-sm mt-8">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Class Types</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
              <span className="text-sm text-gray-600">Lecture</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
              <span className="text-sm text-gray-600">Lab</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-100 border border-purple-200 rounded"></div>
              <span className="text-sm text-gray-600">Tutorial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-100 border border-orange-200 rounded"></div>
              <span className="text-sm text-gray-600">Practical</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}