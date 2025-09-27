import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { 
  Bell, 
  FileText, 
  Download, 
  Eye, 
  Calendar,
  User as UserIcon,
  Clock,
  Paperclip
} from 'lucide-react';
import { User } from '../../../App';

interface Announcement {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  teacherName: string;
  teacherAvatar?: string;
  attachment?: {
    name: string;
    type: 'pdf' | 'image' | 'doc';
    url: string;
    size: string;
  };
  isRead: boolean;
}

interface StudentNotificationsProps {
  user: User;
}

// Mock data - in real app, this would come from a shared store or API
const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Mid-term Examination Schedule Released',
    message: 'Dear students, the mid-term examination schedule for all subjects has been released. Please check the attached PDF for detailed timings and examination halls. Make sure to prepare accordingly and bring your student ID cards for all examinations.',
    timestamp: new Date('2024-01-15T10:30:00'),
    teacherName: 'Dr. Sarah Johnson',
    teacherAvatar: '',
    attachment: {
      name: 'midterm-schedule.pdf',
      type: 'pdf',
      url: '#',
      size: '245 KB'
    },
    isRead: false
  },
  {
    id: '2',
    title: 'Guest Lecture on AI & Machine Learning',
    message: 'We are excited to announce a special guest lecture by Dr. Michael Chen from MIT on "The Future of AI and Machine Learning in Industry". This is a great opportunity to learn from one of the leading experts in the field.',
    timestamp: new Date('2024-01-14T14:15:00'),
    teacherName: 'Prof. David Wilson',
    teacherAvatar: '',
    attachment: {
      name: 'guest-lecture-flyer.jpg',
      type: 'image',
      url: '#',
      size: '1.2 MB'
    },
    isRead: true
  },
  {
    id: '3',
    title: 'Assignment Submission Deadline Extended',
    message: 'The deadline for Database Systems assignment has been extended to next Friday due to technical issues with the submission portal. Please make use of this extra time to improve your submissions.',
    timestamp: new Date('2024-01-13T09:45:00'),
    teacherName: 'Dr. Emily Davis',
    teacherAvatar: '',
    isRead: true
  },
  {
    id: '4',
    title: 'Library Hours Extended During Exam Week',
    message: 'To support students during the upcoming examination period, the library will extend its hours from 7:00 AM to 11:00 PM starting from next Monday. Additional study spaces have also been arranged.',
    timestamp: new Date('2024-01-12T16:20:00'),
    teacherName: 'Prof. Robert Brown',
    teacherAvatar: '',
    isRead: true
  },
  {
    id: '5',
    title: 'Workshop: Research Methodology & Paper Writing',
    message: 'Join us for an intensive workshop on research methodology and academic paper writing. This workshop is designed to help students with their final year projects and research work.',
    timestamp: new Date('2024-01-11T11:00:00'),
    teacherName: 'Dr. Lisa Garcia',
    teacherAvatar: '',
    attachment: {
      name: 'workshop-details.doc',
      type: 'doc',
      url: '#',
      size: '156 KB'
    },
    isRead: true
  }
];

export function StudentNotifications({ user }: StudentNotificationsProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days === 0) {
      if (hours === 0) {
        const minutes = Math.floor((diff / (1000 * 60)));
        return minutes <= 1 ? 'Just now' : `${minutes} minutes ago`;
      }
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'image':
        return <Eye className="h-4 w-4 text-blue-500" />;
      case 'doc':
        return <FileText className="h-4 w-4 text-blue-600" />;
      default:
        return <Paperclip className="h-4 w-4 text-gray-500" />;
    }
  };

  const markAsRead = (announcementId: string) => {
    setAnnouncements(announcements.map(announcement =>
      announcement.id === announcementId
        ? { ...announcement, isRead: true }
        : announcement
    ));
  };

  const openDetailModal = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setDetailModalOpen(true);
    if (!announcement.isRead) {
      markAsRead(announcement.id);
    }
  };

  const unreadCount = announcements.filter(a => !a.isRead).length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600">Stay updated with announcements and important information</p>
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="gap-1">
              <Bell className="h-3 w-3" />
              {unreadCount} unread
            </Badge>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card 
            key={announcement.id} 
            className={`border-0 shadow-sm cursor-pointer transition-all hover:shadow-md ${
              !announcement.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
            }`}
            onClick={() => openDetailModal(announcement)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Teacher Avatar */}
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage src={announcement.teacherAvatar} alt={announcement.teacherName} />
                  <AvatarFallback>
                    {announcement.teacherName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className={`font-semibold text-gray-900 mb-1 ${!announcement.isRead ? 'text-blue-900' : ''}`}>
                        {announcement.title}
                        {!announcement.isRead && (
                          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full ml-2"></span>
                        )}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <UserIcon className="h-3 w-3" />
                          {announcement.teacherName}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(announcement.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm leading-relaxed mb-3 line-clamp-2">
                    {announcement.message}
                  </p>

                  {/* Attachment */}
                  {announcement.attachment && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-2 w-fit">
                      {getAttachmentIcon(announcement.attachment.type)}
                      <span className="font-medium">{announcement.attachment.name}</span>
                      <span className="text-xs text-gray-500">({announcement.attachment.size})</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail Modal */}
      <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedAnnouncement && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl pr-8">
                  {selectedAnnouncement.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Teacher Info */}
                <div className="flex items-center gap-3 pb-4 border-b">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedAnnouncement.teacherAvatar} alt={selectedAnnouncement.teacherName} />
                    <AvatarFallback>
                      {selectedAnnouncement.teacherName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{selectedAnnouncement.teacherName}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="h-3 w-3" />
                      {selectedAnnouncement.timestamp.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="prose max-w-none">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {selectedAnnouncement.message}
                  </p>
                </div>

                {/* Attachment */}
                {selectedAnnouncement.attachment && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Attachment</h4>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div className="flex items-center gap-3">
                        {getAttachmentIcon(selectedAnnouncement.attachment.type)}
                        <div>
                          <p className="font-medium text-gray-900">{selectedAnnouncement.attachment.name}</p>
                          <p className="text-sm text-gray-600">{selectedAnnouncement.attachment.size}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Empty State */}
      {announcements.length === 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-12 text-center">
            <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
            <p className="text-gray-600">You'll see announcements from your teachers here</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}