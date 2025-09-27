import { useState } from 'react';
import { StudentSidebar } from '../sidebars/StudentSidebar';
import { StudentHome } from '../pages/student/StudentHome';
import { StudentTimetable } from '../pages/student/StudentTimetable';
import { StudentAttendance } from '../pages/student/StudentAttendance';
import { User, StudentPage } from '../../App';

interface StudentLayoutProps {
  user: User;
  onLogout: () => void;
}

export function StudentLayout({ user, onLogout }: StudentLayoutProps) {
  const [currentPage, setCurrentPage] = useState<StudentPage>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <StudentHome user={user} />;
      case 'timetable':
        return <StudentTimetable user={user} />;
      case 'attendance':
        return <StudentAttendance user={user} />;
      default:
        return <StudentHome user={user} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <StudentSidebar
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