'use client';
import { useContext, createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { User } from '@/types';

interface ProfileContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const ProfileContext = createContext<ProfileContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  updateUser: async () => {},
  setUser: () => {},
});

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API}/user/sign-in`, { email, password });
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setUser(response.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      throw new Error("Incorrect password for given email!");
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = async () => {
    try {
      if (user) {
        await axios.put(`${process.env.NEXT_PUBLIC_BASE_API}/user`, user);
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <ProfileContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, updateUser, setUser }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
