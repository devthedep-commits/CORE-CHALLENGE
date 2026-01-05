
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// --- TYPES ---
export enum SkillType {
  PUSHUP_MONSTER = 'Push-up Monster',
  BURPEE_BEEST = 'Burpee Beest',
  PLANK_ENDURANCE = 'Plank Endurance',
  RUN_5KM = '5KM Run',
  HYROX_COMBO = 'Hyrox Combo'
}

export interface User {
  username: string;
  password?: string;
  selectedSkill: SkillType | null;
  completedDays: number[];
  startDate: string;
}

export interface Exercise {
  name: string;
  reps: string;
  description: string;
}

export interface SkillProgress {
  week1: string;
  week2: string;
  week3: string;
  week4: string;
}

// --- CONSTANTS ---
export const BASE_WORKOUT: Exercise[] = [
  { name: 'Squats', reps: '20 reps', description: 'Classic bodyweight squat, rug recht, voeten schouderbreedte.' },
  { name: 'Push-ups', reps: '15 reps', description: 'Borst, schouders, triceps. Variatie: normale push-ups of op knieën.' },
  { name: 'Lunges', reps: '12 reps per been', description: 'Stap naar voren, knie net boven vloer, rug recht.' },
  { name: 'V-sit / V-ups', reps: '15 reps', description: 'Core oefening, vervangt plank.' },
  { name: 'Burpees', reps: '10 reps', description: 'Full-body kracht + cardio.' },
  { name: 'Bicycle Crunches', reps: '20 reps per kant', description: 'Core, rectus abdominis en obliques.' }
];

export const GOGGINS_QUOTES = [
  "Stay hard!",
  "Don't stop when you're tired. Stop when you're done.",
  "The only person who's going to turn your life around is you.",
  "Get comfortable being uncomfortable.",
  "Motivation is crap. When you’re driven, whatever is in front of you will get destroyed.",
  "If you can get through to doing things that you hate to do, on the other side is greatness.",
  "Suffering is the true test of life.",
  "Everything in life is a mind game.",
  "You must develop a thick skin. Become a master of your own mind.",
  "Nobody cares what you did yesterday. What are you doing today?",
  "The most important conversation you’ll ever have is the one with yourself.",
  "A warrior is a guy that says 'I’m here again today. I’ll be here again tomorrow.'",
  "Life is the most brutal endurance sport of all time.",
  "If you have any discipline at all, you are a dangerous person.",
  "You are in danger of living a life so comfortable that you will die without ever realizing your potential.",
  "When you think that you are done, you're only 40% into what your body's capable of.",
  "The only way to reach your full potential is to go through the pain.",
  "Be more than just a dreamer; be a doer.",
  "It’s going to be hard, but hard is not impossible.",
  "The hardest part is the start. After that, it’s just about consistency.",
  "Don’t let your mind tell you that you can’t.",
  "Discipline is the key to everything.",
  "Your mind is the only thing that holds you back.",
  "Wake up and attack the day.",
  "Success is not a destination; it's a way of life.",
  "Find your limits and then push past them.",
  "Strength is born in the struggle.",
  "Every day is an opportunity to be better than yesterday.",
  "The ticket to victory is often just showing up.",
  "Control your mind. Own your life."
];

