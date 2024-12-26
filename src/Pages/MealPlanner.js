import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import StarIcon from '@mui/icons-material/Star'; // Icon for Premium
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { useThemeContext } from '../Componets/Theme';

const recipes = {
  breakfast: [
    { name: 'Oatmeal', calories: 150, protein: 5 },
    { name: 'Scrambled Eggs', calories: 200, protein: 12 },
    { name: 'Smoothie', calories: 250, protein: 10 },
  ],
  lunch: [
    { name: 'Grilled Chicken Salad', calories: 350, protein: 30 },
    { name: 'Vegetable Stir Fry', calories: 300, protein: 8 },
    { name: 'Quinoa Bowl', calories: 400, protein: 15 },
  ],
  dinner: [
    { name: 'Baked Salmon', calories: 400, protein: 35 },
    { name: 'Pasta Primavera', calories: 500, protein: 15 },
    { name: 'Beef Tacos', calories: 450, protein: 25 },
  ],
};

const MealPlanner = () => {
  const [preferences, setPreferences] = useState('');
  const [mealPlan, setMealPlan] = useState(null);
  const { darkMode } = useThemeContext();
  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    if (preferences) {
      generateMealPlan();
    }
  }, [preferences]); // Re-run the function when preferences change

  const generateMealPlan = () => {
    const selectedPreferences = preferences.split(',').map(pref => pref.trim()).filter(Boolean);
    const plan = {};

    for (let day = 1; day <= 7; day++) {
      const dailyMeals = {
        breakfast: selectMeal('breakfast', selectedPreferences),
        lunch: selectMeal('lunch', selectedPreferences),
        dinner: selectMeal('dinner', selectedPreferences),
      };
      plan[`Day ${day}`] = dailyMeals; // Corrected the string interpolation for day
    }

    setMealPlan(plan);
  };

  const selectMeal = (mealType, preferences) => {
    const availableMeals = recipes[mealType].filter(meal => preferences.includes(meal.name));
    return availableMeals.length
      ? availableMeals[Math.floor(Math.random() * availableMeals.length)]
      : recipes[mealType][Math.floor(Math.random() * recipes[mealType].length)];
  };

  const calculateTotalCalories = (mealPlan) => {
    let totalCalories = 0;
    Object.values(mealPlan).forEach(day => {
      totalCalories += day.breakfast.calories + day.lunch.calories + day.dinner.calories;
    });
    return totalCalories;
  };

  const totalCalories = mealPlan ? calculateTotalCalories(mealPlan) : 0;

  return (
    <Container style={{ paddingTop: '30px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="16px">
        <Typography variant="h4" gutterBottom>
          Meal Planner
        </Typography>
        {/* On Click navigate to payment page */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<StarIcon />}
          style={{ padding: '8px 16px' }}
          onClick={() => navigate('/payment')} // Navigate to payment page
        >
          Premium
        </Button>
      </Box>

      <TextField
        label="Your Preferences (comma separated)"
        variant="outlined"
        fullWidth
        onChange={e => setPreferences(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={generateMealPlan}
        style={{ marginBottom: '20px' }}
      >
        Generate Meal Plan
      </Button>

      {mealPlan && (
        <>
          <Typography variant="h6" style={{ marginBottom: '20px', fontWeight: 'bold' }}>
            Total Calories for the Week: {totalCalories}
          </Typography>

          <Grid container spacing={3}>
            {Object.entries(mealPlan).map(([day, meals]) => (
              <Grid item xs={12} sm={6} md={4} key={day}>
                <Card
                  style={{
                    height: '100%',
                    backgroundColor: darkMode ? '#424242' : '#f9f9f9',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      style={{
                        fontWeight: 'bold',
                        color: darkMode ? '#bbdefb' : '#3f51b5',
                      }}
                    >
                      {day}
                    </Typography>

                    {/* Meals Section */}
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                      height="100%"
                    >
                      {/* Meal: Breakfast */}
                      <Box
                        display="flex"
                        alignItems="center"
                        style={{
                          marginBottom: '16px',
                          justifyContent: 'space-between', // Aligning meal and calories on the same line
                        }}
                      >
                        <Box display="flex" alignItems="center">
                          <BreakfastDiningIcon fontSize="small" style={{ marginRight: '8px', color: '#ff9800' }} />
                          <Typography
                            variant="body1"
                            style={{
                              color: darkMode ? '#ffffff' : '#000000',
                            }}
                          >
                            <strong>Breakfast:</strong> {meals.breakfast.name}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body1"
                          style={{
                            color: darkMode ? '#ffffff' : '#000000',
                          }}
                        >
                          {meals.breakfast.calories} Calories
                        </Typography>
                      </Box>

                      {/* Meal: Lunch */}
                      <Box
                        display="flex"
                        alignItems="center"
                        style={{
                          marginBottom: '16px',
                          justifyContent: 'space-between', // Aligning meal and calories on the same line
                        }}
                      >
                        <Box display="flex" alignItems="center">
                          <LunchDiningIcon fontSize="small" style={{ marginRight: '8px', color: '#4caf50' }} />
                          <Typography
                            variant="body1"
                            style={{
                              color: darkMode ? '#ffffff' : '#000000',
                            }}
                          >
                            <strong>Lunch:</strong> {meals.lunch.name}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body1"
                          style={{
                            color: darkMode ? '#ffffff' : '#000000',
                          }}
                        >
                          {meals.lunch.calories} Calories
                        </Typography>
                      </Box>

                      {/* Meal: Dinner */}
                      <Box
                        display="flex"
                        alignItems="center"
                        style={{
                          marginBottom: '16px',
                          justifyContent: 'space-between', // Aligning meal and calories on the same line
                        }}
                      >
                        <Box display="flex" alignItems="center">
                          <DinnerDiningIcon fontSize="small" style={{ marginRight: '8px', color: '#f44336' }} />
                          <Typography
                            variant="body1"
                            style={{
                              color: darkMode ? '#ffffff' : '#000000',
                            }}
                          >
                            <strong>Dinner:</strong> {meals.dinner.name}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body1"
                          style={{
                            color: darkMode ? '#ffffff' : '#000000',
                          }}
                        >
                          {meals.dinner.calories} Calories
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default MealPlanner;
