
import { useState, useRef, useEffect } from 'react';
import { Bot, X, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, useDragControls } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AiAssistant = () => {
  const [position, setPosition] = useState({ x: 20, y: window.innerHeight - 120 });
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Xin chào! Tôi là trợ lý ảo của EduForum Connect. Tôi có thể giúp gì cho bạn?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dragControls = useDragControls();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleDragStart = (event: React.PointerEvent<HTMLDivElement>) => {
    dragControls.start(event);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Here you would integrate with Google AI Studio
    // This is a placeholder for the actual API call
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response - in production, replace with actual API call
      const assistantMessage: Message = {
        role: 'assistant',
        content: `Tôi đã nhận được câu hỏi của bạn: "${inputValue}". Đây là phản hồi từ trợ lý ảo.`,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error communicating with AI service:', error);
      toast({
        title: "Lỗi kết nối",
        description: "Không thể kết nối với dịch vụ trợ lý ảo. Vui lòng thử lại sau.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.div
        drag
        dragControls={dragControls}
        dragMomentum={false}
        dragElastic={0}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        onPointerDown={handleDragStart}
        initial={position}
        animate={{ x: position.x, y: position.y }}
        onDragEnd={(_, info) => {
          setPosition({ 
            x: position.x + info.offset.x, 
            y: position.y + info.offset.y 
          });
        }}
        className="fixed z-50 cursor-grab active:cursor-grabbing"
        whileTap={{ scale: 1.05 }}
        whileHover={{ scale: 1.1 }}
      >
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button 
              size="icon" 
              className="rounded-full w-14 h-14 bg-primary shadow-lg hover:bg-primary/90"
            >
              <Bot className="h-6 w-6 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="sm:max-w-md md:max-w-lg"
            side={isExpanded ? "right" : "bottom"}
          >
            <SheetHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/assistant-avatar.png" alt="AI Assistant" />
                  <AvatarFallback className="bg-primary text-white">AI</AvatarFallback>
                </Avatar>
                <SheetTitle>Trợ lý ảo EduForum</SheetTitle>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </SheetHeader>

            <div className="py-4 h-[70vh] flex flex-col">
              <ScrollArea 
                className="flex-1 pr-4" 
                ref={scrollAreaRef}
              >
                <div className="space-y-4 mb-4">
                  {messages.map((message, index) => (
                    <Card 
                      key={index} 
                      className={`p-3 ${
                        message.role === 'assistant' 
                          ? 'bg-secondary' 
                          : 'bg-primary/10 ml-auto'
                      } max-w-[80%] ${message.role === 'user' ? 'ml-auto' : 'mr-auto'}`}
                    >
                      <div className="flex gap-2">
                        {message.role === 'assistant' && (
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-primary text-white text-xs">AI</AvatarFallback>
                          </Avatar>
                        )}
                        <div className="space-y-1">
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                  {isLoading && (
                    <Card className="p-3 bg-secondary max-w-[80%] mr-auto animate-pulse">
                      <div className="flex gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-primary text-white text-xs">AI</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <div className="h-2 w-24 bg-primary/20 rounded"></div>
                          <div className="h-2 w-32 bg-primary/20 rounded"></div>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
              </ScrollArea>
              
              <div className="mt-4 flex gap-2">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Nhập câu hỏi của bạn..."
                  className="resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!inputValue.trim() || isLoading}
                  className="self-end"
                >
                  Gửi
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </motion.div>
    </>
  );
};

export default AiAssistant;
