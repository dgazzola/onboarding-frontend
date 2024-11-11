'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { User } from '@/types';

const DataComponent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Environment variable NEXT_PUBLIC_BASE_API:', process.env.NEXT_PUBLIC_BASE_API);
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API}/user`);
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography variant="h6" ml={2}>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} style={{ margin: '20px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Current Page</TableCell>
            <TableCell>About Me</TableCell>
            <TableCell>Birthdate</TableCell>
            <TableCell>Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.email}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.currentPage}</TableCell>
              <TableCell>{user.aboutMe || 'Not provided'}</TableCell>
              <TableCell>{user.birthdate || 'Not provided'}</TableCell>
              <TableCell>
                {user.address
                  ? `${user.address.street || 'N/A'}, ${user.address.city || 'N/A'}, ${user.address.state || 'N/A'}, ${user.address.zip || 'N/A'}`
                  : 'Not provided'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataComponent;