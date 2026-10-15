import React from 'react';
import { SearchX, Inbox, Plus, RotateCcw, Sparkles } from 'lucide-react';

export default function EmptyState({ 
  type = 'empty', // 'empty' or 'no-search'
  onAction,
  onResetFilters 
}) {
  if (type === 'no-search') {
    return (
      <div className="glass-panel rounded-3xl p-8 md:p-12 text-center border border-slate-800 flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto my-8">
        <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 animate-bounce">
          <SearchX className="w-10 h-10" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white">No Matching Questions Found</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            We couldn't find any questions matching your current category, difficulty, or search criteria.
          </p>
        </div>
        <button
          onClick={onResetFilters}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-3xl p-8 md:p-12 text-center border border-slate-800 flex flex-col items-center justify-center space-y-5 max-w-lg mx-auto my-8">
      <div className="p-4 rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
        <Inbox className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-extrabold text-white">Your Question Log is Empty</h3>
        <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
          Start adding interview questions, LeetCode problems, and machine-coding tasks to track your weekly preparation progress!
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onAction}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/25 flex items-center gap-2 hover:opacity-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add First Question
        </button>
      </div>
    </div>
  );
}
