
import React, { useState } from 'react';
import { SkillType } from '../types';
import { SKILL_DATA } from '../constants';

interface SkillSelectionProps {
  onSelect: (skill: SkillType) => void;
}

const SkillSelection: React.FC<SkillSelectionProps> = ({ onSelect }) => {
  const [showBriefing, setShowBriefing] = useState(true);
  const skills = Object.values(SkillType);

  if (showBriefing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 py-10 px-6 animate-fade-in text-center">
        <div className="space-y-6 max-w-xl">
          <h2 className="text-xs tracking-[0.5em] text-zinc-500 uppercase font-mono">Mission Briefing</h2>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
            30-Dagen <br /> Protocol
          </h1>
          <div className="h-[1px] w-12 bg-white mx-auto"></div>
          <div className="space-y-4 text-zinc-400 text-sm md:text-base leading-relaxed uppercase tracking-wide">
            <p>
              Welkom bij de CORE 2026 challenge. Dit is een intensief traject van 30 dagen gericht op pure fysieke optimalisatie.
            </p>
            <p>
              Je volgt elke dag een basisworkout voor conditie en kracht. Daarnaast kies je nu één specifieke elite-skill.
            </p>
            <p className="text-white font-bold">
              Het doel? Na exact 30 dagen heb je deze skill volledig gemasterd en je grenzen verlegd.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowBriefing(false)}
          className="mt-8 px-10 py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-zinc-200 transition-all active:scale-95 shadow-xl"
        >
          Kies je Discipline
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 py-10 px-4 animate-fade-in">
      <div className="text-center px-4">
        <h2 className="text-xs tracking-[0.4em] text-zinc-500 uppercase mb-3 font-mono">Objective Selection</h2>
        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-widest mb-3 italic">Selecteer je Skill</h3>
        <p className="text-zinc-500 text-xs md:text-sm uppercase tracking-wider">
          Deze keuze bepaalt je extra training voor de komende 30 dagen.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <button
            key={skill}
            onClick={() => onSelect(skill)}
            className="glass-panel p-6 md:p-8 text-left group hover:bg-white hover:text-black transition-all border border-zinc-800 flex flex-col justify-between min-h-[180px] md:min-h-[220px] active:scale-[0.98]"
          >
            <div>
              <h3 className="text-lg md:text-xl font-bold uppercase mb-3 leading-tight italic">{skill}</h3>
              <p className="text-[11px] md:text-xs text-zinc-400 group-hover:text-zinc-600 line-clamp-3 leading-relaxed">
                {SKILL_DATA[skill].description}
              </p>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <span className="text-[10px] tracking-widest uppercase font-bold">Start Protocol</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline">→</span>
            </div>
          </button>
        ))}
      </div>
      
      <button 
        onClick={() => setShowBriefing(true)}
        className="mt-4 text-[9px] tracking-[0.3em] text-zinc-600 hover:text-zinc-400 uppercase transition-colors text-center"
      >
        Terug naar briefing
      </button>
    </div>
  );
};

export default SkillSelection;
