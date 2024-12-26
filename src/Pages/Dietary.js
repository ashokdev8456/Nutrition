import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Snackbar,
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DietaryTracker = () => {
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbohydrates, setCarbohydrates] = useState(0);
  const [fats, setFats] = useState(0);
  const [vitamins, setVitamins] = useState("");
  const [minerals, setMinerals] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSave = () => {
    if (isNaN(calories) || isNaN(protein) || isNaN(carbohydrates) || isNaN(fats)) {
      // If any numerical value is invalid, show an error message
      alert("Please enter valid numerical values for Calories, Protein, Carbohydrates, and Fats.");
      return;
    }

    // Logic to save dietary data, e.g., send to API
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: 3, borderRadius: '8px', backgroundColor: 'background.default' }}>
      <Typography variant="h4" gutterBottom>
        Dietary Tracker
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ boxShadow: 3, padding: 2, backgroundColor: 'background.paper' }}>
            <CardContent>
              <Typography variant="h5" sx={{ marginBottom: 2 }}>Daily Intake</Typography>
              <TextField
                label="Calories"
                type="number"
                fullWidth
                margin="normal"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
              />
              <TextField
                label="Proteins (g)"
                type="number"
                fullWidth
                margin="normal"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
              />
              <TextField
                label="Carbohydrates (g)"
                type="number"
                fullWidth
                margin="normal"
                value={carbohydrates}
                onChange={(e) => setCarbohydrates(e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
              />
              <TextField
                label="Fats (g)"
                type="number"
                fullWidth
                margin="normal"
                value={fats}
                onChange={(e) => setFats(e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
              />
              <TextField
                label="Vitamins"
                fullWidth
                margin="normal"
                value={vitamins}
                onChange={(e) => setVitamins(e.target.value)}
              />
              <TextField
                label="Minerals"
                fullWidth
                margin="normal"
                value={minerals}
                onChange={(e) => setMinerals(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{ marginTop: 2 }}
              >
                Save
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card sx={{ boxShadow: 3, padding: 2, backgroundColor: 'background.paper' }}>
            <CardContent>
              <Typography variant="h5" sx={{ marginBottom: 2 }}>Nutritional Summary</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Calories: <span style={{ fontWeight: 'normal' }}>{calories}</span></Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Protein: <span style={{ fontWeight: 'normal' }}>{protein} g</span></Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Carbohydrates: <span style={{ fontWeight: 'normal' }}>{carbohydrates} g</span></Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Fats: <span style={{ fontWeight: 'normal' }}>{fats} g</span></Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Vitamins: <span style={{ fontWeight: 'normal' }}>{vitamins}</span></Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Minerals: <span style={{ fontWeight: 'normal' }}>{minerals}</span></Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Dietary data saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DietaryTracker;
