import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  LogOut,
  GraduationCap
} from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User, CurrentPage } from '../App';

interface SidebarProps {
  user: User;
  onLogout: () => void;
  onNavigate: (page: CurrentPage) => void;
  currentPage: CurrentPage;
}

export function Sidebar({ user, onLogout, onNavigate, currentPage }: SidebarProps) {
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      page: 'dashboard' as CurrentPage
    },
    {
      id: 'timetable',
      label: 'My Timetable',
      icon: Calendar,
      page: 'dashboard' as CurrentPage
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: Users,
      page: 'dashboard' as CurrentPage
    }
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Smart Timetable</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={item.id === 'dashboard' ? 'default' : 'ghost'}
              className={`w-full justify-start gap-3 h-12 ${
                item.id === 'dashboard' 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => onNavigate(item.page)}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">Student</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-10 text-gray-600 hover:text-gray-900"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </div>
  );
}