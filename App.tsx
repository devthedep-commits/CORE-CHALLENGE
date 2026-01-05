
import React, { useState, useEffect } from 'react';
import { User, SkillType } from './types';
import { storage } from './services/storage';
import Auth from './components/Auth';
import SkillSelection from './components/SkillSelection';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setView] = useState<'auth' | 'skill' | 'dashboard'>('auth');

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    if (!user.selectedSkill) {
      setView('skill');
    } else {
      setView('dashboard');
    }
  };

  const handleSkillSelect = (skill: SkillType) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, selectedSkill: skill };
    storage.saveUser(updatedUser);
    setCurrentUser(updatedUser);
    setView('dashboard');
  };

  const handleCompleteDay = (day: number) => {
    if (!currentUser) return;
    if (currentUser.completedDays.includes(day)) return;

    const updatedUser = { 
      ...currentUser, 
      completedDays: [...currentUser.completedDays, day] 
    };
    storage.saveUser(updatedUser);
    setCurrentUser(updatedUser);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('auth');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl animate-fade-in">
        {view === 'auth' && <Auth onAuthSuccess={handleAuthSuccess} />}
        {view === 'skill' && currentUser && (
          <SkillSelection onSelect={handleSkillSelect} />
        )}
        {view === 'dashboard' && currentUser && (
          <Dashboard 
            user={currentUser} 
            onCompleteDay={handleCompleteDay} 
            onLogout={handleLogout}
          />
        )}
      </div>

      <footer className="mt-12 text-[10px] tracking-widest text-zinc-600 uppercase">
        Designed for the 2026 High Performance Athlete &bull; Core Protocol
      </footer>
    </div>
  );
};

export default App;
