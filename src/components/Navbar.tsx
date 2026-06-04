import React from 'react';
import { User, PageId } from '../types';
import { Shield, Sun, Moon, Bell, Menu, LogOut, UserCheck } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  darkMode: boolean;
  toggleDarkMode: () => void;
  onNavigate: (page: PageId) => void;
  onLogout: () => void;
  notifications: { id: string; text: string; time: string; read: boolean }[];
  clearNotifications: () => void;
}

export default function Navbar({
  user,
  darkMode,
  toggleDarkMode,
  onNavigate,
  onLogout,
  notifications,
  clearNotifications
}: NavbarProps) {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header id="app-navbar" className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div 
          onClick={() => onNavigate(user ? (user.role === 'student' ? 'student-dashboard' : user.role === 'examiner' ? 'examiner-dashboard' : 'admin-dashboard') : 'landing')} 
          className="flex cursor-pointer items-center gap-2.5 transition-transform active:scale-95"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-purple-600 shadow-md shadow-indigo-200 dark:shadow-none">
            <Shield className="h-5.5 w-5.5 text-white" />
          </div>
          <div>
            <span className="font-display text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-sky-400 dark:to-purple-400">
              ExamGuard AI
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
              PROCTOR LITE
            </span>
          </div>
        </div>

        {/* Mid area actions / Role tags */}
        <div className="hidden md:flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-800 px-3.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50">
              <span className={`h-2 w-2 rounded-full ${user.role === 'admin' ? 'bg-red-500' : user.role === 'examiner' ? 'bg-amber-500' : 'bg-indigo-500'}`} />
              <span className="capitalize">{user.role} Space</span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="font-medium text-slate-800 dark:text-slate-100 max-w-[120px] truncate">{user.institution || 'Individual Scholar'}</span>
            </div>
          )}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark Mode Switch */}
          <button
            id="btn-dark-mode"
            onClick={toggleDarkMode}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-600" />}
          </button>

          {/* User Specific Notifications Panel */}
          {user && (
            <div className="relative">
              <button
                id="btn-notifications"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2.5 w-80 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl ring-1 ring-black/5 dark:border-slate-800 dark:bg-slate-900 dark:ring-white/5 animate-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                    <h4 className="font-display font-bold text-slate-800 dark:text-slate-150">Notifications</h4>
                    {unreadCount > 0 && (
                      <button 
                        onClick={clearNotifications}
                        className="text-xs font-semibold text-indigo-500 hover:text-indigo-600 dark:text-indigo-400"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  <div className="max-h-60 overflow-y-auto pt-2 space-y-2.5">
                    {notifications.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-400">
                        No new updates or alerts
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className="flex gap-2.5 text-xs hover:bg-slate-50 dark:hover:bg-slate-850 p-1 rounded-lg">
                          <span className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full bg-indigo-500" />
                          <div>
                            <p className="text-slate-700 dark:text-slate-350">{n.text}</p>
                            <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* User Account / Navigation Buttons */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <button
                id="btn-nav-profile"
                onClick={() => onNavigate('profile')}
                className="hidden sm:flex items-center gap-2 cursor-pointer transition-colors hover:opacity-80"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 font-bold text-sm dark:bg-indigo-950/50 dark:text-indigo-300">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left text-xs max-w-[100px]">
                  <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">{user.name}</p>
                  <p className="text-slate-400 truncate">{user.email}</p>
                </div>
              </button>

              <button
                id="btn-navbar-logout"
                onClick={onLogout}
                className="rounded-lg p-2 text-rose-500 hover:bg-rose-50 hover:text-rose-600 focus:outline-none dark:hover:bg-rose-950/30"
                title="Log Out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                id="btn-nav-login"
                onClick={() => onNavigate('login')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
              >
                Log In
              </button>
              <button
                id="btn-nav-register"
                onClick={() => onNavigate('register')}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-sm hover:shadow transition-all"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
