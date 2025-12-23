import React, { useEffect, useState, useRef } from 'react';
import { BellIcon, CheckIcon } from 'lucide-react';
import { Notification } from '../../utils/mockData';
type NotificationBellProps = {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
};
export function NotificationBell({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead
}: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <div className="w-2 h-2 rounded-full bg-success-500" />;
      case 'warning':
        return <div className="w-2 h-2 rounded-full bg-pending-500" />;
      default:
        return <div className="w-2 h-2 rounded-full bg-primary-500" />;
    }
  };
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };
  return <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}>
        <BellIcon className="w-5 h-5 text-gray-600" />
        {unreadCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>}
      </button>

      {isOpen && <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            {unreadCount > 0 && onMarkAllAsRead && <button onClick={onMarkAllAsRead} className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Mark all read
              </button>}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? <div className="px-4 py-8 text-center text-gray-500 text-sm">
                No notifications yet
              </div> : notifications.map(notification => <div key={notification.id} className={`px-4 py-3 border-b border-gray-50 last:border-0 ${!notification.read ? 'bg-primary-50/50' : ''}`}>
                  <div className="flex gap-3">
                    <div className="mt-1.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-0.5">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatTimestamp(notification.timestamp)}
                      </p>
                    </div>
                    {!notification.read && onMarkAsRead && <button onClick={() => onMarkAsRead(notification.id)} className="p-1 hover:bg-gray-100 rounded transition-colors" aria-label="Mark as read">
                        <CheckIcon className="w-4 h-4 text-gray-400" />
                      </button>}
                  </div>
                </div>)}
          </div>
        </div>}
    </div>;
}