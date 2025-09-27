import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User,
  Minimize2,
  Maximize2,
  BookOpen,
  Calculator,
  Calendar,
  HelpCircle
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: '👋 Hi! I\'m your Virtual TA. I can help you with course materials, assignments, schedules, and answer questions about your studies. How can I assist you today?',
      timestamp: new Date(),
      suggestions: [
        'Explain neural networks',
        'When is my next assignment due?',
        'Help with database normalization',
        'Show my study schedule'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('neural network') || lowerMessage.includes('neural')) {
      return '🧠 Neural networks are computing systems inspired by biological neural networks. They consist of layers of interconnected nodes (neurons) that process information. Key components include:\n\n• **Input layer**: Receives data\n• **Hidden layers**: Process information using weights and activation functions\n• **Output layer**: Produces final results\n\nWould you like me to explain forward propagation or backpropagation in detail?';
    }
    
    if (lowerMessage.includes('assignment') || lowerMessage.includes('due')) {
      return '📋 Here are your upcoming assignments:\n\n• **CS 4780**: Neural Networks Implementation - Due Oct 5th\n• **CS 3240**: Team Project Proposal - Due Oct 8th\n• **CS 2110**: Binary Tree Lab - Due Oct 10th\n\nWould you like me to provide more details about any specific assignment?';
    }
    
    if (lowerMessage.includes('database') || lowerMessage.includes('normalization')) {
      return '🗄️ Database normalization eliminates redundancy and ensures data integrity:\n\n• **1NF**: Atomic values, unique rows\n• **2NF**: 1NF + no partial dependencies\n• **3NF**: 2NF + no transitive dependencies\n\nExample: A student table with course info violates 2NF if student_id determines name, but course_id determines course_name. Split into separate tables!';
    }
    
    if (lowerMessage.includes('schedule') || lowerMessage.includes('class')) {
      return '📅 Your schedule for today:\n\n• **2:00 PM**: CS 4780 - Machine Learning (Room 301)\n• **4:00 PM**: Office Hours - Prof. Chen\n\nTomorrow:\n• **10:00 AM**: CS 3240 - Software Engineering (Room 205)\n\nWould you like me to show your full weekly schedule?';
    }
    
    if (lowerMessage.includes('grade') || lowerMessage.includes('score')) {
      return '🎯 Your recent grades:\n\n• **CS 4780 Quiz 3**: 87% (Great improvement!)\n• **CS 3240 Project 1**: 92% (Excellent work)\n• **CS 2110 Midterm**: 78% (Consider reviewing recursion)\n\nOverall GPA: 3.2. Keep up the good work! Need help with any specific topics?';
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return '🤖 I can help you with:\n\n📚 **Academic Support**\n• Explain course concepts\n• Assignment reminders\n• Study recommendations\n\n📊 **Performance Tracking**\n• Grade summaries\n• Progress analysis\n• Study tips\n\n📅 **Schedule Management**\n• Class timings\n• Due dates\n• Office hours\n\nWhat would you like to know more about?';
    }
    
    // Default responses
    const responses = [
      'That\'s an interesting question! Could you provide more context so I can give you a more specific answer?',
      'I\'d be happy to help! Can you tell me which course or topic this relates to?',
      'Let me think about that. Could you rephrase your question or be more specific?',
      'Great question! I can help you better if you let me know what you\'re working on specifically.'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(inputValue),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { icon: BookOpen, label: 'Study Help', action: 'I need help understanding course concepts' },
    { icon: Calendar, label: 'Schedule', action: 'Show my schedule for today' },
    { icon: Calculator, label: 'Grades', action: 'What are my recent grades?' },
    { icon: HelpCircle, label: 'General Help', action: 'What can you help me with?' }
  ];

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="h-14 w-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 ${
              isMinimized ? 'w-80 h-16' : 'w-96 h-[32rem]'
            } transition-all duration-300`}
          >
            <Card className="h-full shadow-2xl border-0">
              {/* Header */}
              <CardHeader className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-white/20 text-white">
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">Virtual TA</CardTitle>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-sm opacity-90">Online</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="h-8 w-8 p-0 text-white hover:bg-white/20"
                    >
                      {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 p-0 text-white hover:bg-white/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {!isMinimized && (
                <CardContent className="p-0 flex flex-col h-[calc(100%-5rem)]">
                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${
                            message.type === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          {message.type === 'bot' && (
                            <Avatar className="h-8 w-8 mt-1">
                              <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                                <Bot className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                          
                          <div
                            className={`max-w-[80%] rounded-lg px-3 py-2 ${
                              message.type === 'user'
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.type === 'user' ? 'text-white/70' : 'text-muted-foreground'
                            }`}>
                              {message.timestamp.toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>

                          {message.type === 'user' && (
                            <Avatar className="h-8 w-8 mt-1">
                              <AvatarFallback>
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      ))}

                      {/* Suggestions */}
                      {messages.length > 0 && messages[messages.length - 1].suggestions && (
                        <div className="flex flex-wrap gap-2">
                          {messages[messages.length - 1].suggestions?.map((suggestion, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Typing Indicator */}
                      {isTyping && (
                        <div className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="bg-muted rounded-lg px-3 py-2">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            </div>
                          </div>
                        </div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Quick Actions */}
                  {messages.length === 1 && (
                    <div className="p-4 border-t">
                      <p className="text-sm text-muted-foreground mb-3">Quick actions:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {quickActions.map((action, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="justify-start gap-2 h-auto py-2"
                            onClick={() => handleSuggestionClick(action.action)}
                          >
                            <action.icon className="h-4 w-4" />
                            <span className="text-xs">{action.label}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything..."
                        className="flex-1"
                      />
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isTyping}
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}