import React, { useState } from 'react';
import { PageId, Exam, Question, StudentLiveStatus } from '../types';
import { INITIAL_QUESTION_BANK, LIVE_STUDENTS_MOCK } from '../mockData';
import { 
  Users, 
  PlusCircle, 
  Database, 
  Eye, 
  Award, 
  Trash2, 
  Search, 
  TrendingUp, 
  AlertTriangle,
  PlayCircle,
  Clock,
  Menu,
  ShieldAlert,
  Loader2,
  FileSpreadsheet,
  ToggleLeft,
  XSquare,
  Sparkles,
  Camera,
  Activity,
  ThumbsUp,
  UserCheck
} from 'lucide-react';

interface ExaminerPortalProps {
  onNavigate: (page: PageId) => void;
  exams: Exam[];
  onAddExam: (newExam: Exam) => void;
  subView?: 'dashboard' | 'create-exam' | 'question-bank' | 'live-proctor';
}

export default function ExaminerPortal({ onNavigate, exams, onAddExam, subView = 'dashboard' }: ExaminerPortalProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'create-exam' | 'question-bank' | 'live-proctor'>(subView);

  // States for Exam creation form
  const [examTitle, setExamTitle] = useState('');
  const [subjectName, setSubjectName] = useState('Computer Science');
  const [examDuration, setExamDuration] = useState('45');
  const [isNegativeMarking, setIsNegativeMarking] = useState(false);
  const [isRandomize, setIsRandomize] = useState(true);

  // States for Question Bank edit simulation
  const [questionBank, setQuestionBank] = useState(INITIAL_QUESTION_BANK);
  const [qbSearch, setQbSearch] = useState('');
  const [qbDifficulty, setQbDifficulty] = useState('All');
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionType, setNewQuestionType] = useState<'mcq' | 'multiselect' | 'subjective'>('mcq');

  // States for Live proctor monitor
  const [liveStudents, setLiveStudents] = useState<StudentLiveStatus[]>(LIVE_STUDENTS_MOCK);
  const [selectedStudent, setSelectedStudent] = useState<StudentLiveStatus | null>(LIVE_STUDENTS_MOCK[0]);
  const [timelineAlerts, setTimelineAlerts] = useState([
    { name: "Arjun Mehta", msg: "High probability: Multiple faces (2) recorded in background", time: "10:24:12 AM" },
    { name: "James Carter", msg: "Tab switch warning: candidate unfocused search sandbox", time: "10:22:05 AM" },
    { name: "David Kim", msg: "Status shifted: Candidate marked Away", time: "10:19:40 AM" }
  ]);

  const handleSaveExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examTitle.trim()) return;

    const newExam: Exam = {
      id: `exam-${Date.now()}`,
      name: examTitle,
      subject: subjectName,
      duration: parseInt(examDuration) || 45,
      questionsCount: 4,
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 86400000).toISOString(),
      marks: 40,
      negativeMarking: isNegativeMarking,
      randomize: isRandomize,
      questions: [
        { id: 'custom-q1', text: 'Select all standard ACID concurrency controllers:', type: 'multiselect', options: ['Pessimistic locking', 'Optimistic Concurrency Control', 'Unbounded variables', 'Direct write isolation'], correctAnswer: ['Pessimistic locking', 'Optimistic Concurrency Control'], difficulty: 'medium', marks: 10 },
        { id: 'custom-q2', text: 'What SQL clause groups rows sharing common properties into summary buckets?', type: 'mcq', options: ['ORDER BY', 'GROUP BY', 'HAVING BY', 'SORT BY'], correctAnswer: 'GROUP BY', difficulty: 'easy', marks: 10 },
        { id: 'custom-q3', text: 'Draft a short paragraph mapping the advantages of database replication.', type: 'subjective', difficulty: 'hard', marks: 20 }
      ]
    };

    onAddExam(newExam);
    alert('🎉 Success! New exam created and appended to Student Active schedules successfully.');
    setExamTitle('');
    setActiveTab('dashboard');
  };

  const handleCreateQuestion = () => {
    if (!newQuestionText.trim()) return;
    const newQ = {
      id: `qb-${Date.now()}`,
      question: newQuestionText,
      type: newQuestionType,
      difficulty: 'medium' as const,
      marks: 10
    };
    setQuestionBank([newQ, ...questionBank]);
    setNewQuestionText('');
    alert('Question added to database bank.');
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestionBank(questionBank.filter(q => q.id !== id));
  };

  const filteredQuestions = questionBank.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(qbSearch.toLowerCase());
    const matchesDiff = qbDifficulty === 'All' || q.difficulty.toLowerCase() === qbDifficulty.toLowerCase();
    return matchesSearch && matchesDiff;
  });

  return (
    <div id="examiner-portal" className="space-y-6">
      
      {/* 1. Header Toolbar Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 dark:border-slate-800 pb-2 border-b">
        <div>
          <h2 className="text-xl font-bold text-slate-805 dark:text-slate-100 font-display">Examiner Control Hub</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Design tests, review question stores, and monitor live surveillance feeds.</p>
        </div>

        {/* Tab switch buttons */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold gap-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Users },
            { id: 'create-exam', label: 'Create Exam', icon: PlusCircle },
            { id: 'question-bank', label: 'Question Bank', icon: Database },
            { id: 'live-proctor', label: 'Live Monitor', icon: Eye }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg select-none transition-all ${
                  isActive 
                    ? 'bg-white shadow text-indigo-650 dark:bg-slate-900 dark:text-sky-400' 
                    : 'text-slate-500 hover:text-slate-750'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB: EXAMINER SUMMARY DASHBOARD */}
      {/* ======================================================== */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Top Info Widgets */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Active Exams Today", value: "2 Scheduled", count: "1 Ongoing", color: "text-indigo-600" },
              { label: "Candidates Tracked", value: "148 Students", count: "98% Attendance", color: "text-blue-600" },
              { label: "Average Term Score", value: "78.4%", count: "Cohort Average", color: "text-emerald-650" },
              { label: "AI Flagged Incidents", value: "12 Alerts", count: "3 Critical cases", color: "text-red-500" }
            ].map((widget, idx) => (
              <div key={idx} className="bg-white p-4.5 rounded-2xl border dark:bg-slate-905 dark:border-slate-800 shadow-sm space-y-1">
                <p className="text-[10px] uppercase font-bold tracking-wide text-slate-400 font-mono">{widget.label}</p>
                <p className={`text-lg font-display font-black leading-none ${widget.color}`}>{widget.value}</p>
                <p className="text-[11px] text-slate-505 font-medium">{widget.count}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            
            {/* Scheduled exams list for Examiners */}
            <div className="bg-white border rounded-2xl p-5 dark:bg-slate-900 dark:border-slate-800 lg:col-span-7 space-y-3.5">
              <div className="flex justify-between items-center pb-2 border-b dark:border-slate-805">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-505">My Active Inventories</h3>
                <span className="text-[10px] font-bold text-slate-400">{exams.length} Configured</span>
              </div>
              <div className="space-y-3">
                {exams.map(ex => (
                  <div key={ex.id} className="flex justify-between items-center p-3.5 border rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border-slate-100 dark:border-slate-850">
                    <div>
                      <p className="text-xs font-bold text-slate-805 dark:text-slate-200">{ex.name}</p>
                      <div className="flex gap-3 text-[10px] text-slate-405 font-semibold font-mono uppercase tracking-wide mt-1">
                        <span>{ex.subject}</span>
                        <span>•</span>
                        <span>{ex.duration} mins</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('live-proctor')}
                      className="px-3 py-1.5 hover:bg-indigo-600 hover:text-white bg-slate-205 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-650 dark:text-slate-300"
                    >
                      Monitor Lives
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Live incidents summaries */}
            <div className="bg-white border rounded-2xl p-5 dark:bg-slate-900 dark:border-slate-800 lg:col-span-5 space-y-3.5">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-500">Live Active Alerts Terminal</h3>
              <div className="space-y-3 max-h-56 overflow-y-auto">
                {timelineAlerts.map((alert, i) => (
                  <div key={i} className="p-3 bg-red-50/20 rounded-xl border border-red-200/40 text-[11px] leading-relaxed dark:bg-red-950/10 dark:border-red-950/20">
                    <div className="flex justify-between font-bold text-slate-700 dark:text-slate-200 mb-1">
                      <span>{alert.name}</span>
                      <span className="text-[9px] text-slate-405 font-mono">{alert.time}</span>
                    </div>
                    <p className="text-slate-505">{alert.msg}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setActiveTab('live-proctor')}
                className="w-full text-center py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Go to Proctoring Feeds Grid
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB: CREATE EXAM INTERACTIVE FORM */}
      {/* ======================================================== */}
      {activeTab === 'create-exam' && (
        <div className="max-w-xl mx-auto bg-white border dark:bg-slate-900 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="space-y-1.5 pb-4 border-b dark:border-slate-805 mb-5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-705 text-[10px] uppercase font-bold font-mono">
              <Sparkles className="h-3.5 w-3.5 animate-spin" /> certified templates creator
            </span>
            <h3 className="text-base font-bold text-slate-805 dark:text-white font-display">Schedule New Proctor Assessment</h3>
            <p className="text-xs text-slate-400">Specify details to append test schedules immediately.</p>
          </div>

          <form onSubmit={handleSaveExam} className="space-y-5 text-xs text-slate-550 leading-normal">
            
            {/* Exam Title */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Assessment Title</label>
              <input
                type="text"
                required
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
                placeholder="Database Normalization Principles Midterm"
                className="w-full p-2.5 border border-slate-202 rounded-xl bg-slate-50/50 focus:bg-white dark:bg-slate-950 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-indigo-55"
              />
            </div>

            {/* Grid for Subject and Duration */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Course Domain / Subject</label>
                <select
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="w-full p-2.5 border border-slate-205 rounded-xl bg-slate-50/50 focus:bg-white dark:bg-slate-950 dark:border-slate-800"
                >
                  <option>Computer Science</option>
                  <option>Information Technology</option>
                  <option>Software Engineering</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-505 uppercase tracking-wide mb-1">Exam Duration (minutes)</label>
                <input
                  type="number"
                  required
                  value={examDuration}
                  onChange={(e) => setExamDuration(e.target.value)}
                  placeholder="45"
                  className="w-full p-2.5 border border-slate-203 rounded-xl bg-slate-50/50 focus:bg-white dark:bg-slate-950 dark:border-slate-800 text-slate-800 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Custom Proctor Toggles constraints */}
            <div className="space-y-3.5 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200/50 dark:border-slate-850">
              <p className="text-[10px] font-bold font-mono tracking-wider text-indigo-605 uppercase">
                🛡️ Advanced Security Parameters
              </p>

              {/* Negative marking parameters */}
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-bold text-slate-705 dark:text-slate-200">Enforce Negative Scoring</p>
                  <p className="text-[10px] text-slate-400">Incorrect answers forfeit 1/4th question marks weight.</p>
                </div>
                <input
                  type="checkbox"
                  checked={isNegativeMarking}
                  onChange={(e) => setIsNegativeMarking(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
                />
              </label>

              {/* Shuffle questions parameters */}
              <label className="flex items-center justify-between cursor-pointer pt-2">
                <div>
                  <p className="font-bold text-slate-705 dark:text-slate-200">Shuffle Palette Sequences</p>
                  <p className="text-[10px] text-slate-400">Randomize question order per candidate index trace.</p>
                </div>
                <input
                  type="checkbox"
                  checked={isRandomize}
                  onChange={(e) => setIsRandomize(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
                />
              </label>
            </div>

            {/* Save Button */}
            <button
              id="btn-examiner-save-exam"
              type="submit"
              className="w-full py-2.5 bg-indigo-600 text-white font-bold hover:bg-slate-950 rounded-xl shadow cursor-pointer text-xs transition-colors"
            >
              Verify & Launch Exam Schedule
            </button>
          </form>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB: QUESTION BANK MANAGEMENT TABLE */}
      {/* ======================================================== */}
      {activeTab === 'question-bank' && (
        <div className="space-y-6">
          {/* Add fast simulation question bar */}
          <div className="bg-slate-50 dark:bg-slate-900 border rounded-2xl p-5 border-slate-205 dark:border-slate-800 space-y-4">
            <p className="text-[11px] font-mono font-bold tracking-wider text-indigo-505 uppercase">➕ Quick Add Question Record</p>
            <div className="flex flex-col sm:flex-row gap-3.5">
              <input
                type="text"
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                placeholder="Type your objective or code essay question text here..."
                className="flex-1 p-2.5 text-xs border border-slate-200 bg-white dark:bg-slate-950 dark:border-slate-800 rounded-xl"
              />
              <div className="flex gap-2">
                <select
                  value={newQuestionType}
                  onChange={(e) => setNewQuestionType(e.target.value as any)}
                  className="p-2 border border-slate-200 dark:border-slate-800 text-xs rounded-xl bg-white dark:bg-slate-950"
                >
                  <option value="mcq">MCQ</option>
                  <option value="multiselect">Multi-select</option>
                  <option value="subjective">Subjective/Code</option>
                </select>
                <button
                  onClick={handleCreateQuestion}
                  className="px-4 py-2 bg-indigo-600 hover:bg-slate-900 text-white font-bold rounded-xl text-xs flex-shrink-0"
                >
                  Add Question
                </button>
              </div>
            </div>
          </div>

          {/* Search bar and Filters */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={qbSearch}
                onChange={(e) => setQbSearch(e.target.value)}
                placeholder="Search matching repository prompts..."
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl text-slate-705 bg-white dark:bg-slate-900 dark:border-slate-800"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">Difficulty:</span>
              <select
                value={qbDifficulty}
                onChange={(e) => setQbDifficulty(e.target.value)}
                className="text-xs p-2 border border-slate-200 rounded-xl bg-white dark:bg-slate-900 dark:border-slate-800"
              >
                <option>All</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
          </div>

          {/* Questions Grid Table */}
          <div className="bg-white border rounded-2xl overflow-hidden dark:bg-slate-900 dark:border-slate-850">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-550 border-collapse">
                <thead className="bg-slate-50 dark:bg-slate-850 text-[10px] font-mono tracking-wider font-bold uppercase border-b dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Question Text</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Difficulty</th>
                    <th className="py-3 px-4">Marks weight</th>
                    <th className="py-3 px-4 text-right">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-805">
                  {filteredQuestions.map(q => (
                    <tr key={q.id} className="hover:bg-slate-50/55 dark:hover:bg-slate-850/40">
                      <td className="py-4.5 px-4 font-semibold text-slate-805 dark:text-gray-200 max-w-sm truncate">{q.question}</td>
                      <td className="py-4.5 px-4 uppercase font-bold text-[9px] text-slate-450">{q.type}</td>
                      <td className="py-4.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold ${
                          q.difficulty === 'easy' ? 'bg-emerald-50 text-emerald-700' : q.difficulty === 'medium' ? 'bg-indigo-50 text-indigo-700' : 'bg-rose-50 text-rose-700'
                        }`}>
                          {q.difficulty}
                        </span>
                      </td>
                      <td className="py-4.5 px-4 font-mono font-bold">{q.marks}</td>
                      <td className="py-4.5 px-4 text-right">
                        <button
                          onClick={() => handleDeleteQuestion(q.id)}
                          className="p-1 hover:bg-rose-50 text-rose-500 rounded"
                          title="Delete"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB: LIVE PROCTOR MONITOR VISUAL GRID */}
      {/* ======================================================== */}
      {activeTab === 'live-proctor' && (
        <div className="grid lg:grid-cols-12 gap-6 items-start h-[calc(100vh-12rem)] overflow-hidden">
          
          {/* Grid View of Students */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4.5 max-h-full overflow-y-auto pr-1">
            {liveStudents.map(student => {
              const hasAlerts = student.alertsCount > 0;
              const isHighRisk = student.riskScore >= 75;
              const isSelected = selectedStudent?.id === student.id;

              return (
                <div 
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className={`relative p-4 rounded-2xl bg-white border cursor-pointer select-none transition-all dark:bg-slate-900 ${
                    isSelected
                      ? 'border-indigo-650 shadow ring-1 ring-indigo-250'
                      : isHighRisk
                        ? 'border-red-300 dark:border-red-950/40 hover:border-red-400'
                        : 'border-slate-200 hover:border-slate-350 dark:border-slate-805'
                  }`}
                >
                  {/* Student info and Risk Meter */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-100 max-w-[110px] truncate">
                      <span className={`h-2.5 w-2.5 rounded-full ${student.status === 'online' ? 'bg-emerald-505' : 'bg-amber-400 animate-pulse'}`} />
                      {student.name}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-black ${
                      isHighRisk ? 'bg-red-100 text-red-800' : hasAlerts ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      Risk: {student.riskScore}%
                    </span>
                  </div>

                  {/* Wireframe Webcam Placeholder */}
                  <div className="aspect-video w-full rounded-xl bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden text-slate-500">
                    <Camera className="h-6 w-6 text-slate-700 animate-pulse mb-1" />
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">SECURE LINK</span>
                    
                    {/* Bounding box overlays */}
                    <div className="absolute inset-4.5 border border-indigo-500/20 rounded pointer-events-none" />
                    {isHighRisk && (
                      <div className="absolute top-1 left-1 bg-red-600 text-white text-[8px] font-bold font-mono px-1 rounded animate-pulse">
                        ALERTS TRIP
                      </div>
                    )}
                  </div>

                  {/* Tiny metadata detail */}
                  <div className="mt-3 text-[10px] text-slate-405 font-bold font-mono uppercase flex justify-between tracking-wide">
                    <span>{student.currentQuestion}</span>
                    <span className={hasAlerts ? 'text-amber-600' : 'text-slate-400'}>
                      {student.alertsCount} inc.
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar Active Diagnostics of Selected Student */}
          <div className="lg:col-span-4 bg-white border dark:bg-slate-900 border-slate-205 dark:border-slate-800 rounded-3xl p-5 space-y-4 max-h-full overflow-y-auto">
            {selectedStudent ? (
              <div className="space-y-4">
                <div className="pb-2 border-b dark:border-slate-800">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-505">Focused Candidate</h3>
                  <h2 className="font-display font-black text-slate-805 dark:text-white mt-1 text-sm sm:text-base">{selectedStudent.name}</h2>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-2 rounded-xl">
                    <span className="text-slate-500">Threat Metrics:</span>
                    <span className={`font-mono font-bold ${selectedStudent.riskScore >= 75 ? 'text-red-500' : 'text-emerald-500'}`}>
                      {selectedStudent.riskScore >= 75 ? 'SURVEILLANCE WARNING' : 'STABLE'} ({selectedStudent.riskScore}%)
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-2 rounded-xl">
                    <span className="text-slate-500">Latest Incident:</span>
                    <span className="font-mono text-amber-600 font-bold max-w-[180px] break-all text-right">{selectedStudent.latestViolation || 'None'}</span>
                  </div>
                </div>

                {/* Simulated Intervene quick alert parameters */}
                <div className="space-y-2 pt-1 border-t dark:border-slate-855">
                  <p className="text-[10px] font-mono font-bold tracking-wide uppercase text-slate-405">Auditing Actions</p>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                    <button
                      onClick={() => {
                        alert(`📧 Warning flag sent successfully to candidate "${selectedStudent.name}".`);
                        setTimelineAlerts([
                          { name: selectedStudent.name, msg: 'Examiner logged custom text warning block', time: new Date().toLocaleTimeString() },
                          ...timelineAlerts
                        ]);
                      }}
                      className="py-2 text-indigo-600 hover:bg-slate-50 border border-slate-200 rounded-xl dark:border-slate-800"
                    >
                      Warn Student
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you absolutely sure you want to suspend security ticket for "${selectedStudent.name}"?`)) {
                          alert(`Paper Suspended.`);
                        }
                      }}
                      className="py-2 text-rose-500 hover:bg-rose-50 border border-slate-200 rounded-xl dark:border-slate-800"
                    >
                      Suspend Exam
                    </button>
                  </div>
                </div>

                {/* Sub audit timeline log */}
                <div className="space-y-3 pt-3 border-t dark:border-slate-855">
                  <p className="text-[10px] font-mono font-bold tracking-wide uppercase text-slate-405">Incident Log</p>
                  <div className="space-y-2 text-[10px] font-mono leading-relaxed">
                    <div className="p-2 border rounded bg-slate-50 dark:bg-slate-950 dark:border-slate-850 text-slate-500">
                      • [10:21:05] Web camera refocus: Frame matching 98%
                    </div>
                    <div className="p-2 border rounded bg-slate-50 dark:bg-slate-950 dark:border-slate-850 text-slate-500">
                      • [10:19:40] Active sound matrix checked: Room empty
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="py-20 text-center text-slate-415 text-xs">
                Select a candidate to view real-time diagnostics
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
export { ExaminerPortal };
