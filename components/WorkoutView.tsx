
import React from 'react';
import { SkillType } from '../types';
import { BASE_WORKOUT, SKILL_DATA } from '../constants';

interface WorkoutViewProps {
  day: number;
  skill: SkillType;
  onClose: () => void;
  isCompleted: boolean;
}

const WorkoutView: React.FC<WorkoutViewProps> = ({ day, skill, onClose, isCompleted }) => {
  const getWeekNumber = (day: number) => Math.ceil(day / 7);
  const week = getWeekNumber(day);
  const skillProgress = SKILL_DATA[skill].progress;
  
  const currentSkillSet = () => {
    switch (week) {
      case 1: return skillProgress.week1;
      case 2: return skillProgress.week2;
      case 3: return skillProgress.week3;
      case 4: return skillProgress.week4;
      default: return skillProgress.week4;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6 bg-black/98 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="w-full max-w-2xl glass-panel p-6 md:p-10 relative border border-zinc-800 my-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-8 md:right-8 text-zinc-500 hover:text-white transition-colors p-2 active:scale-90"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-8 md:mb-12">
          <div className="text-[9px] md:text-[10px] tracking-[0.5em] text-zinc-600 uppercase mb-2">Protocol Archive</div>
          <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">Day {day.toString().padStart(2, '0')}</h2>
          {isCompleted && (
            <span className="inline-block mt-3 px-3 py-1 bg-white text-black text-[9px] font-bold uppercase tracking-widest">
              Unit Verified
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h4 className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-4 border-b border-zinc-800 pb-2">01. Conditioning</h4>
            <div className="space-y-3">
              {BASE_WORKOUT.map((ex, i) => (
                <div key={i} className="flex justify-between items-center text-[11px] md:text-xs">
                  <span className="text-zinc-400">{ex.name}</span>
                  <span className="font-mono text-zinc-500 font-bold">{ex.reps}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-white/5 border border-zinc-900 text-[9px] uppercase text-zinc-600 leading-relaxed italic">
              Repeat 3 full cycles. 60s rest between stations.
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-4 border-b border-zinc-800 pb-2">02. Specialization</h4>
            <div className="p-6 bg-white/5 border border-zinc-800 flex flex-col justify-center items-center text-center">
              <div className="text-lg md:text-xl font-bold uppercase tracking-wide leading-tight mb-2 text-white">
                {currentSkillSet()}
              </div>
              <div className="text-[9px] text-zinc-600 uppercase tracking-widest font-mono">{skill}</div>
            </div>
            <p className="mt-6 text-[10px] md:text-[11px] leading-relaxed text-zinc-500 uppercase tracking-widest">
              {SKILL_DATA[skill].description}
            </p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="mt-12 w-full py-5 border border-zinc-800 text-zinc-400 hover:border-white hover:text-white transition-all text-[10px] font-bold uppercase tracking-[0.4em] active:bg-zinc-900 shadow-sm"
        >
          Exit Log
        </button>
      </div>
    </div>
  );
};

export default WorkoutView;
