'use client';
import React, { useEffect, useState } from 'react';
import { useAdmin } from '@/context/AdminProvider';
import { Button, MenuItem, Select, FormControl, InputLabel, FormHelperText, Box, SelectChangeEvent } from '@mui/material';

interface AdminSettings {
  aboutme: 2 | 3;
  address: 2 | 3;
  birthdate: 2 | 3;
}

const AdminSettings = () => {
  const { settings, updateSettings } = useAdmin();
  const [formSettings, setFormSettings] = useState<AdminSettings>(settings);
  const [error, setError] = useState<string | null>(null);

  const isUnchanged = (): boolean => {
    return (
      formSettings.aboutme === settings.aboutme &&
      formSettings.address === settings.address &&
      formSettings.birthdate === settings.birthdate
    );
  };

  const allSettingsSame = (settings: AdminSettings): boolean => {
    return (
      settings.aboutme === settings.address &&
      settings.address === settings.birthdate
    );
  };

  useEffect(() => {
    setFormSettings(settings);
  }, [settings]);

  const handleChange = (event: SelectChangeEvent<2 | 3>) => {
    const name = event.target.name as keyof AdminSettings;
    const value = event.target.value as 2 | 3;
    setFormSettings({
      ...formSettings,
      [name]: value
    });
  };

  const handleSubmit = async () => {
      try {
        await updateSettings(formSettings);
        setError(null);
      } catch (error) {
        setError("Failed to update settings");
      }
  };

  const saveButtonDisabled = isUnchanged() || allSettingsSame(formSettings);
  const helperText = allSettingsSame(formSettings)
    ? "Each page needs at least one component. Please select a different page for one of the components."
    : "";

  return (
    <div>
      <h1>Admin Settings</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Box display="flex" flexWrap="wrap" gap={3}>
        <Box flex={1} minWidth="250px">
          <FormControl fullWidth>
            <InputLabel>About Me</InputLabel>
            <Select
              name="aboutme"
              value={formSettings.aboutme}
              onChange={handleChange}
              label="About Me"
            >
              <MenuItem value={2}>Page 2</MenuItem>
              <MenuItem value={3}>Page 3</MenuItem>
            </Select>
            <FormHelperText>Select the page for About Me</FormHelperText>
          </FormControl>
        </Box>
        <Box flex={1} minWidth="250px">
          <FormControl fullWidth>
            <InputLabel>Address</InputLabel>
            <Select
              name="address"
              value={formSettings.address}
              onChange={handleChange}
              label="Address"
            >
              <MenuItem value={2}>Page 2</MenuItem>
              <MenuItem value={3}>Page 3</MenuItem>
            </Select>
            <FormHelperText>Select the page for Address</FormHelperText>
          </FormControl>
        </Box>
        <Box flex={1} minWidth="250px">
          <FormControl fullWidth>
            <InputLabel>Birthdate</InputLabel>
            <Select
              name="birthdate"
              value={formSettings.birthdate}
              onChange={handleChange}
              label="Birthdate"
            >
              <MenuItem value={2}>Page 2</MenuItem>
              <MenuItem value={3}>Page 3</MenuItem>
            </Select>
            <FormHelperText>Select the page for Birthdate</FormHelperText>
          </FormControl>
        </Box>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: '20px' }}
        disabled={saveButtonDisabled}
      >
        Save Settings
      </Button>
      {saveButtonDisabled && (
        <FormHelperText style={{ color: 'red', marginTop: '10px' }}>
          {helperText}
        </FormHelperText>
      )}
    </div>
  );
};

export default AdminSettings;