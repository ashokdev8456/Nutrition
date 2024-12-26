import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  CircularProgress, 
  CardActions, 
  Container, 
  IconButton, 
  Paper, 
  useTheme 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import { AccessTime, People, Business } from '@mui/icons-material';

const PaymentIntegrationPage = () => {
  const theme = useTheme();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [subscriptionPlan, setSubscriptionPlan] = useState('');
  const [amount, setAmount] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentError, setPaymentError] = useState(false);

  // Subscription plans with descriptions and prices
  const plans = [
    {
      name: 'Basic',
      description: 'Access to basic features and limited support.',
      price: 10,
    },
    {
      name: 'Premium',
      description: 'Access to all features, priority support, and advanced training.',
      price: 25,
    },
    {
      name: 'Enterprise',
      description: 'Full access, customized features, dedicated support, and more.',
      price: 50,
    }
  ];

  // Handle selection of subscription plan
  const handleSubscriptionPlanChange = (plan) => {
    setSubscriptionPlan(plan.name);
    setAmount(plan.price);
    setShowPaymentForm(true); // Show payment form after selecting plan
  };

  // Handle payment processing (Simulate payment success or failure)
  const handlePayment = async () => {
    setIsLoading(true);
    setPaymentError(false);
    setTimeout(() => {
      const paymentSuccess = Math.random() > 0.2; // Simulate success or failure
      if (paymentSuccess) {
        setIsLoading(false);
        alert('Your payment is completed');
        setIsSubscribed(true);
        setShowPaymentForm(false);
      } else {
        setIsLoading(false);
        setPaymentError(true);
      }
    }, 2000);
  };

  // Handle closing the payment section
  const handleClosePaymentSection = () => {
    setShowPaymentForm(false);
    setPaymentError(false);
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      {/* Why Choose Membership Section */}
      <Paper sx={{ padding: 4, marginBottom: 4, width: '100%', boxShadow: 3, backgroundColor: theme.palette.background.paper }}>
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 3, fontWeight: 'bold' }}>
          Why Choose Membership?
        </Typography>
        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AccessTime sx={{ fontSize: 50, color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 2, textAlign: 'center' }}>
              Trusted Advice & Guidance
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 1 }}>
              Get up-to-date guidance and support from industry experts to ensure safety and compliance in your business.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <People sx={{ fontSize: 50, color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 2, textAlign: 'center' }}>
              Network with Industry Leaders
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 1 }}>
              Expand your network by connecting with key figures in the industry and collaborating for growth.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Business sx={{ fontSize: 50, color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 2, textAlign: 'center' }}>
              Access to Up-to-date Information
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 1 }}>
              Stay informed with the latest trends, regulations, and best practices to enhance your business.
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Subscription Plan Cards */}
      {!isSubscribed && !showPaymentForm && (
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          {plans.map((plan) => (
            <Grid item xs={12} sm={4} key={plan.name}>
              <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {plan.name} Plan
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2, textAlign: 'center' }}>
                    {plan.description}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ textAlign: 'center' }}>
                    ${plan.price}/month
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark }, width: '100%' }}
                    onClick={() => handleSubscriptionPlanChange(plan)}
                  >
                    Subscribe
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Payment Form */}
      {showPaymentForm && (
        <Card sx={{ maxWidth: 800, margin: 'auto', boxShadow: 3, borderRadius: 2, backgroundColor: theme.palette.background.paper }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ textAlign: 'center', flexGrow: 1 }}>
                Payment Details
              </Typography>
              <IconButton onClick={handleClosePaymentSection} color="error">
                <CloseIcon />
              </IconButton>
            </Box>

            {paymentError && (
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'red', marginTop: 2 }}>
                <ErrorIcon sx={{ marginRight: 1 }} />
                <Typography variant="body1">Payment failed. Please try again.</Typography>
              </Box>
            )}

            <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 2 }}>
              You have selected the {subscriptionPlan} Plan - ${amount}/month
            </Typography>

            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Cardholder Name"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Card Number"
                  variant="outlined"
                  fullWidth
                  required
                  inputProps={{ maxLength: 16 }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Expiry Date (MM/YY)"
                  variant="outlined"
                  fullWidth
                  required
                  inputProps={{ maxLength: 5 }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="CVV"
                  variant="outlined"
                  fullWidth
                  required
                  inputProps={{ maxLength: 3 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  type="email"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  required
                  inputProps={{ maxLength: 15 }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={handlePayment}
                  disabled={isLoading}
                  fullWidth
                  sx={{ backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark } }}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Make Payment'}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Display 'Subscribed' Button after Payment */}
      {isSubscribed && !isLoading && (
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              disabled
              fullWidth
              sx={{
                backgroundColor: 'green',
                '&:hover': { backgroundColor: 'darkgreen' }
              }}
            >
              Subscribed
            </Button>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default PaymentIntegrationPage;
