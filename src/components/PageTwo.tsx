'use client';
import React, { useEffect, useState } from 'react';
import Birthdate from './Birthdate';
import Address from './Address';
import AboutMe from './AboutMe';
import { useAdmin } from '@/context/AdminProvider';
import { useProfile } from '@/context/ProfileProvider';
import { Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import WizardBar from './WizardBar';
import { User } from '@/types';

const PageTwo = () => {
  const { settings } = useAdmin();
  const { user, updateUser, setUser } = useProfile();
  const currentPage = user?.currentPage ?? 2;

  const [steps, setSteps] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const incompleteAddress = () => {
    return !user?.address?.street || !user?.address?.city || !user?.address?.state || !user?.address?.zip;
  };

  const incomplete = () => {
    if (settings.birthdate === 2 && !user?.birthdate) return true;
    if (settings.address === 2 && incompleteAddress()) return true;
    if (settings.aboutme === 2 && !user?.aboutMe) return true;
    return false;
  };

  const disableSubmit = () => {
    if (settings.birthdate === 3 && !user?.birthdate) return true;
    if (settings.address === 3 && incompleteAddress()) return true;
    if (settings.aboutme === 3 && !user?.aboutMe) return true;
    return false;
  };

  const handleContinue = () => {
    if (user) {
      setUser(prevUser => ({
        ...prevUser,
        currentPage: 3
      }) as User);
    }
  };

  const handlePrevious = () => {
    if (user) {
      setUser(prevUser => ({
        ...prevUser,
        currentPage: 2
      }) as User);
    }
  };

  const handleSubmit = async () => {
    if (user) {
      await updateUser();
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const updateUserIfPageChanged = async () => {
      if (currentPage === 2 || currentPage === 3) {
        await updateUser();
      }
    };
    updateUserIfPageChanged();
  }, [currentPage, updateUser]);

  useEffect(() => {
    const generateSteps = () => {
      const stepsList: string[] = ['Sign-In'];
      const pageTwoLabels: string[] = [];
      if (settings.birthdate === 2) pageTwoLabels.push('Birthdate');
      if (settings.address === 2) pageTwoLabels.push('Address');
      if (settings.aboutme === 2) pageTwoLabels.push('About Me');

      if (pageTwoLabels.length > 0) {
        stepsList.push(pageTwoLabels.join('/'));
      } else {
        stepsList.push('Page 2');
      }

      const pageThreeLabels: string[] = [];
      if (settings.birthdate === 3) pageThreeLabels.push('Birthdate');
      if (settings.address === 3) pageThreeLabels.push('Address');
      if (settings.aboutme === 3) pageThreeLabels.push('About Me');

      if (pageThreeLabels.length > 0) {
        stepsList.push(pageThreeLabels.join('/'));
      } else {
        stepsList.push('Page 3');
      }

      setSteps(stepsList);
    };

    generateSteps();
  }, [settings]);

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <WizardBar currentPage={currentPage} steps={steps} />
      
      <Box flex="1" p={2}>
        {currentPage === 2 && settings.birthdate === 2 && <Birthdate />}
        {currentPage === 2 && settings.address === 2 && <Address />}
        {currentPage === 2 && settings.aboutme === 2 && <AboutMe />}
        {currentPage === 3 && settings.birthdate === 3 && <Birthdate />}
        {currentPage === 3 && settings.address === 3 && <Address />}
        {currentPage === 3 && settings.aboutme === 3 && <AboutMe />}
      </Box>

      <Box display="flex" justifyContent="space-between" mt={2} p={2}>
        {currentPage === 2 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleContinue}
            disabled={incomplete()}
          >
            Continue
          </Button>
        )}
        {currentPage === 3 && (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePrevious}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={disableSubmit()}
            >
              Submit
            </Button>
          </>
        )}
      </Box>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Thank You!</DialogTitle>
        <DialogContent>
          <Typography>
            Thank you for filling out your onboarding form! Feel free to change any answers if circumstances change.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PageTwo;
