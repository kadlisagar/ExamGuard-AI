import { User, PageId } from '../types';
import { 
  LayoutDashboard, 
  BookOpen, 
  Award, 
  BarChart3, 
  Bot, 
  UserCircle, 
  Settings, 
  PlusCircle, 
  Database, 
  Eye, 
  ShieldAlert,
  Menu,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  user: User | null;
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isOpen?: boolean;
}

export default function Sidebar({ user, currentPage, onNavigate }: SidebarProps) {
  if (!user) return null;

  const renderStudentLinks = () => {
    const links = [
      { id: 'student-dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'exam-list', label: 'Exams Portal', icon: BookOpen },
      { id: 'results', label: 'My Results', icon: Award },
      { id: 'analytics', label: 'Performance Analytics', icon: BarChart3 },
      { id: 'ai-assistant', label: 'AI Study Assistant', icon: Bot },
      { id: 'profile', label: 'My Profile', icon: UserCircle },
      { id: 'settings', label: 'System Settings', icon: Settings },
    ];

    return links.map(link => {
      const Icon = link.icon;
      const isActive = currentPage === link.id;
      return (
        <button
          key={link.id}
          onClick={() => onNavigate(link.id as PageId)}
          className={`group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-semibold tracking-wide transition-all ${
            isActive
              ? 'bg-gradient-to-r from-blue-50/80 to-indigo-50/80 text-blue-600 dark:from-indigo-950/40 dark:to-blue-950/20 dark:text-sky-400 border-l-4 border-indigo-600 dark:border-indigo-400'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50'
          }`}
        >
          <Icon className={`h-4.5 w-4.5 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-indigo-500 dark:text-sky-400' : 'text-slate-400 group-hover:text-slate-500'}`} />
          {link.label}
        </button>
      );
    });
  };

  const renderExaminerLinks = () => {
    const links = [
      { id: 'examiner-dashboard', label: 'Examiner Dashboard', icon: LayoutDashboard },
      { id: 'create-exam', label: 'Create New Exam', icon: PlusCircle },
      { id: 'question-bank', label: 'MCQ & Question Bank', icon: Database },
      { id: 'live-proctor', label: 'Live Proctored Feeds', icon: Eye },
      { id: 'profile', label: 'Examiner Profile', icon: UserCircle },
      { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return links.map(link => {
      const Icon = link.icon;
      const isActive = currentPage === link.id;
      return (
        <button
          key={link.id}
          onClick={() => onNavigate(link.id as PageId)}
          className={`group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-semibold tracking-wide transition-all ${
            isActive
              ? 'bg-gradient-to-r from-amber-50/80 to-yellow-50/80 text-amber-700 dark:from-amber-955/20 dark:to-amber-950/10 dark:text-amber-400 border-l-4 border-amber-500'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50'
          }`}
        >
          <Icon className={`h-4.5 w-4.5 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-amber-500' : 'text-slate-400 group-hover:text-slate-500'}`} />
          {link.label}
        </button>
      );
    });
  };

  const renderAdminLinks = () => {
    const links = [
      { id: 'admin-dashboard', label: 'Admin Dashboard', icon: ShieldAlert },
      { id: 'profile', label: 'Admin Profile', icon: UserCircle },
      { id: 'settings', label: 'System Preferences', icon: Settings },
    ];

    return links.map(link => {
      const Icon = link.icon;
      const isActive = currentPage === link.id;
      return (
        <button
          key={link.id}
          onClick={() => onNavigate(link.id as PageId)}
          className={`group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-semibold tracking-wide transition-all ${
            isActive
              ? 'bg-gradient-to-r from-red-50/80 to-rose-50/80 text-red-600 dark:from-red-950/20 dark:to-rose-950/10 dark:text-rose-450 border-l-4 border-red-500'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50'
          }`}
        >
          <Icon className={`h-4.5 w-4.5 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-red-500' : 'text-slate-400'}`} />
          {link.label}
        </button>
      );
    });
  };

  return (
    <aside id="sidebar-panel" className="hidden lg:flex flex-col w-64 border-r border-gray-200 bg-white p-4 h-[calc(100vh-4rem)] sticky top-16 select-none dark:border-slate-800 dark:bg-slate-900">
      <div className="flex-1 space-y-1.5 py-3">
        <p className="px-3.5 text-[10px] font-mono font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase pb-2">
          Navigation Control
        </p>
        {user.role === 'student' && renderStudentLinks()}
        {user.role === 'examiner' && renderExaminerLinks()}
        {user.role === 'admin' && renderAdminLinks()}
      </div>

      {/* Sidebar Footer with system health & role status */}
      <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2.5">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">Proctor Monitor Active</p>
            <p className="text-[9px] font-mono text-slate-400">Node latency: 9ms</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
