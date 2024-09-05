'use client';
import React, { ReactNode } from 'react';
import { ProfileProvider } from './ProfileProvider';
import { AdminProvider } from './AdminProvider';

const ContextProviders = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <AdminProvider>
      <ProfileProvider>
        {children}
      </ProfileProvider>
    </AdminProvider>
  );
};

export default ContextProviders;
