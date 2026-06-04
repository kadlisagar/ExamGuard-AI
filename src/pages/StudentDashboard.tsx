import React from 'react';
import { PageId, User, Exam } from '../types';
import { LineChart, BarChart } from '../components/Charts';
import { 
  PlusSquare, 
  BookOpen, 
  Trophy, 
  Clock, 
  TrendingUp, 
  UserCheck, 
  ArrowRight,
  Sparkles,
  Calendar,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface StudentDashboardProps {
  user: User;
  onNavigate: (page: PageId) => void;
  exams: Exam[];
}

export default function StudentDashboard({ user, onNavigate, exams }: StudentDashboardProps) {
  // Analytical widget metrics derived cleanly
  const totalExams = exams.length;
  const completedCount = 2; // Derived from legacy results mock
  const averageScore = 87; // Average percentage
  const activeIncomingCount = exams.filter(e => e.id !== 'exam-3').length;

  // Static performance datasets
  const activeTrendData = [
    { label: 'Jan', value: 78 },
    { label: 'Feb', value: 82 },
    { label: 'Mar', value: 80 },
    { label: 'Apr', value: 89 },
    { label: 'May', value: 85 },
    { label: 'Jun', value: 91 }
  ];

  const activeSubjectData = [
    { label: 'Computer Sci.', value: 92, average: 75 },
    { label: 'Info Tech.', value: 84, average: 70 },
    { label: 'Software Eng.', value: 88, average: 78 }
  ];

  const recentActivites = [
    { id: 1, action: "Completed Test Prep quiz using AI Study Assistant", time: "2 hours ago", icon: Sparkles, color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40" },
    { id: 2, action: "Successfully authenticated webcam in profile preferences", time: "1 day ago", icon: UserCheck, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40" },
    { id: 3, action: "Submitted exam review: Cloud Architectures Midterm", time: "3 days ago", icon: BookOpen, color: "text-pink-600 bg-pink-50 dark:bg-pink-950/40" }
  ];

  return (
    <div id="student-dashboard" className="space-y-6">
      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* 1. Dynamic AI Welcome & Profile Highlight Banner (Spans 3 columns) */}
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-indigo-750 to-purple-800 p-8 text-white shadow-xl shadow-indigo-100 dark:shadow-none lg:col-span-3 flex flex-col justify-between min-h-[240px]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.18),transparent_50%)] animate-pulse-slow" />
          <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-[10px] font-mono font-bold tracking-wider uppercase">
              <Sparkles className="h-3 w-3 animate-pulse text-yellow-300" /> Proctor Sandbox Active
            </span>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome back, {user.name}!
              </h1>
              <p className="text-xs sm:text-sm mt-2 text-slate-100 font-medium opacity-90 max-w-xl leading-relaxed">
                Your next proctored milestone, <span className="font-bold underline text-yellow-200">Advanced Artificial Intelligence Concepts</span>, is scheduled for launch. Confirm hardware settings in instructions.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap gap-3 items-center justify-between pt-4 border-t border-white/10 mt-4">
            <div className="flex items-center gap-2 text-[11px] font-medium text-indigo-100">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Identity Match Index: <strong className="text-white font-mono">98.4%</strong></span>
            </div>
            <button
              id="dash-btn-start-exam"
              onClick={() => onNavigate('exam-list')}
              className="px-5 py-2.5 bg-white text-indigo-600 hover:bg-slate-50 active:scale-95 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              Exams Portal <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 2. Global Score Circular/Radial Gauge Snapshot (Spans 1 column) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 rounded-[2rem] p-6 shadow-sm flex flex-col items-center justify-between min-h-[240px] text-center">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Performance</p>
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-350 mt-0.5">Average Accuracy</h3>
          </div>
          
          <div className="relative flex items-center justify-center my-3">
            <svg className="w-24 h-24 transform -rotate-90">
              {/* Background ring */}
              <circle 
                cx="48" 
                cy="48" 
                r="38" 
                strokeWidth="6" 
                stroke="currentColor" 
                className="text-slate-100 dark:text-slate-800" 
                fill="transparent" 
              />
              {/* Highlight ring */}
              <circle 
                cx="48" 
                cy="48" 
                r="38" 
                strokeWidth="7" 
                stroke="currentColor" 
                className="text-indigo-600 dark:text-sky-450" 
                fill="transparent" 
                strokeDasharray={2 * Math.PI * 38} 
                strokeDashoffset={2 * Math.PI * 38 * (1 - averageScore / 100)} 
                strokeLinecap="round" 
              />
            </svg>
            <div className="absolute text-center flex flex-col">
              <span className="text-2xl font-extrabold font-display text-slate-900 dark:text-white leading-none">{averageScore}%</span>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
            Elite Standing
          </span>
        </div>

        {/* 3. Total Exams Meter (Row-span inside Bento) */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200/70 dark:border-slate-800/80 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Exams Enrolled</p>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">{totalExams}</p>
            <p className="text-[10px] text-slate-400">Standard Syllabus</p>
          </div>
          <div className="h-12 w-12 rounded-2xl flex items-center justify-center text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40">
            <BookOpen className="h-6 w-6" />
          </div>
        </div>

        {/* 4. Completed Tests Meter */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200/70 dark:border-slate-800/80 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Tests Evaluated</p>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">{completedCount}</p>
            <p className="text-[10px] text-slate-405 text-emerald-500">Grades Instantly Synced</p>
          </div>
          <div className="h-12 w-12 rounded-2xl flex items-center justify-center text-emerald-550 bg-emerald-50 dark:bg-emerald-950/45">
            <Trophy className="h-6 w-6" />
          </div>
        </div>

        {/* 5. Average Score Delta Meter */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200/70 dark:border-slate-800/80 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Overall Accuracy</p>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">{averageScore}%</p>
            <p className="text-[10px] text-indigo-500 font-semibold font-mono">+12.3% class lead</p>
          </div>
          <div className="h-12 w-12 rounded-2xl flex items-center justify-center text-blue-500 bg-blue-50 dark:bg-blue-950/40">
            <TrendingUp className="h-6 w-6" />
          </div>
        </div>

        {/* 6. Pending Tests Meter */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200/70 dark:border-slate-800/80 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Pending Tests</p>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">{activeIncomingCount}</p>
            <p className="text-[10px] text-slate-400">Requires Gaze Lock</p>
          </div>
          <div className="h-12 w-12 rounded-2xl flex items-center justify-center text-amber-550 bg-amber-50 dark:bg-amber-950/40">
            <Clock className="h-6 w-6" />
          </div>
        </div>

        {/* 7. Graphical Performance Trend (Spans 2 columns) */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-7 border border-slate-200/70 dark:border-slate-800/80 shadow-sm lg:col-span-2 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-500">Analytics Track</p>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Cumulative Performance Trend</h3>
            </div>
            <span className="text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/55 text-indigo-700 dark:text-sky-400 px-3 py-1 rounded-xl">
              Overall +12.3% YoY
            </span>
          </div>
          <div className="flex-1 flex items-center">
            <LineChart data={activeTrendData} />
          </div>
        </div>

        {/* 8. Benchmark bar chart vs average class cohorts (Spans 2 columns) */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-7 border border-slate-200/70 dark:border-slate-800/80 shadow-sm lg:col-span-2 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-500">Benchmarks</p>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 font-display">Subject-Wise vs Class Average</h3>
            </div>
          </div>
          <div className="flex-1 flex items-center">
            <BarChart data={activeSubjectData} />
          </div>
          <div className="flex justify-center gap-4 mt-3 text-[10px] font-semibold text-slate-500">
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded bg-indigo-600" /> My Accuracy
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded bg-slate-300 dark:bg-slate-700" /> Class Average
            </span>
          </div>
        </div>

        {/* 9. Upcoming Scheduled Exams Module (Spans 2 columns) */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-200/70 dark:border-slate-800/80 shadow-sm lg:col-span-2 flex flex-col justify-between min-h-[290px]">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <h3 className="text-sm font-bold text-slate-850 dark:text-slate-200">Pending Safe Exam Browser Schedules</h3>
              <button
                onClick={() => onNavigate('exam-list')}
                className="text-xs font-semibold text-indigo-600 dark:text-sky-400 hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                Launch Center <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              {exams.map(exam => (
                <div 
                  key={exam.id} 
                  className="group flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/60 hover:border-indigo-300 dark:hover:border-indigo-900/60 bg-slate-50/50 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-900 transition-all cursor-pointer"
                  onClick={() => onNavigate('exam-list')}
                >
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {exam.name}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold font-mono">
                      <span className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-400">
                        {exam.subject}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {exam.duration} mins
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 10. Interactive AI Companion / Quick Ask Preview (Spans 1 column) */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-850 text-white rounded-[2rem] p-6 shadow-md lg:col-span-1 flex flex-col justify-between min-h-[290px]">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-white text-[9px] font-mono uppercase font-bold">
              Study Buddy
            </span>
            <h3 className="font-display font-black text-base text-white tracking-tight">AI Assistant Preview</h3>
            <p className="text-[11px] text-indigo-100 leading-relaxed font-medium">
              Want to practice mock prep questions or review concepts? Our localized LLM is updated with syllabus criteria.
            </p>
            <div className="p-3 bg-white/10 rounded-xl mt-3 text-[10px] text-slate-100 italic border border-white/5">
              "Summarize the 3 layers of neural network feedback pathways."
            </div>
          </div>
          <button
            onClick={() => onNavigate('ai-assistant')}
            className="w-full py-2.5 bg-white text-indigo-700 hover:bg-slate-50 active:scale-95 text-xs font-bold rounded-xl shadow transition-all cursor-pointer text-center"
          >
            Launch Assistant Chat
          </button>
        </div>

        {/* 11. Live AI Proctoring Security logs terminal (Spans 1 column) */}
        <div className="bg-slate-900 border border-slate-800 text-slate-300 rounded-[2rem] p-6 shadow-xl lg:col-span-1 flex flex-col justify-between min-h-[290px]">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" /> Proctor Console
              </span>
              <span className="text-[9px] font-mono text-slate-500">v1.2</span>
            </div>
            <div className="font-mono text-[9px] space-y-2.5 overflow-hidden">
              <div className="text-slate-400">
                <span className="text-indigo-400">[09:34:02]</span> Gaze calibration complete. Matrix computed: OK.
              </div>
              <div className="text-slate-400">
                <span className="text-indigo-400">[10:12:45]</span> Multi-face check passed. Found candidates: 1.
              </div>
              <div className="text-slate-400">
                <span className="text-indigo-400">[10:14:11]</span> Secured frame buffer initialized.
              </div>
              <div className="text-amber-400 font-semibold">
                <span className="text-indigo-400">[10:20:00]</span> Standard gaze lock established. Risk index: <span className="underline">0.02</span>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-slate-950/75 p-3 rounded-xl border border-slate-850 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-emerald-400 animate-pulse flex-shrink-0" />
              <div className="text-[9px] leading-tight text-slate-400">
                <span className="font-bold text-white block">Status code: SECURED</span>
                Audible background noise level: 11 dB.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
export { StudentDashboard };
