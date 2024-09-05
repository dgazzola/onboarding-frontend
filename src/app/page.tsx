'use client';
import { useState } from "react";
import { TextField, Button, Container, Typography, Box, FormHelperText } from "@mui/material";
import styles from "./page.module.css";
import { useProfile } from "@/context/ProfileProvider";
import PageTwo from "@/components/PageTwo";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user, isAuthenticated, isLoading, logout } = useProfile();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    try {
      await login(email, password);
    } catch (err) {
      setError("Incorrect password for given email!");
    }
  };

  const handleLogout = () => {
    logout();
  };

  const isEmailValid = (email:string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isPasswordValid = (password:string) => {
    return password.trim() !== "";
  };

  const isFormValid = () => {
    return isEmailValid(email) && isPasswordValid(password);
  };

  if (isLoading) {
    return <Container maxWidth="xs" className={styles.page}><Typography>Loading...</Typography></Container>;
  }

  return (
    <Container maxWidth="xs" className={styles.page}>
      <Typography variant="h4" gutterBottom>
        Onboarding
      </Typography>
      {!isAuthenticated ? (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <FormHelperText error>{error}</FormHelperText>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!isFormValid()}
          >
            Sign In / Sign Up
          </Button>
        </Box>
      ) : (
        <>
          {(user?.currentPage === 2 || user?.currentPage === 3) && <PageTwo />}
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleLogout}
            sx={{ marginTop: 2 }}
          >
            Logout
          </Button>
        </>
      )}
    </Container>
  );
}