import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  Star,
  Tag
} from 'lucide-react';

export default function QuestionTable({ 
  questions = [], 
  onEdit, 
  onDelete, 
  onToggleStatus, 
  onToggleFavorite 
}) {
  const categoryStyles = {
    'DSA': 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    'Git': 'text-orange-400 bg-orange-500/10 border-orange-500/30',
    'Technical': 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    'Machine Coding': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    'System Design': 'text-pink-400 bg-pink-500/10 border-pink-500/30'
  };

  const difficultyStyles = {
    'Easy': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    'Medium': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    'Hard': 'text-rose-400 bg-rose-400/10 border-rose-400/20'
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800">
            <tr>
              <th scope="col" className="p-4 w-10 text-center">⭐</th>
              <th scope="col" className="p-4">Title & Notes</th>
              <th scope="col" className="p-4">Category</th>
              <th scope="col" className="p-4">Difficulty</th>
              <th scope="col" className="p-4">Status</th>
              <th scope="col" className="p-4">Tags</th>
              <th scope="col" className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {questions.map((q) => (
              <tr key={q.id} className="hover:bg-slate-900/40 transition-colors">
                
                {/* Star Favorite */}
                <td className="p-4 text-center">
                  <button
                    onClick={() => onToggleFavorite(q.id)}
                    className="text-slate-500 hover:text-amber-400 transition-colors"
                  >
                    <Star className={`w-4 h-4 ${q.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </td>

                {/* Title & Link */}
                <td className="p-4 font-medium text-white max-w-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white hover:text-indigo-300 transition-colors line-clamp-1">
                      {q.title}
                    </span>
                    {q.url && (
                      <a 
                        href={q.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-indigo-400 hover:text-indigo-300"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  {q.notes && (
                    <p className="text-xs text-slate-400 line-clamp-1 font-normal mt-0.5">
                      {q.notes}
                    </p>
                  )}
                </td>

                {/* Category */}
                <td className="p-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${categoryStyles[q.category] || categoryStyles['DSA']}`}>
                    {q.category}
                  </span>
                </td>

                {/* Difficulty */}
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${difficultyStyles[q.difficulty] || difficultyStyles['Medium']}`}>
                    {q.difficulty}
                  </span>
                </td>

                {/* Status Quick Toggle */}
                <td className="p-4">
                  <button
                    onClick={() => onToggleStatus(q.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                      q.status === 'Completed'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : q.status === 'In Progress'
                        ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {q.status === 'Completed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    {q.status === 'In Progress' && <Clock className="w-3.5 h-3.5 text-indigo-400" />}
                    {q.status === 'Pending' && <AlertCircle className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{q.status}</span>
                  </button>
                </td>

                {/* Tags */}
                <td className="p-4">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {q.tags && q.tags.map((t, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 bg-slate-800 text-slate-400 text-[10px] rounded border border-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Actions */}
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(q)}
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(q.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
