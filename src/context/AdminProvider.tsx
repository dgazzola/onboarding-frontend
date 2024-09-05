'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

// Define the shape of the admin settings
interface AdminSettings {
  aboutme: 2 | 3;
  address: 2 | 3;
  birthdate: 2 | 3;
}

// Define the shape of the context value
interface AdminContextType {
  settings: AdminSettings;
  isLoading: boolean;
  fetchSettings: () => Promise<void>;
  updateSettings: (updatedSettings: AdminSettings) => Promise<void>;
}

// Create a context with default values
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
      const response = await axios.get<AdminSettings>('http://localhost:8080/admin');
      setSettings(response.data);
    } catch (error) {
      console.error("Failed to fetch admin settings", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = async (updatedSettings: AdminSettings) => {
    try {
      await axios.put('http://localhost:8080/admin', updatedSettings);
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