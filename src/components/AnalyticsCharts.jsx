import React from 'react';
import { BarChart3, PieChart, Layers, CheckCircle2 } from 'lucide-react';

export default function AnalyticsCharts({ questions = [] }) {
  if (!questions || questions.length === 0) return null;

  // Category counts
  const categories = ['DSA', 'Git', 'Technical', 'Machine Coding', 'System Design'];
  const categoryCounts = categories.map(cat => ({
    name: cat,
    count: questions.filter(q => q.category === cat).length,
    completed: questions.filter(q => q.category === cat && q.status === 'Completed').length
  }));

  // Difficulty counts
  const difficulties = [
    { name: 'Easy', color: 'bg-emerald-500 text-emerald-400 border-emerald-500/30' },
    { name: 'Medium', color: 'bg-amber-500 text-amber-400 border-amber-500/30' },
    { name: 'Hard', color: 'bg-rose-500 text-rose-400 border-rose-500/30' }
  ];

  const difficultyCounts = difficulties.map(d => ({
    ...d,
    count: questions.filter(q => q.difficulty === d.name).length
  }));

  const maxCategoryCount = Math.max(...categoryCounts.map(c => c.count), 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Chart 1: Category Distribution */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Practice by Category</h3>
          </div>
          <span className="text-xs text-slate-400 font-semibold">{questions.length} Total</span>
        </div>

        <div className="space-y-3 pt-2">
          {categoryCounts.map((cat) => {
            const widthPct = Math.round((cat.count / maxCategoryCount) * 100);
            return (
              <div key={cat.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300">{cat.name}</span>
                  <span className="text-slate-400 font-mono">
                    <strong className="text-white">{cat.completed}</strong> / {cat.count} solved
                  </span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-700"
                    style={{ width: `${widthPct}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart 2: Difficulty Breakdown */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-pink-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Difficulty Breakdown</h3>
          </div>
          <span className="text-xs text-slate-400 font-semibold">Problem Levels</span>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-2">
          {difficultyCounts.map((diff) => (
            <div 
              key={diff.name} 
              className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col items-center justify-center text-center space-y-1"
            >
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${diff.color}`}>
                {diff.name}
              </span>
              <span className="text-2xl font-black text-white font-mono mt-1">{diff.count}</span>
              <span className="text-[11px] text-slate-400">Questions</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
