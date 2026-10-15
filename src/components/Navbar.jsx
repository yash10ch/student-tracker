import React from 'react';
import { 
  CheckCircle2, 
  Plus, 
  Timer, 
  Code2, 
  Download, 
  RotateCcw, 
  BrainCircuit,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';

export default function Navbar({ 
  onOpenAddModal, 
  onToggleTimer, 
  onToggleMachineCoding, 
  activeTab, 
  setActiveTab,
  onOpenExportModal,
  onResetData,
  theme,
  setTheme,
  completionPercentage
}) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Logo & Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 shadow-lg shadow-indigo-500/20">
            <BrainCircuit className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white">
                Prep<span className="gradient-text">Pulse</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Tracker v1.0
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden md:block">Interview Practice Dashboard</p>
          </div>
        </div>

        {/* Navigation Tabs (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-slate-900/90 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Dashboard
          </button>
          
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'questions'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            Questions Log
          </button>

          <button
            onClick={() => setActiveTab('machine-coding')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'machine-coding'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Code2 className="w-4 h-4" />
            Machine Coding
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Practice Timer */}
          <button
            onClick={onToggleTimer}
            title="Interview Timer / Pomodoro"
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all flex items-center gap-1.5 hover:bg-slate-800"
          >
            <Timer className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">Timer</span>
          </button>

          {/* Export / Backup */}
          <button
            onClick={onOpenExportModal}
            title="Export / Backup Data"
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all flex items-center gap-1.5 hover:bg-slate-800"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span className="hidden lg:inline">Backup</span>
          </button>

          {/* Reset Demo Data */}
          <button
            onClick={onResetData}
            title="Reset to Seed Data"
            className="p-2 rounded-xl text-xs bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/30 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Add Question Button */}
          <button
            onClick={onOpenAddModal}
            className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2 transform active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Question</span>
          </button>
        </div>

      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex md:hidden border-t border-slate-800/80 bg-slate-950/90 px-4 py-2 justify-around">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-400'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('questions')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'questions' ? 'bg-indigo-600 text-white' : 'text-slate-400'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Questions
        </button>
        <button
          onClick={() => setActiveTab('machine-coding')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'machine-coding' ? 'bg-indigo-600 text-white' : 'text-slate-400'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          Machine Coding
        </button>
      </div>
    </header>
  );
}
