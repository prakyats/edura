import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { 
  Send, 
  Paperclip, 
  FileText, 
  Image, 
  File,
  X,
  Clock,
  Users,
  CheckCircle,
  Upload
} from 'lucide-react';
import { User } from '../../../App';
import { toast } from 'sonner@2.0.3';

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
  studentsNotified: number;
}

interface TeacherAnnouncementsProps {
  user: User;
}

export function TeacherAnnouncements({ user }: TeacherAnnouncementsProps) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data for published announcements
  const [publishedAnnouncements, setPublishedAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Mid-term Examination Schedule Released',
      message: 'Dear students, the mid-term examination schedule for all subjects has been released. Please check the attached PDF for detailed timings and examination halls.',
      timestamp: new Date('2024-01-15T10:30:00'),
      teacherName: user.name,
      teacherAvatar: user.avatar,
      attachment: {
        name: 'midterm-schedule.pdf',
        type: 'pdf',
        url: '#',
        size: '245 KB'
      },
      studentsNotified: 312
    },
    {
      id: '2',
      title: 'Assignment Submission Deadline Extended',
      message: 'The deadline for Database Systems assignment has been extended to next Friday due to technical issues with the submission portal.',
      timestamp: new Date('2024-01-13T09:45:00'),
      teacherName: user.name,
      teacherAvatar: user.avatar,
      studentsNotified: 156
    }
  ]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      
      // Check file type
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please select a PDF, image, or document file');
        return;
      }
      
      setAttachment(file);
      toast.success('File attached successfully');
    }
  };

  const removeAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="h-4 w-4 text-blue-500" />;
    } else if (file.type === 'application/pdf') {
      return <FileText className="h-4 w-4 text-red-500" />;
    } else {
      return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  const getFileType = (file: File): 'pdf' | 'image' | 'doc' => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type === 'application/pdf') return 'pdf';
    return 'doc';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handlePublish = async () => {
    if (!title.trim() || !message.trim()) {
      toast.error('Please fill in both title and message');
      return;
    }

    setIsPublishing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      title: title.trim(),
      message: message.trim(),
      timestamp: new Date(),
      teacherName: user.name,
      teacherAvatar: user.avatar,
      attachment: attachment ? {
        name: attachment.name,
        type: getFileType(attachment),
        url: URL.createObjectURL(attachment),
        size: formatFileSize(attachment.size)
      } : undefined,
      studentsNotified: 245 // Mock number of students notified
    };

    setPublishedAnnouncements([newAnnouncement, ...publishedAnnouncements]);

    // Clear form
    setTitle('');
    setMessage('');
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setIsPublishing(false);
    toast.success(`Announcement published and sent to ${newAnnouncement.studentsNotified} students!`);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Announcements</h1>
        <p className="text-gray-600">Create and manage announcements for your students</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Announcement Form */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Create New Announcement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title Input */}
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter announcement title..."
                className="mt-1"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your announcement message..."
                rows={6}
                className="mt-1 resize-none"
              />
            </div>

            {/* File Attachment */}
            <div>
              <Label>Attachment (Optional)</Label>
              <div className="mt-2">
                {attachment ? (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-3">
                      {getFileIcon(attachment)}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                        <p className="text-xs text-gray-600">{formatFileSize(attachment.size)}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removeAttachment}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, Images, or Documents (Max: 10MB)
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>

            {/* Publish Button */}
            <Button
              onClick={handlePublish}
              disabled={!title.trim() || !message.trim() || isPublishing}
              className="w-full gap-2"
            >
              {isPublishing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Publish Announcement
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Published Announcements */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Recent Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            {publishedAnnouncements.length > 0 ? (
              <div className="space-y-4">
                {publishedAnnouncements.slice(0, 3).map((announcement) => (
                  <div key={announcement.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 line-clamp-1">
                        {announcement.title}
                      </h4>
                      <Badge variant="outline" className="ml-2 flex-shrink-0">
                        <Users className="h-3 w-3 mr-1" />
                        {announcement.studentsNotified}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {announcement.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {formatDate(announcement.timestamp)}
                      </div>
                      {announcement.attachment && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Paperclip className="h-3 w-3" />
                          Attachment
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {publishedAnnouncements.length > 3 && (
                  <div className="text-center pt-2">
                    <Button variant="ghost" size="sm">
                      View all {publishedAnnouncements.length} announcements
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No announcements published yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}