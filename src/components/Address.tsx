import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import { useProfile } from '@/context/ProfileProvider';

const Address = () => {
  const { user, setUser } = useProfile();
  const [address, setAddress] = useState({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zip: user?.address?.zip || '',
  });

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddress(prevAddress => {
      const updatedAddress = { ...prevAddress, [name]: value };
      // Update user in context
      setUser(prevUser => {
        const updatedUser = { ...prevUser, address: updatedAddress };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
      });
      return updatedAddress;
    });
  };
  // const handleClick = () => {console.log('user:', user)}

  return (
    <Box>
      <h1>Address</h1>
      <TextField
        label="Street Address"
        variant="outlined"
        fullWidth
        margin="normal"
        name="street"
        value={address.street}
        onChange={handleAddressChange}
      />
      <TextField
        label="City"
        variant="outlined"
        fullWidth
        margin="normal"
        name="city"
        value={address.city}
        onChange={handleAddressChange}
      />
      <TextField
        label="State"
        variant="outlined"
        fullWidth
        margin="normal"
        name="state"
        value={address.state}
        onChange={handleAddressChange}
      />
      <TextField
        label="Zip Code"
        variant="outlined"
        fullWidth
        margin="normal"
        name="zip"
        value={address.zip}
        onChange={handleAddressChange}
      />
      {/* <Button
        variant="contained"
        color="primary"
        onClick={handleClick}></Button> */}
    </Box>
  );
};

export default Address;