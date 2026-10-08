import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  mobile: string;
  district: string;
  state: string;
  pincode: string;
  password: string;
  registrationDate: string;
  progress: {
    level1: { completed: boolean; score: number; completionDate: string | null };
    level2: { completed: boolean; score: number; completionDate: string | null };
    level3: { completed: boolean; score: number; completionDate: string | null };
    level4: { completed: boolean; score: number; completionDate: string | null };
  };
}

export interface AdminSettings {
  password: string;
  companyName: string;
  companyLogo: string;
}

interface AppContextType {
  // Auth
  currentUser: Candidate | null;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  adminLogin: (password: string) => boolean;
  logout: () => void;
  register: (candidate: Omit<Candidate, 'id' | 'registrationDate' | 'progress'>) => boolean;
  updateProfile: (updates: Partial<Candidate>) => void;

  // Progress
  updateProgress: (level: number, score: number) => void;
  getCandidateProgress: () => Candidate['progress'] | null;

  // Admin
  getAllCandidates: () => Candidate[];
  deleteCandidate: (id: string) => void;
  updateAdminSettings: (settings: Partial<AdminSettings>) => void;
  getAdminSettings: () => AdminSettings;
  changeAdminPassword: (oldPass: string, newPass: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_ADMIN: AdminSettings = {
  password: 'admin123',
  companyName: '',
  companyLogo: '',
};

const defaultProgress = {
  level1: { completed: false, score: 0, completionDate: null },
  level2: { completed: false, score: 0, completionDate: null },
  level3: { completed: false, score: 0, completionDate: null },
  level4: { completed: false, score: 0, completionDate: null },
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Candidate | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [adminSettings, setAdminSettings] = useState<AdminSettings>(DEFAULT_ADMIN);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedCandidates = localStorage.getItem('haccp_candidates');
    const storedAdmin = localStorage.getItem('haccp_admin_settings');
    const storedSession = localStorage.getItem('haccp_session');

    if (storedCandidates) setCandidates(JSON.parse(storedCandidates));
    if (storedAdmin) setAdminSettings(JSON.parse(storedAdmin));
    if (storedSession) {
      const session = JSON.parse(storedSession);
      if (session.type === 'admin') {
        setIsAdmin(true);
      } else if (session.type === 'candidate') {
        const found = candidates.find(c => c.id === session.id);
        if (found) setCurrentUser(found);
      }
    }
  }, []);

  // Save candidates to localStorage
  useEffect(() => {
    localStorage.setItem('haccp_candidates', JSON.stringify(candidates));
  }, [candidates]);

  // Save admin settings
  useEffect(() => {
    localStorage.setItem('haccp_admin_settings', JSON.stringify(adminSettings));
  }, [adminSettings]);

  const register = (data: Omit<Candidate, 'id' | 'registrationDate' | 'progress'>): boolean => {
    const exists = candidates.find(c => c.email.toLowerCase() === data.email.toLowerCase());
    if (exists) return false;

    const newCandidate: Candidate = {
      ...data,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      registrationDate: new Date().toISOString(),
      progress: { ...defaultProgress },
    };

    setCandidates(prev => [...prev, newCandidate]);
    return true;
  };

  const login = (email: string, password: string): boolean => {
    const found = candidates.find(
      c => c.email.toLowerCase() === email.toLowerCase() && c.password === password
    );
    if (found) {
      setCurrentUser(found);
      localStorage.setItem('haccp_session', JSON.stringify({ type: 'candidate', id: found.id }));
      return true;
    }
    return false;
  };

  const adminLogin = (password: string): boolean => {
    if (password === adminSettings.password) {
      setIsAdmin(true);
      localStorage.setItem('haccp_session', JSON.stringify({ type: 'admin' }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    localStorage.removeItem('haccp_session');
  };

  const updateProfile = (updates: Partial<Candidate>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    setCandidates(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  const updateProgress = (level: number, score: number) => {
    if (!currentUser) return;
    const levelKey = `level${level}` as keyof Candidate['progress'];
    const updated = {
      ...currentUser,
      progress: {
        ...currentUser.progress,
        [levelKey]: {
          completed: true,
          score,
          completionDate: new Date().toISOString(),
        },
      },
    };
    setCurrentUser(updated);
    setCandidates(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  const getCandidateProgress = (): Candidate['progress'] | null => {
    return currentUser?.progress || null;
  };

  const getAllCandidates = (): Candidate[] => candidates;

  const deleteCandidate = (id: string) => {
    setCandidates(prev => prev.filter(c => c.id !== id));
  };

  const updateAdminSettings = (settings: Partial<AdminSettings>) => {
    setAdminSettings(prev => ({ ...prev, ...settings }));
  };

  const getAdminSettings = (): AdminSettings => adminSettings;

  const changeAdminPassword = (oldPass: string, newPass: string): boolean => {
    if (oldPass === adminSettings.password) {
      setAdminSettings(prev => ({ ...prev, password: newPass }));
      return true;
    }
    return false;
  };

  return (
    <AppContext.Provider value={{
      currentUser, isAdmin, login, adminLogin, logout, register,
      updateProfile, updateProgress, getCandidateProgress,
      getAllCandidates, deleteCandidate, updateAdminSettings,
      getAdminSettings, changeAdminPassword,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
