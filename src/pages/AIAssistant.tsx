import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Plus, 
  Trash2, 
  FileText, 
  CheckSquare, 
  GraduationCap, 
  BookOpen, 
  Flame,
  UserCheck,
  ChevronRight,
  HelpCircle,
  Clock
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export default function AIAssistant() {
  const [conversations, setConversations] = useState([
    { id: 'chat-1', title: 'Deep Neural Network layers', date: 'Today' },
    { id: 'chat-2', title: 'SQL Joins trade-offs notes', date: 'Yesterday' },
    { id: 'chat-3', title: 'Normal Form BCNF vs 3NF', date: '3 days ago' }
  ]);
  const [activeChatId, setActiveChatId] = useState('chat-1');

  // Unified conversation pool
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: "Hello! I am your AI Study Companion, integrated with ExamGuard AI. I can generate immediate study notes, draft practice questions, explain logical anomalies, or serve quick test-preps.\n\nSelect any direct action above or ask a customized question below!",
      timestamp: '10:24 AM'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (customText?: string) => {
    const textToSend = (customText || inputVal).trim();
    if (!textToSend) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Add user message
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputVal('');
    setIsTyping(true);

    // 2. Automated AI response selector
    setTimeout(() => {
      let responseText = '';

      if (textToSend.toLowerCase().includes('quiz')) {
        responseText = "🎲 **AI Quiz Generator Loaded!**\nAttempt this quick practice trivia question:\n\n*Question: What specific property sets BCNF apart from standard Third Normal Form (3NF)?*\n\n1. It resolves partial dependency criteria.\n2. In BCNF, for every non-trivial functional dependency X → Y, X must be a super key.\n3. It requires complete non-transitive schemas.\n\n*Type 1, 2 or 3 to submit!*";
      } else if (textToSend.toLowerCase().includes('notes') || textToSend.toLowerCase().includes('get notes')) {
        responseText = "📝 **Revision Summary: Neural Network Overfitting Prevention**\n\n- **Weight Decay (L2 regularization):** Penalizes larger weight terms by appending a fraction of square-sums to loss.\n- **Dropout Layers:** Temporarily deactivates random neuron paths (e.g., 20%-50%) per update batch, preventing co-adaptation.\n- **Early stopping:** Halts step updates when validation loss patterns diverge from training curves.\n\nUse this context to draft short-essay descriptive query answers.";
      } else if (textToSend.toLowerCase().includes('practice test') || textToSend.toLowerCase().includes('practice')) {
        responseText = "📚 **Practice Exam Mode Activated!**\nI have generated a mini 3-question sandbox for Advanced Artificial Intelligence Concepts. Use the toolbar in the Portal tab to complete certified exams.";
      } else {
        responseText = `Sure! I am searching SVU CS Course guidelines for "${textToSend}". Here is what you should know:\n\n- Ensure you write logical pseudocodes directly in your subjective answers.\n- When answering descriptive SQL schemas, use primary keys explicitly to capture extra marks.\n- Gaze tracking models prioritize stable forehead profiles. Sit under bright indoor lighting setup while taking exams!`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'm1',
        sender: 'assistant',
        text: "Conversation reset successfully! What concepts would you like to practice today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div id="ai-assistant-page" className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
      
      {/* A. Left chat history sidebar list */}
      <div className="lg:col-span-3 bg-white border rounded-2xl p-4.5 dark:bg-slate-900 dark:border-slate-800 flex flex-col justify-between max-h-full overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b dark:border-slate-805">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-500">Study History</h3>
            <button
              onClick={() => {
                const title = prompt("Enter topic name:");
                if (title) {
                  setConversations([{ id: `chat-${Date.now()}`, title, date: 'Just now' }, ...conversations]);
                }
              }}
              className="text-xs p-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-sky-400 rounded hover:opacity-85"
              title="New Topic"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-2">
            {conversations.map(c => {
              const isActive = c.id === activeChatId;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveChatId(c.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-semibold select-none transition-all flex flex-col gap-1.5 ${
                    isActive
                      ? 'border-indigo-600 bg-indigo-50/25 dark:bg-indigo-950/20 dark:border-indigo-805'
                      : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-550'
                  }`}
                >
                  <span className="truncate text-slate-800 dark:text-slate-200">{c.title}</span>
                  <span className="text-[9px] text-slate-400 font-normal font-mono">{c.date}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={clearChat}
          className="w-full py-2 border border-rose-200/50 hover:bg-rose-50 hover:text-rose-600 rounded-xl text-xs font-bold text-rose-500 transition-colors flex items-center justify-center gap-1.5 dark:border-rose-950/20 dark:hover:bg-rose-955/10 bg-white dark:bg-slate-900 mt-4"
        >
          <Trash2 className="h-4 w-4" /> Clear active thread
        </button>
      </div>

      {/* B. Right Main Conversation window */}
      <div className="lg:col-span-9 flex flex-col h-full bg-white border dark:bg-slate-900 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg">
        
        {/* Chat window Header */}
        <div className="bg-slate-50/80 dark:bg-slate-850 p-4 border-b border-slate-205 dark:border-slate-800 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-650 text-white shadow">
            <Bot className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-xs font-bold text-slate-805 dark:text-slate-200">Study Companion AI</h3>
            <p className="text-[10px] text-slate-400 font-mono">Powered by Gemini reasoning models v2.4</p>
          </div>
        </div>

        {/* Feature Triggers toolbar bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs">
          <button
            onClick={() => handleSendMessage("Draft complex SQL revision questions")}
            className="flex items-center justify-center gap-2 py-3 hover:bg-slate-50 border-r border-slate-100 dark:border-slate-800 text-slate-605 dark:text-slate-350 hover:text-indigo-600 dark:hover:bg-indigo-950/10 font-bold"
          >
            <HelpCircle className="h-4 w-4 text-indigo-500" />
            <span>Ask Questions</span>
          </button>
          <button
            onClick={() => handleSendMessage("Generate quick trivia quiz")}
            className="flex items-center justify-center gap-2 py-3 hover:bg-slate-50 border-r border-slate-100 dark:border-slate-800 text-slate-605 dark:text-slate-350 hover:text-indigo-600 dark:hover:bg-indigo-950/10 font-bold"
          >
            <Flame className="h-4 w-4 text-amber-500" />
            <span>Generate Quiz</span>
          </button>
          <button
            onClick={() => handleSendMessage("Get revision notes for convolutional pooling layers")}
            className="flex items-center justify-center gap-2 py-3 hover:bg-slate-50 border-r border-slate-100 dark:border-slate-800 text-slate-605 dark:text-slate-350 hover:text-indigo-600 dark:hover:bg-indigo-950/10 font-bold"
          >
            <FileText className="h-4 w-4 text-emerald-500" />
            <span>Get Notes</span>
          </button>
          <button
            onClick={() => handleSendMessage("Launch practice test on BigO parameters")}
            className="flex items-center justify-center gap-2 py-3 hover:bg-slate-50 text-slate-650 dark:text-slate-350 hover:text-indigo-600 dark:hover:bg-indigo-950/10 font-bold"
          >
            <CheckSquare className="h-4 w-4 text-rose-500" />
            <span>Practice Test</span>
          </button>
        </div>

        {/* Messages list context pane */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50 dark:bg-slate-950/30">
          {messages.map(m => {
            const isAI = m.sender === 'assistant';
            return (
              <div 
                key={m.id} 
                className={`flex gap-3 max-w-[85%] ${isAI ? 'self-start' : 'self-end ml-auto flex-row-reverse'}`}
              >
                {isAI && (
                  <span className="flex h-8.5 w-8.5 items-center justify-center rounded-lg bg-indigo-55 text-indigo-600 dark:bg-indigo-950/60 dark:text-sky-455 flex-shrink-0 font-bold">
                    AI
                  </span>
                )}
                
                <div className={`p-4 rounded-2xl text-xs leading-relaxed space-y-1.5 ${
                  isAI
                    ? 'bg-white border text-slate-705 dark:bg-slate-900 dark:border-slate-850 dark:text-slate-300 shadow-sm'
                    : 'bg-indigo-600 text-white shadow-sm'
                }`}>
                  <p className="whitespace-pre-line font-medium leading-normal">{m.text}</p>
                  <span className={`block text-[9px] font-mono mt-1 ${isAI ? 'text-slate-400' : 'text-indigo-200 text-right'}`}>
                    {m.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 font-mono text-[10px] pl-11">
              <Bot className="h-3.5 w-3.5 animate-spin" />
              <span>Thinking under SVU course syllabus...</span>
            </div>
          )}
        </div>

        {/* Send message text box */}
        <div className="bg-slate-50 dark:bg-slate-850 p-4 border-t border-slate-205 dark:border-slate-800 flex gap-2.5 items-center">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
            placeholder="Ask about AI layers, query joins, BCNF anomalies or how to optimize proctor metrics..."
            className="flex-1 py-2.5 px-4 text-xs border border-slate-205 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-750 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-inner"
          />
          <button
            onClick={() => handleSendMessage()}
            className="p-2.5 bg-indigo-600 text-white hover:bg-slate-950 rounded-xl max-w-12 shadow cursor-pointer transition-colors"
          >
            <Send className="h-4.5 w-4.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
export { AIAssistant };
