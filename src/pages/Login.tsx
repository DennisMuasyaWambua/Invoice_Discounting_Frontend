import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheckIcon, AlertCircleIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { authService } from '../services/authService';
export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authService.login({ email, password });
      
      // Navigate based on user role
      if (response.user.role === 'admin') {
        navigate('/admin');
      } else if (response.user.role === 'financier') {
        navigate('/investor');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen bg-gray-50 flex">
      {/* Left Panel - Branding & Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800" />

        {/* Subtle pattern overlay */}
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

            <div className="space-y-6 max-w-md">
              <div>
                <h2 className="text-3xl font-bold mb-3">
                  Institutional-Grade
                  <br />
                  Receivables Financing
                </h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  Secure, compliant invoice discounting for healthcare
                  providers, manufacturers, and exporters.
                </p>
              </div>

              <div className="space-y-4 pt-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheckIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">CBK Compliant</h3>
                    <p className="text-sm text-white/80">
                      Regulated receivables financing in compliance with Central
                      Bank of Kenya guidelines
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheckIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">eTIMS Integration</h3>
                    <p className="text-sm text-white/80">
                      Direct integration with Kenya Revenue Authority for
                      invoice verification
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheckIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      Institutional Security
                    </h3>
                    <p className="text-sm text-white/80">
                      Bank-grade encryption and multi-factor authentication
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm text-white/60">
            <p>© 2024 Nexus Protocol. All rights reserved.</p>
            <p className="mt-1">Regulated receivables financing facility.</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600">
              Access your receivables financing account
            </p>
          </div>

          {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800">
                  Authentication Failed
                </p>
                <p className="text-sm text-red-700 mt-0.5">{error}</p>
              </div>
            </div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your.email@company.com" required />

            <div className="relative">
              <Input label="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                Forgot password?
              </button>
            </div>

            <Button type="submit" fullWidth size="lg" loading={isLoading}>
              Sign In
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button type="button" onClick={() => navigate('/register')} className="font-medium text-primary-600 hover:text-primary-700">
                  Request Access
                </button>
              </p>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 leading-relaxed">
              By signing in, you acknowledge that you have read and agree to our
              Terms of Service and Privacy Policy. All transactions are subject
              to internal credit approval and regulatory compliance.
            </p>
          </div>
        </div>
      </div>
    </div>;
}