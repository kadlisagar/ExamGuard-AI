import React, { useState } from 'react';
import { PageId, User, Role } from '../types';
import { Shield, Mail, Lock, User as UserIcon, Phone, GraduationCap, Building2, Eye, EyeOff, Loader2 } from 'lucide-react';

interface AuthPagesProps {
  onLoginSuccess: (user: User) => void;
  currentPage: 'login' | 'register';
  onNavigate: (page: PageId) => void;
}

export default function AuthPages({ onLoginSuccess, currentPage, onNavigate }: AuthPagesProps) {
  const [isLogin, setIsLogin] = useState<boolean>(currentPage === 'login');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [role, setRole] = useState<Role>('student');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setLoading(false);
      // Auto register context or log in with details
      const userEmail = email.trim() || (role === 'examiner' ? 'examiner@examguard.ai' : 'student@examguard.ai');
      const userName = fullName.trim() || (role === 'examiner' ? 'Professor Harrison' : 'Sagar Kadli');
      
      const loggedUser: User = {
        id: `user-${Date.now()}`,
        name: userName,
        email: userEmail,
        role: role,
        institution: institution || 'AI Global Academy',
        phone: phone || '+1 (415) 555-0199'
      };
      
      onLoginSuccess(loggedUser);
    }, 1200);
  };

  // Pre-load roles to make evaluating extremely fast
  const handleQuickDemoFill = (selectedRole: Role) => {
    setRole(selectedRole);
    if (selectedRole === 'student') {
      setEmail('student@examguard.ai');
      setPassword('password123');
      setFullName('Sagar Kadli');
      setInstitution('AI Global Academy');
    } else if (selectedRole === 'examiner') {
      setEmail('examiner@examguard.ai');
      setPassword('password123');
      setFullName('Professor Harrison');
      setInstitution('SVU Tech Institute');
    } else {
      setEmail('admin@examguard.ai');
      setPassword('password123');
      setFullName('Dean Jenkins');
      setInstitution('Global Admin Command');
    }
  };

  return (
    <div id="auth-page" className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-slate-950 transition-colors">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent_60%)]" />

      <div className="relative max-w-md w-full space-y-6 bg-white dark:bg-slate-900 px-6 sm:px-10 py-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            {isLogin ? 'Sign in to ExamGuard AI' : 'Create candidate folder'}
          </h2>
          <p className="text-xs text-slate-400">
            {isLogin ? "Access your scheduled tests & study suite" : "Register with institution metrics"}
          </p>
        </div>

        {/* Quick Demo Pre-fill assist */}
        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl p-3 border border-indigo-100 dark:border-indigo-900/50">
          <p className="text-[10px] font-bold font-mono tracking-wide text-indigo-600 dark:text-sky-400 uppercase text-center mb-2">
            ✨ Quick Evaluation Assist
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => handleQuickDemoFill('student')}
              className="px-2 py-1 bg-white hover:bg-slate-50 text-[10px] font-bold text-slate-700 rounded-lg shadow-sm border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
            >
              Demo Student
            </button>
            <button
              onClick={() => handleQuickDemoFill('examiner')}
              className="px-2 py-1 bg-white hover:bg-slate-50 text-[10px] font-bold text-slate-700 rounded-lg shadow-sm border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
            >
              Demo Examiner
            </button>
            <button
              onClick={() => handleQuickDemoFill('admin')}
              className="px-2 py-1 bg-white hover:bg-slate-50 text-[10px] font-bold text-slate-700 rounded-lg shadow-sm border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
            >
              Demo Admin
            </button>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-700">
          <button
            onClick={() => { setIsLogin(true); setErrorMsg(''); }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              isLogin 
                ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-sky-400' 
                : 'text-slate-400 hover:text-slate-750'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => { setIsLogin(false); setErrorMsg(''); }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              !isLogin 
                ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-sky-400' 
                : 'text-slate-400 hover:text-slate-750'
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Sagar Kadli"
                    className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200/80 rounded-xl bg-slate-50/50 focus:bg-white dark:bg-slate-950 dark:border-slate-800 focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 80000 00000"
                    className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200/80 rounded-xl bg-slate-50/50 focus:bg-white dark:bg-slate-950 dark:border-slate-800 focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              {/* Institution */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Institution</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="MCA University Center"
                    className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200/80 rounded-xl bg-slate-50/50 focus:bg-white dark:bg-slate-950 dark:border-slate-800 focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Registering As</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`flex items-center justify-center gap-2 py-2 border rounded-xl font-semibold text-xs transition-all ${
                      role === 'student'
                        ? 'border-indigo-500 bg-indigo-50/50 text-indigo-700 dark:bg-indigo-950/40 dark:text-sky-400'
                        : 'border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-800'
                    }`}
                  >
                    <GraduationCap className="h-4 w-4" />
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('examiner')}
                    className={`flex items-center justify-center gap-2 py-2 border rounded-xl font-semibold text-xs transition-all ${
                      role === 'examiner'
                        ? 'border-amber-500 bg-amber-50/50 text-amber-800 dark:bg-amber-950/30'
                        : 'border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-800'
                    }`}
                  >
                    <Shield className="h-4 w-4" />
                    Examiner
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Email Address */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="candidate@examguard.ai"
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200/80 rounded-xl bg-slate-50/50 focus:bg-white dark:bg-slate-950 dark:border-slate-800 focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide">Password</label>
              {isLogin && (
                <button
                  type="button"
                  onClick={() => alert("Simulated password reset email sent to your inbox!")}
                  className="text-[10px] font-semibold text-indigo-600 dark:text-sky-400 hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-10 py-2 text-xs border border-slate-200/80 rounded-xl bg-slate-50/50 focus:bg-white dark:bg-slate-950 dark:border-slate-800 focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-100"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-650"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <label className="flex items-center text-xs select-none cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 mr-2 h-4 w-4"
                />
                <span className="text-slate-400 font-medium">Remember me</span>
              </label>
            </div>
          )}

          <button
            id="btn-auth-submit"
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-xs text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="h-4.5 w-4.5 animate-spin" />
                <span>Synchronizing profile...</span>
              </>
            ) : (
              <span>{isLogin ? 'Verify Identity & Log In' : 'Generate Secure Registration'}</span>
            )}
          </button>
        </form>

        <div className="relative flex py-2.5 items-center">
          <div className="flex-grow border-t border-slate-100 dark:border-slate-800" />
          <span className="flex-shrink mx-4 text-[10px] text-slate-400 uppercase font-bold tracking-wider">or continue with</span>
          <div className="flex-grow border-t border-slate-100 dark:border-slate-800" />
        </div>

        {/* Google sign-in simulation */}
        <button
          type="button"
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              onLoginSuccess({
                id: 'user-google-1',
                name: 'Sagar Kadli',
                email: 'sagarkadli2003@gmail.com',
                role: 'student',
                institution: 'AI Global Academy',
                phone: '+91 80000 00000'
              });
            }, 800);
          }}
          className="w-full py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-850 dark:hover:bg-slate-800 text-xs font-bold border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center gap-2 text-slate-705 dark:text-slate-300 transition-colors"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Verify with Google SSO
        </button>
      </div>
    </div>
  );
}
