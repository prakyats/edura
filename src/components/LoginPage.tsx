import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { GraduationCap, Users, Shield, Eye, EyeOff } from 'lucide-react';
import { User, UserRole } from '../App';
import { toast } from 'sonner@2.0.3';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      const mockUsers = {
        student: {
          id: '1',
          name: 'Alex Johnson',
          email: email,
          role: 'student' as UserRole,
          avatar: '/api/placeholder/40/40'
        },
        teacher: {
          id: '2',
          name: 'Dr. Sarah Chen',
          email: email,
          role: 'teacher' as UserRole,
          avatar: '/api/placeholder/40/40'
        },
        admin: {
          id: '3',
          name: 'Michael Rodriguez',
          email: email,
          role: 'admin' as UserRole,
          avatar: '/api/placeholder/40/40'
        }
      };

      onLogin(mockUsers[role]);
      toast.success(`Welcome back, ${mockUsers[role].name}!`);
      setIsLoading(false);
    }, 1500);
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'student': return <GraduationCap className="h-4 w-4" />;
      case 'teacher': return <Users className="h-4 w-4" />;
      case 'admin': return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4"
          >
            <GraduationCap className="h-8 w-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Edura
          </h1>
          <p className="text-muted-foreground mt-2">
            AI-First Campus Digitization Platform
          </p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                      {getRoleIcon(role)}
                      <SelectValue placeholder="Select your role" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        Student
                      </div>
                    </SelectItem>
                    <SelectItem value="teacher">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Teacher
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Administrator
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground text-center mb-3">Demo Credentials:</p>
              <div className="text-xs space-y-2">
                <div className="text-center">
                  <p className="font-medium">Any email & password will work</p>
                  <p className="text-muted-foreground">Select your role and use any credentials</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-blue-50 rounded">
                    <p className="font-medium text-blue-800">Student</p>
                    <p className="text-blue-600">Home, Timetable, Attendance</p>
                  </div>
                  <div className="p-2 bg-green-50 rounded">
                    <p className="font-medium text-green-800">Teacher</p>
                    <p className="text-green-600">Classes, Schedule, Announcements</p>
                  </div>
                  <div className="p-2 bg-purple-50 rounded">
                    <p className="font-medium text-purple-800">Admin</p>
                    <p className="text-purple-600">Users, Branches, Analytics</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}