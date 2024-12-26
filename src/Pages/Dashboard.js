import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  useTheme,
  Paper,
} from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from "recharts";
import { CheckCircle, Fastfood, LocalDining, Star, Today, AccessTime, CalendarToday, SportsMotorsports } from "@mui/icons-material";

// Sample data for charts
const mealData = [
  { name: "Meals Planned", value: 5 },
  { name: "Meals Remaining", value: 2 },
];

const goalData = [
  { name: "Goal 1", progress: 75 },
  { name: "Goal 2", progress: 50 },
  { name: "Goal 3", progress: 90 },
];

const Dashboard = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading
    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

  // Define colors based on theme mode 
  const cardBackgroundColor = theme.palette.mode === "dark" ? "#1C2A38" : "#F5F5F5"; // Dark card background for dark mode, light gray for light mode
  const cardTextColor = theme.palette.mode === "dark" ? "#E0E0E0" : "#333333"; // Light text for dark mode
  const circularProgressColor = theme.palette.mode === "dark" ? "#4CAF50" : "#009688"; // Green/Teal for dark and light modes
  const chartColors = theme.palette.mode === "dark"
    ? [ "#4CAF50", "#00BCD4"]  // Purple and Teal for dark mode
    : ["#9C27B0", "#2A3D52"];  // Purple and Teal for light mode
  const barChartColor = theme.palette.mode === "dark" ? "#4CAF50" : "#009688"; // Green for dietary goals
  const backgroundColor = theme.palette.mode === "dark" ? "#2A3D52" : "#FFFFFF"; // Background color based on mode

  // Helper function for render labels on Pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 10;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill={chartColors[index % chartColors.length]} textAnchor="middle" dominantBaseline="central">
        {`${value}`}
      </text>
    );
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: backgroundColor }}>
      <Typography variant="h4" sx={{ marginBottom: 3, color: cardTextColor }}>
        Nutrition Dashboard
      </Typography>

      {/* Grid Layout for Cards */}
      <Grid container spacing={3}>
        {["Meals Planned", "Dietary Goals", "New Recipes", "Promotional Offers"].map((title, index) => (
          <Grid item xs={12} sm={6} md={3} key={title}>
            <Card
              sx={{
                backgroundColor: cardBackgroundColor,
                display: 'flex',
                flexDirection: 'column',
                height: '100%' // Ensures all cards have the same height
              }}
            >
              <CardHeader
                title={title}
                avatar={index === 0 ? <Fastfood sx={{ fontSize: 40 }} /> : index === 1 ? <CheckCircle sx={{ fontSize: 40 }} /> : index === 2 ? <LocalDining sx={{ fontSize: 40 }} /> : <Star sx={{ fontSize: 40 }} />}
                titleTypographyProps={{ variant: "h6", color: cardTextColor }}
              />
              <CardContent sx={{ flexGrow: 1, color: cardTextColor }}>
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress sx={{ color: circularProgressColor }} />
                  </Box>
                ) : (
                  <Typography variant="h4" sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000080" }}>
                    {index === 0 ? "5/7" : index === 1 ? "2 Achieved" : index === 2 ? "3 New" : "5 Offers"}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Additional Card - Upcoming Tasks */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: cardBackgroundColor, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardHeader
              title="Upcoming Tasks"
              avatar={<Today sx={{ fontSize: 40 }} />}
              titleTypographyProps={{ variant: "h6", color: cardTextColor }}
            />
            <CardContent sx={{ flexGrow: 1, color: cardTextColor }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <CircularProgress sx={{ color: circularProgressColor }} />
                </Box>
              ) : (
                <Typography variant="h4" sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000080" }}>
                  3 Tasks Pending
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Additional Card - Time Management */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: cardBackgroundColor, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardHeader
              title="Time Management"
              avatar={<AccessTime sx={{ fontSize: 40 }} />}
              titleTypographyProps={{ variant: "h6", color: cardTextColor }}
            />
            <CardContent sx={{ flexGrow: 1, color: cardTextColor }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <CircularProgress sx={{ color: circularProgressColor }} />
                </Box>
              ) : (
                <Typography variant="h4" sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000080" }}>
                  1 Hour Left
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Additional Card - Calendar */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: cardBackgroundColor, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardHeader
              title="Calendar"
              avatar={<CalendarToday sx={{ fontSize: 40 }} />}
              titleTypographyProps={{ variant: "h6", color: cardTextColor }}
            />
            <CardContent sx={{ flexGrow: 1, color: cardTextColor }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <CircularProgress sx={{ color: circularProgressColor }} />
                </Box>
              ) : (
                <Typography variant="h4" sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000080" }}>
                  12 Events Today
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Additional Card - Sports */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: cardBackgroundColor, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardHeader
              title="Sports"
              avatar={<SportsMotorsports sx={{ fontSize: 40 }} />}
              titleTypographyProps={{ variant: "h6", color: cardTextColor }}
            />
            <CardContent sx={{ flexGrow: 1, color: cardTextColor }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <CircularProgress sx={{ color: circularProgressColor }} />
                </Box>
              ) : (
                <Typography variant="h4" sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000080" }}>
                  4 Games Today
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ marginTop: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, backgroundColor: backgroundColor }}>
            <Typography variant="h6" sx={{ marginBottom: 2, color: cardTextColor }}>
              Meals Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={mealData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={renderCustomizedLabel}>
                  {mealData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, backgroundColor: backgroundColor }}>
            <Typography variant="h6" sx={{ marginBottom: 2, color: cardTextColor }}>
              Dietary Goals Progress
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={goalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="progress" fill={barChartColor}>
                  <LabelList dataKey="progress" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
