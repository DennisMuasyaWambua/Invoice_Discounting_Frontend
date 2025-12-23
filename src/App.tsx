import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { InvoiceManagement } from './pages/InvoiceManagement';
import { InvoiceUpload } from './pages/InvoiceUpload';
import { InvoiceDetail } from './pages/InvoiceDetail';
import { FundingDashboard } from './pages/FundingDashboard';
import { CreditProfile } from './pages/CreditProfile';
import { Transactions } from './pages/Transactions';
import { InvestorDashboard } from './pages/InvestorDashboard';
import { Settings } from './pages/Settings';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ApprovalQueue } from './pages/admin/ApprovalQueue';
import { ProviderManagement } from './pages/admin/ProviderManagement';
import { Reports } from './pages/admin/Reports';
export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // In production, this would come from auth context
  const [userType, setUserType] = useState<'provider' | 'investor' | 'admin'>('provider');
  return <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin routes */}
        <Route path="/admin/*" element={<div className="flex h-screen bg-gray-50">
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userType="admin" />

              <div className="flex-1 flex flex-col min-w-0">
                <TopBar onMenuClick={() => setSidebarOpen(true)} />

                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/approvals" element={<ApprovalQueue />} />
                  <Route path="/providers" element={<ProviderManagement />} />
                  <Route path="/invoices" element={<InvoiceManagement />} />
                  <Route path="/invoices/:id" element={<InvoiceDetail />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </div>
            </div>} />

        {/* Protected routes with layout */}
        <Route path="/*" element={<div className="flex h-screen bg-gray-50">
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userType={userType} />

              <div className="flex-1 flex flex-col min-w-0">
                <TopBar onMenuClick={() => setSidebarOpen(true)} />

                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/invoices" element={<InvoiceManagement />} />
                  <Route path="/invoices/upload" element={<InvoiceUpload />} />
                  <Route path="/invoices/:id" element={<InvoiceDetail />} />
                  <Route path="/funding" element={<FundingDashboard />} />
                  <Route path="/credit" element={<CreditProfile />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/investor" element={<InvestorDashboard />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </div>
            </div>} />
      </Routes>
    </BrowserRouter>;
}