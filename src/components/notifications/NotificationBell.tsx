
import { useState } from 'react';
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

const NotificationBell = () => {
  const [notifications] = useState([
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
        <div className="px-4 py-2 font-medium border-b">
          {t('notifications')}
        </div>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="px-4 py-3 cursor-pointer"
            >
              <div>
                <p className={notification.read ? 'text-muted-foreground' : 'font-medium'}>
                  {notification.title}
                </p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
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
