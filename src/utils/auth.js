// src/utils/auth.js

export const login = (email, password) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Find the user with the provided email
  const storedUser = users.find((user) => user.email === email);

  // Check if the email and password match the stored data
  if (storedUser && storedUser.password === password) {
    localStorage.setItem('isLoggedIn', true); // Indicating that the user is authenticated
    localStorage.setItem('currentUserEmail', email); // Store the current user's email
    return true; // Successful login
  }
  return false; // Login failed
};

// Function to register a new user
export const register = (userData) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const userExists = users.some((user) => user.email === userData.email);

  if (userExists) {
    return {
      success: false,
      message: 'Email already exists. Please use a different email.',
    };
  }

  users.push(userData);
  localStorage.setItem('users', JSON.stringify(users));
  return { success: true, message: 'User registered successfully.' };
};

export const logout = () => {
  localStorage.removeItem('isLoggedIn'); // Removing the login status
  localStorage.removeItem('currentUserEmail'); // Removing the current user email
  // Optionally, remove user-specific data if needed
  // localStorage.removeItem(`quotes_${getCurrentUserEmail()}`);
};

export const getUser = () => {
  const currentUserEmail = localStorage.getItem('currentUserEmail');
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return users.find((user) => user.email === currentUserEmail) || null;
};

// New function to get the current logged-in user's email
export const getCurrentUserEmail = () => {
  return localStorage.getItem('currentUserEmail') || null;
};

export const isAuthenticated = () => !!localStorage.getItem('isLoggedIn');
