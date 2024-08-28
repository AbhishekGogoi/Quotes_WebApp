import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated } from './auth';

const AuthRoute = ({ element, redirectTo }) => {
  return isAuthenticated() ? <Navigate to={redirectTo} replace /> : element;
};

AuthRoute.propTypes = {
  element: PropTypes.element.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default AuthRoute;
