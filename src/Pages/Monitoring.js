import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from '@mui/material';

const HealthMonitoring = () => {
  const [weight, setWeight] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [bloodGlucose, setBloodGlucose] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = () => {
    if (weight && bloodPressure && bloodGlucose && activityLevel) {
      setSnackbarMessage('Health metrics submitted successfully!');
      setSnackbarOpen(true);
      // Reset fields
      setWeight('');
      setBloodPressure('');
      setBloodGlucose('');
      setActivityLevel('');
    } else {
      setSnackbarMessage('Please fill all fields.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: 3,
        backgroundColor: 'background.default',
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Track Your Health Metrics
          </Typography>
          <TextField
            label="Weight (kg)"
            variant="outlined"
            fullWidth
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Blood Pressure (mmHg)"
            variant="outlined"
            fullWidth
            value={bloodPressure}
            onChange={(e) => setBloodPressure(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Blood Glucose (mg/dL)"
            variant="outlined"
            fullWidth
            value={bloodGlucose}
            onChange={(e) => setBloodGlucose(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Activity Level (minutes)"
            variant="outlined"
            fullWidth
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: 'primary.main',
              color: 'common.white',
              '&:hover': { backgroundColor: 'primary.dark' },
              width: '100%',
            }}
          >
            Submit
          </Button>
        </CardContent>
      </Card>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HealthMonitoring;
