import React, { useState } from 'react';
import { PageId, User } from '../types';
import { 
  UserCircle, 
  Settings, 
  Mail, 
  Phone, 
  Building2, 
  Lock, 
  ShieldCheck, 
  Bell, 
  Eye, 
  EyeOff,
  Sparkles,
  Camera,
  LogOut,
  ChevronRight,
  Database
} from 'lucide-react';

interface ProfileAndSettingsProps {
  user: User;
  onUpdateUser: (updated: User) => void;
  onNavigate: (page: PageId) => void;
  onLogout: () => void;
  subView?: 'profile' | 'settings';
}

export default function ProfileAndSettings({ 
  user, 
  onUpdateUser, 
  onNavigate, 
  onLogout,
  subView = 'profile'
}: ProfileAndSettingsProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>(subView);

  // States for Edit Profile
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || '');
  const [institution, setInstitution] = useState(user.institution || '');
  const [isEditing, setIsEditing] = useState(false);

  // States for Security (passwordchange)
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showPws, setShowPws] = useState(false);

  // States for Settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [gazeGagEnabled, setGazeGagEnabled] = useState(true);
  const [tabLockTolerance, setTabLockTolerance] = useState('1'); // Allowed tab switches before block
  const [soundIntensityTolerance, setSoundIntensityTolerance] = useState('medium');

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      phone,
      institution
    });
    setIsEditing(false);
    alert('🎉 Profile updated successfully!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw !== confirmPw) {
      alert('⚠️ New Passwords do not match!');
      return;
    }
    alert('🔒 Password security key regenerated successfully!');
    setCurrentPw('');
    setNewPw('');
    setConfirmPw('');
  };

  return (
    <div id="settings-profile-sheet" className="grid lg:grid-cols-12 gap-6">
      
      {/* A. Left control tab layout */}
      <div className="lg:col-span-3 bg-white border rounded-2xl p-4.5 dark:bg-slate-900 dark:border-slate-800 space-y-3 max-h-full overflow-y-auto flex flex-col justify-between">
        <div className="space-y-4">
          <div className="pb-2 border-b dark:border-slate-805">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-505">User Configurations</h3>
          </div>

          <div className="space-y-1.5">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex w-full items-center gap-3.5 rounded-xl px-3.5 py-3 text-xs font-bold transition-all ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 dark:from-indigo-950/30 dark:to-blue-950/10 dark:text-sky-400'
                  : 'text-slate-655 hover:bg-slate-50 dark:hover:bg-slate-850 dark:text-slate-400 dark:hover:text-slate-50'
              }`}
            >
              <UserCircle className="h-5 w-5" />
              <span>Identity Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex w-full items-center gap-3.5 rounded-xl px-3.5 py-3 text-xs font-bold transition-all ${
                activeTab === 'settings'
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 dark:from-indigo-950/30 dark:to-blue-950/10 dark:text-sky-400'
                  : 'text-slate-655 hover:bg-slate-50 dark:hover:bg-slate-850 dark:text-slate-400 dark:hover:text-slate-50'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Surveillance Preference</span>
            </button>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-650 font-bold rounded-xl text-xs dark:bg-rose-955/10 dark:hover:bg-rose-950/20 text-center transition-colors flex items-center justify-center gap-1.5"
        >
          <LogOut className="h-4 w-4" /> Sign out candidate folder
        </button>
      </div>

      {/* B. Right detail config card panels */}
      <div className="lg:col-span-9 bg-white border dark:bg-slate-900 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        
        {/* TAB: USER PROFILE AND DETAILS FORM */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-3 border-b dark:border-slate-805">
              <div>
                <h3 className="text-base font-bold font-display text-slate-805 dark:text-white">Candidate Identity Profile</h3>
                <p className="text-xs text-slate-400">Review SSO identifiers, academic institutions, and credentials.</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 border rounded-xl text-xs font-bold text-indigo-650 hover:bg-slate-50 dark:border-slate-800 dark:text-sky-400"
              >
                {isEditing ? 'Cancel Edits' : 'Edit Profile'}
              </button>
            </div>

            {/* Profile Photo Mock */}
            <div className="flex flex-col sm:flex-row items-center gap-4.5 p-4.5 bg-slate-50/50 dark:bg-slate-950/40 rounded-2xl border border-slate-105 dark:border-slate-850">
              <div className="relative h-16 w-16 bg-indigo-150 text-indigo-700 dark:bg-slate-800 dark:text-sky-450 rounded-2xl flex items-center justify-center font-bold font-display text-xl">
                {user.name.charAt(0).toUpperCase()}
                <label className="absolute bottom-[-4px] right-[-4px] h-6 w-6 bg-white border rounded-full flex items-center justify-center shadow hover:opacity-85 cursor-pointer">
                  <Camera className="h-3 w-3 text-slate-600" />
                  <input type="file" className="hidden" onChange={() => alert('Profile photo loaded inside candidate index')} />
                </label>
              </div>
              <div>
                <h4 className="font-display font-black text-sm text-slate-850 dark:text-white flex items-center gap-1.5">
                  {user.name} <span className="text-[10px] uppercase font-mono bg-indigo-100 text-indigo-805 px-2 py-0.5 rounded-full font-black tracking-wider dark:bg-slate-800 dark:text-sky-400">{user.role}</span>
                </h4>
                <p className="text-xs text-slate-400 mt-1">Institutional SSO verified path. Security Ticket #{user.id.toUpperCase()}</p>
              </div>
            </div>

            {/* Fields detail */}
            <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs text-slate-600 dark:text-slate-400">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-405 uppercase tracking-wide mb-1">Full Name</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 border rounded-xl bg-slate-50/50 focus:bg-white disabled:opacity-50 dark:bg-slate-950 dark:border-slate-850"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-405 uppercase tracking-wide mb-1">SSO Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full pl-9 pr-4 py-2.5 border rounded-xl bg-slate-105/90 text-slate-410 disabled:cursor-not-allowed dark:bg-slate-950 dark:border-slate-850"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-405 uppercase tracking-wide mb-1">Candidate Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="tel"
                      disabled={!isEditing}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 border rounded-xl bg-slate-50/50 focus:bg-white disabled:opacity-50 dark:bg-slate-950 dark:border-slate-855"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-405 uppercase tracking-wide mb-1">Affiliated Academy</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 border rounded-xl bg-slate-50/50 focus:bg-white disabled:opacity-50 dark:bg-slate-950 dark:border-slate-855"
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-indigo-650 text-white font-bold rounded-xl text-xs shadow hover:opacity-90 inline-block transition-colors"
                >
                  Save Profile Info
                </button>
              )}
            </form>

            {/* Change Password segments */}
            <div className="pt-5 border-t dark:border-slate-855 space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-505 flex items-center gap-1.5">
                <Lock className="h-4.5 w-4.5 text-indigo-500" /> Change Security Access Key
              </h4>

              <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-405 uppercase tracking-wide mb-1">Current Password</label>
                    <input
                      type={showPws ? 'text' : 'password'}
                      required
                      value={currentPw}
                      onChange={(e) => setCurrentPw(e.target.value)}
                      className="w-full p-2 border font-mono rounded-lg bg-slate-50/50 focus:bg-white dark:bg-slate-950"
                      placeholder="••••••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-slate-405 uppercase tracking-wide mb-1">New Password</label>
                    <input
                      type={showPws ? 'text' : 'password'}
                      required
                      value={newPw}
                      onChange={(e) => setNewPw(e.target.value)}
                      className="w-full p-2 border font-mono rounded-lg bg-slate-50/50 focus:bg-white dark:bg-slate-950"
                      placeholder="••••••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-slate-405 uppercase tracking-wide mb-1">Confirm New Password</label>
                    <input
                      type={showPws ? 'text' : 'password'}
                      required
                      value={confirmPw}
                      onChange={(e) => setConfirmPw(e.target.value)}
                      className="w-full p-2 border font-mono rounded-lg bg-slate-50/50 focus:bg-white dark:bg-slate-950"
                      placeholder="••••••••••••"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center flex-wrap gap-3">
                  <label className="flex items-center gap-1.5 select-none text-xs text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showPws}
                      onChange={(e) => setShowPws(e.target.checked)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                    />
                    <span>Show Passwords</span>
                  </label>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 text-white font-bold hover:bg-slate-800 rounded-xl text-xs shrink-0"
                  >
                    Reset Security Tokens
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB: SECURE PROCTOR SURVEILLANCE PARAMETERS */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="pb-3 border-b dark:border-slate-805">
              <h3 className="text-base font-bold font-display text-slate-805 dark:text-white">Active Proctoring Sandbox Configuration</h3>
              <p className="text-xs text-slate-400">Optimize security levels, sound threshold constraints, and background alerts tolerance indices for mock tests.</p>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              
              {/* Notifications Toggle */}
              <label className="flex items-center justify-between p-4 bg-slate-50/40 rounded-2xl border border-slate-105 dark:bg-slate-950/40 dark:border-slate-850 cursor-pointer select-none">
                <div className="space-y-1 pr-4">
                  <p className="font-bold text-slate-805 dark:text-slate-250 flex items-center gap-1.5">
                    <Bell className="h-4.5 w-4.5 text-indigo-500" /> Sound Warning Alerts Overlay
                  </p>
                  <p className="text-[10px] text-slate-405">Play soft warn ticks inside ongoing exams on tab-refocus warnings.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  className="h-4.5 w-4.5 text-indigo-650 focus:ring-indigo-55 rounded"
                />
              </label>

              {/* Strictness selector (Tab lock tolerance limits) */}
              <div className="p-4 bg-slate-50/40 rounded-2xl border border-slate-150 dark:bg-slate-950/40 dark:border-slate-850 space-y-3">
                <div className="space-y-1">
                  <p className="font-bold text-slate-805 dark:text-slate-200">Grid Sandbox Redirection Locks</p>
                  <p className="text-[10px] text-slate-400">The maximum browser switches allowed before auto suspending test papers.</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: '1', label: 'Strict (1 Check)' },
                    { val: '3', label: 'Moderate (3 Check)' },
                    { val: '99', label: 'Relaxed (Uncapped)' }
                  ].map(item => (
                    <button
                      key={item.val}
                      onClick={() => setTabLockTolerance(item.val)}
                      className={`py-2 px-3 border font-semibold text-xs rounded-xl cursor-default transition-colors ${
                        tabLockTolerance === item.val
                          ? 'border-indigo-650 bg-indigo-50/50 text-indigo-700 dark:bg-indigo-950/40 dark:text-sky-400'
                          : 'border-slate-150 text-slate-500 hover:bg-slate-50 dark:border-slate-800'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sound threshold controls */}
              <div className="p-4 bg-slate-50/40 rounded-2xl border border-slate-150 dark:bg-slate-950/40 dark:border-slate-850 space-y-3">
                <div className="space-y-1">
                  <p className="font-bold text-slate-850 dark:text-slate-200 flex items-center gap-1.5">
                    <Database className="h-4.5 w-4.5 text-amber-500" /> Audio Whispers Sensitivity Threshold
                  </p>
                  <p className="text-[10px] text-slate-400">Configure sound levels to avoid triggering warnings on mild laptop fan logs.</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: 'low', label: 'Low Sens (55dB)' },
                    { val: 'medium', label: 'Recommended (35dB)' },
                    { val: 'high', label: 'High Sens (15dB)' }
                  ].map(item => (
                    <button
                      key={item.val}
                      onClick={() => setSoundIntensityTolerance(item.val)}
                      className={`py-2 px-3 border font-semibold text-xs rounded-xl cursor-default transition-colors ${
                        soundIntensityTolerance === item.val
                          ? 'border-indigo-650 bg-indigo-50/50 text-indigo-700 dark:bg-indigo-950/40 dark:text-sky-400'
                          : 'border-slate-150 text-slate-500 hover:bg-slate-50 dark:border-slate-800'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Settings confirmation toast banner */}
              <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-150 dark:bg-slate-950 dark:border-slate-850 text-slate-500 flex items-center gap-2.5">
                <span className="flex h-7.5 w-7.5 items-center justify-center bg-indigo-650 text-white rounded-lg shadow-sm text-xs font-bold shrink-0">✓</span>
                <p className="text-[10px] font-medium leading-relaxed">
                  These changes override local testing defaults. Authentic examinations scheduled by certified Examiners employ strict custom policy keys which cannot be bypassed.
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
export { ProfileAndSettings };
