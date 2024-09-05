'use client';
import React, { useState, useEffect } from 'react';
import { TextField, Box, Button } from '@mui/material';
import { useProfile } from '@/context/ProfileProvider';

const AboutMe = () => {
  const { user, setUser, updateUser } = useProfile();
  const [aboutMe, setAboutMe] = useState(user?.aboutMe || '');

  useEffect(() => {
    // Sync local state with user context state
    setAboutMe(user?.aboutMe || '');
  }, [user?.aboutMe]);

  const handleAboutMeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setAboutMe(value);

    // Update the user context state directly
    setUser(prevUser => {
      const updatedUser = { ...prevUser, aboutMe: value };
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