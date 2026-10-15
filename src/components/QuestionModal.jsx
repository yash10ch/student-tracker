import React, { useState, useEffect } from 'react';
import { 
  X, 
  PlusCircle, 
  Edit3, 
  AlertCircle, 
  Tag, 
  Link as LinkIcon, 
  FileText,
  Clock
} from 'lucide-react';

export default function QuestionModal({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = null 
}) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'DSA',
    difficulty: 'Medium',
    status: 'Pending',
    url: '',
    tags: '',
    notes: '',
    timeComplexity: '',
    spaceComplexity: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        category: initialData.category || 'DSA',
        difficulty: initialData.difficulty || 'Medium',
        status: initialData.status || 'Pending',
        url: initialData.url || '',
        tags: initialData.tags ? initialData.tags.join(', ') : '',
        notes: initialData.notes || '',
        timeComplexity: initialData.timeComplexity || '',
        spaceComplexity: initialData.spaceComplexity || ''
      });
    } else {
      setFormData({
        title: '',
        category: 'DSA',
        difficulty: 'Medium',
        status: 'Pending',
        url: '',
        tags: '',
        notes: '',
        timeComplexity: '',
        spaceComplexity: ''
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Question title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }

    if (formData.url.trim()) {
      try {
        new URL(formData.url.trim());
      } catch (_) {
        newErrors.url = 'Please enter a valid URL (e.g. https://leetcode.com/...)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const parsedTags = formData.tags
      ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    const questionObject = {
      id: initialData ? initialData.id : `q-${Date.now()}`,
      title: formData.title.trim(),
      category: formData.category,
      difficulty: formData.difficulty,
      status: formData.status,
      url: formData.url.trim(),
      tags: parsedTags,
      notes: formData.notes.trim(),
      timeComplexity: formData.timeComplexity.trim(),
      spaceComplexity: formData.spaceComplexity.trim(),
      isFavorite: initialData ? initialData.isFavorite : false,
      dateAdded: initialData ? initialData.dateAdded : new Date().toISOString().split('T')[0]
    };

    onSave(questionObject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {initialData ? <Edit3 className="w-5 h-5" /> : <PlusCircle className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {initialData ? 'Edit Question' : 'Add New Question'}
              </h2>
              <p className="text-xs text-slate-400">Track your interview preparation details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          
          {/* Question Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Question Title <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Two Sum / Implement Debounce Function"
              className={`w-full px-4 py-2.5 bg-slate-950 rounded-xl border text-sm text-white focus:outline-none transition-all ${
                errors.title 
                  ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500' 
                  : 'border-slate-800 focus:border-indigo-500'
              }`}
            />
            {errors.title && (
              <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Category & Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="DSA">DSA (Data Structures & Algos)</option>
                <option value="Git">Git & Version Control</option>
                <option value="Technical">Technical & Web Core</option>
                <option value="Machine Coding">Machine Coding</option>
                <option value="System Design">System Design</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          {/* Status Select */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="Pending">Pending ⏳</option>
              <option value="In Progress">In Progress ⚡</option>
              <option value="Completed">Completed ✅</option>
            </select>
          </div>

          {/* Solution URL */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1">
              <LinkIcon className="w-3.5 h-3.5 text-indigo-400" />
              Solution Link / LeetCode URL (Optional)
            </label>
            <input
              type="text"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://leetcode.com/problems/..."
              className={`w-full px-4 py-2.5 bg-slate-950 rounded-xl border text-sm text-white focus:outline-none transition-all ${
                errors.url ? 'border-rose-500/80' : 'border-slate-800 focus:border-indigo-500'
              }`}
            />
            {errors.url && (
              <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.url}
              </p>
            )}
          </div>

          {/* Time & Space Complexity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Time Complexity (e.g. O(n log n))
              </label>
              <input
                type="text"
                value={formData.timeComplexity}
                onChange={(e) => setFormData({ ...formData, timeComplexity: e.target.value })}
                placeholder="O(n)"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Space Complexity (e.g. O(1))
              </label>
              <input
                type="text"
                value={formData.spaceComplexity}
                onChange={(e) => setFormData({ ...formData, spaceComplexity: e.target.value })}
                placeholder="O(1)"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-indigo-400" />
              Tags / Topics (Comma Separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Arrays, Binary Search, React Hooks, Event Loop"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Notes & Takeaways */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              Notes & Key Takeaways
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Key edge cases, HashMap trick, or solution approach summary..."
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all"
            >
              {initialData ? 'Update Question' : 'Save Question'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
