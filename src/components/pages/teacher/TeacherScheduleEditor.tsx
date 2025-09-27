import { Card, CardContent } from '../../ui/card';
import { User } from '../../../App';

interface TeacherScheduleEditorProps {
  user: User;
}

export function TeacherScheduleEditor({ user }: TeacherScheduleEditorProps) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Schedule Editor</h1>
        <p className="text-gray-600">Edit your teaching schedule and assign classes.</p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="text-center py-12">
            <p className="text-gray-500">Schedule Editor features coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}