import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { isAuthenticated } from "./utils/auth"; // Import the authentication function

// ProtectedRoute component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" replace />;
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Default route redirects to login */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Protect the home route */}
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
