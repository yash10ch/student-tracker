import React from 'react';
import { 
  Search, 
  Filter, 
  X, 
  LayoutGrid, 
  Table, 
  SlidersHorizontal,
  Bookmark,
  CheckCircle2
} from 'lucide-react';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedStatus,
  setSelectedStatus,
  onlyFavorites,
  setOnlyFavorites,
  viewMode,
  setViewMode,
  onResetFilters,
  totalMatching,
  totalQuestions
}) {
  const hasActiveFilters = 
    searchQuery !== '' || 
    selectedCategory !== 'All' || 
    selectedDifficulty !== 'All' || 
    selectedStatus !== 'All' ||
    onlyFavorites;

  const categories = ['All', 'DSA', 'Git', 'Technical', 'Machine Coding'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const statuses = ['All', 'Pending', 'In Progress', 'Completed'];

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-5 space-y-4 border border-slate-800">
      
      {/* Top Row: Search Input + View Toggle + Favorite Toggle */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Live Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title, tags, notes... (Ctrl+K)"
            className="w-full pl-10 pr-9 py-2.5 bg-slate-900/90 rounded-xl border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View Mode & Filter Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          
          {/* Favorites Filter Toggle */}
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              onlyFavorites
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-amber-400' : ''}`} />
            <span>Starred</span>
          </button>

          {/* View Toggle (Grid / Table) */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              title="Grid View"
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              title="Table View"
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'table'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Table className="w-4 h-4" />
            </button>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-all flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>

      </div>

      {/* Bottom Row: Filter Dropdowns / Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/60">
        
        <div className="flex flex-wrap items-center gap-2 text-xs">
          
          <span className="text-slate-400 font-semibold flex items-center gap-1 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
            Filters:
          </span>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 font-medium focus:outline-none focus:border-indigo-500 text-xs"
          >
            <option value="All">Category: All</option>
            {categories.filter(c => c !== 'All').map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 font-medium focus:outline-none focus:border-indigo-500 text-xs"
          >
            <option value="All">Difficulty: All</option>
            {difficulties.filter(d => d !== 'All').map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 font-medium focus:outline-none focus:border-indigo-500 text-xs"
          >
            <option value="All">Status: All</option>
            {statuses.filter(s => s !== 'All').map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

        </div>

        {/* Counter Results Label */}
        <div className="text-xs font-semibold text-slate-400">
          Showing <span className="text-white font-bold">{totalMatching}</span> of {totalQuestions} items
        </div>

      </div>

    </div>
  );
}
