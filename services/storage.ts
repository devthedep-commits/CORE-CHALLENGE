
import { User } from '../types';

const STORAGE_KEY = 'core_2026_users';

export interface AuthResponse {
  user: User | null;
  error: string | null;
}

export const storage = {
  getUsers: (): User[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveUser: (user: User) => {
    const users = storage.getUsers();
    const index = users.findIndex(u => u.username === user.username);
    if (index > -1) {
      users[index] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  },

  findUser: (username: string): User | undefined => {
    return storage.getUsers().find(u => u.username === username);
  },

  register: (username: string, password: string): AuthResponse => {
    const existing = storage.findUser(username);
    if (existing) {
      return { user: null, error: "Gebruiker bestaat al." };
    }

    const newUser: User = {
      username,
      password,
      selectedSkill: null,
      completedDays: [],
      startDate: new Date().toISOString()
    };
    storage.saveUser(newUser);
    return { user: newUser, error: null };
  },

  login: (username: string, password: string): AuthResponse => {
    const user = storage.findUser(username);
    if (!user) {
      return { user: null, error: "Gebruiker niet gevonden. Maak een account aan." };
    }
    if (user.password !== password) {
      return { user: null, error: "Onjuist wachtwoord." };
    }
    return { user, error: null };
  }
};
