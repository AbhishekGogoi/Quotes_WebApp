import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import PropTypes from 'prop-types';
import { isAuthenticated } from './utils/auth';
import AuthRoute from './utils/AuthRoute';

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" replace />;
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<AuthRoute element={<Login />} redirectTo="/home" />}
          />
          <Route
            path="/signup"
            element={<AuthRoute element={<Signup />} redirectTo="/home" />}
          />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        </Routes>
      </Router>
    </>
  );
}

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default App;