export const SKILL_DATA: Record<SkillType, { description: string, progress: SkillProgress }> = {
  [SkillType.PUSHUP_MONSTER]: {
    description: 'Goal: 250 push-ups in 30 min. Week 1: 5x15, Week 2: 5x20, Week 3: 6x20, Week 4: 6x25.',
    progress: { week1: '5 sets of 15 reps', week2: '5 sets of 20 reps', week3: '6 sets of 20 reps', week4: '6 sets of 25 reps' }
  },
  [SkillType.BURPEE_BEEST]: {
    description: 'Goal: 150 burpees in 30 min. Week 1: 3x10, Week 2: 3x12, Week 3: 3x15, Week 4: 4x15.',
    progress: { week1: '3 sets of 10 reps', week2: '3 sets of 12 reps', week3: '3 sets of 15 reps', week4: '4 sets of 15 reps' }
  },
  [SkillType.PLANK_ENDURANCE]: {
    description: 'Goal: 5 minutes continuous plank. Week 1: 2x60s, Week 2: 2x75s, Week 3: 2x90s, Week 4: 2x120s.',
    progress: { week1: '2 x 60 sec', week2: '2 x 75 sec', week3: '2 x 90 sec', week4: '2 x 120 sec' }
  },
  [SkillType.RUN_5KM]: {
    description: 'Goal: 5km run under 25 min. Thuis basisworkout, buiten hardlopen.',
    progress: { week1: '3 km steady run', week2: '4 km tempo', week3: '4.5 km tempo', week4: '5 km onder 25 min' }
  },
  [SkillType.HYROX_COMBO]: {
    description: 'Goal: 2x (75 push-ups + 75 burpees + 75 squats) in 30 min.',
    progress: { week1: '1 ronde van 25 reps elk', week2: '2 rondes van 25 reps elk', week3: '2 rondes van 50 reps elk', week4: '2x 75 push-ups, burpees & squats' }
  }
};

