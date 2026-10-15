import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Timer, 
  Volume2, 
  VolumeX, 
  BellRing 
} from 'lucide-react';

export default function InterviewTimer({ isOpen, onClose }) {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [initialSeconds, setInitialSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      if (soundEnabled) {
        // Play notification tone
        try {
          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const osc = audioCtx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
          osc.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 1.2);
        } catch (_) {}
      }
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, soundEnabled]);

  if (!isOpen) return null;

  const setPreset = (minutes) => {
    const secs = minutes * 60;
    setInitialSeconds(secs);
    setSecondsLeft(secs);
    setIsActive(false);
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(initialSeconds);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.round(((initialSeconds - secondsLeft) / initialSeconds) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-emerald-400 animate-pulse" />
            <h2 className="text-lg font-bold text-white">Interview Practice Timer</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Presets */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPreset(15)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              initialSeconds === 15 * 60 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            15m Quick
          </button>
          <button
            onClick={() => setPreset(25)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              initialSeconds === 25 * 60 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            25m LeetCode
          </button>
          <button
            onClick={() => setPreset(45)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              initialSeconds === 45 * 60 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            45m Technical
          </button>
        </div>

        {/* Big Display */}
        <div className="flex flex-col items-center justify-center py-6 bg-slate-950/80 rounded-2xl border border-slate-800/80">
          <span className="text-6xl font-black font-mono tracking-tight text-white drop-shadow-md">
            {formatTime(secondsLeft)}
          </span>
          <span className="text-xs text-slate-400 font-medium mt-2">
            {isActive ? '🔥 Session in progress...' : secondsLeft === 0 ? '🎉 Time up! Great effort!' : 'Paused / Ready'}
          </span>
          
          {/* Progress bar */}
          <div className="w-4/5 h-2 bg-slate-800 rounded-full overflow-hidden mt-4">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Timer Action Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={resetTimer}
            className="p-3 rounded-2xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={toggleTimer}
            className={`px-8 py-3 rounded-2xl text-sm font-bold text-white shadow-xl flex items-center gap-2 transition-all transform active:scale-95 ${
              isActive 
                ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30' 
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-95 shadow-emerald-500/30'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>{secondsLeft === initialSeconds ? 'Start Timer' : 'Resume'}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
