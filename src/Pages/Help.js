import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { Email, Phone } from "@mui/icons-material";

const HelpAndSupport = () => {
  const [feedback, setFeedback] = useState(""); // State to handle feedback
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar visibility for feedback confirmation

  // Handle feedback submission
  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      // Here, you could integrate with an API to send feedback
      setFeedback(""); // Clear the feedback field
      setOpenSnackbar(true); // Show feedback submission confirmation
    } else {
      alert("Please enter some feedback before submitting.");
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Help and Support
      </Typography>

      {/* Tutorials Section */}
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6">Tutorials</Typography>
        <Typography paragraph>
          Watch our step-by-step tutorial videos to learn how to use the app
          effectively. We cover everything from getting started to using advanced
          features. You can find the tutorials embedded below or visit our training page for more.
        </Typography>
        {/* Optionally, embed tutorial videos or links directly here */}
        <Button variant="outlined" color="primary" href="https://www.example.com/tutorials" target="_blank">
          View Tutorials
        </Button>
      </Paper>

      {/* FAQs Section */}
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6">FAQs</Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="How can I track my progress?"
              secondary="You can track your progress through the progress section on the dashboard."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="How do I earn a certificate?"
              secondary="You will earn a certificate upon completing the relevant training modules."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="How do I change my account details?"
              secondary="You can change your account details in the 'Account Settings' section of your profile."
            />
          </ListItem>
        </List>
        <Button variant="outlined" color="primary" href="/training">
          View All FAQs
        </Button>
      </Paper>

      {/* Contact Support Section */}
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6">Contact Support</Typography>
        <Typography paragraph>
          If you encounter any issues, feel free to reach out to our support team. We're here to help.
        </Typography>
        <Typography paragraph>
          <Email sx={{ marginRight: 1 }} /> support@drivertraining.com
        </Typography>
        <Typography paragraph>
          <Phone sx={{ marginRight: 1 }} /> +1 800-123-4567
        </Typography>
      </Paper>

      {/* Feedback Section */}
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6">Submit Feedback</Typography>
        <Typography paragraph>
          We value your feedback! Let us know how we can improve the app or report any issues you're facing.
        </Typography>
        <TextField
          label="Your Feedback"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: 2 }}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)} // Update feedback state
        />
        <Button variant="contained" color="primary" onClick={handleFeedbackSubmit}>
          Submit Feedback
        </Button>
      </Paper>

      {/* Snackbar for feedback submission confirmation */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Thank you for your feedback!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HelpAndSupport;
