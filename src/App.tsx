import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { StudentLayout } from './components/layouts/StudentLayout';
import { TeacherLayout } from './components/layouts/TeacherLayout';
import { AdminLayout } from './components/layouts/AdminLayout';
import { Toaster } from './components/ui/sonner';

export type UserRole = 'student' | 'teacher' | 'admin';

// Student pages
export type StudentPage = 'home' | 'timetable' | 'attendance' | 'notifications';

// Teacher pages  
export type TeacherPage = 'dashboard' | 'classes' | 'schedule-editor' | 'timetable-editor' | 'announcements' | 'mark-attendance' | 'notifications' | 'profile';

// Admin pages
export type AdminPage = 'dashboard' | 'manage-branches' | 'schedule-optimization' | 'reports' | 'notifications' | 'profile';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  branch?: string;
  year?: string;
  semester?: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background">
        <LoginPage onLogin={handleLogin} />
        <Toaster />
      </div>
    );
  }

  const renderLayout = () => {
    switch (currentUser.role) {
      case 'student':
        return <StudentLayout user={currentUser} onLogout={handleLogout} />;
      case 'teacher':
        return <TeacherLayout user={currentUser} onLogout={handleLogout} />;
      case 'admin':
        return <AdminLayout user={currentUser} onLogout={handleLogout} />;
      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderLayout()}
      <Toaster />
    </div>
  );
}