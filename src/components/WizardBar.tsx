// WizardBar.js
import React from 'react';
import { Box, Stepper, Step, StepLabel } from '@mui/material';

const WizardBar = ({ currentPage, steps }) => {
  return (
    <Box sx={{ width: '100%', marginBottom: 4 }}>
      <Stepper activeStep={currentPage - 1} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default WizardBar;