import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Switch, FormControlLabel, Container } from '@mui/material';
import { Alarm, EmojiFoodBeverage, Star, Campaign } from '@mui/icons-material';
import { useSpring, animated } from 'react-spring';

// Dummy data for nutrition notifications
const notificationsData = [
  {
    id: 1,
    type: 'mealReminder',
    message: 'Reminder: It’s time for your healthy lunch! Don’t forget to hydrate.',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'goalAchievement',
    message: 'Congratulations! You’ve met your dietary goal for the week.',
    time: '1 day ago',
  },
  {
    id: 3,
    type: 'newRecipe',
    message: 'New Recipe Alert: Try our delicious quinoa salad recipe!',
    time: '3 days ago',
  },
  {
    id: 4,
    type: 'promotion',
    message: 'Exclusive offer: Get 20% off on your next meal plan subscription. Use code MEAL20.',
    time: '5 days ago',
  },
];

const NotificationItem = ({ notification }) => {
  const animation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 100,
  });

  const iconMap = {
    mealReminder: <Alarm sx={{ fontSize: 40 }} />,
    goalAchievement: <Star sx={{ fontSize: 40 }} />,
    newRecipe: <EmojiFoodBeverage sx={{ fontSize: 40 }} />,
    promotion: <Campaign sx={{ fontSize: 40 }} />,
  };

  return (
    <animated.div style={animation}>
      <Paper sx={{ padding: 3, display: 'flex', alignItems: 'center', boxShadow: 3, height: '100%' }}>
        <Box sx={{ marginRight: 2 }}>{iconMap[notification.type]}</Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {notification.message}
          </Typography>
          <Typography variant="body2" color="text.secondary">{notification.time}</Typography>
        </Box>
      </Paper>
    </animated.div>
  );
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [preferences, setPreferences] = useState({
    mealReminder: true,
    goalAchievement: true,
    newRecipe: true,
    promotion: true,
  });

  const handleToggle = (event) => {
    const { name, checked } = event.target;
    setPreferences({ ...preferences, [name]: checked });
  };

  const filteredNotifications = notifications.filter(
    (notification) => preferences[notification.type]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = {
        id: notifications.length + 1,
        type: 'promotion',
        message: 'Special offer: Enjoy a free recipe book with your next subscription!',
        time: 'Just now',
      };
      setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
    }, 10000);

    return () => clearInterval(interval);
  }, [notifications]);

  return (
    <Container sx={{ paddingTop: 4 }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: 4, fontWeight: 'bold' }}>
         Notifications
      </Typography>

      {/* Preferences Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Notification Preferences
        </Typography>
        <FormControlLabel
          control={<Switch checked={preferences.mealReminder} onChange={handleToggle} name="mealReminder" color="primary" />}
          label="Meal Reminders"
        />
        <FormControlLabel
          control={<Switch checked={preferences.goalAchievement} onChange={handleToggle} name="goalAchievement" color="primary" />}
          label="Dietary Goal Achievements"
        />
        <FormControlLabel
          control={<Switch checked={preferences.newRecipe} onChange={handleToggle} name="newRecipe" color="primary" />}
          label="New Recipe Additions"
        />
        <FormControlLabel
          control={<Switch checked={preferences.promotion} onChange={handleToggle} name="promotion" color="primary" />}
          label="Promotional Offers"
        />
      </Box>

      {/* Notifications Section */}
      <Box>
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
          Recent Notifications
        </Typography>
        <Grid container spacing={2}>
          {filteredNotifications.map((notification) => (
            <Grid item xs={12} md={6} key={notification.id} sx={{ display: 'flex', alignItems: 'stretch' }}>
              <Box sx={{ flexGrow: 1 }}>
                <NotificationItem notification={notification} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default NotificationsPage;
