import { 
  LayoutDashboard, 
  Users, 
  Calendar,
  CalendarDays,
  Megaphone,
  CheckSquare,
  Bell,
  User,
  LogOut,
  GraduationCap,
  X
} from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { User as UserType, TeacherPage } from '../../App';

interface TeacherSidebarProps {
  user: UserType;
  currentPage: TeacherPage;
  onNavigate: (page: TeacherPage) => void;
  onLogout: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function TeacherSidebar({ user, currentPage, onNavigate, onLogout, isOpen, onToggle }: TeacherSidebarProps) {
  const navigationItems = [
    {
      id: 'dashboard' as TeacherPage,
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      id: 'classes' as TeacherPage,
      label: 'Classes & Engagement',
      icon: Users
    },
    {
      id: 'schedule-editor' as TeacherPage,
      label: 'Schedule Editor',
      icon: Calendar
    },
    {
      id: 'timetable-editor' as TeacherPage,
      label: 'Timetable Editor',
      icon: CalendarDays
    },
    {
      id: 'announcements' as TeacherPage,
      label: 'Announcements',
      icon: Megaphone
    },
    {
      id: 'mark-attendance' as TeacherPage,
      label: 'Mark Attendance',
      icon: CheckSquare
    },
    {
      id: 'notifications' as TeacherPage,
      label: 'Notifications',
      icon: Bell
    },
    {
      id: 'profile' as TeacherPage,
      label: 'Profile',
      icon: User
    }
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Edura</h1>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? 'default' : 'ghost'}
              className={`w-full justify-start gap-3 h-12 ${
                currentPage === item.id 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => {
                onNavigate(item.id);
                if (window.innerWidth < 1024) onToggle();
              }}
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
            <p className="text-xs text-gray-500 truncate">Teacher</p>
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

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden" onClick={onToggle} />
          <div className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden">
            {sidebarContent}
          </div>
        </>
      )}
    </>
  );
}