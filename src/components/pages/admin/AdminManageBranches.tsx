import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  ArrowLeft, 
  Building2,
  Users,
  Upload,
  Search
} from 'lucide-react';
import { User } from '../../../App';
import { toast } from 'sonner@2.0.3';

interface Branch {
  id: string;
  name: string;
  totalStudents: number;
  description?: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  year: number;
  semester: number;
  branchId: string;
  avatar?: string;
}

interface AdminManageBranchesProps {
  user: User;
}

export function AdminManageBranches({ user }: AdminManageBranchesProps) {
  const [currentView, setCurrentView] = useState<'branches' | 'students'>('branches');
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [branchModalOpen, setBranchModalOpen] = useState(false);
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Form states
  const [branchForm, setBranchForm] = useState({ name: '', description: '' });
  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    phone: '',
    year: '',
    semester: '',
    avatar: ''
  });

  // Mock data
  const [branches, setBranches] = useState<Branch[]>([
    { id: '1', name: 'Computer Science', totalStudents: 312, description: 'Computer Science and Engineering' },
    { id: '2', name: 'Electronics', totalStudents: 278, description: 'Electronics and Communication Engineering' },
    { id: '3', name: 'Mechanical', totalStudents: 245, description: 'Mechanical Engineering' },
    { id: '4', name: 'Civil', totalStudents: 189, description: 'Civil Engineering' },
    { id: '5', name: 'Chemical', totalStudents: 156, description: 'Chemical Engineering' },
    { id: '6', name: 'Electrical', totalStudents: 123, description: 'Electrical Engineering' }
  ]);

  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'John Doe', email: 'john.doe@email.com', phone: '+1 234 567 8901', year: 3, semester: 5, branchId: '1' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@email.com', phone: '+1 234 567 8902', year: 2, semester: 3, branchId: '1' },
    { id: '3', name: 'Mike Johnson', email: 'mike.johnson@email.com', phone: '+1 234 567 8903', year: 4, semester: 7, branchId: '1' },
    { id: '4', name: 'Sarah Wilson', email: 'sarah.wilson@email.com', phone: '+1 234 567 8904', year: 1, semester: 2, branchId: '2' },
    { id: '5', name: 'David Brown', email: 'david.brown@email.com', phone: '+1 234 567 8905', year: 3, semester: 6, branchId: '2' }
  ]);

  // Filter functions
  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStudents = students.filter(student =>
    student.branchId === selectedBranch?.id &&
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Branch operations
  const handleAddBranch = () => {
    if (!branchForm.name.trim()) {
      toast.error('Branch name is required');
      return;
    }

    const newBranch: Branch = {
      id: Date.now().toString(),
      name: branchForm.name,
      description: branchForm.description,
      totalStudents: 0
    };

    setBranches([...branches, newBranch]);
    setBranchForm({ name: '', description: '' });
    setBranchModalOpen(false);
    toast.success('Branch added successfully');
  };

  const handleEditBranch = () => {
    if (!editingBranch || !branchForm.name.trim()) return;

    setBranches(branches.map(branch =>
      branch.id === editingBranch.id
        ? { ...branch, name: branchForm.name, description: branchForm.description }
        : branch
    ));

    setEditingBranch(null);
    setBranchForm({ name: '', description: '' });
    setBranchModalOpen(false);
    toast.success('Branch updated successfully');
  };

  const handleDeleteBranch = (branchId: string) => {
    setBranches(branches.filter(branch => branch.id !== branchId));
    // Also delete students in this branch
    setStudents(students.filter(student => student.branchId !== branchId));
    toast.success('Branch deleted successfully');
  };

  // Student operations
  const handleAddStudent = () => {
    if (!studentForm.name.trim() || !studentForm.email.trim() || !selectedBranch) {
      toast.error('Name and email are required');
      return;
    }

    const newStudent: Student = {
      id: Date.now().toString(),
      name: studentForm.name,
      email: studentForm.email,
      phone: studentForm.phone,
      year: parseInt(studentForm.year) || 1,
      semester: parseInt(studentForm.semester) || 1,
      branchId: selectedBranch.id,
      avatar: studentForm.avatar
    };

    setStudents([...students, newStudent]);
    
    // Update branch student count
    setBranches(branches.map(branch =>
      branch.id === selectedBranch.id
        ? { ...branch, totalStudents: branch.totalStudents + 1 }
        : branch
    ));

    setStudentForm({ name: '', email: '', phone: '', year: '', semester: '', avatar: '' });
    setStudentModalOpen(false);
    toast.success('Student added successfully');
  };

  const handleEditStudent = () => {
    if (!editingStudent || !studentForm.name.trim()) return;

    setStudents(students.map(student =>
      student.id === editingStudent.id
        ? {
            ...student,
            name: studentForm.name,
            email: studentForm.email,
            phone: studentForm.phone,
            year: parseInt(studentForm.year) || 1,
            semester: parseInt(studentForm.semester) || 1,
            avatar: studentForm.avatar
          }
        : student
    ));

    setEditingStudent(null);
    setStudentForm({ name: '', email: '', phone: '', year: '', semester: '', avatar: '' });
    setStudentModalOpen(false);
    toast.success('Student updated successfully');
  };

  const handleDeleteStudent = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    setStudents(students.filter(s => s.id !== studentId));
    
    // Update branch student count
    setBranches(branches.map(branch =>
      branch.id === student.branchId
        ? { ...branch, totalStudents: Math.max(0, branch.totalStudents - 1) }
        : branch
    ));

    toast.success('Student deleted successfully');
  };

  const openBranchModal = (branch?: Branch) => {
    if (branch) {
      setEditingBranch(branch);
      setBranchForm({ name: branch.name, description: branch.description || '' });
    } else {
      setEditingBranch(null);
      setBranchForm({ name: '', description: '' });
    }
    setBranchModalOpen(true);
  };

  const openStudentModal = (student?: Student) => {
    if (student) {
      setEditingStudent(student);
      setStudentForm({
        name: student.name,
        email: student.email,
        phone: student.phone,
        year: student.year.toString(),
        semester: student.semester.toString(),
        avatar: student.avatar || ''
      });
    } else {
      setEditingStudent(null);
      setStudentForm({ name: '', email: '', phone: '', year: '1', semester: '1', avatar: '' });
    }
    setStudentModalOpen(true);
  };

  const handleBranchClick = (branch: Branch) => {
    setSelectedBranch(branch);
    setCurrentView('students');
    setSearchTerm('');
  };

  const goBackToBranches = () => {
    setCurrentView('branches');
    setSelectedBranch(null);
    setSearchTerm('');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          {currentView === 'students' && (
            <Button variant="ghost" onClick={goBackToBranches} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Branches
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {currentView === 'branches' ? 'Manage Branches' : `Students - ${selectedBranch?.name}`}
            </h1>
            <p className="text-gray-600">
              {currentView === 'branches' 
                ? 'Manage academic branches and departments' 
                : `Manage students in ${selectedBranch?.name} department`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={currentView === 'branches' ? 'Search branches...' : 'Search students...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Dialog open={currentView === 'branches' ? branchModalOpen : studentModalOpen} 
                onOpenChange={currentView === 'branches' ? setBranchModalOpen : setStudentModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => currentView === 'branches' ? openBranchModal() : openStudentModal()} className="gap-2">
              <Plus className="h-4 w-4" />
              {currentView === 'branches' ? 'Add Branch' : 'Add Student'}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {currentView === 'branches' 
                  ? (editingBranch ? 'Edit Branch' : 'Add New Branch')
                  : (editingStudent ? 'Edit Student' : 'Add New Student')
                }
              </DialogTitle>
            </DialogHeader>

            {currentView === 'branches' ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="branchName">Branch Name</Label>
                  <Input
                    id="branchName"
                    value={branchForm.name}
                    onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })}
                    placeholder="e.g., Computer Science"
                  />
                </div>
                <div>
                  <Label htmlFor="branchDescription">Description (Optional)</Label>
                  <Input
                    id="branchDescription"
                    value={branchForm.description}
                    onChange={(e) => setBranchForm({ ...branchForm, description: e.target.value })}
                    placeholder="e.g., Computer Science and Engineering"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={editingBranch ? handleEditBranch : handleAddBranch} className="flex-1">
                    {editingBranch ? 'Update Branch' : 'Add Branch'}
                  </Button>
                  <Button variant="outline" onClick={() => setBranchModalOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="studentPhoto">Photo Upload</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="studentPhoto"
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                    <Button variant="outline" className="gap-2" size="sm">
                      <Upload className="h-4 w-4" />
                      Upload Photo
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="studentName">Name</Label>
                  <Input
                    id="studentName"
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                    placeholder="Student name"
                  />
                </div>
                <div>
                  <Label htmlFor="studentEmail">Email</Label>
                  <Input
                    id="studentEmail"
                    type="email"
                    value={studentForm.email}
                    onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                    placeholder="student@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="studentPhone">Phone Number</Label>
                  <Input
                    id="studentPhone"
                    value={studentForm.phone}
                    onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="studentYear">Year</Label>
                    <Select value={studentForm.year} onValueChange={(value) => setStudentForm({ ...studentForm, year: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1st Year</SelectItem>
                        <SelectItem value="2">2nd Year</SelectItem>
                        <SelectItem value="3">3rd Year</SelectItem>
                        <SelectItem value="4">4th Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="studentSemester">Semester</Label>
                    <Select value={studentForm.semester} onValueChange={(value) => setStudentForm({ ...studentForm, semester: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                          <SelectItem key={sem} value={sem.toString()}>
                            {sem}{sem === 1 ? 'st' : sem === 2 ? 'nd' : sem === 3 ? 'rd' : 'th'} Semester
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Branch</Label>
                  <Input value={selectedBranch?.name || ''} disabled className="bg-gray-50" />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={editingStudent ? handleEditStudent : handleAddStudent} className="flex-1">
                    {editingStudent ? 'Update Student' : 'Add Student'}
                  </Button>
                  <Button variant="outline" onClick={() => setStudentModalOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Content */}
      {currentView === 'branches' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBranches.map((branch) => (
            <Card key={branch.id} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); openBranchModal(branch); }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleDeleteBranch(branch.id); }}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                
                <div onClick={() => handleBranchClick(branch)}>
                  <h3 className="font-semibold text-gray-900 mb-2">{branch.name}</h3>
                  {branch.description && (
                    <p className="text-sm text-gray-600 mb-4">{branch.description}</p>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{branch.totalStudents} students</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Students in {selectedBranch?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredStudents.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Photo</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.phone}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{student.year}{student.year === 1 ? 'st' : student.year === 2 ? 'nd' : student.year === 3 ? 'rd' : 'th'} Year</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Sem {student.semester}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => openStudentModal(student)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteStudent(student.id)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No students found in this branch</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}