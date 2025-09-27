import { useState } from 'react';
import { AdminSidebar } from '../sidebars/AdminSidebar';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminManageUsers } from '../pages/admin/AdminManageUsers';
import { AdminManageBranches } from '../pages/admin/AdminManageBranches';
import { AdminScheduleOptimization } from '../pages/admin/AdminScheduleOptimization';
import { AdminReports } from '../pages/admin/AdminReports';
import { AdminNotifications } from '../pages/admin/AdminNotifications';
import { AdminProfile } from '../pages/admin/AdminProfile';
import { User, AdminPage } from '../../App';

interface AdminLayoutProps {
  user: User;
  onLogout: () => void;
}

export function AdminLayout({ user, onLogout }: AdminLayoutProps) {
  const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AdminDashboard user={user} />;
      case 'manage-users':
        return <AdminManageUsers user={user} />;
      case 'manage-branches':
        return <AdminManageBranches user={user} />;
      case 'schedule-optimization':
        return <AdminScheduleOptimization user={user} />;
      case 'reports':
        return <AdminReports user={user} />;
      case 'notifications':
        return <AdminNotifications user={user} />;
      case 'profile':
        return <AdminProfile user={user} />;
      default:
        return <AdminDashboard user={user} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar
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