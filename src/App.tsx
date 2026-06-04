import React, { useState, useEffect } from 'react';
import { PageId, User, Exam, ExamAttemptResult } from './types';
import { INITIAL_EXAMS, INITIAL_RESULTS } from './mockData';

// Layout & Reusable Elements
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Pages
import Landing from './pages/Landing';
import AuthPages from './pages/AuthPages';
import { StudentDashboard } from './pages/StudentDashboard';
import ExamPortal from './pages/ExamPortal';
import { Results } from './pages/Results';
import { Analytics } from './pages/Analytics';
import AIAssistant from './pages/AIAssistant';
import ExaminerPortal from './pages/ExaminerPortal';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProfileAndSettings } from './pages/ProfileAndSettings';

export default function App() {
  // Navigation & User State Flow
  const [currentPage, setCurrentPage] = useState<PageId>('landing');
  const [user, setUser] = useState<User | null>(null);

  // Core Datastores
  const [exams, setExams] = useState<Exam[]>(INITIAL_EXAMS);
  const [results, setResults] = useState<ExamAttemptResult[]>(INITIAL_RESULTS);
  
  // App preferences
  const [darkMode, setDarkMode] = useState<boolean>(true); // start in modern sleek Dark Mode by default!
  const [notifications, setNotifications] = useState([
    { id: 'n1', text: 'Secured server sandbox online. Optimal proctor connection verified.', time: 'Just now', read: false },
    { id: 'n2', text: 'Revision materials synccomplete inside AI study companion bot.', time: '1 hour ago', read: false }
  ]);

  // Dark Mode Class synchronization
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLoginSuccess = (loggedUser: User) => {
    setUser(loggedUser);
    
    // Divert user to designated role dashboard
    if (loggedUser.role === 'examiner') {
      setCurrentPage('examiner-dashboard');
    } else if (loggedUser.role === 'admin') {
      setCurrentPage('admin-dashboard');
    } else {
      setCurrentPage('student-dashboard');
    }

    // Append greeting notice
    const greetingNotice = {
      id: `notice-${Date.now()}`,
      text: `Welcome, ${loggedUser.name}! Identity verified on AI Cluster Node.`,
      time: 'Just now',
      read: false
    };
    setNotifications([greetingNotice, ...notifications]);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  const handleAddExam = (newExam: Exam) => {
    setExams([newExam, ...exams]);
  };

  const handleAddResult = (newResult: ExamAttemptResult) => {
    setResults([newResult, ...results]);
    
    // Add success notice
    const congratsNotice = {
      id: `notice-res-${Date.now()}`,
      text: `Exam "${newResult.examName}" graded. Score: ${newResult.percentage}%!`,
      time: 'Just now',
      read: false
    };
    setNotifications([congratsNotice, ...notifications]);
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  // Demo Assist Shortcut handler
  const handleSetRoleForDemo = (role: 'student' | 'examiner' | 'admin') => {
    const demoEmail = `${role}@examguard.ai`;
    const demoName = role === 'student' ? 'Sagar Kadli' : role === 'examiner' ? 'Professor Harrison' : 'Dean Jenkins';
    const demoUser: User = {
      id: `demo-user-${Date.now()}`,
      name: demoName,
      email: demoEmail,
      role: role,
      institution: 'AI Global Academy',
      phone: '+91 80000 00000'
    };
    handleLoginSuccess(demoUser);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  // Switcher Page Dispatcher
  const renderActivePage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing onNavigate={setCurrentPage} onSetRoleForDemo={handleSetRoleForDemo} />;
      
      case 'login':
      case 'register':
        return (
          <AuthPages 
            currentPage={currentPage} 
            onNavigate={setCurrentPage} 
            onLoginSuccess={handleLoginSuccess} 
          />
        );

      // Student Pages
      case 'student-dashboard':
        return user ? <StudentDashboard user={user} onNavigate={setCurrentPage} exams={exams} /> : null;
      
      case 'exam-list':
      case 'exam-instructions':
      case 'online-exam':
        return (
          <ExamPortal 
            onNavigate={setCurrentPage} 
            onAddResult={handleAddResult} 
            exams={exams} 
          />
        );

      case 'results':
        return <Results results={results} onNavigate={setCurrentPage} />;
      
      case 'analytics':
        return <Analytics onNavigate={setCurrentPage} />;
      
      case 'ai-assistant':
        return <AIAssistant />;

      // Examiner Pages
      case 'examiner-dashboard':
        return <ExaminerPortal onNavigate={setCurrentPage} exams={exams} onAddExam={handleAddExam} subView="dashboard" />;
      
      case 'create-exam':
        return <ExaminerPortal onNavigate={setCurrentPage} exams={exams} onAddExam={handleAddExam} subView="create-exam" />;
      
      case 'question-bank':
        return <ExaminerPortal onNavigate={setCurrentPage} exams={exams} onAddExam={handleAddExam} subView="question-bank" />;
      
      case 'live-proctor':
        return <ExaminerPortal onNavigate={setCurrentPage} exams={exams} onAddExam={handleAddExam} subView="live-proctor" />;

      // Admin Pages
      case 'admin-dashboard':
        return <AdminDashboard />;

      // User Profile & Preferences
      case 'profile':
        return user ? <ProfileAndSettings user={user} onUpdateUser={handleUpdateUser} onNavigate={setCurrentPage} onLogout={handleLogout} subView="profile" /> : null;
      
      case 'settings':
        return user ? <ProfileAndSettings user={user} onUpdateUser={handleUpdateUser} onNavigate={setCurrentPage} onLogout={handleLogout} subView="settings" /> : null;

      default:
        return <Landing onNavigate={setCurrentPage} onSetRoleForDemo={handleSetRoleForDemo} />;
    }
  };

  // Full Page screen checks (hide navbar and sidebar borders for Landing / login / register / ongoing exams to maximize view space!)
  const isLandingOrAuth = currentPage === 'landing' || currentPage === 'login' || currentPage === 'register';
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Dynamic Navbar */}
      <Navbar 
        user={user} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        onNavigate={setCurrentPage} 
        onLogout={handleLogout}
        notifications={notifications}
        clearNotifications={handleClearNotifications}
      />

      {isLandingOrAuth ? (
        // Plain centered grid for presentation splash sheets
        <main className="w-full">
          {renderActivePage()}
        </main>
      ) : (
        // Standard high-efficiency dual sidebar + panel layout
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 py-6 items-start">
            {/* Navigational Sidebar */}
            <Sidebar 
              user={user} 
              currentPage={currentPage} 
              onNavigate={setCurrentPage} 
            />

            {/* Core Work Pane content */}
            <main className="flex-1 w-full overflow-hidden">
              {renderActivePage()}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
