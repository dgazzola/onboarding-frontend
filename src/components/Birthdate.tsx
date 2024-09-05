import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import moment, { Moment } from 'moment';
import { useProfile } from '@/context/ProfileProvider';

const Birthdate = () => {
  const { user, setUser } = useProfile();
  const [value, setValue] = useState<Moment | null>(user?.birthdate ? moment(user.birthdate) : null);

  const handleDateChange = (newValue: Moment | null) => {
    setValue(newValue);

    if (newValue) {
      const formattedDate = newValue.format('YYYY-MM-DD');
      setUser(prevUser => {
        if (prevUser) {
          const updatedUser = { ...prevUser, birthdate: formattedDate };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          return updatedUser;
        }
        return prevUser;
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
        />
      </LocalizationProvider>
    </>
  );
};

export default Birthdate;
