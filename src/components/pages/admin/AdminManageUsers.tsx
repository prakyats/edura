import { Card, CardContent } from '../../ui/card';
import { User } from '../../../App';

interface AdminManageUsersProps {
  user: User;
}

export function AdminManageUsers({ user }: AdminManageUsersProps) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Manage Users</h1>
        <p className="text-gray-600">Add, edit, and manage system users.</p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="text-center py-12">
            <p className="text-gray-500">User management features coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}