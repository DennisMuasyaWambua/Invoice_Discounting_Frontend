import React, { useState } from 'react';
import { UserIcon, BuildingIcon, BellIcon, ShieldIcon, SmartphoneIcon, CheckCircleIcon } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { MPesaInput } from '../components/ui/MPesaInput';
type SettingsTab = 'profile' | 'business' | 'notifications' | 'security';
export function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [mpesaNumber, setMpesaNumber] = useState('0712 345 678');
  const tabs = [{
    id: 'profile' as const,
    label: 'Profile',
    icon: <UserIcon className="w-4 h-4" />
  }, {
    id: 'business' as const,
    label: 'Business',
    icon: <BuildingIcon className="w-4 h-4" />
  }, {
    id: 'notifications' as const,
    label: 'Notifications',
    icon: <BellIcon className="w-4 h-4" />
  }, {
    id: 'security' as const,
    label: 'Security',
    icon: <ShieldIcon className="w-4 h-4" />
  }];
  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsSaving(false);
  };
  return <PageContainer title="Settings" subtitle="Manage your account and preferences">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <Card padding="sm">
            <nav className="space-y-1">
              {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    transition-colors duration-150
                    ${activeTab === tab.id ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                  `}>
                  <span className={activeTab === tab.id ? 'text-primary-600' : 'text-gray-400'}>
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>)}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
                      <UserIcon className="w-10 h-10 text-primary-600" />
                    </div>
                    <div>
                      <Button variant="secondary" size="sm">
                        Change Photo
                      </Button>
                      <p className="text-xs text-gray-500 mt-1">
                        JPG, PNG. Max 2MB
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="First Name" defaultValue="Jane" />
                    <Input label="Last Name" defaultValue="Wambui" />
                  </div>

                  <Input label="Email" type="email" defaultValue="jane@nairobimedical.co.ke" />

                  <MPesaInput value={mpesaNumber} onChange={setMpesaNumber} label="M-Pesa Number" />

                  <div className="pt-4 border-t border-gray-100">
                    <Button onClick={handleSave} loading={isSaving}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>}

          {activeTab === 'business' && <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Input label="Business Name" defaultValue="Nairobi Medical Centre" />
                  <Input label="KRA PIN" defaultValue="A123456789B" />
                  <Input label="Business Registration Number" defaultValue="PVT-2020-12345" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="County" defaultValue="Nairobi" />
                    <Input label="Sub-County" defaultValue="Westlands" />
                  </div>

                  <Input label="Physical Address" defaultValue="123 Hospital Road, Westlands" />

                  {/* KYC Status */}
                  <div className="p-4 bg-success-50 rounded-xl border border-success-200">
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-6 h-6 text-success-600" />
                      <div>
                        <p className="font-medium text-success-800">
                          KYC Verified
                        </p>
                        <p className="text-sm text-success-700">
                          Your business documents have been verified.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <Button onClick={handleSave} loading={isSaving}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>}

          {activeTab === 'notifications' && <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[{
                id: 'invoice_approved',
                label: 'Invoice Approved',
                description: 'When your invoice is approved for funding'
              }, {
                id: 'funds_disbursed',
                label: 'Funds Disbursed',
                description: 'When funds are sent to your M-Pesa'
              }, {
                id: 'repayment_due',
                label: 'Repayment Due',
                description: 'Reminder before invoice repayment is due'
              }, {
                id: 'credit_score',
                label: 'Credit Score Updates',
                description: 'When your credit score changes'
              }, {
                id: 'marketing',
                label: 'Product Updates',
                description: 'News and updates about MediFi features'
              }].map(notification => <div key={notification.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {notification.label}
                        </p>
                        <p className="text-sm text-gray-500">
                          {notification.description}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={notification.id !== 'marketing'} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>)}

                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-4">
                      Notification Channels
                    </h4>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500" />
                        <span className="text-sm text-gray-700">
                          Email notifications
                        </span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500" />
                        <span className="text-sm text-gray-700">
                          SMS notifications
                        </span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500" />
                        <span className="text-sm text-gray-700">
                          Push notifications
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <Button onClick={handleSave} loading={isSaving}>
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>}

          {activeTab === 'security' && <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">
                      Change Password
                    </h4>
                    <div className="space-y-4">
                      <Input label="Current Password" type="password" />
                      <Input label="New Password" type="password" />
                      <Input label="Confirm New Password" type="password" />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-4">
                      Two-Factor Authentication
                    </h4>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <SmartphoneIcon className="w-6 h-6 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">
                              SMS Authentication
                            </p>
                            <p className="text-sm text-gray-500">
                              Receive codes via SMS
                            </p>
                          </div>
                        </div>
                        <Button variant="secondary" size="sm">
                          Enable
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-4">
                      Active Sessions
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Chrome on MacOS
                          </p>
                          <p className="text-xs text-gray-500">
                            Nairobi, Kenya • Current session
                          </p>
                        </div>
                        <span className="text-xs text-success-600 font-medium">
                          Active
                        </span>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Safari on iPhone
                          </p>
                          <p className="text-xs text-gray-500">
                            Nairobi, Kenya • 2 hours ago
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Revoke
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <Button onClick={handleSave} loading={isSaving}>
                      Update Security Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>}
        </div>
      </div>
    </PageContainer>;
}