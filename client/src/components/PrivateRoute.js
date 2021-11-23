import { useContext } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import AuthContext from '../context/Auth/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  if (!isAuthenticated) {
    history.push('/');
  }

  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;