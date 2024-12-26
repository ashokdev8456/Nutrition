import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box, Link, InputAdornment, IconButton, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useThemeContext } from "./Theme";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signin = ({ projectColor }) => {
  const { darkMode } = useThemeContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleSignin = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!email || !password) {
      setErrorMessage("Please enter both email and password");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/users", { email, password }); // Correct endpoint


      console.log(response);
      

      if (response.data ) {
        localStorage.setItem("userId", response.data.id);
        console.log(response.data.id);
        
        navigate("/"); // Redirect to home page after successful login
      } else {
        setErrorMessage(response.data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Error signing in:", error.response || error.message);
      setErrorMessage(error.response?.data?.message || "Error signing in. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Container maxWidth="xs" sx={{ height: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "110vh",
          background: projectColor || (darkMode
            ? "linear-gradient(to top, #1f1f1f 0%, #2c2c2c 100%)"
            : "linear-gradient(to top, #e0f7fa 0%, #ffffff 100%)"),
          opacity: 0.9,
          zIndex: -1,
        }}
      />

      <Box
        mt={5}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundColor: darkMode ? "#1e1e1e" : "#fff",
          borderRadius: 2,
          padding: 3,
          boxShadow: darkMode ? "0px 0px 10px rgba(255, 255, 255, 0.1)" : "0px 0px 10px rgba(0, 0, 0, 0.1)",
          opacity: 0.9,
        }}
      >
        <Typography variant="h4" color={darkMode ? "primary" : "black"} gutterBottom>
          Sign In
        </Typography>

        {errorMessage && <Typography color="error" variant="body2" sx={{ mb: 2 }}>{errorMessage}</Typography>}
        
        <form onSubmit={handleSignin} style={{ width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            sx={{
              backgroundColor: darkMode ? "#333" : "#f5f5f5",
              borderRadius: 1,
              height: "45px",
              "& .MuiInputBase-input": { color: darkMode ? "#fff" : "#000" },
              "& .MuiInputLabel-root": { color: darkMode ? "#fff" : "#000" },
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            sx={{
              backgroundColor: darkMode ? "#333" : "#f5f5f5",
              borderRadius: 1,
              height: "45px",
              "& .MuiInputBase-input": { color: darkMode ? "#fff" : "#000" },
              "& .MuiInputLabel-root": { color: darkMode ? "#fff" : "#000" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
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
              borderRadius: 2,
              padding: "10px",
              color: "white",
              "&:hover": { backgroundColor: darkMode ? "#FF4081" : "#64b5f6" },
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
          </Button>
        </form>

        <Box mt={2}>
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate("/signup")}
            sx={{ color: darkMode ? "#ffffff" : "black" }}
          >
            Don't have an account? Sign Up
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Signin;
