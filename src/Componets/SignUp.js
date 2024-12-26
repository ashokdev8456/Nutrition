import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useThemeContext } from "./Theme";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Signup = () => {
  const { darkMode } = useThemeContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [trainingPreference, setTrainingPreference] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    // Check password length
    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters long.");
      return;
    }

    // Check for password complexity (add more complex conditions if needed)
    const passwordComplexity = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordComplexity.test(password)) {
      setErrorMessage("Password must contain at least one uppercase letter, one number, and one special character.");
      return;
    }

    const newUser = {
      username,
      email,
      contactInfo,
      password,
      trainingPreference,
    };

    setLoading(true); // Start loading

    try {
      const response = await axios.post("http://localhost:3000/users", newUser); // Correct the endpoint to '/signup'
      if (response.status === 201) {
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setErrorMessage(error.response?.data?.message || "Error creating account. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      background: darkMode
        ? "linear-gradient(to top, #1f1f1f 0%, #2c2c2c 100%)"
        : "linear-gradient(to top, #e0f7fa 0%, #ffffff 100%)",
      paddingTop: "64px", // Adjust padding for top navbar height
    }}>
      <Container maxWidth="xs" sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: darkMode ? "#1e1e1e" : "#fff",
        borderRadius: 2,
        padding: 3,
        boxShadow: darkMode ? "0px 0px 10px rgba(255, 255, 255, 0.1)" : "0px 0px 10px rgba(0, 0, 0, 0.1)",
        opacity: 0.9,
        marginBottom: 4,
      }}>
        <Typography variant="h4" color={darkMode ? "primary" : "black"} gutterBottom>
          Sign Up
        </Typography>
        {errorMessage && <Typography color="error" variant="body2" sx={{ mb: 2 }}>{errorMessage}</Typography>}
        <form onSubmit={handleSignup} style={{ width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            sx={{ backgroundColor: darkMode ? "#333" : "#f5f5f5", borderRadius: 1 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            sx={{ backgroundColor: darkMode ? "#333" : "#f5f5f5", borderRadius: 1 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Contact Info (Phone Number)"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            variant="outlined"
            sx={{ backgroundColor: darkMode ? "#333" : "#f5f5f5", borderRadius: 1 }}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Training Preference</InputLabel>
            <Select
              value={trainingPreference}
              onChange={(e) => setTrainingPreference(e.target.value)}
              label="Training Preference"
              variant="outlined"
              sx={{ backgroundColor: darkMode ? "#333" : "#f5f5f5", borderRadius: 1 }}
            >
              <MenuItem value="Online">Online</MenuItem>
              <MenuItem value="In-Person">In-Person</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            sx={{ backgroundColor: darkMode ? "#333" : "#f5f5f5", borderRadius: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
            sx={{ backgroundColor: darkMode ? "#333" : "#f5f5f5", borderRadius: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: darkMode ? "#000080" : "#1976d2",
              color: "white",
              "&:hover": { backgroundColor: darkMode ? "#FF4081" : "#64b5f6" },
            }}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
        <Box mt={2}>
          <Link href="/signin" variant="body2" sx={{ color: darkMode ? "#ffffff" : "black" }}>
            Already have an account? Sign In
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
