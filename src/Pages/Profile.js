import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Avatar,
  Grid,
  Paper,
  Switch,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [notifications, setNotifications] = useState({
    liveStream: false,
    vodUpload: false,
    subscriptionUpdate: false,
    systemNotification: false,
  });
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [trainingPreferences, setTrainingPreferences] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState(""); // New field
  const [healthHistory, setHealthHistory] = useState(""); // New field

  const fileInputRef = useRef(null);

  // Fetch the profile data from the backend (Replace with actual API endpoint)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Retrieve user ID from local storage
        if (userId) {
          console.log("Fetching profile for user:", userId);
          const response = await axios.get(`http://localhost:3000/users/${userId}`);
          if (response.data) {
            setProfile(response.data);
            setPhotoPreview(response.data.profilePhoto);
            setTrainingPreferences(response.data.trainingPreferences || "");
            setDietaryPreferences(response.data.dietaryPreferences || ""); // New field
            setHealthHistory(response.data.healthHistory || ""); // New field
            setNotifications(response.data.notifications || notifications);
          }
        } else {
          console.error("No user ID found in localStorage.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []); // Removed darkMode dependency

  const handleSave = async () => {
    try {
      const updatedProfile = {
        ...profile,
        profilePhoto: selectedAvatar || photoPreview || profile.profilePhoto,
        trainingPreferences,
        dietaryPreferences, // New field
        healthHistory, // New field
        notifications,
      };
      await axios.put(`http://localhost:3000/users/${profile.id}`, updatedProfile); // Replace with your API URL
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (field, value) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleNotificationChange = (event) => {
    const { name, checked } = event.target;
    setNotifications((prevNotifications) => ({
      ...prevNotifications,
      [name]: checked,
    }));
  };

  if (!profile) {
    return (
      <Container>
        <Box mt={5} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  // Dummy avatars to choose from
  const dummyAvatars = [
    "https://img.freepik.com/free-photo/3d-rendering-boy-wearing-cap-with-letter-r_1142-40523.jpg?t=st=1734956949~exp=1734960549~hmac=72d113a9e6b062eb83a15e9e4d8ed5934156191440e5cfc922f9030b2f41ca48&w=740",
    "https://img.freepik.com/free-photo/3d-illustration-beautiful-businesswoman-glasses-standing-near-car_1057-44928.jpg?t=st=1734956872~exp=1734960472~hmac=5e421f21e6ada9ace7fffe5c23dd40335edd0dbecb042b1c4066781585fa2178&w=740",
    "https://img.freepik.com/free-photo/portrait-smiling-boy-hairdressing-salon_1142-48714.jpg?t=st=1734957008~exp=1734960608~hmac=df92aa3c45ba364084a1acec9b8e0e62fba722185b4443a2cd6a08011e420865&w=740",
    "https://img.freepik.com/free-vector/young-prince-royal-attire_1308-176144.jpg?t=st=1734957126~exp=1734960726~hmac=5de3fba54946b8e2d7645588697e6df8dbe01fa7907eeb7770d3d1dbcb0d1814&w=740"
  ];

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh", paddingBottom: 4 }}>
      <Box mt={5} display="flex" justifyContent="center">
        <Paper sx={{ padding: 3, width: "100%", maxWidth: "600px", borderRadius: "16px", boxShadow: 3 }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box
              sx={{
                position: "relative",
                mb: 2,
                borderRadius: "50%",
                border: "4px solid",
                borderColor: "#1976d2", // Removed darkMode reference
                cursor: "pointer",
                overflow: "hidden",
                width: 140,
                height: 140,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={handlePhotoClick}
            >
              <Avatar
                alt="Profile Photo"
                src={selectedAvatar || photoPreview || "https://via.placeholder.com/150"}
                sx={{
                  width: 140,
                  height: 140,
                  objectFit: "cover",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ display: "none" }}
                  ref={fileInputRef}
                />
              )}
            </Box>

            <Typography variant="h5" color="textPrimary" gutterBottom fontWeight="bold">
              {isEditing ? "Edit Profile" : "Your Profile"}
            </Typography>

            {isEditing && (
              <Box mb={3}>
                <Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
                  Choose Avatar:
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                  {dummyAvatars.map((avatar, index) => (
                    <Grid item key={index}>
                      <Avatar
                        src={avatar}
                        sx={{
                          width: 60,
                          height: 60,
                          cursor: "pointer",
                          border: selectedAvatar === avatar ? "4px solid #1976d2" : "none",
                        }}
                        onClick={() => handleAvatarSelect(avatar)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            <Grid container spacing={2} direction="column" alignItems="stretch">
              {/* Username */}
              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary" fontWeight="bold" textAlign="center">
                  Username:{" "}
                  {isEditing ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={profile.username}
                      onChange={(e) => handleChange("username", e.target.value)}
                    />
                  ) : (
                    profile.username
                  )}
                </Typography>
              </Grid>

              {/* Email */}
              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary" fontWeight="bold" textAlign="center">
                  Email:{" "}
                  {isEditing ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={profile.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  ) : (
                    profile.email
                  )}
                </Typography>
              </Grid>

              {/* Dietary Preferences */}
              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary" fontWeight="bold" textAlign="center">
                  Dietary Preferences:{" "}
                  {isEditing ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={dietaryPreferences}
                      onChange={(e) => setDietaryPreferences(e.target.value)}
                    />
                  ) : (
                    dietaryPreferences || "No preferences set"
                  )}
                </Typography>
              </Grid>

              {/* Health History */}
              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary" fontWeight="bold" textAlign="center">
                  Health History:{" "}
                  {isEditing ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={healthHistory}
                      onChange={(e) => setHealthHistory(e.target.value)}
                    />
                  ) : (
                    healthHistory || "No history"
                  )}
                </Typography>
              </Grid>

              {/* Notifications */}
              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary" fontWeight="bold" textAlign="center">
                  Notification Preferences:
                </Typography>
                {Object.keys(notifications).map((key) => (
                  <Grid item key={key} xs={12}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body1" color="textSecondary">
                        {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                      </Typography>
                      <Switch
                        checked={notifications[key]}
                        onChange={handleNotificationChange}
                        name={key}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Box mt={3} display="flex" justifyContent="center" gap={2}>
              {isEditing ? (
                <>
                  <Button variant="contained" color="primary" onClick={handleSave}>
                    Save
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant="contained" color="primary" onClick={() => setIsEditing(true)} startIcon={<EditIcon />}>
                  Edit Profile
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
