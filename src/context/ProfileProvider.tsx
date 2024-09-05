'use client';
import { useContext, createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface ProfileContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
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
  const [user, setUser] = useState<any>(null);
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
      const response = await axios.post('http://localhost:8080/user/sign-in', { email, password });
      console.log('login response:', response.data)
      if (response.data) {
        console.log('login response data:', response.data)
        localStorage.setItem('user', JSON.stringify(response.data));
        setUser(response.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Login failed", error);
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
        await axios.put('http://localhost:8080/user', user);
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
