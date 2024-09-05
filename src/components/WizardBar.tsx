import React from 'react';
import { Box, Stepper, Step, StepLabel } from '@mui/material';

interface WizardBarProps {
  currentPage: number;
  steps: string[];
}

const WizardBar: React.FC<WizardBarProps> = ({ currentPage, steps }) => {
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