import React from 'react';
import { PageId } from '../types';
import { Shield, Cpu, Award, Zap, CheckCircle, HelpCircle, ArrowRight, Activity, Users, FileText, ChevronDown } from 'lucide-react';

interface LandingProps {
  onNavigate: (page: PageId) => void;
  onSetRoleForDemo: (role: 'student' | 'examiner' | 'admin') => void;
}

export default function Landing({ onNavigate, onSetRoleForDemo }: LandingProps) {
  const [activeFaq, setActiveFaq] = React.useState<number | null>(null);

  const testimonials = [
    {
      name: "Dr. Alisha Vance",
      role: "Dean of Computer Science, SVU University",
      quote: "ExamGuard AI completely transformed our mid-term examination process. The live monitoring dashboard provided immediate visibility into tab switching incidents without false positives.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
    },
    {
      name: "Gavin Fletcher",
      role: "MCA Student",
      quote: "The interface is very clean, much like HackerRank. I liked the AI Assistant feature which helped me practice test-prep concepts, and the webcam status indicator kept me assured throughout.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    }
  ];

  const faqs = [
    {
      q: "How does the AI Proctoring system distinguish genuine behavior from violations?",
      a: "Our models check for prolonged gaze deviation, secondary face inclusion, tab switches, and audio signals. Visual alerts are cross-verified server-side, reducing candidate anxiety with accurate indicators."
    },
    {
      q: "Is standard web camera hardware sufficient?",
      a: "Yes! ExamGuard is highly optimized to run directly inside any HTML5 browser. Any basic web camera and microphone are sufficient for reliable verification, with no software downloads needed."
    },
    {
      q: "Can examiners personalize the strictness controls?",
      a: "Absolutely. When creating an exam, examiners can toggle parameters like randomizing questions, negative marking, tab-lock tolerance, and sound detection indices."
    }
  ];

  return (
    <div id="landing-page" className="bg-slate-50 text-slate-800 transition-colors dark:bg-slate-950 dark:text-slate-100 min-h-screen">
      {/* 1. Hero Banner */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-bold tracking-wide uppercase">
                <Shield className="h-3.5 w-3.5" /> Next-Gen Integrity Suite
              </span>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
                Secure AI-Powered <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Online Examination
                </span> <br />
                Platform
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Empowering universities, bootcamps, and certification bodies with automated audio-visual surveillance, real-time gaze analysis, and secure instant evaluations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-3">
                <button
                  id="btn-hero-get-started"
                  onClick={() => onNavigate('register')}
                  className="px-6 py-3.5 rounded-2xl text-sm font-semibold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:opacity-95 text-white shadow-lg cursor-pointer transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  id="btn-hero-live-demo"
                  onClick={() => {
                    // Preselect a default student credential for premium user experience
                    onSetRoleForDemo('student');
                  }}
                  className="px-6 py-3.5 rounded-2xl text-sm font-semibold bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700 cursor-pointer transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  Quick Student Demo
                </button>
                <button
                  id="btn-hero-examiner-demo"
                  onClick={() => {
                    onSetRoleForDemo('examiner');
                  }}
                  className="px-6 py-3.5 rounded-2xl text-sm font-semibold bg-indigo-900/30 text-indigo-200 hover:bg-indigo-900/50 border border-indigo-800/40 cursor-pointer transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  Examiner Portal Demo
                </button>
              </div>
            </div>

            {/* Illustrative Interface Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-indigo-500 rounded-full filter blur-3xl opacity-10 animate-pulse-slow" />
              <div className="relative border border-slate-800 bg-slate-900/80 rounded-2xl p-4.5 shadow-2xl space-y-4 backdrop-blur">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500" />
                    <span className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-900/30">
                    Live Video Analysis: ON
                  </span>
                </div>
                <div className="aspect-video rounded-xl bg-slate-950 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-x-0 top-1/4 h-0.5 bg-indigo-500/50 shadow-[0_0_10px_#6366f1] animate-bounce" />
                  <div className="absolute border border-indigo-400 h-28 w-24 rounded flex flex-col items-center justify-center bg-indigo-500/10">
                    <span className="text-[9px] font-mono text-indigo-300">Identity Matched</span>
                    <span className="text-[10px] font-bold font-mono text-indigo-400">98.4%</span>
                  </div>
                  <p className="absolute bottom-2 text-[10px] font-mono text-slate-400">Interactive Proctor Preview Simulator</p>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-center">
                    <p className="text-[9px] text-slate-400 uppercase">Tab Lock</p>
                    <p className="text-xs font-bold text-emerald-400 font-mono">ENFORCED</p>
                  </div>
                  <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-center">
                    <p className="text-[9px] text-slate-400 uppercase">Secondary Face</p>
                    <p className="text-xs font-bold text-emerald-400 font-mono">ABSENT</p>
                  </div>
                  <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-center">
                    <p className="text-[9px] text-slate-400 uppercase">Audio Level</p>
                    <p className="text-xs font-bold text-slate-350 font-mono">12 dB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Highlights & Statistics */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "500,000+", label: "Exams Conducted Successfully" },
              { num: "99.98%", label: "System Availability Rate" },
              { num: "15,000+", label: "AI Assisted Quizzes Served" },
              { num: "0% False Positives", label: "Gaze-Calibration Accuracy" }
            ].map((stat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/50 dark:border-slate-800 text-center">
                <p className="text-3xl font-extrabold text-indigo-600 dark:text-sky-400 font-display">{stat.num}</p>
                <p className="text-xs font-semibold text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Core Features Grid */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-xs font-bold text-indigo-600 dark:text-sky-400 font-mono uppercase tracking-widest">Core Capabilities</h2>
            <p className="text-3xl md:text-4xl font-extrabold font-display leading-tight text-slate-900 dark:text-white">
              Smarter Proctoring Built for Today’s Academy
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              Achieve deep reliability with a light frontend architecture optimized with real-time media streaming overlays.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Active Web Browser Audits",
                desc: "Prevents candidate multi-tab searching with dynamic refocus hooks that notify monitoring dashboards instantly."
              },
              {
                icon: Cpu,
                title: "Face Landmark Mapping",
                desc: "Analyzes candidate landmarks in-browser with lightweight matrix calculations to trace gaze directions accurately."
              },
              {
                icon: Zap,
                title: "No-software Sandbox",
                desc: "Runs directly within the standard iframe workspace—no downloads or invasive desktop trackers required."
              },
              {
                icon: Award,
                title: "Immediate AI Analytics",
                desc: "Scores are autograded with personalized suggestions mapping candidate strengths, weaknesses, and reviews."
              },
              {
                icon: FileText,
                title: "Multi-type Question Banks",
                desc: "Easily design exams using MCQs, multi-select checkboxes, and descriptive subjective responses."
              },
              {
                icon: Activity,
                title: "Simultaneous Live Feeds",
                desc: "Examiners enjoy a grid overview, real-time alert logs, and student status grids with risk meters."
              }
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-sky-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-slate-900 dark:text-slate-100 font-display font-bold text-lg">{feat.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Testimonial Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xs font-bold text-indigo-600 font-mono uppercase tracking-widest">Endorsements</h2>
            <p className="text-3xl font-extrabold font-display text-slate-900 dark:text-white">Trusted by Leaders & Students</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((test, idx) => (
              <div key={idx} className="flex flex-col justify-between p-8 rounded-3xl bg-slate-50 dark:bg-slate-850 border border-slate-200/50 dark:border-slate-800 space-y-6">
                <p className="text-slate-600 dark:text-slate-300 italic text-sm leading-relaxed">
                  "{test.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <img src={test.avatar} alt={test.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-indigo-500" />
                  <div>
                    <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{test.name}</p>
                    <p className="text-[11px] text-slate-400">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQs FAQ */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <HelpCircle className="h-8 w-8 mx-auto text-indigo-600 dark:text-sky-400" />
            <h2 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-500">Everything you need to know about the AI Proctoring engine.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left text-xs font-bold text-slate-800 dark:text-slate-100"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-4.5 w-4.5 text-slate-450 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800 leading-relaxed bg-slate-50/50 dark:bg-slate-900/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Footer Content */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 pb-8 border-b border-slate-800 text-xs">
            <div className="space-y-3">
              <span className="font-display font-extrabold text-lg text-white">ExamGuard AI</span>
              <p className="text-slate-400">
                Next-generation client-integrated proctoring. Secure automated evaluations and identity audits.
              </p>
            </div>
            <div>
              <p className="font-bold text-white mb-2 font-display">Student Portal</p>
              <ul className="space-y-2">
                <li><button onClick={() => onNavigate('login')} className="hover:text-white">Active Exams</button></li>
                <li><button onClick={() => onNavigate('login')} className="hover:text-white">Mock Exams Sandbox</button></li>
                <li><button onClick={() => onNavigate('login')} className="hover:text-white">Study Companion Bot</button></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-white mb-2 font-display">Examiner Space</p>
              <ul className="space-y-2">
                <li><button onClick={() => onNavigate('login')} className="hover:text-white">Core Question Banks</button></li>
                <li><button onClick={() => onNavigate('login')} className="hover:text-white">Surveillance Console</button></li>
                <li><button onClick={() => onNavigate('login')} className="hover:text-white">Integrations & API</button></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-white mb-2 font-display">Contact & Technical Support</p>
              <p className="text-slate-450 leading-relaxed">
                Emergency Hotline: support@examguard-ai.edu<br />
                Office hours: Mon-Fri, 9:00 AM - 6:00 PM UTC
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-[11px] text-slate-550 gap-4">
            <p>© 2026 ExamGuard AI Technologies Inc. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="hover:text-white cursor-pointer">Syllabus Guidelines</span>
              <span className="hover:text-white cursor-pointer">Privacy Framework</span>
              <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
