import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Rating,
} from "@mui/material";

const recipeData = [
  {
    id: 1,
    title: "Grilled Chicken with Quinoa",
    category: "High Protein",
    prepTime: "30 minutes",
    calories: 400,
    image: "https://img.freepik.com/free-photo/grilled-chicken-breast-plate_1220-7412.jpg?t=st=1735192608~exp=1735196208~hmac=e021f5aaeca0c73c825c280cbe42f96f17ab104d7bcf1f243efede3c561744a8&w=740",
    instructions: "Grill chicken breast and serve with cooked quinoa and steamed broccoli.",
    video: "https://www.youtube.com/embed/xyz", // Add video URL here
  },
  {
    id: 2,
    title: "Zucchini Noodles with Pesto",
    category: "Low Carb",
    prepTime: "15 minutes",
    calories: 250,
    image: "https://img.freepik.com/free-photo/high-view-healthy-green-salad-crushed-seeds-jars_23-2148440329.jpg?t=st=1735192685~exp=1735196285~hmac=75d08f92f6a91712555fd2d56ef42fb4d4dc201203acf0a9d27ba32b0e7a110c&w=1800",
    instructions: "Spiralize zucchini, sauté briefly, and toss with basil pesto for a quick low-carb meal.",
    video: "https://www.youtube.com/embed/xyz", // Add video URL here
  },
  {
    id: 3,
    title: "Baked Salmon with Asparagus",
    category: "Low Calorie",
    prepTime: "25 minutes",
    calories: 350,
    image: "https://img.freepik.com/free-photo/baked-salmon-garnished-with-asparagus-tomatoes-with-herbs_2829-14476.jpg?t=st=1735192729~exp=1735196329~hmac=165a5908fd80fd2cc0e29b8031be8586a216b5a874dd004cd725c389ca0eb779&w=826",
    instructions: "Bake salmon with asparagus, olive oil, and lemon for a healthy and tasty meal.",
    video: "https://www.youtube.com/embed/xyz", // Add video URL here
  },
  {
    id: 4,
    title: "Quinoa Salad with Chickpeas",
    category: "High Fiber",
    prepTime: "20 minutes",
    calories: 300,
    image: "https://img.freepik.com/free-photo/top-view-salad-with-chickpeas-carrots-copy-space_23-2148700441.jpg?t=st=1735192771~exp=1735196371~hmac=7dfe39256ab8bf2e366b67119804d140de7ba8f248408bb94403fe0a68d557f2&w=900",
    instructions: "Combine cooked quinoa, chickpeas, diced cucumber, and a lemon dressing.",
    video: "https://www.youtube.com/embed/xyz", // Add video URL here
  },
  {
    id: 5,
    title: "Spinach and Feta Stuffed Peppers",
    category: "Vegan",
    prepTime: "30 minutes",
    calories: 280,
    image: "https://img.freepik.com/free-photo/top-view-baked-bell-peppers-delicious-meal-with-meat-inside-greens-dark-background-meal-dinner-dish-food-bake_140725-115869.jpg?t=st=1735192819~exp=1735196419~hmac=786f812f4caef5ec1f21f507b464662810140a6500bc4465dbb8f4d4e9c7d70e&w=740",
    instructions: "Stuff bell peppers with spinach, feta, and quinoa, then bake until golden.",
    video: "https://www.youtube.com/embed/xyz", // Add video URL here
  },
  {
    id: 6,
    title: "Chickpea and Avocado Salad",
    category: "High Fiber",
    prepTime: "15 minutes",
    calories: 350,
    image: "https://img.freepik.com/free-photo/high-angle-salad-with-chickpeas-salt-pepper-shakers_23-2148700446.jpg?t=st=1735192876~exp=1735196476~hmac=cc04c1575ee23270006f3d03818e28de42b38fd67f5c8e25b689dd3e2ed89ae3&w=360",
    instructions: "Mix canned chickpeas, diced avocado, tomatoes, and lime dressing for a fresh salad.",
    video: "https://www.youtube.com/embed/xyz", // Add video URL here
  },
  {
    id: 7,
    title: "Sweet Potato and Black Bean Tacos",
    category: "Vegetarian",
    prepTime: "25 minutes",
    calories: 400,
    image: "https://img.freepik.com/free-photo/delicious-tacos-arrangement-top-view_23-2148629322.jpg?t=st=1735192934~exp=1735196534~hmac=38faa1b761177a465db64ac3ac72c598756da8300a433d0bbca14a6758d6a0fd&w=740",
    instructions: "Fill corn tortillas with roasted sweet potatoes, black beans, and salsa.",
    video: "https://www.youtube.com/embed/xyz", // Add video URL here
  },
  {
    id: 8,
    title: "Greek Yogurt Parfait with Berries",
    category: "Breakfast",
    prepTime: "5 minutes",
    calories: 250,
    image: "https://img.freepik.com/free-photo/yogurt-with-mixed-berries_1339-4228.jpg?t=st=1735193011~exp=1735196611~hmac=ff7377b690870c806cd9df51d96e2a330b9e96c33f781ef0c454a60505a06713&w=740",
    instructions: "Layer Greek yogurt with mixed berries and a sprinkle of granola for a healthy breakfast.",
    video: "https://www.youtube.com/embed/xyz", // Add video URL here
  },
  {
    id: 9,
    title: "Lentil and Vegetable Stew",
    category: "High Fiber",
    prepTime: "40 minutes",
    calories: 320,
    image: "https://img.freepik.com/free-photo/lentil-stew-ragout-with-pumpkin-carrot-bowl-wooden-table_123827-20936.jpg?t=st=1735193053~exp=1735196653~hmac=167b555955e0f1c95472b82cd16d3f659f14d6d99b7f5c7d4fcb79cd346c750d&w=740",
    instructions: "Cook lentils with diced vegetables, garlic, and spices for a hearty stew.",
    video: "https://www.youtube.com/embed/xyz", // Add video URL here
  },
  {
    id: 10,
    title: "Cottage Cheese with Pineapple",
    category: "High Protein",
    prepTime: "5 minutes",
    calories: 200,
    image: "https://img.freepik.com/free-photo/healthy-meal-with-yogurt-pineapple-glass_23-2148759728.jpg?t=st=1735193099~exp=1735196699~hmac=4168980f936f54460fdf841badd707767b90d3afdb599b276cac4bc322e33989&w=360",
    instructions: "Serve cottage cheese topped with fresh pineapple chunks for a sweet snack.",
    video: "https://www.youtube.com/embed/xyz", // Add video URL here
  },
  {
    id: 11,
    title: "Oatmeal with Almonds and Berries",
    category: "Breakfast",
    prepTime: "10 minutes",
    calories: 300,
    image: "https://img.freepik.com/free-photo/tasty-healthy-oatmeal-porridge-with-raspberry-flax-chia-healthy-breakfast-fitness-food-proper-nutrition_2829-7085.jpg?ga=GA1.1.1895991436.1735151788&semt=ais_hybrid",
    instructions: "Cook oats and top with sliced almonds and fresh berries for a nutritious breakfast.",
    video: "https://www.youtube.com/embed/xyz", // Add video URL here
  },
  {
    id: 12,
    title: "Turmeric Roasted Cauliflower",
    category: "Vegan",
    prepTime: "25 minutes",
    calories: 150,
    image: "https://img.freepik.com/free-photo/delicious-indian-dosa-arrangement_23-2149086030.jpg?t=st=1735193189~exp=1735196789~hmac=235cdda3df329d5d368a400407615b4cb7bc7639f05b26670c739138f71de6b9&w=740",
    instructions: "Roast cauliflower florets with turmeric, olive oil, and spices for a simple dish.",
    video: "https://www.youtube.com/embed/xyz", // Add video URL here
  },
  {
    id: 13,
    title: "Quinoa and Spinach Stuffed",
    category: "Vegetarian",
    prepTime: "30 minutes",
    calories: 320,
    image: "https://img.freepik.com/free-photo/azerbaijani-traditional-kuku-table_140725-885.jpg?t=st=1735193238~exp=1735196838~hmac=35f7750cda46c26a1009115304ef083d1e37c8cc5196e42c2e2dbeaa325fde9a&w=740",
    instructions: "Stuff large mushrooms with a mixture of quinoa and spinach, then bake.",
    video: "https://www.youtube.com/embed/xyz", // Add video URL here
  },
  {
    id: 14,
    title: "Berry Smoothie Bowl",
    category: "Breakfast",
    prepTime: "10 minutes",
    calories: 250,
    image: "https://img.freepik.com/free-photo/close-up-delicious-acai-cereal-bowl_23-2149258908.jpg?t=st=1735193280~exp=1735196880~hmac=3a94f7b393e5670e8d54779a8406d7e56270a2201e2a0afe4acfd89834a4aa67&w=740",
    instructions: "Blend berries with yogurt and top with granola and seeds for a refreshing snack.",
    video: "https://www.youtube.com/embed/xyz", // Add video URL here
  },
  {
    id: 15,
    title: "Grilled Veggie Wrap",
    category: "Vegan",
    prepTime: "20 minutes",
    calories: 280,
    image: "https://img.freepik.com/free-photo/tortilla_144627-20831.jpg?t=st=1735193324~exp=1735196924~hmac=d88a2e8d40b666188022a18c1d1ae9b40d8f42d52a87bfb3d5ec4791b129cf92&w=740",
    instructions: "Wrap grilled vegetables and hummus in a whole grain tortilla for a healthy wrap.",
    video: "https://www.youtube.com/embed/xyz", // Add video URL here
  },
];

