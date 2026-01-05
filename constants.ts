
import { SkillType, Exercise, SkillProgress } from './types';

export const BASE_WORKOUT: Exercise[] = [
  { name: 'Squats', reps: '20 reps', description: 'Classic bodyweight squat, back straight, feet shoulder width.' },
  { name: 'Push-ups', reps: '15 reps', description: 'Chest, shoulders, triceps. Normal or on knees.' },
  { name: 'Lunges', reps: '12 reps per leg', description: 'Step forward, knee just above floor, back straight.' },
  { name: 'V-sit / V-ups', reps: '15 reps', description: 'Core exercise focusing on upper and lower abs.' },
  { name: 'Burpees', reps: '10 reps', description: 'Full-body strength + cardio explosive movement.' },
  { name: 'Bicycle Crunches', reps: '20 reps per side', description: 'Core, rectus abdominis and obliques.' }
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
    description: 'Goal: 250 push-ups in 30 min. Focus on tempo and volume.',
    progress: {
      week1: '5 sets of 15 reps',
      week2: '5 sets of 20 reps',
      week3: '6 sets of 20 reps',
      week4: '6 sets of 25 reps'
    }
  },
  [SkillType.BURPEE_BEEST]: {
    description: 'Goal: 150 burpees in 30 min. High intensity cardio endurance.',
    progress: {
      week1: '3 sets of 10 reps',
      week2: '3 sets of 12 reps',
      week3: '3 sets of 15 reps',
      week4: '4 sets of 15 reps'
    }
  },
  [SkillType.PLANK_ENDURANCE]: {
    description: 'Goal: 5 minutes continuous plank. Core stability focus.',
    progress: {
      week1: '2 x 60 sec',
      week2: '2 x 75 sec',
      week3: '2 x 90 sec',
      week4: '2 x 120 sec'
    }
  },
  [SkillType.RUN_5KM]: {
    description: 'Goal: 5km run under 25 minutes. Outdoor endurance work.',
    progress: {
      week1: '3 km steady run',
      week2: '4 km tempo',
      week3: '4.5 km tempo',
      week4: '5 km under 25 min'
    }
  },
  [SkillType.HYROX_COMBO]: {
    description: 'Goal: 2x (75 Pushups + 75 Burpees + 75 Squats) in 30 min.',
    progress: {
      week1: '1 round of 25 push-ups, 25 burpees, 25 squats',
      week2: '2 rounds of 25 each',
      week3: '2 rounds of 50 each',
      week4: '2x 75 push-ups, 2x 75 burpees, 2x 75 squats'
    }
  }
};
