
import React, { useState, useEffect } from 'react';
import { User, SkillType } from '../types';
import { BASE_WORKOUT, SKILL_DATA, GOGGINS_QUOTES } from '../constants';
import WorkoutView from './WorkoutView';

interface DashboardProps {
  user: User;
  onCompleteDay: (day: number) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onCompleteDay, onLogout }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Calculate which day of the challenge it is today (Day 1, Day 2, etc.)
  const calculateCurrentChallengeDay = () => {
    const start = new Date(user.startDate);
    // Set both to midnight to compare days accurately
    start.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const diffTime = today.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const currentChallengeDay = calculateCurrentChallengeDay();
  const isRestDay = (day: number) => day % 7 === 0;
  const isTodayCompleted = user.completedDays.includes(currentChallengeDay);

  const getWeekNumber = (day: number) => Math.ceil(day / 7);

  const getSkillSetForDay = (day: number) => {
    if (!user.selectedSkill || isRestDay(day)) return null;
    const week = getWeekNumber(day);
    const progress = SKILL_DATA[user.selectedSkill].progress;
    switch (week) {
      case 1: return progress.week1;
      case 2: return progress.week2;
      case 3: return progress.week3;
      case 4: return progress.week4;
      default: return progress.week4;
    }
  };

  const handleConfirmCompletion = () => {
    onCompleteDay(currentChallengeDay);
    setShowConfirm(false);
  };

  // Get daily quote based on challenge day
  const dailyQuote = GOGGINS_QUOTES[(currentChallengeDay - 1) % GOGGINS_QUOTES.length];

  return (
    <div className="w-full flex flex-col gap-8 md:gap-10 py-6 md:py-10 px-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-900 pb-8 px-4">
        <div className="w-full md:w-auto">
          <h1 className="text-[9px] md:text-xs tracking-[0.4em] text-zinc-500 uppercase mb-2">Protocol Active</h1>
          <div className="flex flex-wrap items-baseline gap-2 md:gap-4">
            <span className="text-3xl md:text-4xl font-black uppercase italic break-all">{user.username}</span>
            <span className="text-zinc-700 text-xs hidden md:inline">/</span>
            <span className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-widest font-tech w-full md:w-auto mt-1 md:mt-0">{user.selectedSkill}</span>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="text-[9px] tracking-widest text-zinc-500 hover:text-white transition-colors uppercase border border-zinc-800 px-3 py-2 active:bg-zinc-900"
        >
          Terminate Session
        </button>
      </div>

      {/* Grid */}
      <div className="flex flex-col gap-4 px-4">
        <h3 className="text-[9px] md:text-xs uppercase tracking-[0.3em] font-tech text-zinc-500">30-Day Trajectory</h3>
        <div className="grid grid-cols-6 md:grid-cols-10 gap-2 md:gap-3">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
            const isCompleted = user.completedDays.includes(day);
            const isRest = isRestDay(day);
            const isToday = day === currentChallengeDay;
            const isFuture = day > currentChallengeDay;

            return (
              <button
                key={day}
                onClick={() => !isRest && setSelectedDay(day)}
                disabled={isRest}
                className={`
                  aspect-square border flex flex-col items-center justify-center gap-0.5 transition-all day-node relative
                  ${isCompleted ? 'bg-white text-black border-white' : 'bg-transparent border-zinc-900 text-zinc-600'}
                  ${isRest ? 'opacity-20 cursor-default border-dashed' : isFuture ? 'opacity-40 hover:border-zinc-700' : 'hover:border-zinc-500'}
                  ${isToday ? 'ring-1 ring-white ring-offset-2 ring-offset-black scale-105 z-10' : ''}
                `}
              >
                <span className="text-[9px] md:text-[10px] font-mono leading-none">{day}</span>
                {isCompleted && <span className="text-[8px] md:text-[10px] font-black">✓</span>}
                {isRest && <span className="text-[6px] md:text-[8px] font-bold uppercase rotate-90 origin-center absolute">REST</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Focus Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start px-4">
        <div className="lg:col-span-2 glass-panel p-6 md:p-8 border-zinc-900">
           <div className="flex justify-between items-center mb-8 md:mb-10">
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider">Current Protocol</h2>
              <div className="flex gap-2 items-center">
                <span className={`w-1.5 h-1.5 rounded-full ${isTodayCompleted ? 'bg-zinc-600' : 'bg-emerald-500 animate-pulse'}`}></span>
                <span className="text-[9px] md:text-[10px] tracking-widest text-zinc-500 uppercase">
                  {isTodayCompleted ? 'Day Logged' : 'Live Module'}
                </span>
              </div>
           </div>
           
           <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-6 h-[1px] bg-white"></div>
                  <h4 className="text-sm md:text-lg font-bold uppercase italic">Phase 1: Base Conditioning</h4>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BASE_WORKOUT.map((ex, idx) => (
                    <div key={idx} className="border-l border-zinc-800 pl-3 py-1.5">
                      <div className="text-[9px] text-zinc-600 mb-0.5 font-mono">0{idx+1}</div>
                      <div className="font-bold uppercase tracking-wide text-[11px] md:text-sm">{ex.name}</div>
                      <div className="text-[10px] text-zinc-500">{ex.reps}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-zinc-900 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-6 h-[1px] bg-white"></div>
                  <h4 className="text-sm md:text-lg font-bold uppercase italic">Phase 2: Skill Focus</h4>
                </div>
                <div className="glass-panel p-5 border-zinc-800 bg-white/5">
                  <div className="text-[9px] text-zinc-600 mb-2 font-mono uppercase">SPEC: {user.selectedSkill}</div>
                  <div className="text-lg md:text-xl font-bold uppercase text-white leading-tight">
                    {currentChallengeDay <= 30 ? (isRestDay(currentChallengeDay) ? "Active Recovery Day" : getSkillSetForDay(currentChallengeDay)) : "Objective Reached"}
                  </div>
                </div>
              </div>

              {currentChallengeDay <= 30 && !isRestDay(currentChallengeDay) && (
                <div className="mt-8">
                  {!showConfirm ? (
                    <button 
                      disabled={isTodayCompleted}
                      onClick={() => setShowConfirm(true)}
                      className={`w-full py-5 font-black uppercase tracking-[0.3em] text-xs md:text-sm transition-all active:scale-[0.98] shadow-lg
                        ${isTodayCompleted 
                          ? 'bg-zinc-900 text-zinc-600 cursor-not-allowed border border-zinc-800' 
                          : 'bg-white text-black hover:invert'}`}
                    >
                      {isTodayCompleted ? 'Today\'s Objective Verified' : 'Confirm Daily Completion'}
                    </button>
                  ) : (
                    <div className="p-6 border border-white/20 glass-panel animate-fade-in text-center space-y-6">
                      <p className="text-sm font-bold uppercase tracking-widest italic">Weet je het zeker dat je alles hebt gedaan?</p>
                      <div className="grid grid-cols-2 gap-4">
                        <button 
                          onClick={handleConfirmCompletion}
                          className="py-4 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-zinc-200"
                        >
                          Ja
                        </button>
                        <button 
                          onClick={() => setShowConfirm(false)}
                          className="py-4 border border-zinc-800 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10"
                        >
                          Nee
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {isRestDay(currentChallengeDay) && (
                <div className="mt-8 p-6 border border-zinc-800 text-center">
                  <p className="text-xs text-zinc-500 uppercase tracking-[0.2em]">Rustdag Protocol - Geen logging vereist</p>
                </div>
              )}
           </div>
        </div>

        {/* Info Sidebar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          <div className="glass-panel p-6 border-zinc-900">
            <h4 className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-4">Core Progress</h4>
            <div className="flex justify-between items-end mb-3">
              <div className="flex flex-col">
                <span className="text-[9px] text-zinc-600 font-mono uppercase">Current Day</span>
                <span className="text-3xl md:text-4xl font-black italic">{currentChallengeDay}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[9px] text-zinc-600 font-mono uppercase">Completed</span>
                <span className="text-2xl font-bold italic text-white">{user.completedDays.length}</span>
              </div>
            </div>
            <div className="w-full bg-zinc-900 h-1 overflow-hidden">
               <div 
                 className="bg-white h-full transition-all duration-1000" 
                 style={{ width: `${(user.completedDays.length / 30) * 100}%` }}
               />
            </div>
          </div>

          <div className="glass-panel p-6 border-zinc-900 text-[10px] md:text-[11px] leading-relaxed text-zinc-500 uppercase tracking-wider space-y-3">
            <p>Protocol: 6 days load, 1 day recovery.</p>
            <p>Tracking: Alleen huidige dag kan worden afgetekend.</p>
            <div className="pt-2 border-t border-zinc-900">
               <p className="text-zinc-400 font-bold italic leading-tight">
                "{dailyQuote}"
               </p>
               <p className="text-[8px] text-zinc-600 mt-1">— DAVID GOGGINS</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Day Details */}
      {selectedDay && (
        <WorkoutView 
          day={selectedDay} 
          skill={user.selectedSkill!} 
          onClose={() => setSelectedDay(null)} 
          isCompleted={user.completedDays.includes(selectedDay)}
        />
      )}
    </div>
  );
};

export default Dashboard;
