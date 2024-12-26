import React from "react";
import { Box, Typography, Button, Grid, Paper, Container, Card, CardContent } from "@mui/material"; 
import { Link } from "react-router-dom";
import { Kitchen, HealthAndSafety, AccessibilityNew, Restaurant } from "@mui/icons-material"; 

import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../Componets/Theme";

// Hero Section
const HeroSection = () => {
  const navigate = useNavigate();
  const { darkMode } = useThemeContext();  // Get darkMode state

  const handleExploreMealPlansClick = () => {
    navigate('/payment'); 
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: { xs: "53vh", sm: "80vh", md: "80vh" },
        backgroundImage:
          'url("https://img.freepik.com/premium-vector/healthy-foods-elderly-senior-couple-with-low-calories-foods-vegetables-healthy-aging-active-elderly-vector_251139-1098.jpg?w=740")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        width: "100%",
        padding: "20%",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          position: "absolute",
          top: { xs: "85%", sm: "80%", md: "66%" },
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: { xs: "8px 14px", sm: "12px 24px", md: "14px 26px" },
          fontSize: { xs: "14px", sm: "16px", md: "18px" },
          backgroundColor: darkMode ? "#1F6F92" : "#3498DB", // Adjusted for dark mode
          color: "white",
          borderRadius: "8px",
          textTransform: "none",
          boxShadow: 3,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: darkMode ? "#2980B9" : "#2980B9", // Darker shade for dark mode
            boxShadow: 6,
          },
        }}
        onClick={handleExploreMealPlansClick}
      >
        Get Started
      </Button>
    </Box>
  );
};