// --- STORAGE SERVICE ---
const STORAGE_KEY = 'core_2026_users';
const storage = {
  getUsers: (): User[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },
  saveUser: (user: User) => {
    const users = storage.getUsers();
    const index = users.findIndex(u => u.username === user.username);
    if (index > -1) users[index] = user;
    else users.push(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  },
  findUser: (username: string): User | undefined => storage.getUsers().find(u => u.username === username),
  register: (username: string, password: string) => {
    if (storage.findUser(username)) return { user: null, error: "Gebruiker bestaat al." };
    const newUser: User = { username, password, selectedSkill: null, completedDays: [], startDate: new Date().toISOString() };
    storage.saveUser(newUser);
    return { user: newUser, error: null };
  },
  login: (username: string, password: string) => {
    const user = storage.findUser(username);
    if (!user) return { user: null, error: "Gebruiker niet gevonden." };
    if (user.password !== password) return { user: null, error: "Onjuist wachtwoord." };
    return { user, error: null };
  }
};

// --- COMPONENTS ---

const WorkoutView: React.FC<{ day: number, skill: SkillType, onClose: () => void, isCompleted: boolean }> = ({ day, skill, onClose, isCompleted }) => {
  const week = Math.ceil(day / 7);
  const skillProgress = SKILL_DATA[skill].progress;
  const currentSkillSet = () => {
    if (day % 7 === 0) return "REST DAY";
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
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="mb-8">
          <div className="text-[10px] tracking-[0.5em] text-zinc-600 uppercase mb-2">Protocol Log</div>
          <h2 className="text-4xl font-black italic uppercase">Dag {day.toString().padStart(2, '0')}</h2>
          {isCompleted && <span className="mt-2 inline-block px-2 py-1 bg-white text-black text-[9px] font-bold uppercase">VERIFIED</span>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest border-b border-zinc-800 pb-2">Conditioning</h4>
            <div className="space-y-2">
              {BASE_WORKOUT.map((ex, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="text-zinc-400">{ex.name}</span>
                  <span className="font-mono text-zinc-500">{ex.reps}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest border-b border-zinc-800 pb-2">Skill Specialization</h4>
            <div className="p-4 bg-white/5 border border-zinc-800 text-center">
              <div className="text-lg font-bold uppercase text-white mb-1">{currentSkillSet()}</div>
              <div className="text-[8px] text-zinc-600 uppercase font-mono">{skill}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Auth: React.FC<{ onAuthSuccess: (user: User) => void }> = ({ onAuthSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resp = isRegistering ? storage.register(username, password) : storage.login(username, password);
    if (resp.error) setError(resp.error);
    else if (resp.user) onAuthSuccess(resp.user);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8 px-6 animate-fade-in">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-2 italic">CORE.</h1>
        <p className="text-zinc-500 uppercase tracking-[0.4em] text-[10px]">2026 ATHLETE PROTOCOL</p>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-5">
        {error && <div className="bg-white text-black p-2 text-[9px] font-bold uppercase tracking-widest text-center">{error}</div>}
        <input type="text" placeholder="OPERATOR ID" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none focus:border-white transition-colors uppercase font-mono text-sm" required />
        <input type="password" placeholder="ACCESS CODE" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none focus:border-white transition-colors font-mono text-sm" required />
        <button type="submit" className="mt-4 w-full py-4 bg-white text-black font-black uppercase tracking-widest text-sm hover:invert transition-all">
          {isRegistering ? 'Register' : 'Initialize'}
        </button>
        <button type="button" onClick={() => setIsRegistering(!isRegistering)} className="text-[9px] tracking-[0.3em] text-zinc-600 uppercase hover:text-white">
          {isRegistering ? 'Existing Operator? Login' : 'New Operator? Create Account'}
        </button>
      </form>
    </div>
  );
};

const SkillSelection: React.FC<{ onSelect: (skill: SkillType) => void }> = ({ onSelect }) => {
  const [briefing, setBriefing] = useState(true);
  if (briefing) return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 px-6 text-center animate-fade-in">
      <h2 className="text-xs tracking-[0.5em] text-zinc-600 uppercase font-mono">Mission Briefing</h2>
      <h1 className="text-5xl font-black italic uppercase tracking-tighter">30-Dagen Protocol</h1>
      <p className="max-w-md text-zinc-400 text-sm leading-relaxed uppercase tracking-wider">
        Kies één elite-skill om te masteren naast je dagelijkse basisworkout. Consistentie is het enige dat telt.
      </p>
      <button onClick={() => setBriefing(false)} className="px-10 py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-xs hover:invert">Select Discipline</button>
    </div>
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 animate-fade-in">
      {Object.values(SkillType).map(skill => (
        <button key={skill} onClick={() => onSelect(skill)} className="glass-panel p-8 text-left group hover:bg-white hover:text-black transition-all border border-zinc-900 flex flex-col justify-between min-h-[200px]">
          <div>
            <h3 className="text-xl font-bold uppercase mb-3 italic">{skill}</h3>
            <p className="text-[10px] text-zinc-500 group-hover:text-zinc-600 uppercase leading-relaxed">{SKILL_DATA[skill].description}</p>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-widest mt-4">Initialize Protocol →</span>
        </button>
      ))}
    </div>
  );
};

const Dashboard: React.FC<{ user: User, onCompleteDay: (day: number) => void, onLogout: () => void }> = ({ user, onCompleteDay, onLogout }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const currentChallengeDay = Math.floor((new Date().getTime() - new Date(user.startDate).setHours(0,0,0,0)) / (1000 * 60 * 60 * 24)) + 1;
  const isTodayCompleted = user.completedDays.includes(currentChallengeDay);
  const dailyQuote = GOGGINS_QUOTES[(currentChallengeDay - 1) % GOGGINS_QUOTES.length];

  const handleConfirm = () => {
    onCompleteDay(currentChallengeDay);
    setShowConfirm(false);
  };

  return (
    <div className="w-full flex flex-col gap-10 py-10 px-4 animate-fade-in">
      <div className="flex justify-between items-end border-b border-zinc-900 pb-8">
        <div>
          <h1 className="text-[10px] tracking-[0.4em] text-zinc-600 uppercase mb-2">Operator Session</h1>
          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-black uppercase italic">{user.username}</span>
            <span className="text-zinc-600 text-xs font-mono uppercase">/ {user.selectedSkill}</span>
          </div>
        </div>
        <button onClick={onLogout} className="text-[9px] tracking-widest text-zinc-600 hover:text-white uppercase border border-zinc-900 px-3 py-2">Terminate</button>
      </div>

      <div className="grid grid-cols-6 md:grid-cols-10 gap-2">
        {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
          <button key={day} onClick={() => setSelectedDay(day)} className={`aspect-square border flex flex-col items-center justify-center transition-all ${user.completedDays.includes(day) ? 'bg-white text-black border-white' : day === currentChallengeDay ? 'border-white animate-pulse' : 'border-zinc-900 text-zinc-600'} ${day > currentChallengeDay ? 'opacity-30' : 'hover:border-zinc-500'}`}>
            <span className="text-[10px] font-mono">{day}</span>
            {user.completedDays.includes(day) && <span className="text-[8px] font-bold">✓</span>}
            {day % 7 === 0 && day <= currentChallengeDay && !user.completedDays.includes(day) && <span className="text-[6px] opacity-50 uppercase">RST</span>}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel p-8 border-zinc-900">
          <h2 className="text-2xl font-bold uppercase mb-8 italic">Vandaag: Dag {currentChallengeDay}</h2>
          {currentChallengeDay % 7 === 0 ? (
            <div className="text-center py-10 text-zinc-600 uppercase tracking-widest text-sm">Rustdag Protocol Actief. Herstel je lichaam.</div>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-white/5 border border-zinc-800">
                <p className="text-[10px] text-zinc-600 uppercase mb-2">Skill Task</p>
                <p className="text-xl font-bold uppercase">{SKILL_DATA[user.selectedSkill!].progress[`week${Math.ceil(currentChallengeDay/7)}` as keyof SkillProgress]}</p>
              </div>
              {!isTodayCompleted ? (
                !showConfirm ? (
                  <button onClick={() => setShowConfirm(true)} className="w-full py-5 bg-white text-black font-black uppercase tracking-widest hover:bg-zinc-200">Log Completion</button>
                ) : (
                  <div className="p-6 border border-white/20 glass-panel text-center space-y-4 animate-fade-in">
                    <p className="text-xs font-bold uppercase tracking-widest italic">Weet je het zeker dat je alles hebt gedaan?</p>
                    <div className="flex gap-4"><button onClick={handleConfirm} className="flex-1 py-3 bg-white text-black font-black uppercase text-xs">JA</button><button onClick={() => setShowConfirm(false)} className="flex-1 py-3 border border-zinc-800 text-white font-black uppercase text-xs">NEE</button></div>
                  </div>
                )
              ) : <div className="py-5 border border-zinc-800 text-center text-zinc-600 uppercase tracking-widest text-xs">Objectief Behaald voor Vandaag</div>}
            </div>
          )}
        </div>
        <div className="glass-panel p-8 border-zinc-900 flex flex-col justify-between">
          <div>
            <h4 className="text-[10px] text-zinc-600 uppercase mb-4 tracking-widest">Progress Alpha</h4>
            <div className="text-4xl font-black italic mb-2">{Math.round((user.completedDays.length / 30) * 100)}%</div>
            <div className="w-full bg-zinc-900 h-1"><div className="bg-white h-full transition-all duration-1000" style={{ width: `${(user.completedDays.length / 30) * 100}%` }} /></div>
          </div>
          <div className="mt-10 pt-6 border-t border-zinc-900">
            <p className="text-zinc-400 font-bold italic text-sm leading-tight">"{dailyQuote}"</p>
            <p className="text-[8px] text-zinc-600 mt-2 uppercase tracking-widest">— DAVID GOGGINS</p>
          </div>
        </div>
      </div>
      {selectedDay && <WorkoutView day={selectedDay} skill={user.selectedSkill!} onClose={() => setSelectedDay(null)} isCompleted={user.completedDays.includes(selectedDay)} />}
    </div>
  );
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setView] = useState<'auth' | 'skill' | 'dashboard'>('auth');

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setView(!user.selectedSkill ? 'skill' : 'dashboard');
  };
  const handleSkillSelect = (skill: SkillType) => {
    if (!currentUser) return;
    const updated = { ...currentUser, selectedSkill: skill };
    storage.saveUser(updated);
    setCurrentUser(updated);
    setView('dashboard');
  };
  const handleCompleteDay = (day: number) => {
    if (!currentUser || currentUser.completedDays.includes(day)) return;
    const updated = { ...currentUser, completedDays: [...currentUser.completedDays, day] };
    storage.saveUser(updated);
    setCurrentUser(updated);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {view === 'auth' && <Auth onAuthSuccess={handleAuthSuccess} />}
        {view === 'skill' && currentUser && <SkillSelection onSelect={handleSkillSelect} />}
        {view === 'dashboard' && currentUser && <Dashboard user={currentUser} onCompleteDay={handleCompleteDay} onLogout={() => setView('auth')} />}
      </div>
      <footer className="mt-12 text-[9px] tracking-[0.4em] text-zinc-700 uppercase">CORE PROTOCOL v2.6 // DARK MODE ACTIVE</footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<React.StrictMode><App /></React.StrictMode>);
