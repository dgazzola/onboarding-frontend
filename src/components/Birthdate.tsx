import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import moment, { Moment } from 'moment';  // Import moment
import { useProfile } from '@/context/ProfileProvider';

const Birthdate = () => {
  const { user, setUser } = useProfile();
  const [value, setValue] = useState<Moment | null>(user?.birthdate ? moment(user.birthdate) : null);

  const handleDateChange = (newValue: Moment | null) => {
    setValue(newValue);

    if (newValue) {
      const formattedDate = newValue.format('YYYY-MM-DD'); // Format as needed
      console.log('Selected Date:', formattedDate);

      // Directly update birthdate in the user object
      setUser(prevUser => {
        const updatedUser = { ...prevUser, birthdate: formattedDate };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
      });
    } else {
      console.log('No date selected');
    }
  };

  return (
    <>
      <h1>Birthdate</h1>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          value={value}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );
};

export default Birthdate;