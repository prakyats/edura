import { Card, CardContent } from '../../ui/card';
import { User } from '../../../App';

interface TeacherNotificationsProps {
  user: User;
}

export function TeacherNotifications({ user }: TeacherNotificationsProps) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Notifications</h1>
        <p className="text-gray-600">View and manage your notifications.</p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="text-center py-12">
            <p className="text-gray-500">Notifications features coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}