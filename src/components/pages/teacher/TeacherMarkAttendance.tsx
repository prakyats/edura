import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Switch } from '../../ui/switch';
import { Badge } from '../../ui/badge';
import { 
  Users, 
  Camera, 
  Upload, 
  Check, 
  Clock,
  FileImage,
  ChevronRight,
  CheckSquare
} from 'lucide-react';
import { User } from '../../../App';
import { toast } from 'sonner@2.0.3';

interface Class {
  id: string;
  name: string;
  subject: string;
  time: string;
  students: Student[];
}

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  avatar?: string;
  isPresent: boolean;
}

interface TeacherMarkAttendanceProps {
  user: User;
}

type Tab = 'select-class' | 'take-pic' | 'edit-approve';

export function TeacherMarkAttendance({ user }: TeacherMarkAttendanceProps) {
  const [currentTab, setCurrentTab] = useState<Tab>('select-class');
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock classes data
  const classes: Class[] = [
    {
      id: '1',
      name: 'CS301 - Database Systems',
      subject: 'Database Systems',
      time: '09:00 AM - 10:30 AM',
      students: [
        { id: '1', name: 'John Doe', rollNumber: 'CS21001', isPresent: true },
        { id: '2', name: 'Jane Smith', rollNumber: 'CS21002', isPresent: true },
        { id: '3', name: 'Mike Johnson', rollNumber: 'CS21003', isPresent: false },
        { id: '4', name: 'Sarah Wilson', rollNumber: 'CS21004', isPresent: true },
        { id: '5', name: 'David Brown', rollNumber: 'CS21005', isPresent: false },
        { id: '6', name: 'Lisa Garcia', rollNumber: 'CS21006', isPresent: true },
        { id: '7', name: 'Tom Anderson', rollNumber: 'CS21007', isPresent: true },
        { id: '8', name: 'Emma Davis', rollNumber: 'CS21008', isPresent: false }
      ]
    },
    {
      id: '2',
      name: 'CS302 - Operating Systems',
      subject: 'Operating Systems',
      time: '11:00 AM - 12:30 PM',
      students: [
        { id: '9', name: 'Alex Johnson', rollNumber: 'CS21009', isPresent: true },
        { id: '10', name: 'Maria Rodriguez', rollNumber: 'CS21010', isPresent: true },
        { id: '11', name: 'Chris Lee', rollNumber: 'CS21011', isPresent: false },
        { id: '12', name: 'Anna Taylor', rollNumber: 'CS21012', isPresent: true }
      ]
    },
    {
      id: '3',
      name: 'CS303 - Software Engineering',
      subject: 'Software Engineering',
      time: '02:00 PM - 03:30 PM',
      students: [
        { id: '13', name: 'Robert White', rollNumber: 'CS21013', isPresent: true },
        { id: '14', name: 'Jennifer Miller', rollNumber: 'CS21014', isPresent: false },
        { id: '15', name: 'Kevin Wilson', rollNumber: 'CS21015', isPresent: true }
      ]
    }
  ];

  const tabs = [
    { id: 'select-class' as Tab, label: 'Select Class', icon: Users },
    { id: 'take-pic' as Tab, label: 'Take Picture', icon: Camera },
    { id: 'edit-approve' as Tab, label: 'Edit & Approve', icon: CheckSquare }
  ];

  const handleClassSelect = (classId: string) => {
    const selectedClassData = classes.find(c => c.id === classId);
    if (selectedClassData) {
      setSelectedClass(selectedClassData);
      setStudents([...selectedClassData.students]);
      setCurrentTab('take-pic');
      toast.success(`Selected ${selectedClassData.name}`);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setCurrentTab('edit-approve');
        toast.success('Photo uploaded successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleStudentAttendance = (studentId: string) => {
    setStudents(students.map(student =>
      student.id === studentId
        ? { ...student, isPresent: !student.isPresent }
        : student
    ));
  };

  const handleSubmitAttendance = () => {
    const presentCount = students.filter(s => s.isPresent).length;
    const totalCount = students.length;
    
    toast.success(`Attendance submitted successfully! ${presentCount}/${totalCount} students present`);
    
    // Reset the form
    setCurrentTab('select-class');
    setSelectedClass(null);
    setUploadedImage(null);
    setStudents([]);
  };

  const canNavigateToTab = (tabId: Tab): boolean => {
    switch (tabId) {
      case 'select-class':
        return true;
      case 'take-pic':
        return selectedClass !== null;
      case 'edit-approve':
        return selectedClass !== null && uploadedImage !== null;
      default:
        return false;
    }
  };

  const getTabStatus = (tabId: Tab): 'completed' | 'active' | 'disabled' => {
    if (tabId === currentTab) return 'active';
    
    switch (tabId) {
      case 'select-class':
        return selectedClass ? 'completed' : 'active';
      case 'take-pic':
        if (!selectedClass) return 'disabled';
        return uploadedImage ? 'completed' : 'active';
      case 'edit-approve':
        if (!selectedClass || !uploadedImage) return 'disabled';
        return 'active';
      default:
        return 'disabled';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Mark Attendance</h1>
        <p className="text-gray-600">Take attendance for your classes with AI-powered detection</p>
      </div>

      {/* Stepper Navigation */}
      <Card className="border-0 shadow-sm mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {tabs.map((tab, index) => {
              const status = getTabStatus(tab.id);
              const isClickable = canNavigateToTab(tab.id);
              
              return (
                <div key={tab.id} className="flex items-center">
                  {/* Tab */}
                  <div
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                      isClickable ? 'hover:bg-gray-50' : 'cursor-not-allowed opacity-50'
                    }`}
                    onClick={() => isClickable && setCurrentTab(tab.id)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      status === 'completed' 
                        ? 'bg-green-100 text-green-600' 
                        : status === 'active'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {status === 'completed' ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <tab.icon className="h-4 w-4" />
                      )}
                    </div>
                    <span className={`font-medium ${
                      status === 'active' ? 'text-gray-900' : 
                      status === 'completed' ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {tab.label}
                    </span>
                  </div>
                  
                  {/* Arrow */}
                  {index < tabs.length - 1 && (
                    <ChevronRight className="h-5 w-5 text-gray-300 mx-4" />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      {currentTab === 'select-class' && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Select Class
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose a class to mark attendance
                </label>
                <Select onValueChange={handleClassSelect}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a class..." />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{cls.name}</span>
                          <span className="text-sm text-gray-500">{cls.time}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedClass && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Selected Class</h3>
                  <div className="space-y-1">
                    <p className="text-blue-800">{selectedClass.name}</p>
                    <p className="text-sm text-blue-600">{selectedClass.time}</p>
                    <p className="text-sm text-blue-600">{selectedClass.students.length} students enrolled</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {currentTab === 'take-pic' && selectedClass && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Take Classroom Picture
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Class Info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{selectedClass.name}</h3>
                  <p className="text-sm text-gray-600">{selectedClass.time}</p>
                </div>
              </div>

              {/* Upload Area */}
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  uploadedImage ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => !uploadedImage && fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                
                {uploadedImage ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-green-900">Photo Uploaded Successfully!</h3>
                      <p className="text-green-700 mt-1">AI will now detect student attendance</p>
                    </div>
                    <img 
                      src={uploadedImage} 
                      alt="Classroom" 
                      className="max-w-xs max-h-48 object-cover rounded-lg mx-auto border"
                    />
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Change Photo
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                      <FileImage className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Upload Classroom Photo</h3>
                      <p className="text-gray-600 mt-1">Take a photo of the classroom for AI-powered attendance detection</p>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <Button className="gap-2">
                        <Camera className="h-4 w-4" />
                        Take Photo
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload File
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentTab === 'edit-approve' && selectedClass && uploadedImage && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5" />
                Review & Approve Attendance
              </CardTitle>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  <Clock className="h-4 w-4 inline mr-1" />
                  {new Date().toLocaleTimeString()}
                </div>
                <Badge variant="outline">
                  {students.filter(s => s.isPresent).length}/{students.length} Present
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* AI Detection Notice */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-blue-900">AI Detection Complete</span>
                </div>
                <p className="text-sm text-blue-700">
                  Attendance has been automatically detected from the classroom photo. 
                  Please review and make any necessary adjustments below.
                </p>
              </div>

              {/* Student List */}
              <div className="overflow-hidden rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Roll Number</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={student.avatar} alt={student.name} />
                              <AvatarFallback>
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{student.rollNumber}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={student.isPresent ? "default" : "secondary"}
                            className={student.isPresent ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                          >
                            {student.isPresent ? 'Present' : 'Absent'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={student.isPresent}
                            onCheckedChange={() => toggleStudentAttendance(student.id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setCurrentTab('take-pic')}>
                  Retake Photo
                </Button>
                <Button onClick={handleSubmitAttendance} className="gap-2">
                  <Check className="h-4 w-4" />
                  Approve & Submit Attendance
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}