
import React, { useState } from 'react';
import { storage, AuthResponse } from '../services/storage';
import { User } from '../types';

interface AuthProps {
  onAuthSuccess: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    let response: AuthResponse;
    if (isRegistering) {
      response = storage.register(username, password);
    } else {
      response = storage.login(username, password);
    }

    if (response.error) {
      setError(response.error);
    } else if (response.user) {
      onAuthSuccess(response.user);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8 py-12 px-6">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-2 italic">CORE.</h1>
        <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] md:text-xs">
          {isRegistering ? 'Register New Operator' : 'Enter Training Protocol'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-6">
        {error && (
          <div className="bg-white text-black p-3 text-[10px] font-bold uppercase tracking-widest text-center animate-pulse">
            Error: {error}
          </div>
        )}
        
        <div className="relative">
          <input
            type="text"
            placeholder="OPERATOR ID"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-transparent border-b border-zinc-800 py-4 px-2 outline-none focus:border-white transition-colors uppercase font-mono text-sm tracking-wider"
            required
          />
        </div>
        <div className="relative">
          <input
            type="password"
            placeholder="ACCESS CODE"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b border-zinc-800 py-4 px-2 outline-none focus:border-white transition-colors font-mono text-sm tracking-wider"
            required
          />
        </div>
        
        <button
          type="submit"
          className="mt-4 w-full py-5 bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-zinc-200 transition-all active:scale-95 shadow-lg"
        >
          {isRegistering ? 'Create Account' : 'Initialize'}
        </button>

        <button
          type="button"
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError(null);
          }}
          className="text-[9px] tracking-[0.3em] text-zinc-600 hover:text-white uppercase transition-colors"
        >
          {isRegistering ? 'Already have an account? Login' : 'New operator? Create account'}
        </button>
      </form>
    </div>
  );
};

export default Auth;
