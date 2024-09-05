'use client';
import React, { useState, useEffect } from 'react';
import { TextField, Box } from '@mui/material';
import { useProfile } from '@/context/ProfileProvider';
import { User } from '@/types';

const AboutMe = () => {
  const { user, setUser } = useProfile();
  const [aboutMe, setAboutMe] = useState<string>(user?.aboutMe || '');

  useEffect(() => {
    setAboutMe(user?.aboutMe || '');
  }, [user?.aboutMe]);

  const handleAboutMeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setAboutMe(value);

    setUser((prevUser) => {
      if (!prevUser) return null;
      const updatedUser: User = {
        ...prevUser,
        aboutMe: value,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return updatedUser;
    });
  };

  return (
    <Box>
      <h1>About Me</h1>
      <TextField
        label="About Me"
        variant="outlined"
        multiline
        rows={6}
        fullWidth
        value={aboutMe}
        onChange={handleAboutMeChange}
        sx={{ marginBottom: 2 }}
      />
    </Box>
  );
};

export default AboutMe;