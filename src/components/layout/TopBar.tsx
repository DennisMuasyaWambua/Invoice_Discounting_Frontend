import React, { useState } from 'react';
import { MenuIcon, HelpCircleIcon, UserIcon, LogOutIcon, ChevronDownIcon, ShieldCheckIcon, AlertCircleIcon, CheckCircle2Icon } from 'lucide-react';
import { NotificationBell } from '../ui/NotificationBell';
import { mockNotifications } from '../../utils/mockData';
type TopBarProps = {
  onMenuClick: () => void;
  title?: string;
  kycStatus?: 'verified' | 'pending' | 'restricted';
  etimsStatus?: 'submitted' | 'pending' | 'not_submitted';
};
export function TopBar({
  onMenuClick,
  title,
  kycStatus = 'verified',
  etimsStatus = 'submitted'
}: TopBarProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? {
      ...n,
      read: true
    } : n));
  };
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({
      ...n,
      read: true
    })));
  };
  const getKYCBanner = () => {
    if (kycStatus === 'verified' && etimsStatus === 'submitted') {
      return <div className="bg-success-50 border-b border-success-200 px-4 py-2 lg:px-6">
          <div className="flex items-center gap-2">
            <CheckCircle2Icon className="w-4 h-4 text-success-600" />
            <p className="text-sm text-success-800">
              <span className="font-medium">KYC Verified</span> • eTIMS
              Submission Complete
            </p>
          </div>
        </div>;
    }
    if (kycStatus === 'pending') {
      return <div className="bg-pending-50 border-b border-pending-200 px-4 py-2 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircleIcon className="w-4 h-4 text-pending-600" />
              <p className="text-sm text-pending-800">
                <span className="font-medium">KYC Verification Pending</span> —
                Credit approval on hold until verification complete
              </p>
            </div>
            <button className="text-sm font-medium text-pending-700 hover:text-pending-800 whitespace-nowrap ml-4">
              Complete Verification →
            </button>
          </div>
        </div>;
    }
    if (kycStatus === 'restricted') {
      return <div className="bg-red-50 border-b border-red-200 px-4 py-2 lg:px-6">
          <div className="flex items-center gap-2">
            <AlertCircleIcon className="w-4 h-4 text-red-600" />
            <p className="text-sm text-red-800">
              <span className="font-medium">Account Restricted</span> — Contact
              support for assistance
            </p>
          </div>
        </div>;
    }
    return null;
  };
  return <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Open menu">
            <MenuIcon className="w-5 h-5 text-gray-600" />
          </button>
          {title && <h1 className="text-lg font-semibold text-gray-900 hidden sm:block">
              {title}
            </h1>}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* KYC Status Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg mr-2">
            <ShieldCheckIcon className={`w-4 h-4 ${kycStatus === 'verified' ? 'text-success-600' : kycStatus === 'pending' ? 'text-pending-600' : 'text-red-600'}`} />
            <span className="text-xs font-medium text-gray-700">
              {kycStatus === 'verified' ? 'KYC Verified' : kycStatus === 'pending' ? 'KYC Pending' : 'KYC Required'}
            </span>
          </div>

          {/* Help */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Help and support">
            <HelpCircleIcon className="w-5 h-5 text-gray-600" />
          </button>

          {/* Notifications */}
          <NotificationBell notifications={notifications} onMarkAsRead={handleMarkAsRead} onMarkAllAsRead={handleMarkAllAsRead} />

          {/* Profile dropdown */}
          <div className="relative ml-2">
            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                <UserIcon className="w-4 h-4 text-primary-600" />
              </div>
              <ChevronDownIcon className="w-4 h-4 text-gray-500 hidden sm:block" />
            </button>

            {isProfileOpen && <>
                <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      Dr. Jane Wambui
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      jane@nairobimedical.co.ke
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${kycStatus === 'verified' ? 'bg-success-50 text-success-700' : kycStatus === 'pending' ? 'bg-pending-50 text-pending-700' : 'bg-red-50 text-red-700'}`}>
                        <ShieldCheckIcon className="w-3 h-3" />
                        {kycStatus === 'verified' ? 'Verified' : kycStatus === 'pending' ? 'Pending' : 'Restricted'}
                      </span>
                    </div>
                  </div>
                  <div className="py-1">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <UserIcon className="w-4 h-4" />
                      Account Settings
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      <LogOutIcon className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <p className="text-[10px] text-gray-400 leading-relaxed">
                      All transactions subject to internal credit approval and
                      regulatory compliance.
                    </p>
                  </div>
                </div>
              </>}
          </div>
        </div>
      </div>

      {/* Status Banner */}
      {getKYCBanner()}
    </header>;
}