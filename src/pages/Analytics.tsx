import React from 'react';
import { PageId } from '../types';
import { LineChart, BarChart, PieChart, HeatmapChart } from '../components/Charts';
import { 
  TrendingUp, 
  TrendingDown, 
  CheckCircle, 
  Users, 
  Calendar, 
  BrainCircuit, 
  ChevronRight, 
  BarChart4 
} from 'lucide-react';

interface AnalyticsProps {
  onNavigate: (page: PageId) => void;
}

export default function Analytics({ onNavigate }: AnalyticsProps) {
  // Analytical performance over past months
  const monthlyScores = [
    { label: 'Jan', value: 72 },
    { label: 'Feb', value: 78 },
    { label: 'Mar', value: 81 },
    { label: 'Apr', value: 85 },
    { label: 'May', value: 84 },
    { label: 'Jun', value: 91 }
  ];

  // Subject performance stats
  const subjectScores = [
    { label: 'AI Concepts', value: 91, average: 74 },
    { label: 'Database SQL', value: 84, average: 68 },
    { label: 'Software Eng.', value: 86, average: 75 }
  ];

  // Pass, Warning, Fail percentages representation
  const ratioDetails = [
    { label: 'Distinction Class', value: 45, color: '#4f46e5' },
    { label: 'Passing Grade', value: 40, color: '#10b981' },
    { label: 'Needs Practice', value: 15, color: '#f59e0b' }
  ];

  return (
    <div id="analytics-portal" className="space-y-6">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 dark:border-slate-800 pb-3 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-850 dark:text-slate-100 font-display">Deep Learning Analytics Dashboard</h2>
          <p className="text-xs text-slate-550 dark:text-slate-400">Track structural subject gains, cohort averages, and attendance timelines.</p>
        </div>
        <button
          onClick={() => onNavigate('student-dashboard')}
          className="text-xs font-semibold text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850 px-4 py-2 border border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:text-slate-400 rounded-xl bg-white dark:bg-slate-900 transition-all cursor-pointer shadow-sm"
        >
          Return to Dashboard
        </button>
      </div>

      {/* 2. Primary metrics details (Bento Spans) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Term GPA Target", value: "3.72 GPA", stat: "+4.1% MoM", isUp: true },
          { label: "Exam Participation", value: "98.4%", stat: "+0.5% Target", isUp: true },
          { label: "Avg Pass Index", value: "88.2%", stat: "Stable trend", isUp: true },
          { label: "Study Hour Ratio", value: "12.4 hrs/wk", stat: "+1.2 MoM", isUp: true }
        ].map((item, id) => (
          <div key={id} className="p-5 bg-white border dark:bg-slate-900 border-slate-200/70 dark:border-slate-800 rounded-[1.75rem] shadow-sm space-y-2 flex flex-col justify-center">
            <p className="text-[10px] uppercase font-bold tracking-wider font-mono text-slate-400 dark:text-slate-500">{item.label}</p>
            <p className="text-xl font-display font-black text-slate-805 dark:text-white leading-none">{item.value}</p>
            <div className="flex items-center gap-1 text-[10px] font-bold font-mono">
              {item.isUp ? <TrendingUp className="h-3.5 w-3.5 text-emerald-505" /> : <TrendingDown className="h-3.5 w-3.5 text-rose-500" />}
              <span className={item.isUp ? 'text-emerald-500' : 'text-rose-500'}>{item.stat}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Detailed Graphs Group (Bento Grid Columns) */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Monthly Score Progress Graph (Line Chart) */}
        <div className="bg-white border border-slate-200/70 rounded-[2rem] p-6.5 dark:bg-slate-900 dark:border-slate-800 lg:col-span-6 shadow-sm space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-505">Progression Analysis</h3>
          <LineChart data={monthlyScores} />
        </div>

        {/* Subject-Wise Comparative Score (Bar Chart) */}
        <div className="bg-white border border-slate-200/70 rounded-[2rem] p-6.5 dark:bg-slate-900 dark:border-slate-800 lg:col-span-6 shadow-sm space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-505">Subject Cohort Comparison</h3>
          <BarChart data={subjectScores} />
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Distribution Pie Chart */}
        <div className="bg-white border border-slate-200/70 rounded-[2rem] p-6.5 dark:bg-slate-900 dark:border-slate-800 lg:col-span-5 shadow-sm space-y-4 flex flex-col justify-between">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-505">Grade-Clustering Distribution</h3>
          <div className="py-2 flex items-center justify-center">
            <PieChart data={ratioDetails} size={150} />
          </div>
        </div>

        {/* Proctor Activity Heatmap Grid */}
        <div className="bg-white border border-slate-200/70 rounded-[2rem] p-6.5 dark:bg-slate-900 dark:border-slate-800 lg:col-span-7 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-505 animate-pulse">Security & Sandbox Audits</h3>
          </div>
          <HeatmapChart />
          <p className="text-[10px] text-slate-400 font-semibold leading-relaxed pt-2 border-t border-slate-50 dark:border-slate-800/60">
            Each rectangular cell represents a completed test proctoring cycle. Lighter blocks suggest uninterrupted focus index ratios. Darker highlights denote multi-window warnings mapped by candidate sandbox checks.
          </p>
        </div>
      </div>
    </div>
  );
}
export { Analytics };
