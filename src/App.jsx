import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';

import Navbar from './components/Navbar';
import DashboardStats from './components/DashboardStats';
import FilterBar from './components/FilterBar';
import QuestionCard from './components/QuestionCard';
import QuestionTable from './components/QuestionTable';
import QuestionModal from './components/QuestionModal';
import MachineCodingSection from './components/MachineCodingSection';
import InterviewTimer from './components/InterviewTimer';
import AnalyticsCharts from './components/AnalyticsCharts';
import EmptyState from './components/EmptyState';
import Toast from './components/Toast';
import ExportImportModal from './components/ExportImportModal';

import { INITIAL_QUESTIONS, INITIAL_MACHINE_CODING_PROJECTS } from './constants/seedData';

const QUESTIONS_STORAGE_KEY = 'prep_pulse_questions_v1';
const MACHINE_STORAGE_KEY = 'prep_pulse_machine_projects_v1';

export default function App() {
  // Main Questions State loaded from LocalStorage or seed data
  const [questions, setQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem(QUESTIONS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_QUESTIONS;
    } catch (e) {
      console.error('Failed to load questions from localStorage:', e);
      return INITIAL_QUESTIONS;
    }
  });

  // Machine Coding Projects State
  const [machineProjects, setMachineProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(MACHINE_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_MACHINE_CODING_PROJECTS;
    } catch (e) {
      console.error('Failed to load machine coding projects from localStorage:', e);
      return INITIAL_MACHINE_CODING_PROJECTS;
    }
  });

  // Navigation & UI View States
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'questions' | 'machine-coding'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Modal & Popup States
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Sync Questions to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(questions));
    } catch (e) {
      console.error('Failed to save questions to localStorage:', e);
    }
  }, [questions]);

  // Sync Machine Coding Projects to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(MACHINE_STORAGE_KEY, JSON.stringify(machineProjects));
    } catch (e) {
      console.error('Failed to save machine projects to localStorage:', e);
    }
  }, [machineProjects]);

  // Keyboard shortcut Ctrl+K to focus search input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Search"]');
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Celebration Confetti helper
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (_) {}
  };

  // Filter Logic
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      // Search Query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch = q.title.toLowerCase().includes(query);
        const notesMatch = q.notes ? q.notes.toLowerCase().includes(query) : false;
        const tagMatch = q.tags ? q.tags.some(t => t.toLowerCase().includes(query)) : false;
        if (!titleMatch && !notesMatch && !tagMatch) return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && q.category !== selectedCategory) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'All' && q.status !== selectedStatus) {
        return false;
      }

      // Favorites filter
      if (onlyFavorites && !q.isFavorite) {
        return false;
      }

      return true;
    });
  }, [questions, searchQuery, selectedCategory, selectedDifficulty, selectedStatus, onlyFavorites]);

  // Handlers for Question CRUD
  const handleSaveQuestion = (questionObj) => {
    if (editingQuestion) {
      setQuestions(prev => prev.map(q => q.id === questionObj.id ? questionObj : q));
      showToast(`Updated "${questionObj.title}" successfully!`);
    } else {
      setQuestions(prev => [questionObj, ...prev]);
      showToast(`Added "${questionObj.title}" to practice log!`);
    }
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = (id) => {
    const qToDelete = questions.find(q => q.id === id);
    if (window.confirm(`Are you sure you want to delete "${qToDelete?.title}"?`)) {
      setQuestions(prev => prev.filter(q => q.id !== id));
      showToast(`Deleted question from log.`, 'info');
    }
  };

  const handleToggleStatus = (id) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === id) {
        const nextStatus = 
          q.status === 'Pending' ? 'In Progress' :
          q.status === 'In Progress' ? 'Completed' : 'Pending';

        if (nextStatus === 'Completed') {
          triggerConfetti();
          showToast(`Great work! Solved "${q.title}" 🎉`);
        } else {
          showToast(`Marked "${q.title}" as ${nextStatus}`);
        }

        return { ...q, status: nextStatus };
      }
      return q;
    }));
  };

  const handleToggleFavorite = (id) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === id) {
        const newFav = !q.isFavorite;
        showToast(newFav ? `Starred question ⭐` : `Unstarred question`, 'info');
        return { ...q, isFavorite: newFav };
      }
      return q;
    }));
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSelectedStatus('All');
    setOnlyFavorites(false);
  };

  const handleResetToSeedData = () => {
    if (window.confirm("Reset all question data back to initial demo items? Your custom edits will be replaced.")) {
      setQuestions(INITIAL_QUESTIONS);
      setMachineProjects(INITIAL_MACHINE_CODING_PROJECTS);
      handleResetFilters();
      showToast('Reset all data to seed defaults!', 'info');
    }
  };

  const handleUpdateMachineStatus = (id, newStatus) => {
    setMachineProjects(prev => prev.map(p => {
      if (p.id === id) {
        if (newStatus === 'Completed') triggerConfetti();
        return { ...p, status: newStatus };
      }
      return p;
    }));
  };

  const handleAddMachineChallenge = (newChallenge) => {
    setMachineProjects(prev => [newChallenge, ...prev]);
    showToast(`Added machine coding challenge: "${newChallenge.title}"`);
  };

  const handleImportData = (importedQuestions, importedProjects) => {
    setQuestions(importedQuestions);
    if (importedProjects && importedProjects.length > 0) {
      setMachineProjects(importedProjects);
    }
    showToast('Successfully imported practice data!');
  };

  const openAddModal = () => {
    setEditingQuestion(null);
    setIsQuestionModalOpen(true);
  };

  const openEditModal = (q) => {
    setEditingQuestion(q);
    setIsQuestionModalOpen(true);
  };

  // Completion calculation for header ring
  const completedQuestions = questions.filter(q => q.status === 'Completed').length;
  const completionPct = questions.length > 0 ? Math.round((completedQuestions / questions.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Navbar Header */}
      <Navbar
        onOpenAddModal={openAddModal}
        onToggleTimer={() => setIsTimerOpen(true)}
        onToggleMachineCoding={() => setActiveTab('machine-coding')}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onResetData={handleResetToSeedData}
        completionPercentage={completionPct}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Tab 1: Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Hero Stats */}
            <DashboardStats 
              questions={questions} 
              machineProjects={machineProjects} 
            />

            {/* Visual Analytics */}
            <AnalyticsCharts questions={questions} />

            {/* Quick Questions Filter + List Preview */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Recent Interview Questions</h2>
                  <p className="text-xs text-slate-400">Filter, search, and manage your practice log</p>
                </div>
                <button
                  onClick={() => setActiveTab('questions')}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  View All Questions ({questions.length}) &rarr;
                </button>
              </div>

              <FilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedDifficulty={selectedDifficulty}
                setSelectedDifficulty={setSelectedDifficulty}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                onlyFavorites={onlyFavorites}
                setOnlyFavorites={setOnlyFavorites}
                viewMode={viewMode}
                setViewMode={setViewMode}
                onResetFilters={handleResetFilters}
                totalMatching={filteredQuestions.length}
                totalQuestions={questions.length}
              />

              {/* Questions Render */}
              {questions.length === 0 ? (
                <EmptyState type="empty" onAction={openAddModal} />
              ) : filteredQuestions.length === 0 ? (
                <EmptyState type="no-search" onResetFilters={handleResetFilters} />
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredQuestions.map((question) => (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      onEdit={openEditModal}
                      onDelete={handleDeleteQuestion}
                      onToggleStatus={handleToggleStatus}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <QuestionTable
                  questions={filteredQuestions}
                  onEdit={openEditModal}
                  onDelete={handleDeleteQuestion}
                  onToggleStatus={handleToggleStatus}
                  onToggleFavorite={handleToggleFavorite}
                />
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Full Questions Tracker Log */}
        {activeTab === 'questions' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-white">Full Questions Tracker</h1>
                <p className="text-xs text-slate-400">Complete catalog of Data Structures, Git, and Technical questions</p>
              </div>
              <button
                onClick={openAddModal}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20"
              >
                + Add Question
              </button>
            </div>

            <FilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              onlyFavorites={onlyFavorites}
              setOnlyFavorites={setOnlyFavorites}
              viewMode={viewMode}
              setViewMode={setViewMode}
              onResetFilters={handleResetFilters}
              totalMatching={filteredQuestions.length}
              totalQuestions={questions.length}
            />

            {questions.length === 0 ? (
              <EmptyState type="empty" onAction={openAddModal} />
            ) : filteredQuestions.length === 0 ? (
              <EmptyState type="no-search" onResetFilters={handleResetFilters} />
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredQuestions.map((question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    onEdit={openEditModal}
                    onDelete={handleDeleteQuestion}
                    onToggleStatus={handleToggleStatus}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <QuestionTable
                questions={filteredQuestions}
                onEdit={openEditModal}
                onDelete={handleDeleteQuestion}
                onToggleStatus={handleToggleStatus}
                onToggleFavorite={handleToggleFavorite}
              />
            )}
          </div>
        )}

        {/* Tab 3: Machine Coding Section */}
        {activeTab === 'machine-coding' && (
          <div className="animate-fadeIn">
            <MachineCodingSection
              machineProjects={machineProjects}
              onUpdateProjectStatus={handleUpdateMachineStatus}
              onAddCustomChallenge={handleAddMachineChallenge}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Interview Practice Tracker &copy; {new Date().getFullYear()} — Built for Student Success</span>
          <span className="text-slate-400">LocalStorage Enabled &bull; Full CRUD &bull; Multi-Filter Search</span>
        </div>
      </footer>

      {/* Modals & Overlay Widgets */}
      <QuestionModal
        isOpen={isQuestionModalOpen}
        onClose={() => {
          setIsQuestionModalOpen(false);
          setEditingQuestion(null);
        }}
        onSave={handleSaveQuestion}
        initialData={editingQuestion}
      />

      <InterviewTimer
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
      />

      <ExportImportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        questions={questions}
        machineProjects={machineProjects}
        onImportData={handleImportData}
      />

      {/* Toast Feedback */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

    </div>
  );
}
