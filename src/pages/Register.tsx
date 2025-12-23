import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheckIcon, AlertCircleIcon, CheckCircle2Icon, BuildingIcon, UserIcon, MailIcon, PhoneIcon, FileTextIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { authService } from '../services/authService';
type RegistrationStep = 'account' | 'business' | 'verification' | 'success';
type AccountType = 'supplier' | 'buyer' | 'financier' | null;
export function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState<RegistrationStep>('account');
  const [accountType, setAccountType] = useState<AccountType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  // Form state
  const [formData, setFormData] = useState({
    // Account details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Business details
    businessName: '',
    kraPin: '',
    registrationNumber: '',
    businessType: '',
    county: '',
    // Verification
    idDocument: null as File | null,
    businessCertificate: null as File | null,
    kraPinCertificate: null as File | null
  });
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };
  const handleAccountTypeSelect = (type: AccountType) => {
    setAccountType(type);
  };
  const handleNext = async () => {
    setIsLoading(true);
    setError('');

    try {
      if (step === 'account') {
        setStep('business');
      } else if (step === 'business') {
        setStep('verification');
      } else if (step === 'verification') {
        // Submit registration
        const registrationData = {
          username: `${formData.firstName.toLowerCase()}.${formData.lastName.toLowerCase()}`,
          email: formData.email,
          mobile_number: formData.phone,
          password: formData.password,
          password_confirm: formData.confirmPassword,
          role_name: accountType as 'supplier' | 'buyer' | 'financier',
          company_name: formData.businessName,
          kra_pin: formData.kraPin,
        };

        await authService.register(registrationData);
        setStep('success');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  const handleBack = () => {
    if (step === 'business') {
      setStep('account');
    } else if (step === 'verification') {
      setStep('business');
    }
  };
  const renderStepIndicator = () => <div className="flex items-center justify-center gap-2 mb-8">
      {(['account', 'business', 'verification'] as const).map((s, index) => <Fragment key={s}>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${step === s ? 'bg-primary-600 text-white' : index < ['account', 'business', 'verification'].indexOf(step) ? 'bg-success-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            {index < ['account', 'business', 'verification'].indexOf(step) ? <CheckCircle2Icon className="w-5 h-5" /> : index + 1}
          </div>
          {index < 2 && <div className={`w-12 h-0.5 ${index < ['account', 'business', 'verification'].indexOf(step) ? 'bg-success-600' : 'bg-gray-200'}`} />}
        </Fragment>)}
    </div>;
  if (step === 'success') {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2Icon className="w-8 h-8 text-success-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Application Submitted
          </h2>
          <p className="text-gray-600 mb-8">
            Your registration has been received and is under review by our
            credit team. You'll receive an email notification within 2-3
            business days regarding your application status.
          </p>
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-primary-800">
              <span className="font-medium">Next Steps:</span> Our team will
              verify your KYC documents and business registration. You'll be
              notified via email once your account is approved.
            </p>
          </div>
          <Button onClick={() => navigate('/login')} fullWidth>
            Return to Sign In
          </Button>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-gray-50 flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-2/5 bg-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800" />

        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <span className="text-white font-bold text-2xl">N</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Nexus Protocol</h1>
                <p className="text-sm text-white/80">
                  Receivables Financing Platform
                </p>
              </div>
            </div>

            <div className="space-y-4 max-w-md">
              <h2 className="text-2xl font-bold mb-4">
                Join Kenya's Leading
                <br />
                Receivables Financing Platform
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/90">
                    Fast approval process with internal credit assessment
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/90">
                    Advance rates up to 90% of invoice value
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/90">
                    Direct M-Pesa disbursement within 24 hours
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/90">
                    CBK compliant and fully regulated
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm text-white/60">
            <p>© 2024 Nexus Protocol. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-2xl">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Nexus Protocol
              </h1>
              <p className="text-xs text-gray-500">Receivables Financing</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Request Access
            </h2>
            <p className="text-gray-600">
              Complete the registration process to access receivables financing
            </p>
          </div>

          {step !== 'success' && renderStepIndicator()}

          {/* Account Type Selection */}
          {!accountType && <div className="space-y-4">
              <p className="text-sm font-medium text-gray-700 mb-4">
                Select Account Type
              </p>

              <button onClick={() => handleAccountTypeSelect('provider')} className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all text-left group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-100 group-hover:bg-primary-200 flex items-center justify-center flex-shrink-0">
                    <BuildingIcon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Healthcare Provider / Manufacturer / Exporter
                    </h3>
                    <p className="text-sm text-gray-600">
                      Access receivables financing by submitting verified
                      invoices for advance payment
                    </p>
                  </div>
                </div>
              </button>

              <button onClick={() => handleAccountTypeSelect('investor')} className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all text-left group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-success-100 group-hover:bg-success-200 flex items-center justify-center flex-shrink-0">
                    <ShieldCheckIcon className="w-6 h-6 text-success-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Institutional Investor / Liquidity Provider
                    </h3>
                    <p className="text-sm text-gray-600">
                      Participate in receivables financing opportunities with
                      institutional-grade due diligence
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Restricted to qualified institutional investors only
                    </p>
                  </div>
                </div>
              </button>

              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <button onClick={() => navigate('/login')} className="font-medium text-primary-600 hover:text-primary-700">
                    Sign In
                  </button>
                </p>
              </div>
            </div>}

          {/* Step 1: Account Details */}
          {accountType && step === 'account' && <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" value={formData.firstName} onChange={e => handleInputChange('firstName', e.target.value)} placeholder="John" required icon={<UserIcon className="w-4 h-4" />} />
                <Input label="Last Name" value={formData.lastName} onChange={e => handleInputChange('lastName', e.target.value)} placeholder="Kamau" required />
              </div>

              <Input label="Email Address" type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} placeholder="john.kamau@company.com" required icon={<MailIcon className="w-4 h-4" />} />

              <Input label="Phone Number" type="tel" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} placeholder="0712 345 678" required icon={<PhoneIcon className="w-4 h-4" />} />

              <Input label="Password" type="password" value={formData.password} onChange={e => handleInputChange('password', e.target.value)} placeholder="Create a strong password" required helperText="Minimum 8 characters with uppercase, lowercase, and numbers" />

              <Input label="Confirm Password" type="password" value={formData.confirmPassword} onChange={e => handleInputChange('confirmPassword', e.target.value)} placeholder="Re-enter your password" required />

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={() => setAccountType(null)} fullWidth>
                  Back
                </Button>
                <Button type="button" onClick={handleNext} loading={isLoading} fullWidth>
                  Continue
                </Button>
              </div>
            </form>}

          {/* Step 2: Business Details */}
          {accountType && step === 'business' && <form className="space-y-5">
              <Input label="Business Name" value={formData.businessName} onChange={e => handleInputChange('businessName', e.target.value)} placeholder="Nairobi Medical Centre Ltd" required icon={<BuildingIcon className="w-4 h-4" />} />

              <Input label="KRA PIN" value={formData.kraPin} onChange={e => handleInputChange('kraPin', e.target.value)} placeholder="A001234567Z" required helperText="Kenya Revenue Authority Personal Identification Number" />

              <Input label="Business Registration Number" value={formData.registrationNumber} onChange={e => handleInputChange('registrationNumber', e.target.value)} placeholder="PVT-2020-12345" required />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Business Type <span className="text-red-500">*</span>
                  </label>
                  <select value={formData.businessType} onChange={e => handleInputChange('businessType', e.target.value)} className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500" required>
                    <option value="">Select type</option>
                    <option value="healthcare">Healthcare Provider</option>
                    <option value="manufacturer">Manufacturer</option>
                    <option value="processor">Processor</option>
                    <option value="exporter">Exporter</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <Input label="County" value={formData.county} onChange={e => handleInputChange('county', e.target.value)} placeholder="Nairobi" required />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={handleBack} fullWidth>
                  Back
                </Button>
                <Button type="button" onClick={handleNext} loading={isLoading} fullWidth>
                  Continue
                </Button>
              </div>
            </form>}

          {/* Step 3: Document Verification */}
          {accountType && step === 'verification' && <div className="space-y-6">
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircleIcon className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-primary-800">
                      KYC Verification Required
                    </p>
                    <p className="text-sm text-primary-700 mt-1">
                      Upload the following documents for identity and business
                      verification. All documents will be reviewed by our
                      compliance team.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    National ID / Passport{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors cursor-pointer">
                    <FileTextIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF or Image (Max 5MB)
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Registration Certificate{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors cursor-pointer">
                    <FileTextIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF or Image (Max 5MB)
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    KRA PIN Certificate <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors cursor-pointer">
                    <FileTextIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF or Image (Max 5MB)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <label className="flex items-start gap-3">
                  <input type="checkbox" className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-0.5" required />
                  <span className="text-sm text-gray-700">
                    I confirm that all information provided is accurate and I
                    agree to the{' '}
                    <button type="button" className="text-primary-600 hover:text-primary-700 font-medium">
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button type="button" className="text-primary-600 hover:text-primary-700 font-medium">
                      Privacy Policy
                    </button>
                    . I understand that all funding is subject to credit
                    approval and regulatory compliance.
                  </span>
                </label>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="secondary" onClick={handleBack} fullWidth>
                  Back
                </Button>
                <Button type="button" onClick={handleNext} loading={isLoading} fullWidth>
                  Submit Application
                </Button>
              </div>
            </div>}
        </div>
      </div>
    </div>;
}