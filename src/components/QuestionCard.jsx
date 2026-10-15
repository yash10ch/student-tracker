import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  Star, 
  Tag, 
  Code2, 
  FileText, 
  Check
} from 'lucide-react';

export default function QuestionCard({ 
  question, 
  onEdit, 
  onDelete, 
  onToggleStatus, 
  onToggleFavorite 
}) {
  const { 
    id, 
    title, 
    category, 
    difficulty, 
    status, 
    tags = [], 
    url, 
    notes, 
    isFavorite,
    timeComplexity,
    spaceComplexity,
    dateAdded 
  } = question;

  // Category Colors
  const categoryStyles = {
    'DSA': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'Git': 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    'Technical': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    'Machine Coding': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    'System Design': 'bg-pink-500/10 text-pink-400 border-pink-500/30'
  };

  // Difficulty Badges
  const difficultyStyles = {
    'Easy': 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
    'Medium': 'bg-amber-400/10 text-amber-400 border-amber-400/20',
    'Hard': 'bg-rose-400/10 text-rose-400 border-rose-400/20'
  };

  // Status Badges
  const statusStyles = {
    'Completed': {
      bg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      icon: CheckCircle2,
      label: 'Completed'
    },
    'In Progress': {
      bg: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
      icon: Clock,
      label: 'In Progress'
    },
    'Pending': {
      bg: 'bg-slate-700/30 text-slate-400 border-slate-700',
      icon: AlertCircle,
      label: 'Pending'
    }
  };

  const currentStatus = statusStyles[status] || statusStyles['Pending'];
  const StatusIcon = currentStatus.icon;

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col justify-between relative group border border-slate-800 hover:border-slate-700 transition-all duration-300">
      
      <div>
        {/* Top Header: Category + Difficulty + Favorite */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border uppercase tracking-wider ${categoryStyles[category] || categoryStyles['DSA']}`}>
              {category}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${difficultyStyles[difficulty] || difficultyStyles['Medium']}`}>
              {difficulty}
            </span>
          </div>

          <button
            onClick={() => onToggleFavorite(id)}
            title={isFavorite ? 'Remove Star' : 'Star Question'}
            className={`p-1.5 rounded-lg transition-all ${
              isFavorite ? 'text-amber-400 bg-amber-400/10' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug mb-2">
          {title}
        </h3>

        {/* Notes Preview if present */}
        {notes && (
          <p className="text-xs text-slate-400 line-clamp-2 mb-3 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60 italic">
            "{notes}"
          </p>
        )}

        {/* Time / Space Complexity pills if provided */}
        {(timeComplexity || spaceComplexity) && (
          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 mb-3 bg-slate-950/40 p-2 rounded-lg border border-slate-800/40">
            {timeComplexity && <span>Time: <strong className="text-indigo-300">{timeComplexity}</strong></span>}
            {spaceComplexity && <span>Space: <strong className="text-pink-300">{spaceComplexity}</strong></span>}
          </div>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 text-[10px] font-medium flex items-center gap-1 border border-slate-700/50"
              >
                <Tag className="w-2.5 h-2.5 text-indigo-400" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Controls: Quick Status Toggle + Action Buttons */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-auto">
        
        {/* Quick Status Button */}
        <button
          onClick={() => onToggleStatus(id)}
          title="Click to cycle status (Pending -> In Progress -> Completed)"
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 ${currentStatus.bg}`}
        >
          <StatusIcon className="w-3.5 h-3.5" />
          <span>{currentStatus.label}</span>
        </button>

        {/* Right Actions: Link, Edit, Delete */}
        <div className="flex items-center gap-1">
          
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              title="Open Solution/Resource Link"
              className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-all"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          <button
            onClick={() => onEdit(question)}
            title="Edit Question"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDelete(id)}
            title="Delete Question"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>

        </div>

      </div>

    </div>
  );
}
