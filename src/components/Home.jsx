import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  TextField,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { logout, getUser } from "../utils/auth";

// Utility functions to manage user-specific local storage
const getStoredQuotes = (email) => {
  return JSON.parse(localStorage.getItem(`quotes_${email}`)) || {};
};
const storeQuotes = (email, quotes) => {
  localStorage.setItem(`quotes_${email}`, JSON.stringify(quotes));
};

const Home = () => {
  const [quote, setQuote] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [category, setCategory] = useState("happiness");
  const [editMode, setEditMode] = useState(false);
  const [editedQuote, setEditedQuote] = useState("");
  const [editedAuthor, setEditedAuthor] = useState("");

  const navigate = useNavigate();
  const user = getUser();
  const userEmail = user ? user.email : null;

  // Load quotes from local storage on component mount
  useEffect(() => {
    if (userEmail) {
      const storedQuotes = getStoredQuotes(userEmail);
      if (storedQuotes) {
        setQuote(storedQuotes.quote);
        setFavourites(storedQuotes.favourites || []);
      }
    }
  }, [userEmail]);

  // Fetch a random quote
  const fetchQuote = async () => {
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/quotes?category=${category}`,
        {
          headers: { "X-Api-Key": "RnSZo8KhdwhiEfgW6zA3+w==qB3s4kUJuDJFY7gm" }, // Replace 'YOUR_API_KEY' with your actual API key
        }
      );

      const result = response.data[0];
      setQuote(result);
      storeQuotes(userEmail, { ...getStoredQuotes(userEmail), quote: result });
    } catch (error) {
      console.error(
        "Error fetching quote:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleFavourite = () => {
    if (
      quote &&
      !favourites.some(
        (fav) => fav.quote === quote.quote && fav.author === quote.author
      )
    ) {
      const newFavourites = [...favourites, quote];
      setFavourites(newFavourites);
      storeQuotes(userEmail, {
        ...getStoredQuotes(userEmail),
        favourites: newFavourites,
      });
    }
  };

  const handleUnfavourite = () => {
    const newFavourites = favourites.filter(
      (favourite) =>
        favourite.quote !== quote.quote || favourite.author !== quote.author
    );
    setFavourites(newFavourites);
    storeQuotes(userEmail, {
      ...getStoredQuotes(userEmail),
      favourites: newFavourites,
    });
  };

  const handleEditQuote = () => {
    if (quote) {
      setEditMode(true);
      setEditedQuote(quote.quote);
      setEditedAuthor(quote.author);
    }
  };

  const handleSaveEdit = () => {
    if (quote) {
      const updatedQuote = {
        ...quote,
        quote: editedQuote,
        author: editedAuthor,
      };
      setQuote(updatedQuote);
      setEditMode(false);

      // Update the stored quotes and favourites
      const newFavourites = favourites.map((fav) =>
        fav.quote === quote.quote && fav.author === quote.author
          ? updatedQuote
          : fav
      );
      setFavourites(newFavourites);
      storeQuotes(userEmail, {
        quote: updatedQuote,
        favourites: newFavourites,
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Welcome, {user ? user.firstName : "Guest"}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Button variant="contained" onClick={fetchQuote} sx={{ mb: 2 }}>
          Get Random Quote
        </Button>

        {quote && (
          <Box>
            {!editMode ? (
              <>
                <Typography variant="h6" gutterBottom>
                  {quote.quote}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  - {quote.author}
                </Typography>
              </>
            ) : (
              <Box>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Quote"
                  value={editedQuote}
                  onChange={(e) => setEditedQuote(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Author"
                  value={editedAuthor}
                  onChange={(e) => setEditedAuthor(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" onClick={handleSaveEdit}>
                  Save
                </Button>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleFavourite}
                sx={{ mr: 1 }}
              >
                Favourite
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleUnfavourite}
              >
                Unfavourite
              </Button>
              <Button
                variant="contained"
                onClick={handleEditQuote}
                sx={{ ml: 1 }}
              >
                Edit
              </Button>
            </Box>
          </Box>
        )}

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Favourite Quotes</Typography>
          {favourites.length > 0 ? (
            favourites.map((fav, index) => (
              <Box key={index} sx={{ mt: 2 }} onClick={() => setQuote(fav)}>
                <Typography variant="subtitle1">{fav.quote}</Typography>
                <Typography variant="subtitle2">- {fav.author}</Typography>
              </Box>
            ))
          ) : (
            <Typography>No favourite quotes yet.</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
