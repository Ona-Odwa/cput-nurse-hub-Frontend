import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Send } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Messages() {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock users data - will be replaced with API call
  const users = [
    { id: 1, name: 'Dr. Michael Chen', role: 'staff', lastMessage: 'Thanks for the update', time: '10:30 AM' },
    { id: 2, name: 'Sarah Johnson', role: 'student', lastMessage: 'Can we discuss my placement?', time: '09:15 AM' },
    { id: 3, name: 'Admin User', role: 'admin', lastMessage: 'System maintenance scheduled', time: 'Yesterday' },
    { id: 4, name: 'Dr. Lisa Brown', role: 'staff', lastMessage: 'Your document has been approved', time: 'Yesterday' },
  ];

  // Mock messages for selected user
  const messages = selectedUser ? [
    { id: 1, senderId: selectedUser.id, text: 'Hello! How can I help you?', time: '09:00 AM', isOwn: false },
    { id: 2, senderId: user?.id, text: 'I have a question about my placement', time: '09:05 AM', isOwn: true },
    { id: 3, senderId: selectedUser.id, text: selectedUser.lastMessage, time: selectedUser.time, isOwn: false },
  ] : [];

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim() && selectedUser) {
      // TODO: Implement send message API call
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground mt-2">
            Communicate with students, staff, and administrators
          </p>
        </div>

        <Card className="h-[calc(100vh-16rem)]">
          <div className="flex h-full">
            {/* Users List */}
            <div className="w-80 border-r flex flex-col">
              <CardHeader className="border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </CardHeader>
              <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                  {filteredUsers.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => setSelectedUser(u)}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        selectedUser?.id === u.id
                          ? 'bg-primary/10 border border-primary/20'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/20 text-primary">
                            {getInitials(u.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">{u.name}</p>
                            <span className="text-xs text-muted-foreground">{u.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{u.lastMessage}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedUser ? (
                <>
                  {/* Chat Header */}
                  <CardHeader className="border-b">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {getInitials(selectedUser.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{selectedUser.name}</CardTitle>
                        <p className="text-sm text-muted-foreground capitalize">{selectedUser.role}</p>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              msg.isOwn
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{msg.text}</p>
                            <p className={`text-xs mt-1 ${
                              msg.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            }`}>
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Type your message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        className="resize-none"
                        rows={2}
                      />
                      <Button onClick={handleSendMessage} className="self-end">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  <p>Select a user to start messaging</p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
