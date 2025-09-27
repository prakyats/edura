import { useState } from 'react';
import { TeacherSidebar } from '../sidebars/TeacherSidebar';
import { TeacherDashboard } from '../pages/teacher/TeacherDashboard';
import { TeacherClasses } from '../pages/teacher/TeacherClasses';
import { TeacherScheduleEditor } from '../pages/teacher/TeacherScheduleEditor';
import { TeacherTimetableEditor } from '../pages/teacher/TeacherTimetableEditor';
import { TeacherAnnouncements } from '../pages/teacher/TeacherAnnouncements';
import { TeacherMarkAttendance } from '../pages/teacher/TeacherMarkAttendance';
import { TeacherNotifications } from '../pages/teacher/TeacherNotifications';
import { TeacherProfile } from '../pages/teacher/TeacherProfile';
import { User, TeacherPage } from '../../App';

interface TeacherLayoutProps {
  user: User;
  onLogout: () => void;
}

export function TeacherLayout({ user, onLogout }: TeacherLayoutProps) {
  const [currentPage, setCurrentPage] = useState<TeacherPage>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <TeacherDashboard user={user} />;
      case 'classes':
        return <TeacherClasses user={user} />;
      case 'schedule-editor':
        return <TeacherScheduleEditor user={user} />;
      case 'timetable-editor':
        return <TeacherTimetableEditor user={user} />;
      case 'announcements':
        return <TeacherAnnouncements user={user} />;
      case 'mark-attendance':
        return <TeacherMarkAttendance user={user} />;
      case 'notifications':
        return <TeacherNotifications user={user} />;
      case 'profile':
        return <TeacherProfile user={user} />;
      default:
        return <TeacherDashboard user={user} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <TeacherSidebar
        user={user}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={onLogout}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}