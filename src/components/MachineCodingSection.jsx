import React, { useState } from 'react';
import { 
  Laptop, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ExternalLink, 
  Code, 
  Sparkles, 
  CheckSquare, 
  Plus, 
  FileCode,
  Lightbulb
} from 'lucide-react';

export default function MachineCodingSection({ 
  machineProjects, 
  onUpdateProjectStatus,
  onAddCustomChallenge
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDifficulty, setNewDifficulty] = useState('Medium');
  const [newTime, setNewTime] = useState('45 mins');
  const [newConcepts, setNewConcepts] = useState('');

  const completedCount = machineProjects.filter(p => p.status === 'Completed').length;
  const inProgressCount = machineProjects.filter(p => p.status === 'In Progress').length;
  const pendingCount = machineProjects.filter(p => p.status === 'Pending').length;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const conceptsArr = newConcepts
      ? newConcepts.split(',').map(c => c.trim()).filter(Boolean)
      : ['React State', 'DOM Events'];

    onAddCustomChallenge({
      id: `mc-${Date.now()}`,
      title: newTitle.trim(),
      difficulty: newDifficulty,
      status: 'Pending',
      estimatedTime: newTime,
      keyConcepts: conceptsArr,
      notes: 'Custom practice item'
    });

    setNewTitle('');
    setNewConcepts('');
    setShowAddModal(false);
  };

  const difficultyStyles = {
    'Easy': 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
    'Medium': 'bg-amber-400/10 text-amber-400 border-amber-400/20',
    'Hard': 'bg-rose-400/10 text-rose-400 border-rose-400/20'
  };

  return (
    <div className="space-y-6">
      
      {/* Top Machine Coding Header Card */}
      <div className="glass-panel rounded-3xl p-6 md:p-8 border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Laptop className="w-40 h-40 text-pink-400" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-semibold text-pink-400">
            <Sparkles className="w-3.5 h-3.5" />
            Machine Coding & UI Component Hub
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Frontend Machine-Coding Challenges
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Practice building production-ready UI components under timed conditions (30–60 mins). Focus on component decomposition, state management, edge cases, accessibility (ARIA), and performance.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold">
            <span className="text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
              {completedCount} Completed
            </span>
            <span className="text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20">
              {inProgressCount} In Progress
            </span>
            <span className="text-slate-400 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
              {pendingCount} Remaining
            </span>

            <button
              onClick={() => setShowAddModal(true)}
              className="ml-auto px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-pink-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Challenge
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Machine Coding Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {machineProjects.map((project) => (
          <div 
            key={project.id} 
            className="glass-card rounded-2xl p-5 flex flex-col justify-between border border-slate-800 hover:border-pink-500/30 transition-all"
          >
            <div>
              {/* Badge row */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${difficultyStyles[project.difficulty] || difficultyStyles['Medium']}`}>
                  {project.difficulty}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-pink-400" />
                  {project.estimatedTime}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-white mb-2">
                {project.title}
              </h3>

              {/* Key Concepts */}
              {project.keyConcepts && (
                <div className="space-y-1.5 mb-4">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Evaluated Concepts:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {project.keyConcepts.map((concept, idx) => (
                      <span 
                        key={idx} 
                        className="px-2 py-0.5 bg-slate-900 text-slate-300 text-[10px] font-medium rounded-md border border-slate-800 flex items-center gap-1"
                      >
                        <CheckSquare className="w-2.5 h-2.5 text-pink-400" />
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes if any */}
              {project.notes && (
                <p className="text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 italic mb-4">
                  💡 {project.notes}
                </p>
              )}
            </div>

            {/* Footer Action */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              
              <button
                onClick={() => {
                  const nextStatus = 
                    project.status === 'Pending' ? 'In Progress' :
                    project.status === 'In Progress' ? 'Completed' : 'Pending';
                  onUpdateProjectStatus(project.id, nextStatus);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                  project.status === 'Completed'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : project.status === 'In Progress'
                    ? 'bg-pink-500/10 text-pink-400 border-pink-500/30'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {project.status === 'Completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                <span>{project.status}</span>
              </button>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  Code <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Add Custom Machine Coding Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Laptop className="w-5 h-5 text-pink-400" />
              Add Machine Coding Challenge
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Challenge Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Build an Autocomplete Dropdown"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Difficulty</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Time Limit</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="45 mins"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Concepts (comma separated)</label>
                <input
                  type="text"
                  value={newConcepts}
                  onChange={(e) => setNewConcepts(e.target.value)}
                  placeholder="State Management, Keyboard ARIA, Debounce"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-pink-600 hover:bg-pink-500 text-white"
                >
                  Add Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
