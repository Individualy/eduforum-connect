
import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New reply to your discussion',
      time: '5m ago',
      read: false,
    },
    {
      id: 2,
      title: 'Your post was featured',
      time: '1h ago',
      read: false,
    },
  ]);

  const { t } = useLanguage();
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Handle new notifications
  useEffect(() => {
    const handleNewNotification = (event: CustomEvent) => {
      const { title, message } = event.detail;
      const newNotification = {
        id: Date.now(),
        title: `${title}: ${message}`,
        time: 'just now',
        read: false,
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      toast({
        title: t('newNotification'),
        description: newNotification.title,
      });
    };

    document.addEventListener('newNotification', handleNewNotification as EventListener);
    
    return () => {
      document.removeEventListener('newNotification', handleNewNotification as EventListener);
    };
  }, [t]);
  
  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[300px]">
        <div className="flex justify-between items-center px-4 py-2 font-medium border-b">
          <div>{t('notifications')}</div>
          {notifications.length > 0 && (
            <div className="flex gap-1">
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-7 text-xs px-2">
                  {t('markAllAsRead')}
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={clearAllNotifications} className="h-7 text-xs px-2">
                {t('clearAll')}
              </Button>
            </div>
          )}
        </div>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="px-4 py-3 cursor-pointer focus:bg-muted"
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start gap-2 w-full">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${notification.read ? 'bg-transparent' : 'bg-primary'}`}></div>
                <div className="flex-grow">
                  <p className={notification.read ? 'text-muted-foreground' : 'font-medium'}>
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            </DropdownMenuItem>
          ))
        ) : (
          <div className="px-4 py-3 text-center text-muted-foreground">
            {t('noNotifications')}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