const RecipeLibrary = () => {
  const [searchTerm, setSearchTerm] = useState(""); // For search input
  const [selectedCategory, setSelectedCategory] = useState(""); // For category filter
  const [filteredRecipes, setFilteredRecipes] = useState(recipeData); // Store the filtered recipes
  const [reviews, setReviews] = useState({}); // Store reviews for each recipe

  const handleSearch = () => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    const filtered = recipeData.filter((recipe) => {
      const matchesTitle = recipe.title.toLowerCase().includes(lowercasedSearchTerm);
      const matchesCategory = selectedCategory ? recipe.category === selectedCategory : true;
      return matchesTitle && matchesCategory;
    });

    setFilteredRecipes(filtered);
  };

  useEffect(() => {
    handleSearch(); // Re-filter recipes when search term or category changes
  }, [searchTerm, selectedCategory]);

  // Handle review and rating submission for a specific recipe
  const handleReviewSubmit = (recipeId, newReviewText, newRating) => {
    if (!newReviewText || newRating === 0) {
      alert("Please provide both a rating and a review.");
      return;
    }

    const updatedReviews = { ...reviews };
    if (!updatedReviews[recipeId]) {
      updatedReviews[recipeId] = [];
    }

    updatedReviews[recipeId].push({ reviewText: newReviewText, rating: newRating });
    setReviews(updatedReviews);
  };

  // Handle rating change for a specific recipe
  const handleRatingChange = (recipeId, newRating) => {
    const updatedRecipes = filteredRecipes.map((recipe) =>
      recipe.id === recipeId ? { ...recipe, newRating } : recipe
    );
    setFilteredRecipes(updatedRecipes);
  };

  // Handle review text change for a specific recipe
  const handleReviewTextChange = (recipeId, newReviewText) => {
    const updatedRecipes = filteredRecipes.map((recipe) =>
      recipe.id === recipeId ? { ...recipe, newReviewText } : recipe
    );
    setFilteredRecipes(updatedRecipes);
  };

  return (
    <Box sx={{ padding: 3, borderRadius: "8px", backgroundColor: "background.default" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: '600', color: 'primary.main' }}>
        Recipe Library
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search Recipes"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        sx={{ marginBottom: 2 }}
      />

      {/* Category Filter */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel></InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)} // Update category filter
          displayEmpty
        >
          <MenuItem value="">Show All</MenuItem>
          {["High Protein", "Low Carb", "Breakfast", "Vegetarian", "Low Calorie", "Omega-3 Rich", "Detox", "Healthy Snack", "High Fiber"].map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Display Recipe Cards */}
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        {filteredRecipes.map((recipe) => {
          const recipeReviews = reviews[recipe.id] || [];

          return (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  backgroundColor: "background.paper",
                  borderRadius: "12px",
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                {/* Image */}
                <CardMedia
                  component="img"
                  height="160"
                  image={recipe.image}
                  alt={recipe.title}
                  sx={{
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                    objectFit: "cover",
                  }}
                />

                {/* Recipe Details */}
                <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                    {recipe.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ marginBottom: 1 }}>
                    Prep Time: {recipe.prepTime}
                  </Typography>
                  <Typography color="text.secondary" sx={{ marginBottom: 1 }}>
                    Calories: {recipe.calories}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 2, color: "text.secondary" }}>
                    {recipe.instructions}
                  </Typography>
                </CardContent>

                {/* Video Embed */}
                {recipe.video && (
                  <Box sx={{ padding: 2, height: 200 }}>
                    <iframe
                      width="100%"
                      height="200"
                      src={recipe.video}
                      title={`Video for ${recipe.title}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ borderRadius: "8px" }}
                    />
                  </Box>
                )}

                {/* Review Section */}
                <Box sx={{ padding: 2, display: "flex", flexDirection: "column", flexShrink: 0 }}>
                  {/* Add Review */}
                  <Rating
                    value={recipe.newRating || 0}
                    onChange={(event, newValue) => handleRatingChange(recipe.id, newValue)} // Update rating
                    sx={{ marginBottom: 1 }}
                  />
                  <TextField
                    label="Write a Review"
                    variant="outlined"
                    multiline
                    rows={3}
                    value={recipe.newReviewText || ""}
                    onChange={(e) => handleReviewTextChange(recipe.id, e.target.value)} // Update review text
                    sx={{ marginBottom: 1 }}
                  />
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleReviewSubmit(recipe.id, recipe.newReviewText, recipe.newRating)
                    }
                    sx={{ textTransform: "none" }}
                  >
                    Submit Review
                  </Button>

                  {/* Display Reviews */}
                  <Box sx={{ marginTop: 2 }}>
                    {recipeReviews.length > 0 ? (
                      recipeReviews.map((review, index) => (
                        <Box key={index} sx={{ marginBottom: 1 }}>
                          <Rating value={review.rating} readOnly />
                          <Typography variant="body2" sx={{ marginTop: 0.5 }}>
                            {review.reviewText}
                          </Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No reviews yet.
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default RecipeLibrary;
