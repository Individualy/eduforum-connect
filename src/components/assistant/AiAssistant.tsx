
import { useState, useRef, useEffect } from 'react';
import { Bot, X, Maximize2, Minimize2, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, useDragControls } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { useAssistant } from '@/contexts/AssistantContext';
import { cn } from '@/lib/utils';
import { sendMessageToAssistant } from '@/services/aiAssistantService';
import AnimatedTransition from '../ui/AnimatedTransition';

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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const dragControls = useDragControls();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  const { isAssistantVisible } = useAssistant();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-resize textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

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

    try {
      const response = await sendMessageToAssistant(userMessage.content);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.text,
        timestamp: response.timestamp
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

  // Different layout for mobile and desktop
  return isAssistantVisible ? (
    <>
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
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
              <Button 
                size="icon" 
                className="rounded-full w-14 h-14 bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-700 transition-all duration-300"
              >
                <AnimatedTransition type="scale">
                  <Bot className="h-7 w-7 text-white" />
                </AnimatedTransition>
              </Button>
            </motion.div>
          </DrawerTrigger>
          <DrawerContent className="px-4 pt-4 pb-8 max-h-[85vh]">
            <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-muted" />
            <ChatInterface 
              messages={messages}
              inputValue={inputValue}
              setInputValue={setInputValue}
              isLoading={isLoading}
              handleSendMessage={handleSendMessage}
              scrollAreaRef={scrollAreaRef}
              textareaRef={textareaRef}
              onClose={() => setIsOpen(false)}
            />
          </DrawerContent>
        </Drawer>
      ) : (
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
                className="rounded-full w-14 h-14 bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-700 transition-all duration-300"
              >
                <AnimatedTransition type="scale">
                  <Bot className="h-7 w-7 text-white" />
                </AnimatedTransition>
              </Button>
            </SheetTrigger>
            <SheetContent
              className={cn(
                "w-[380px] sm:w-[440px] p-6 rounded-2xl overflow-hidden border-2 border-indigo-100 dark:border-indigo-950/40 shadow-xl",
                isExpanded && "w-[600px] sm:w-[700px]"
              )}
              side={isExpanded ? "right" : "bottom"}
            >
              <ChatInterface 
                messages={messages}
                inputValue={inputValue}
                setInputValue={setInputValue}
                isLoading={isLoading}
                handleSendMessage={handleSendMessage}
                scrollAreaRef={scrollAreaRef}
                textareaRef={textareaRef}
                onClose={() => setIsOpen(false)}
                isExpanded={isExpanded}
                toggleExpanded={() => setIsExpanded(!isExpanded)}
              />
            </SheetContent>
          </Sheet>
        </motion.div>
      )}
    </>
  ) : null;
};

interface ChatInterfaceProps {
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  isLoading: boolean;
  handleSendMessage: () => void;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  onClose: () => void;
  isExpanded?: boolean;
  toggleExpanded?: () => void;
}

const ChatInterface = ({ 
  messages, 
  inputValue, 
  setInputValue, 
  isLoading, 
  handleSendMessage,
  scrollAreaRef,
  textareaRef,
  onClose,
  isExpanded,
  toggleExpanded
}: ChatInterfaceProps) => {
  return (
    <div className="flex flex-col h-full">
      <SheetHeader className="flex flex-row items-center justify-between mb-4">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2 bg-gradient-to-r from-purple-500 to-indigo-600">
            <AvatarImage src="/assistant-avatar.png" alt="AI Assistant" />
            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">AI</AvatarFallback>
          </Avatar>
          <SheetTitle className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Trợ lý ảo EduForum</SheetTitle>
        </div>
        <div className="flex gap-2">
          {toggleExpanded && (
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleExpanded}
              className="h-8 w-8"
            >
              {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          )}
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </SheetHeader>

      <ScrollArea 
        className="flex-1 pr-4 mb-4 max-h-[60vh]" 
        ref={scrollAreaRef}
      >
        <div className="space-y-4">
          {messages.map((message, index) => (
            <MessageBubble 
              key={index} 
              message={message} 
              isFirst={index === 0} 
              isLast={index === messages.length - 1}
            />
          ))}
          {isLoading && (
            <Card className="p-3 bg-secondary/60 backdrop-blur-sm max-w-[80%] mr-auto rounded-2xl rounded-tl-sm animate-pulse">
              <div className="flex gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/assistant-avatar.png" alt="AI" />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs">AI</AvatarFallback>
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
      
      <div className="mt-auto">
        <div className="flex items-end gap-2 bg-muted/30 rounded-xl p-3 backdrop-blur-sm border border-muted">
          <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Nhập câu hỏi của bạn..."
            className="resize-none min-h-[40px] max-h-[120px] bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
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
            size="icon"
            className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-xs text-muted-foreground mt-2 text-center">
          <span className="flex items-center justify-center gap-1">
            <Sparkles className="h-3 w-3" /> Được hỗ trợ bởi Google AI Studio
          </span>
        </div>
      </div>
    </div>
  );
};

interface MessageBubbleProps {
  message: Message;
  isFirst: boolean;
  isLast: boolean;
}

const MessageBubble = ({ message, isFirst, isLast }: MessageBubbleProps) => {
  const isAssistant = message.role === 'assistant';
  
  return (
    <AnimatedTransition type="fade">
      <Card 
        className={cn(
          "p-3 max-w-[80%] border-0",
          isAssistant 
            ? "bg-secondary/60 backdrop-blur-sm mr-auto rounded-2xl rounded-tl-sm" 
            : "bg-gradient-to-r from-purple-500/90 to-indigo-500/90 text-white ml-auto rounded-2xl rounded-br-sm"
        )}
      >
        <div className="flex gap-2">
          {isAssistant && (
            <Avatar className="h-6 w-6 flex-shrink-0">
              <AvatarImage src="/assistant-avatar.png" alt="AI" />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs">AI</AvatarFallback>
            </Avatar>
          )}
          <div className="space-y-1 w-full">
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            <p className="text-xs text-right opacity-70">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </Card>
    </AnimatedTransition>
  );
};

export default AiAssistant;
