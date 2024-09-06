'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface AdminSettings {
  aboutme: 2 | 3;
  address: 2 | 3;
  birthdate: 2 | 3;
}

interface AdminContextType {
  settings: AdminSettings;
  isLoading: boolean;
  fetchSettings: () => Promise<void>;
  updateSettings: (updatedSettings: AdminSettings) => Promise<void>;
}

const AdminContext = createContext<AdminContextType>({
  settings: { aboutme: 3, address: 2, birthdate: 2 },
  isLoading: true,
  fetchSettings: async () => {},
  updateSettings: async () => {},
});

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AdminSettings>({ aboutme: 3, address: 2, birthdate: 2 });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchSettings = async () => {
    try {
      console.log('fetch settings url:', `${process.env.NEXT_PUBLIC_BASE_API}/admin`);
      const response = await axios.get<AdminSettings>(`${process.env.NEXT_PUBLIC_BASE_API}/admin`);
      setSettings(response.data);
    } catch (error) {
      console.error("Failed to fetch admin settings", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = async (updatedSettings: AdminSettings) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BASE_API}/admin`, updatedSettings);
      setSettings(updatedSettings);
    } catch (error) {
      console.error("Failed to update admin settings", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <AdminContext.Provider value={{ settings, isLoading, fetchSettings, updateSettings }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);