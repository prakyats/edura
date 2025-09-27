import { useState } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Progress } from './ui/progress';
import { 
  AlertTriangle, 
  TrendingDown, 
  Calendar,
  GraduationCap,
  Send,
  Download,
  Filter,
  Eye,
  BarChart3
} from 'lucide-react';
import { User, CurrentPage } from '../App';

interface ReportsPageProps {
  user: User;
  onLogout: () => void;
  onNavigate: (page: CurrentPage) => void;
}

export function ReportsPage({ user, onLogout, onNavigate }: ReportsPageProps) {
  const [currentPage] = useState<CurrentPage>('reports');

  // Mock data for flagged students
  const flaggedStudents = [
    {
      id: 1,
      name: 'Jordan Smith',
      email: 'jordan.smith@university.edu',
      course: 'CS 4780 - Machine Learning',
      riskLevel: 85,
      reasons: [
        'Attendance dropped to 45% (3 week trend)',
        'Quiz scores declining (-15% avg)',
        'Missing 4 consecutive assignments',
        'Low engagement in virtual classes'
      ],
      lastActive: '3 days ago',
      gpa: 2.1,
      previousGpa: 3.2,
      interventionsSent: 2,
      responseRate: 0,
      professor: 'Dr. Sarah Chen',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 2,
      name: 'Sam Wilson',
      email: 'sam.wilson@university.edu',
      course: 'CS 3240 - Software Engineering',
      riskLevel: 72,
      reasons: [
        'Missed 3 project deadlines',
        'Low participation in team activities',
        'Assignment quality below standard',
        'Irregular login patterns'
      ],
      lastActive: '1 day ago',
      gpa: 2.4,
      previousGpa: 2.8,
      interventionsSent: 1,
      responseRate: 50,
      professor: 'Prof. Michael Rodriguez',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 3,
      name: 'Alex Rivera',
      email: 'alex.rivera@university.edu',
      course: 'CS 2110 - Data Structures',
      riskLevel: 68,
      reasons: [
        'Struggling with algorithm complexity',
        'Low lab exercise completion (60%)',
        'Peer collaboration scores declining',
        'Help-seeking behavior decreased'
      ],
      lastActive: '12 hours ago',
      gpa: 2.6,
      previousGpa: 2.9,
      interventionsSent: 0,
      responseRate: 0,
      professor: 'Dr. Emily Johnson',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 4,
      name: 'Casey Johnson',
      email: 'casey.johnson@university.edu',
      course: 'CS 1110 - Introduction to Programming',
      riskLevel: 79,
      reasons: [
        'High error rate in coding assignments',
        'Limited office hours attendance',
        'Difficulty with debugging concepts',
        'Exam scores consistently low'
      ],
      lastActive: '2 days ago',
      gpa: 1.9,
      previousGpa: 2.4,
      interventionsSent: 3,
      responseRate: 33,
      professor: 'Prof. David Kim',
      avatar: '/api/placeholder/40/40'
    }
  ];

  const summaryStats = {
    totalAtRisk: flaggedStudents.length,
    highRisk: flaggedStudents.filter(s => s.riskLevel >= 80).length,
    mediumRisk: flaggedStudents.filter(s => s.riskLevel >= 60 && s.riskLevel < 80).length,
    lowRisk: flaggedStudents.filter(s => s.riskLevel < 60).length,
    interventionsSent: flaggedStudents.reduce((sum, s) => sum + s.interventionsSent, 0),
    avgResponseRate: Math.round(flaggedStudents.reduce((sum, s) => sum + s.responseRate, 0) / flaggedStudents.length)
  };

  const getRiskColor = (riskLevel: number) => {
    if (riskLevel >= 80) return 'destructive';
    if (riskLevel >= 60) return 'secondary';
    return 'outline';
  };

  const getRiskLabel = (riskLevel: number) => {
    if (riskLevel >= 80) return 'High Risk';
    if (riskLevel >= 60) return 'Medium Risk';
    return 'Low Risk';
  };

  const handleSendIntervention = (studentId: number) => {
    console.log('Sending intervention to student:', studentId);
    // In a real app, this would trigger an intervention workflow
  };

  const handleViewDetails = (studentId: number) => {
    console.log('Viewing details for student:', studentId);
    // In a real app, this would open a detailed student profile
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
      <Navbar user={user} onLogout={onLogout} onNavigate={onNavigate} currentPage={currentPage} />
      
      <main className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              Student Risk Assessment Report
            </h1>
            <p className="text-muted-foreground">
              AI-powered early intervention system for at-risk students
            </p>
          </motion.div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total At-Risk</CardTitle>
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{summaryStats.totalAtRisk}</div>
                <p className="text-xs text-muted-foreground mt-2">Students flagged this week</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Risk</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{summaryStats.highRisk}</div>
                <p className="text-xs text-muted-foreground mt-2">Require immediate attention</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Interventions Sent</CardTitle>
                <Send className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{summaryStats.interventionsSent}</div>
                <p className="text-xs text-muted-foreground mt-2">This month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{summaryStats.avgResponseRate}%</div>
                <p className="text-xs text-muted-foreground mt-2">Average response to interventions</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Report Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-purple-600" />
                    Flagged Students Details
                  </CardTitle>
                  <CardDescription>
                    Students identified by AI as requiring intervention based on multiple risk factors
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {flaggedStudents.map((student) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: student.id * 0.1 }}
                    className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Student Info */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{student.name}</h3>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                            <p className="text-sm font-medium">{student.course}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant={getRiskColor(student.riskLevel)} className="text-sm">
                            {getRiskLabel(student.riskLevel)} ({student.riskLevel}%)
                          </Badge>
                          <div className="text-right">
                            <p className="text-sm font-medium">GPA: {student.gpa}</p>
                            <p className="text-xs text-muted-foreground">
                              Previously: {student.previousGpa}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Risk Level</span>
                            <span>{student.riskLevel}%</span>
                          </div>
                          <Progress value={student.riskLevel} className="h-2" />
                        </div>
                      </div>

                      {/* Risk Factors */}
                      <div className="space-y-4">
                        <h4 className="font-medium flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                          Risk Factors
                        </h4>
                        <ul className="space-y-2">
                          {student.reasons.map((reason, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                              {reason}
                            </li>
                          ))}
                        </ul>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Last Active</p>
                            <p className="font-medium">{student.lastActive}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Professor</p>
                            <p className="font-medium">{student.professor}</p>
                          </div>
                        </div>
                      </div>

                      {/* Intervention Actions */}
                      <div className="space-y-4">
                        <h4 className="font-medium">Intervention History</h4>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Interventions Sent</span>
                            <span className="font-medium">{student.interventionsSent}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Response Rate</span>
                            <span className="font-medium">{student.responseRate}%</span>
                          </div>
                          {student.responseRate > 0 && (
                            <Progress value={student.responseRate} className="h-2" />
                          )}
                        </div>

                        <div className="space-y-2">
                          <Button 
                            onClick={() => handleSendIntervention(student.id)}
                            className="w-full gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                          >
                            <Send className="h-4 w-4" />
                            Send Intervention
                          </Button>
                          
                          <Button 
                            variant="outline"
                            onClick={() => handleViewDetails(student.id)}
                            className="w-full gap-2"
                          >
                            <Eye className="h-4 w-4" />
                            View Details
                          </Button>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          <p>Suggested actions:</p>
                          <ul className="mt-1 space-y-1">
                            <li>• Schedule 1-on-1 meeting</li>
                            <li>• Connect with academic advisor</li>
                            <li>• Recommend tutoring services</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Risk Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">High Risk (80%+)</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-red-200 rounded-full">
                      <div 
                        className="h-full bg-red-600 rounded-full"
                        style={{ width: `${(summaryStats.highRisk / summaryStats.totalAtRisk) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{summaryStats.highRisk}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Medium Risk (60-79%)</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-orange-200 rounded-full">
                      <div 
                        className="h-full bg-orange-600 rounded-full"
                        style={{ width: `${(summaryStats.mediumRisk / summaryStats.totalAtRisk) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{summaryStats.mediumRisk}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Weekly Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>New flagged students</span>
                  <span className="font-medium text-red-600">+{summaryStats.totalAtRisk}</span>
                </div>
                <div className="flex justify-between">
                  <span>Interventions sent</span>
                  <span className="font-medium text-blue-600">{summaryStats.interventionsSent}</span>
                </div>
                <div className="flex justify-between">
                  <span>Students improved</span>
                  <span className="font-medium text-green-600">2</span>
                </div>
                <div className="flex justify-between">
                  <span>Response rate</span>
                  <span className="font-medium">{summaryStats.avgResponseRate}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}