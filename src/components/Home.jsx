import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  TextField,
  CircularProgress,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { logout, getUser } from '../utils/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getStoredQuotes = (email) => {
  return JSON.parse(localStorage.getItem(`quotes_${email}`)) || {};
};
const storeQuotes = (email, quotes) => {
  localStorage.setItem(`quotes_${email}`, JSON.stringify(quotes));
};

const Home = () => {
  const [quote, setQuote] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedQuote, setEditedQuote] = useState('');
  const [editedAuthor, setEditedAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const navigate = useNavigate();
  const user = getUser();
  const userEmail = user ? user.email : null;

  useEffect(() => {
    if (userEmail) {
      const storedQuotes = getStoredQuotes(userEmail);
      if (storedQuotes) {
        setQuote(storedQuotes.quote);
        setFavourites(storedQuotes.favourites || []);
      }
    }
  }, [userEmail]);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/quotes?category=`,
        {
          headers: { 'X-Api-Key': import.meta.env.VITE_API_Ninjas_API_KEY },
        }
      );

      const result = response.data[0];
      setQuote(result);
      storeQuotes(userEmail, { ...getStoredQuotes(userEmail), quote: result });
    } catch (error) {
      console.error(
        'Error fetching quote:',
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFavourite = () => {
    if (
      quote &&
      favourites.some(
        (fav) => fav.quote === quote.quote && fav.author === quote.author
      )
    ) {
      setIsButtonDisabled(true);
      toast.info('Quote already marked as Favorite', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        onOpen: () => setIsButtonDisabled(true),
        onClose: () => setIsButtonDisabled(false),
      });
    } else if (quote) {
      const newFavourites = [...favourites, quote];
      setFavourites(newFavourites);
      storeQuotes(userEmail, {
        ...getStoredQuotes(userEmail),
        favourites: newFavourites,
      });

      toast.success('Quote added to Favorites', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        onOpen: () => setIsButtonDisabled(true),
        onClose: () => setIsButtonDisabled(false),
      });
    }
  };

  const handleUnfavourite = (favQuote) => {
    const newFavourites = favourites.filter(
      (favourite) =>
        favourite.quote !== favQuote.quote ||
        favourite.author !== favQuote.author
    );
    setFavourites(newFavourites);
    storeQuotes(userEmail, {
      ...getStoredQuotes(userEmail),
      favourites: newFavourites,
    });
    toast.info('Quote removed from Favorites', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      onOpen: () => setIsButtonDisabled(true),
      onClose: () => setIsButtonDisabled(false),
    });
  };

  const handleEditQuote = (favQuote) => {
    setEditMode(favQuote);
    setEditedQuote(favQuote.quote);
    setEditedAuthor(favQuote.author);
  };

  const handleSaveEdit = () => {
    if (editMode) {
      const updatedFavourites = favourites.map((fav) =>
        fav.quote === editMode.quote && fav.author === editMode.author
          ? { ...fav, quote: editedQuote, author: editedAuthor }
          : fav
      );
      setFavourites(updatedFavourites);
      storeQuotes(userEmail, {
        ...getStoredQuotes(userEmail),
        favourites: updatedFavourites,
      });
      setEditMode(null);

      toast.success('Quote updated successfully', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        onOpen: () => setIsButtonDisabled(true),
        onClose: () => setIsButtonDisabled(false),
      });
    }
  };

  const handleCancelEdit = () => {
    setEditMode(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Welcome, {user ? user.firstName : 'Guest'}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Button
            variant="contained"
            onClick={fetchQuote}
            sx={{ mb: 2, width: '200px', height: '45px' }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Get Random Quote'
            )}{' '}
          </Button>

          {quote && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {quote.quote}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                - {quote.author}
              </Typography>

              <Button
                variant="contained"
                onClick={handleFavourite}
                sx={{ mt: 2 }}
                disabled={isButtonDisabled}
              >
                Favourite
              </Button>
            </Box>
          )}
        </Paper>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Favourite Quotes
          </Typography>
          {favourites.length > 0 ? (
            favourites.map((fav, index) => (
              <Box key={index} sx={{ mt: 2 }}>
                {editMode && editMode.quote === fav.quote ? (
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
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button variant="contained" onClick={handleSaveEdit}>
                        Save
                      </Button>
                      <Button variant="outlined" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <>
                    <Typography variant="subtitle1">{fav.quote}</Typography>
                    <Typography variant="subtitle2">- {fav.author}</Typography>

                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleUnfavourite(fav)}
                      sx={{ mt: 1, mr: 1 }}
                      disabled={isButtonDisabled}
                    >
                      Unfavourite
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleEditQuote(fav)}
                      sx={{ mt: 1 }}
                      disabled={isButtonDisabled}
                    >
                      Edit
                    </Button>
                  </>
                )}
              </Box>
            ))
          ) : (
            <Typography>No favourite quotes yet.</Typography>
          )}
        </Paper>
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default Home;
