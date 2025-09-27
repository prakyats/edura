import { Card, CardContent } from '../../ui/card';
import { User } from '../../../App';

interface AdminScheduleOptimizationProps {
  user: User;
}

export function AdminScheduleOptimization({ user }: AdminScheduleOptimizationProps) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Schedule Optimization</h1>
        <p className="text-gray-600">AI-powered schedule optimization and analysis.</p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="text-center py-12">
            <p className="text-gray-500">Schedule optimization features coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}