// Features Section
const FeaturesSection = () => {
  const navigate = useNavigate();
  const { darkMode } = useThemeContext();

  const exploreMealPlans = () => {
    navigate('/meal');
  };

  return (
    <Container sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: darkMode ? "white" : "black" }}>
        Key Features of Senior Nutrition Guides
      </Typography>
      <Grid container spacing={4}>
        {/* Meal Planning Feature */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ padding: 3, textAlign: "center", height: "100%", backgroundColor: darkMode ? "#444" : "#ECF0F1" }}>
            <Restaurant sx={{ fontSize: 60, color: "#2980B9" }} />
            <Typography variant="h6" sx={{ marginTop: 2, color: darkMode ? "#BDC3C7" : "#2980B9" }}>
              Meal Planning & Recipes
            </Typography>
            <Typography sx={{ color: darkMode ? "#BDC3C7" : "black" }}>
              Plan meals with nutrition goals in mind and access a comprehensive library of healthy recipes.
            </Typography>
          </Paper>
        </Grid>

        {/* Health Monitoring Feature */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ padding: 3, textAlign: "center", height: "100%", backgroundColor: darkMode ? "#444" : "#ECF0F1" }}>
            <HealthAndSafety sx={{ fontSize: 60, color: "#2980B9" }} />
            <Typography variant="h6" sx={{ marginTop: 2, color: darkMode ? "#BDC3C7" : "#2980B9" }}>
              Health Monitoring Tools
            </Typography>
            <Typography sx={{ color: darkMode ? "#BDC3C7" : "black" }}>
              Track key health metrics like weight, blood pressure, and glucose levels for better health management.
            </Typography>
          </Paper>
        </Grid>

        {/* Accessibility Feature */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ padding: 3, textAlign: "center", height: "100%", backgroundColor: darkMode ? "#444" : "#ECF0F1" }}>
            <AccessibilityNew sx={{ fontSize: 60, color: "#2980B9" }} />
            <Typography variant="h6" sx={{ marginTop: 2, color: darkMode ? "#BDC3C7" : "#2980B9" }}>
              Accessible & User-Friendly
            </Typography>
            <Typography sx={{ color: darkMode ? "#BDC3C7" : "black" }}>
              With large text options, high-contrast modes, and easy navigation, our app is designed for seniors.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Meal Planning Quotes Section */}
      <Typography variant="h5" align="center" sx={{ marginTop: 4, fontWeight: "bold", color: darkMode ? "#BDC3C7" : "#2980B9" }}>
        Meal Planning for a Healthier Future
      </Typography>
      <Grid container spacing={4} sx={{ marginTop: 3 }}>
        {/* Image Section */}
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src="https://img.freepik.com/free-photo/flat-lay-charts-organic-food-lunch-boxes_23-2148515964.jpg?t=st=1735190805~exp=1735194405~hmac=7720cf5b70b943b2ad4ef7c9f024fafef5e69a329be440b49e971bd83094f20b&w=740"
            alt="Meal Planning"
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              borderRadius: "10px",
            }}
          />
        </Grid>

        {/* Quotes Section */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="body1"
            sx={{
              color: darkMode ? "#BDC3C7" : "#666",
              fontSize: { xs: "1rem", sm: "1.2rem" },
              marginBottom: 2,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            "Meal planning ensures you're eating healthy, balanced meals every day. It’s about creating a
            sustainable routine that saves time, money, and supports your health goals."
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: darkMode ? "#BDC3C7" : "#666",
              fontSize: { xs: "1rem", sm: "1.2rem" },
              marginBottom: 2,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            "Planning your meals ahead of time can help you control portion sizes, make healthier choices,
            and reduce stress around mealtime."
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "20px",
                padding: "10px 30px",
                fontWeight: "bold",
                textTransform: "none",
                width: { xs: "50%", sm: "auto" },
                backgroundColor: darkMode ? "#2980B9" : "#3498DB", // Adapted for dark mode
              }}
              onClick={exploreMealPlans}
            >
              Explore Meal Plans
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

// How It Works Section
const HowItWorksSection = () => {
  const { darkMode } = useThemeContext();

  return (
    <Box
      sx={{
        padding: 4,
        textAlign: "center",
        backgroundColor: darkMode ? "#333" : "#f9f9f9",
        color: darkMode ? "white" : "black",
        marginTop: "50px",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 3, fontWeight: "bold", color: darkMode ? "#BDC3C7" : "#2980B9" }}>
        How It Works
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>
        Start your journey towards better nutrition and health with these simple steps:
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              boxShadow: 3,
              padding: 2,
              borderRadius: "8px",
              height: "100%",
              backgroundColor: darkMode ? "#444" : "#fff",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: "bold", color: "#2980B9" }}>
                Sign Up & Create Profile
              </Typography>
              <Typography sx={{ color: darkMode ? "#BDC3C7" : "black" }}>
                Register and personalize your profile with dietary preferences, health goals, and more.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              boxShadow: 3,
              padding: 2,
              borderRadius: "8px",
              height: "100%",
              backgroundColor: darkMode ? "#444" : "#fff",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: "bold", color: "#2980B9" }}>
                Personalized Meal Plans
              </Typography>
              <Typography sx={{ color: darkMode ? "#BDC3C7" : "black" }}>
                Receive tailored meal plans based on your preferences, calorie needs, and health goals.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              boxShadow: 3,
              padding: 2,
              borderRadius: "8px",
              height: "100%",
              backgroundColor: darkMode ? "#444" : "#fff",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: "bold", color: "#2980B9" }}>
                Track & Improve Health
              </Typography>
              <Typography sx={{ color: darkMode ? "#BDC3C7" : "black" }}>
                Monitor your health metrics and adjust your meal plans as you progress toward your goals.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const { darkMode } = useThemeContext();

  return (
    <Box
      sx={{
        padding: 4,
        textAlign: "center",
        backgroundColor: darkMode ? "#333" : "#f9f9f9",
        color: darkMode ? "white" : "black",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 3, fontWeight: "bold", color: "#2980B9" }}>
        What Our Users Are Saying
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              boxShadow: 3,
              padding: 2,
              borderRadius: "8px",
              height: "100%",
              backgroundColor: darkMode ? "#444" : "#fff",
            }}
          >
            <CardContent>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                "I finally feel in control of my health and diet. This app makes meal planning easy!"
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                - Linda Thompson
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              boxShadow: 3,
              padding: 2,
              borderRadius: "8px",
              height: "100%",
              backgroundColor: darkMode ? "#444" : "#fff",
            }}
          >
            <CardContent>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                "The health tracking features are fantastic. It's easy to monitor my progress daily."
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                - John Williams
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              boxShadow: 3,
              padding: 2,
              borderRadius: "8px",
              height: "100%",
              backgroundColor: darkMode ? "#444" : "#fff",
            }}
          >
            <CardContent>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                "The recipes are easy to follow, and they fit my dietary restrictions perfectly."
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                - Sarah Green
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

// Help & Support Section
const HelpSupportSection = () => {
  return (
    <Box sx={{ padding: 4, textAlign: "center" }}>
      <Typography variant="h5" sx={{ marginBottom: 3, fontWeight: "bold", color: "#2980B9" }}>
        Need Help?
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>
        Have questions? Visit our Help & Support page for assistance with app features and health tracking.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        component={Link}
        to="/help"
        sx={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#3498DB", // Updated for consistency
          color: "white",
          borderRadius: "8px",
        }}
      >
        Visit Help & Support
      </Button>
    </Box>
  );
};

// Main HomePage Component
const HomePage = () => {
  return (
    <Box sx={{ marginTop: "8px" }}>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <HelpSupportSection />
    </Box>
  );
};

export default HomePage;
