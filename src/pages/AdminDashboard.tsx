import React, { useState } from 'react';
import { PageId } from '../types';
import { BarChart, LineChart } from '../components/Charts';
import { 
  Users, 
  ShieldAlert, 
  Building2, 
  FileSpreadsheet, 
  Settings, 
  Search, 
  Filter, 
  ChevronRight, 
  CheckCircle, 
  CloudLightning 
} from 'lucide-react';

export default function AdminDashboard() {
  const [users, setUsers] = useState([
    { id: 'u1', name: 'James Carter', email: 'j.carter@stateu.edu', role: 'Student', institution: 'State University', status: 'Active' },
    { id: 'u2', name: 'Sophia Lin', email: 'slin@aiacademy.org', role: 'Student', institution: 'AI Global Academy', status: 'Active' },
    { id: 'u3', name: 'Professor Harrison', email: 'harrison@svu.edu', role: 'Examiner', institution: 'SVU Tech Institute', status: 'Active' },
    { id: 'u4', name: 'Dean Jenkins', email: 'd.jenkins@admin.edu', role: 'Admin', institution: 'Admin Command', status: 'Active' }
  ]);

  const auditLogs = [
    { id: 'a1', time: '10:24:15 AM', node: 'Node-US-03', user: 'James Carter', event: 'Browser Tab Refocus Warning', status: 'High Warning' },
    { id: 'a2', time: '10:22:10 AM', node: 'Node-EU-01', user: 'Sagar Kadli', event: 'Webcam Permission Authenticated', status: 'Successful' },
    { id: 'a3', time: '10:19:04 AM', node: 'Node-AS-05', user: 'Professor Harrison', event: 'Exam Assessment Schedule Saved', status: 'Successful' },
    { id: 'a4', time: '10:15:32 AM', node: 'Node-US-03', user: 'James Carter', event: 'Unified Webcam Handshake', status: 'Successful' }
  ];

  const handleUpdateStatus = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
  };

  return (
    <div id="admin-dashboard" className="space-y-6">
      {/* 1. Header with audit metrics */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 dark:border-slate-800 pb-2 border-b">
        <div>
          <h2 className="text-xl font-bold text-slate-805 dark:text-slate-100 font-display">Global Admin Console</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Manage user groups, review system telemetry, and inspect cryptographic audit footprints.</p>
        </div>
        <span className="text-[10px] uppercase font-mono font-bold px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border rounded-full">
          Cloud Clusters: Optimal (11ms lag)
        </span>
      </div>

      {/* 2. Top Analytical Widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users Joined", value: "1,248 Users", desc: "Student & Instructors", color: "text-indigo-600" },
          { label: "Active Exams Runs", value: "14 Assessments", desc: "Simultaneous executions", color: "text-blue-600" },
          { label: "Institutions Mapped", value: "32 Universities", desc: "Authorized credentials", color: "text-emerald-650" },
          { label: "System Violations", value: "142 Incidents", desc: "Overall sandboxes warnings", color: "text-red-500" }
        ].map((widget, idx) => (
          <div key={idx} className="bg-white p-4.5 rounded-2xl border dark:bg-slate-905 dark:border-slate-800 shadow-sm space-y-1">
            <p className="text-[10px] uppercase font-bold tracking-wide text-slate-405 font-mono">{widget.label}</p>
            <p className="text-lg font-display font-black leading-none dark:text-white">{widget.value}</p>
            <p className="text-[11px] text-slate-450 font-semibold">{widget.desc}</p>
          </div>
        ))}
      </div>

      {/* 3. User Directories Management and audit details */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* User Management Table */}
        <div className="bg-white border rounded-2xl p-5 dark:bg-slate-900 dark:border-slate-800 lg:col-span-7 space-y-4 overflow-x-auto">
          <div className="flex justify-between items-center border-b pb-2 dark:border-slate-805">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-505 flex items-center gap-1.5">
              <Users className="h-4.5 w-4.5 animate-pulse text-indigo-55" /> Access Controls & Directives
            </h3>
            <span className="text-[10px] font-mono text-slate-400">{users.length} Users</span>
          </div>

          <table className="w-full text-xs text-left text-slate-550 border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-850 text-[10px] font-mono font-bold uppercase border-b dark:border-slate-800">
              <tr>
                <th className="py-2 px-3">Identity</th>
                <th className="py-2 px-3">Privilege</th>
                <th className="py-2 px-3">School / Unit</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3 text-right">Suspend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-805">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/40">
                  <td className="py-3 px-3">
                    <p className="font-bold text-slate-805 dark:text-slate-100">{u.name}</p>
                    <p className="text-[10px] text-slate-400">{u.email}</p>
                  </td>
                  <td className="py-3 px-3 uppercase text-[10px] font-mono font-bold text-slate-450">{u.role}</td>
                  <td className="py-3 px-3 italic font-medium">{u.institution}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold ${
                      u.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleUpdateStatus(u.id)}
                      className={`px-2 py-1 text-[10px] font-bold rounded-lg transition-colors ${
                        u.status === 'Active'
                          ? 'text-rose-505 hover:bg-rose-50'
                          : 'text-emerald-505 hover:bg-emerald-50'
                      }`}
                    >
                      {u.status === 'Active' ? 'Revoke' : 'Reinstate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Audit Logs and node telemetry list */}
        <div className="bg-white border rounded-2xl p-5 dark:bg-slate-900 dark:border-slate-800 lg:col-span-5 space-y-4">
          <div className="flex justify-between items-center border-b pb-2 dark:border-slate-805">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-500">Live Security Trace Logs</h3>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3 bg-slate-50/50 border rounded-xl dark:bg-slate-950/40 dark:border-slate-850 text-[10px] leading-relaxed">
                <div className="flex justify-between font-bold text-slate-705 dark:text-slate-350 mb-1">
                  <span>{log.event}</span>
                  <span className="text-[9px] text-slate-400 font-normal">{log.time}</span>
                </div>
                <div className="flex justify-between text-slate-415">
                  <span>Candidate: {log.user}</span>
                  <span className="font-mono">{log.node}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
export { AdminDashboard };
