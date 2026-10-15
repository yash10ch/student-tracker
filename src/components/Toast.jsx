import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const typeStyles = {
    success: 'bg-emerald-950/90 border-emerald-500/40 text-emerald-300',
    error: 'bg-rose-950/90 border-rose-500/40 text-rose-300',
    info: 'bg-indigo-950/90 border-indigo-500/40 text-indigo-300'
  };

  const Icon = type === 'success' ? CheckCircle2 : type === 'error' ? AlertCircle : Info;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-xl animate-slideUp">
      <div className={`p-1.5 rounded-xl border flex items-center justify-center ${typeStyles[type]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-xs font-semibold text-white">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-white"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
