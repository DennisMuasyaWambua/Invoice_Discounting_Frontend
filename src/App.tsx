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
import { authService } from './services/authService';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getStoredUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AuthRedirect() {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getStoredUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  } else if (user?.role === 'financier') {
    return <Navigate to="/investor" replace />;
  } else {
    return <Navigate to="/dashboard" replace />;
  }
}

export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Root redirect based on authentication */}
        <Route path="/" element={<AuthRedirect />} />

        {/* Admin routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <div className="flex h-screen bg-gray-50">
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userType="admin" />
              <div className="flex-1 flex flex-col min-w-0">
                <TopBar onMenuClick={() => setSidebarOpen(true)} />
                <Routes>
                  <Route index element={<AdminDashboard />} />
                  <Route path="approvals" element={<ApprovalQueue />} />
                  <Route path="providers" element={<ProviderManagement />} />
                  <Route path="invoices" element={<InvoiceManagement />} />
                  <Route path="invoices/:id" element={<InvoiceDetail />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="settings" element={<Settings />} />
                </Routes>
              </div>
            </div>
          </ProtectedRoute>
        } />

        {/* Investor routes */}
        <Route path="/investor/*" element={
          <ProtectedRoute allowedRoles={['financier']}>
            <div className="flex h-screen bg-gray-50">
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userType="investor" />
              <div className="flex-1 flex flex-col min-w-0">
                <TopBar onMenuClick={() => setSidebarOpen(true)} />
                <Routes>
                  <Route index element={<InvestorDashboard />} />
                  <Route path="settings" element={<Settings />} />
                </Routes>
              </div>
            </div>
          </ProtectedRoute>
        } />

        {/* Provider routes */}
        <Route path="/*" element={
          <ProtectedRoute allowedRoles={['supplier', 'buyer']}>
            <div className="flex h-screen bg-gray-50">
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userType="provider" />
              <div className="flex-1 flex flex-col min-w-0">
                <TopBar onMenuClick={() => setSidebarOpen(true)} />
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="invoices" element={<InvoiceManagement />} />
                  <Route path="invoices/upload" element={<InvoiceUpload />} />
                  <Route path="invoices/:id" element={<InvoiceDetail />} />
                  <Route path="funding" element={<FundingDashboard />} />
                  <Route path="credit" element={<CreditProfile />} />
                  <Route path="transactions" element={<Transactions />} />
                  <Route path="settings" element={<Settings />} />
                </Routes>
              </div>
            </div>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>;
}