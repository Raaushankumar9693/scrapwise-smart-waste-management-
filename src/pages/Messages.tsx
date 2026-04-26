import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { getConversationsForUser, getConversationById, Conversation, Message } from '@/data/messages';
import { getListingById } from '@/data/listings';
import { Send, Search, ArrowLeft, Paperclip, Phone, MoreVertical, MessageCircle } from 'lucide-react';

export default function Messages() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const [searchParams] = useSearchParams();
  const listingParam = searchParams.get('listing');

  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileList, setShowMobileList] = useState(!conversationId);

  useEffect(() => {
    if (user) {
      setConversations(getConversationsForUser(user.id));
    }
  }, [user]);

  useEffect(() => {
    if (conversationId) {
      const conv = getConversationById(conversationId);
      if (conv) {
        setActiveConversation(conv);
        setShowMobileList(false);
      }
    }
  }, [conversationId]);

  // If coming from a listing inquiry
  useEffect(() => {
    if (listingParam && user) {
      const listing = getListingById(listingParam);
      if (listing) {
        // Check if conversation exists
        const existingConv = conversations.find(c => c.listingId === listingParam);
        if (existingConv) {
          setActiveConversation(existingConv);
        } else {
          // Create mock new conversation
          const mockConv: Conversation = {
            id: `conv-new-${Date.now()}`,
            participants: [
              { id: user.id, name: user.name },
              { id: listing.sellerId, name: listing.sellerName },
            ],
            listingId: listing.id,
            listingTitle: listing.title,
            lastMessage: '',
            lastMessageTime: new Date().toISOString(),
            unreadCount: 0,
            messages: [],
          };
          setActiveConversation(mockConv);
        }
        setShowMobileList(false);
      }
    }
  }, [listingParam, user, conversations]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation || !user) return;

    const message: Message = {
      id: `m-${Date.now()}`,
      senderId: user.id,
      senderName: user.name,
      content: newMessage,
      timestamp: new Date().toLocaleString(),
      isRead: false,
    };

    setActiveConversation(prev => ({
      ...prev!,
      messages: [...prev!.messages, message],
      lastMessage: newMessage,
      lastMessageTime: message.timestamp,
    }));

    setNewMessage('');
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participants.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    conv.listingTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getOtherParticipant = (conv: Conversation) => {
    return conv.participants.find(p => p.id !== user?.id);
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-12rem)] flex flex-col">
        <h1 className="text-3xl font-bold text-foreground mb-4">Messages</h1>

        <div className="flex-1 flex border border-border/50 rounded-xl overflow-hidden bg-card">
          {/* Conversation List */}
          <div className={`w-full md:w-80 border-r border-border/50 flex flex-col ${!showMobileList ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-4 border-b border-border/50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-10"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No conversations yet</p>
                </div>
              ) : (
                filteredConversations.map((conv) => {
                  const other = getOtherParticipant(conv);
                  const isActive = activeConversation?.id === conv.id;
                  return (
                    <button
                      key={conv.id}
                      onClick={() => {
                        setActiveConversation(conv);
                        setShowMobileList(false);
                      }}
                      className={`w-full p-4 flex gap-3 hover:bg-muted/50 transition-colors border-b border-border/50 text-left ${
                        isActive ? 'bg-primary/5 border-l-2 border-l-primary' : ''
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary shrink-0">
                        {other?.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-foreground truncate">{other?.name}</p>
                          <span className="text-xs text-muted-foreground">{conv.lastMessageTime.split(' ')[0]}</span>
                        </div>
                        {conv.listingTitle && (
                          <p className="text-xs text-primary truncate">{conv.listingTitle}</p>
                        )}
                        <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                      </div>
                      {conv.unreadCount > 0 && (
                        <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center shrink-0">
                          {conv.unreadCount}
                        </div>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Chat Window */}
          <div className={`flex-1 flex flex-col ${showMobileList ? 'hidden md:flex' : 'flex'}`}>
            {activeConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border/50 flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setShowMobileList(true)}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                    {getOtherParticipant(activeConversation)?.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {getOtherParticipant(activeConversation)?.name}
                    </p>
                    {activeConversation.listingTitle && (
                      <p className="text-xs text-primary">{activeConversation.listingTitle}</p>
                    )}
                  </div>
                  <Button variant="ghost" size="icon">
                    <Phone className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {activeConversation.messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground">Start the conversation</p>
                        {activeConversation.listingTitle && (
                          <p className="text-sm text-primary mt-1">
                            About: {activeConversation.listingTitle}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    activeConversation.messages.map((message) => {
                      const isOwn = message.senderId === user?.id;
                      return (
                        <div
                          key={message.id}
                          className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                              isOwn
                                ? 'bg-primary text-primary-foreground rounded-br-md'
                                : 'bg-muted text-foreground rounded-bl-md'
                            }`}
                          >
                            <p>{message.content}</p>
                            <p className={`text-xs mt-1 ${isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                              {message.timestamp.split(' ').slice(-1)[0]}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-border/50">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="shrink-0">
                      <Paperclip className="w-5 h-5" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button variant="hero" size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">Choose from your existing conversations or start a new one</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
