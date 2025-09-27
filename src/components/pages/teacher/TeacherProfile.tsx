import { Card, CardContent } from '../../ui/card';
import { User } from '../../../App';

interface TeacherProfileProps {
  user: User;
}

export function TeacherProfile({ user }: TeacherProfileProps) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your profile settings and preferences.</p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="text-center py-12">
            <p className="text-gray-500">Profile features coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}