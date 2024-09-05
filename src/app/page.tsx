'use client';
import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import styles from "./page.module.css";
import { useProfile } from "@/context/ProfileProvider";
import PageTwo from "@/components/PageTwo";
import PageThree from "@/components/PageThree";
import { useAdmin } from "@/context/AdminProvider";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, isAuthenticated, isLoading, logout } = useProfile(); // Use the ProfileContext

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(email, password);
  };

  const handleLogout = () => {
    logout();
  };

  // Render a loading state while checking authentication
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Sign In / Sign Up
          </Button>
        </Box>
      ) : (
        <>
          {(user?.currentPage === 2 || user?.currentPage === 3)&& <PageTwo />}
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