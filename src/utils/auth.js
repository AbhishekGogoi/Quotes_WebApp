export const login = (email, password) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const storedUser = users.find((user) => user.email === email);

  if (storedUser && storedUser.password === password) {
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('currentUserEmail', email);
    return true;
  }
  return false;
};

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
  const currentUserEmail = getCurrentUserEmail();

  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('currentUserEmail');

  if (currentUserEmail) {
    const storedQuotes = JSON.parse(
      localStorage.getItem(`quotes_${currentUserEmail}`)
    );
    if (storedQuotes) {
      const updatedQuotes = { favourites: storedQuotes.favourites || [] };
      localStorage.setItem(
        `quotes_${currentUserEmail}`,
        JSON.stringify(updatedQuotes)
      );
    }
  }
};

export const getUser = () => {
  const currentUserEmail = localStorage.getItem('currentUserEmail');
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return users.find((user) => user.email === currentUserEmail) || null;
};

export const getCurrentUserEmail = () => {
  return localStorage.getItem('currentUserEmail') || null;
};

export const isAuthenticated = () => !!localStorage.getItem('isLoggedIn');
