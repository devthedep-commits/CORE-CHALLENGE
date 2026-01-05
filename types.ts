
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
  completedDays: number[]; // Array of day numbers (1-30)
  startDate: string; // ISO string
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
