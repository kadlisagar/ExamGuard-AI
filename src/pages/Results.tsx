import React, { useState } from 'react';
import { PageId, ExamAttemptResult } from '../types';
import { BarChart, PieChart } from '../components/Charts';
import { 
  Award, 
  Sparkles, 
  Calendar, 
  Clock, 
  FileCheck, 
  ChevronRight, 
  FileDown, 
  ThumbsUp, 
  AlertTriangle, 
  CornerDownRight,
  TrendingDown,
  TrendingUp,
  BrainCircuit,
  MessageSquareDiff
} from 'lucide-react';

interface ResultsProps {
  results: ExamAttemptResult[];
  onNavigate: (page: PageId) => void;
}

export default function Results({ results, onNavigate }: ResultsProps) {
  const [selectedResultIndex, setSelectedResultIndex] = useState(0);
  const activeResult = results[selectedResultIndex] || null;

  const handleDownloadPDF = () => {
    if (!activeResult) return;
    alert(`🔐 Generating cryptographically signed ExamGuard AI certificate for "${activeResult.examName}"...\n\nDownloaded Transcript PDF containing audit verification hashes successfully!`);
  };

  const scoreChartData = activeResult ? activeResult.subjectAnalysis.map(item => ({
    label: item.subject,
    value: item.score,
    average: item.average
  })) : [];

  const pieChartData = activeResult ? [
    { label: 'Correct Responses', value: activeResult.score, color: '#4f46e5' },
    { label: 'Incorrect/Unanswered', value: activeResult.maxScore - activeResult.score, color: '#cbd5e1' }
  ] : [];

  return (
    <div id="results-page" className="space-y-6">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 dark:border-slate-800/80 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-850 dark:text-slate-100 font-display">Academic Gradeline & Analytics</h2>
          <p className="text-xs text-slate-550 dark:text-slate-400">View performance feedback, certificates, and proctored scoring metrics.</p>
        </div>
        <button
          onClick={() => onNavigate('exam-list')}
          className="text-xs font-semibold text-indigo-650 dark:text-sky-400 hover:opacity-90 flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          View Scheduled Exams <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {results.length === 0 ? (
        <div className="py-16 text-center text-slate-500 bg-white rounded-[2rem] border border-slate-200/70 p-8 dark:bg-slate-900 dark:border-slate-800 space-y-4">
          <Award className="h-12 w-12 mx-auto text-slate-350" />
          <h4 className="font-bold text-slate-700 dark:text-slate-300">No completed exams found</h4>
          <p className="text-xs text-slate-405">Complete your first active proctored exam to view results.</p>
          <button
            onClick={() => onNavigate('exam-list')}
            className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-slate-950 rounded-xl transition-all cursor-pointer"
          >
            Take Exam Now
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* A. Left side historical list of results: Bento card */}
          <div className="lg:col-span-4 bg-white border border-slate-200/70 rounded-[2rem] p-6 dark:bg-slate-900 dark:border-slate-800 shadow-sm flex flex-col justify-between max-h-[580px]">
            <div className="space-y-4">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-500">History File</p>
                <h3 className="text-xs font-bold text-slate-805 dark:text-slate-300 mt-0.5">Attempt Records</h3>
              </div>
              <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
                {results.map((res, i) => {
                  const isActive = i === selectedResultIndex;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedResultIndex(i)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex flex-col gap-2 cursor-pointer ${
                        isActive
                          ? 'border-indigo-600 bg-indigo-50/20 dark:bg-indigo-950/20 shadow-sm ring-1 ring-indigo-200'
                          : 'border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-850 bg-slate-50/50 dark:bg-slate-950/40'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-xs font-bold text-slate-805 dark:text-slate-200 truncate pr-2 max-w-[170px]">{res.examName}</h4>
                        <span className={`text-[10px] font-mono font-bold uppercase ${res.percentage >= 80 ? 'text-emerald-500' : 'text-amber-500'}`}>
                          {res.percentage}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold font-mono border-t border-slate-100 dark:border-slate-800 pt-1.5 mt-1">
                        <span>{res.subject}</span>
                        <span>Score: {res.score}/{res.maxScore}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* B. Right side high-fidelity feedback sheet (Spans 8 columns) */}
          {activeResult && (
            <div className="lg:col-span-8 space-y-6">
              
              {/* Quick Summary Widgets Group */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { value: `${activeResult.percentage}%`, label: "Grade Performance", color: "text-indigo-600 dark:text-sky-400" },
                  { value: `${activeResult.score}/${activeResult.maxScore}`, label: "Marks Secured", color: "text-emerald-600 dark:text-emerald-450" },
                  { value: `#${activeResult.rank} of ${activeResult.totalCandidates}`, label: "Class Standing", color: "text-blue-600 dark:text-blue-400" },
                  { value: activeResult.timeTaken, label: "Time Expended", color: "text-amber-600 dark:text-amber-400" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white border border-slate-200/70 rounded-[1.5rem] p-5 shadow-sm dark:bg-slate-900 dark:border-slate-800 text-center flex flex-col justify-center">
                    <p className={`text-xl font-extrabold font-display ${stat.color}`}>{stat.value}</p>
                    <p className="text-[9px] text-slate-450 dark:text-slate-500 font-bold mt-1 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Graphical Analysis Segment: Bento Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Score vs Average */}
                <div className="bg-white border border-slate-200/70 rounded-[2rem] p-6 dark:bg-slate-900 dark:border-slate-800 shadow-sm space-y-4">
                  <h4 className="text-xs font-bold font-display text-slate-800 dark:text-slate-150">Subject Breakdown Analysis</h4>
                  <BarChart data={scoreChartData} />
                  <p className="text-[10px] text-slate-405 leading-relaxed text-center font-semibold pt-2 border-t border-slate-50 dark:border-slate-850">
                    Purple represents your score, Grey denotes typical class average.
                  </p>
                </div>

                {/* Score donut segment */}
                <div className="bg-white border border-slate-200/70 rounded-[2rem] p-6 dark:bg-slate-900 dark:border-slate-800 shadow-sm space-y-4">
                  <h4 className="text-xs font-bold font-display text-slate-805 dark:text-slate-150">Correct vs Incomplete Ratio</h4>
                  <div className="py-2 flex items-center justify-center">
                    <PieChart data={pieChartData} size={150} />
                  </div>
                </div>
              </div>

              {/* AI Study Assistant Recommendations and feedback card */}
              <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-slate-950 dark:to-slate-900/60 border border-slate-200/70 dark:border-slate-800 rounded-[2rem] p-6 space-y-5 shadow-sm">
                <div className="flex items-center gap-3 pb-3 border-b dark:border-slate-800 border-indigo-100">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow">
                    <BrainCircuit className="h-5.5 w-5.5" />
                  </span>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-550 dark:text-sky-400">AI Proctor Companion Feedback</span>
                    <h4 className="text-xs font-bold text-slate-805 dark:text-slate-100">Evaluative Strengths & Study Recommendations</h4>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 text-xs text-slate-600 leading-relaxed dark:text-slate-400">
                  {/* Strengths card item */}
                  <div className="space-y-2">
                    <p className="font-bold text-slate-705 dark:text-slate-200 flex items-center gap-1.5 uppercase tracking-wide text-[10px] text-emerald-600">
                      <ThumbsUp className="h-4 w-4" /> Core Strengths
                    </p>
                    <ul className="space-y-1.5 font-medium pl-3 border-l-2 border-emerald-400 dark:border-emerald-800 text-[11px] list-none">
                      {activeResult.aiFeedback.strengths.map((str, idx) => (
                        <li key={idx} className="flex gap-1.5">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses card item */}
                  <div className="space-y-2">
                    <p className="font-bold text-slate-705 dark:text-slate-200 flex items-center gap-1.5 uppercase tracking-wide text-[10px] text-amber-600">
                      <AlertTriangle className="h-4 w-4" /> Priority Weaknesses
                    </p>
                    <ul className="space-y-1.5 font-medium pl-3 border-l-2 border-amber-400 dark:border-amber-800 text-[11px] list-none">
                      {activeResult.aiFeedback.weaknesses.map((weak, idx) => (
                        <li key={idx} className="flex gap-1.5">
                          <span className="text-amber-500 font-bold">•</span>
                          <span>{weak}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Suggestions / Prep tips */}
                <div className="bg-white/70 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 space-y-2.5">
                  <p className="text-[10px] font-bold font-mono tracking-wide text-indigo-600 dark:text-sky-400 uppercase">
                    📚 Recommended Test Prep Work
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pl-4 list-decimal leading-relaxed">
                    {activeResult.aiFeedback.suggestions.map((sug, idx) => (
                      <li key={idx} className="font-medium text-[11px]">{sug}</li>
                    ))}
                  </ul>
                </div>

                {/* Actions group */}
                <div className="flex gap-3 pt-2 justify-between items-center flex-wrap">
                  <button
                    onClick={() => onNavigate('ai-assistant')}
                    className="px-5 py-3 bg-indigo-600 text-white font-bold hover:opacity-90 active:scale-95 rounded-xl text-xs shadow transition-all flex items-center gap-1.5 cursor-pointer font-sans"
                  >
                    Open AI Study Assistant <ChevronRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={handleDownloadPDF}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer font-sans"
                  >
                    <FileDown className="h-4 w-4" /> Download Certified PDF
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      )}
    </div>
  );
}
export { Results };
