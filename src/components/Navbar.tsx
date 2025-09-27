import { useState } from 'react';
import { Bell, LogOut, Settings, User as UserIcon, GraduationCap } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ScrollArea } from './ui/scroll-area';
import { User, CurrentPage } from '../App';

interface NavbarProps {
  user: User;
  onLogout: () => void;
  onNavigate: (page: CurrentPage) => void;
  currentPage: CurrentPage;
}

export function Navbar({ user, onLogout, onNavigate, currentPage }: NavbarProps) {
  const [notifications] = useState([
    {
      id: 1,
      title: 'New assignment available',
      message: 'Data Structures homework is now available',
      time: '5 minutes ago',
      read: false,
      type: 'assignment'
    },
    {
      id: 2,
      title: 'Grade updated',
      message: 'Your Machine Learning midterm grade has been posted',
      time: '2 hours ago',
      read: false,
      type: 'grade'
    },
    {
      id: 3,
      title: 'Class reminder',
      message: 'Statistics lecture starts in 30 minutes',
      time: '1 day ago',
      read: true,
      type: 'reminder'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNavItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard' }
    ];

    if (user.role === 'admin') {
      baseItems.push({ id: 'reports', label: 'Reports' });
    }

    return baseItems;
  };

  return (
    <nav className="bg-white border-b border-border px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Edura
          </h1>
        </div>

        {/* Navigation Items */}
        <div className="hidden md:flex items-center gap-1">
          {getNavItems().map((item) => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? 'default' : 'ghost'}
              onClick={() => onNavigate(item.id as CurrentPage)}
              className={currentPage === item.id ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : ''}
            >
              {item.label}
            </Button>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  You have {unreadCount} unread notifications
                </p>
              </div>
              <ScrollArea className="h-80">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b hover:bg-muted/50 cursor-pointer ${
                      !notification.read ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1" />
                      )}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </PopoverContent>
          </Popover>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user.name}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {user.email}
                  </p>
                  <Badge variant="secondary" className="w-fit text-xs">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}