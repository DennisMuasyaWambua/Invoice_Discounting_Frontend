import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboardIcon, FileTextIcon, WalletIcon, HistoryIcon, SettingsIcon, TrendingUpIcon, XIcon, ActivityIcon, ShieldCheckIcon, ClockIcon, UsersIcon, BarChart3Icon } from 'lucide-react';
type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  userType?: 'provider' | 'investor' | 'admin';
};
type NavItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};
const providerNavItems: NavItem[] = [{
  label: 'Dashboard',
  path: '/',
  icon: <LayoutDashboardIcon className="w-5 h-5" />
}, {
  label: 'Invoices',
  path: '/invoices',
  icon: <FileTextIcon className="w-5 h-5" />
}, {
  label: 'Funding',
  path: '/funding',
  icon: <WalletIcon className="w-5 h-5" />
}, {
  label: 'Transactions',
  path: '/transactions',
  icon: <HistoryIcon className="w-5 h-5" />
}, {
  label: 'Settings',
  path: '/settings',
  icon: <SettingsIcon className="w-5 h-5" />
}];
const investorNavItems: NavItem[] = [{
  label: 'Portfolio',
  path: '/investor',
  icon: <TrendingUpIcon className="w-5 h-5" />
}, {
  label: 'Opportunities',
  path: '/investor/opportunities',
  icon: <ActivityIcon className="w-5 h-5" />
}, {
  label: 'Transactions',
  path: '/transactions',
  icon: <HistoryIcon className="w-5 h-5" />
}, {
  label: 'Settings',
  path: '/settings',
  icon: <SettingsIcon className="w-5 h-5" />
}];
const adminNavItems: NavItem[] = [{
  label: 'Dashboard',
  path: '/admin',
  icon: <LayoutDashboardIcon className="w-5 h-5" />
}, {
  label: 'Approval Queue',
  path: '/admin/approvals',
  icon: <ClockIcon className="w-5 h-5" />
}, {
  label: 'Providers',
  path: '/admin/providers',
  icon: <UsersIcon className="w-5 h-5" />
}, {
  label: 'All Invoices',
  path: '/admin/invoices',
  icon: <FileTextIcon className="w-5 h-5" />
}, {
  label: 'Reports',
  path: '/admin/reports',
  icon: <BarChart3Icon className="w-5 h-5" />
}, {
  label: 'Settings',
  path: '/admin/settings',
  icon: <SettingsIcon className="w-5 h-5" />
}];
export function Sidebar({
  isOpen,
  onClose,
  userType = 'provider'
}: SidebarProps) {
  const location = useLocation();
  const navItems = userType === 'admin' ? adminNavItems : userType === 'investor' ? investorNavItems : providerNavItems;
  const getUserTypeLabel = () => {
    switch (userType) {
      case 'admin':
        return {
          short: 'AD',
          full: 'Admin / Credit Team',
          org: 'Nexus Protocol'
        };
      case 'investor':
        return {
          short: 'LP',
          full: 'Institutional Investor',
          org: 'Qualified Investor'
        };
      default:
        return {
          short: 'HP',
          full: 'Healthcare Provider',
          org: 'Nairobi Medical Centre'
        };
    }
  };
  const userLabel = getUserTypeLabel();
  return <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden" onClick={onClose} aria-hidden="true" />}

      {/* Sidebar */}
      <aside className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${userType === 'admin' ? 'bg-red-600' : 'bg-primary-600'}`}>
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <span className="text-base font-bold text-gray-900 block leading-tight">
                  Nexus
                </span>
                <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                  {userType === 'admin' ? 'Admin Portal' : 'Protocol'}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Close sidebar">
              <XIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map(item => {
            const isActive = location.pathname === item.path || item.path !== '/' && item.path !== '/admin' && location.pathname.startsWith(item.path);
            return <NavLink key={item.path} to={item.path} onClick={onClose} className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg
                    text-sm font-medium transition-colors duration-150
                    ${isActive ? userType === 'admin' ? 'bg-red-50 text-red-700' : 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                  `}>
                  <span className={isActive ? userType === 'admin' ? 'text-red-600' : 'text-primary-600' : 'text-gray-400'}>
                    {item.icon}
                  </span>
                  {item.label}
                </NavLink>;
          })}
          </nav>

          {/* Compliance Footer */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg mb-3">
              <ShieldCheckIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-700">
                  {userLabel.full}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{userLabel.org}</p>
              </div>
            </div>
            {userType !== 'admin' && <p className="text-[10px] text-gray-400 leading-relaxed">
                Regulated receivables financing. All funding subject to credit
                approval. Not a securities offering.
              </p>}
            {userType === 'admin' && <p className="text-[10px] text-gray-400 leading-relaxed">
                Internal credit team portal. All actions are logged and
                auditable.
              </p>}
          </div>
        </div>
      </aside>
    </>;
}