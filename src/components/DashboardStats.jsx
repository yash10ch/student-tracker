import React from 'react';
import { 
  FileText, 
  Code, 
  Terminal, 
  Laptop, 
  Trophy, 
  Target, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Award
} from 'lucide-react';

export default function DashboardStats({ questions = [], machineProjects = [] }) {
  // Calculations
  const totalQuestions = questions.length;
  const completedQuestions = questions.filter(q => q.status === 'Completed').length;
  const inProgressQuestions = questions.filter(q => q.status === 'In Progress').length;
  const pendingQuestions = questions.filter(q => q.status === 'Pending').length;

  // DSA Specific Metrics
  const dsaQuestions = questions.filter(q => q.category === 'DSA');
  const completedDSA = dsaQuestions.filter(q => q.status === 'Completed').length;

  // Technical & Git Specific Metrics
  const techQuestions = questions.filter(q => q.category === 'Technical' || q.category === 'Git');
  const completedTech = techQuestions.filter(q => q.status === 'Completed').length;

  // Machine Coding Specific Metrics
  const mcQuestions = questions.filter(q => q.category === 'Machine Coding');
  const completedMCFromQuestions = mcQuestions.filter(q => q.status === 'Completed').length;
  const completedMCProjects = machineProjects.filter(p => p.status === 'Completed').length;
  const totalMCProjects = machineProjects.length;

  // Percentage Calculations
  const overallPercentage = totalQuestions > 0 
    ? Math.round((completedQuestions / totalQuestions) * 100) 
    : 0;

  const dsaPercentage = dsaQuestions.length > 0
    ? Math.round((completedDSA / dsaQuestions.length) * 100)
    : 0;

  // Milestone Badge Logic
  let milestone = { title: "Getting Started 🌱", badge: "Beginner", color: "from-blue-500 to-cyan-500" };
  if (overallPercentage >= 80) {
    milestone = { title: "Interview Ready! 🔥", badge: "Expert", color: "from-amber-400 via-pink-500 to-purple-600" };
  } else if (overallPercentage >= 50) {
    milestone = { title: "Consistent Practice ⚡", badge: "Intermediate", color: "from-purple-500 to-indigo-600" };
  } else if (overallPercentage >= 25) {
    milestone = { title: "Building Momentum 🚀", badge: "Apprentice", color: "from-emerald-400 to-teal-600" };
  }

  // Circular gauge circumference math
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallPercentage / 100) * circumference;

  return (
    <div className="space-y-6">
      
      {/* Visual Completion Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-indigo-500/20 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                {milestone.title}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Updated Live
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Master Your Interview Preparation <br />
              <span className="gradient-text">Track Progress. Ace the Offer.</span>
            </h1>

            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Consistently practice Data Structures, System Design, Git workflows, and Machine-Coding challenges. Track problem statuses and conquer your weekly target.
            </p>

            {/* Micro Breakdown Bar */}
            <div className="pt-2 max-w-xl">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
                <span>Overall Completion</span>
                <span className="text-white font-bold">{completedQuestions} / {totalQuestions} Solved ({overallPercentage}%)</span>
              </div>
              <div className="w-full h-3 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${overallPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Radial Circular Progress Gauge */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 border border-slate-800 shadow-inner">
            <div className="relative flex items-center justify-center">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 86 86">
                <circle
                  cx="43"
                  cy="43"
                  r={radius}
                  className="text-slate-800 stroke-current"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="43"
                  cy="43"
                  r={radius}
                  className="text-indigo-500 stroke-current transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-white tracking-tight">{overallPercentage}%</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Completed</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-indigo-300">
              <Award className="w-4 h-4 text-pink-400" />
              <span>Level: {milestone.badge}</span>
            </div>
          </div>

        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card 1: Total Questions */}
        <div className="glass-card rounded-2xl p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FileText className="w-16 h-16 text-indigo-400" />
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Questions</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-white tracking-tight">{totalQuestions}</span>
            <span className="text-xs text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded-md">
              {inProgressQuestions} In Progress
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            {pendingQuestions} pending review
          </p>
        </div>

        {/* Card 2: Completed DSA Problems */}
        <div className="glass-card rounded-2xl p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Code className="w-16 h-16 text-emerald-400" />
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Code className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">DSA Completed</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-white tracking-tight">{completedDSA}</span>
            <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md">
              {dsaQuestions.length} Total DSA
            </span>
          </div>
          <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${dsaPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Card 3: Completed Tech & Git Questions */}
        <div className="glass-card rounded-2xl p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Terminal className="w-16 h-16 text-purple-400" />
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Terminal className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Technical & Git</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-white tracking-tight">{completedTech}</span>
            <span className="text-xs text-purple-400 font-semibold bg-purple-500/10 px-2 py-0.5 rounded-md">
              {techQuestions.length} Tracked
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Core Web Dev & Git command mastery
          </p>
        </div>

        {/* Card 4: Machine Coding Status */}
        <div className="glass-card rounded-2xl p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Laptop className="w-16 h-16 text-pink-400" />
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
              <Laptop className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Machine Coding</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-white tracking-tight">{completedMCProjects}</span>
            <span className="text-xs text-pink-400 font-semibold bg-pink-500/10 px-2 py-0.5 rounded-md">
              {totalMCProjects} Challenges
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            UI & Component Architecture practice
          </p>
        </div>

      </div>
    </div>
  );
}
