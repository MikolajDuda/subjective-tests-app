import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';

const Navbar = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout } = authContext;

  const onLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <nav className="navbar">
      <Link to="/"><h1>Tester app navbar</h1></Link>
      <div className="links">
        <Link to="/">Home</Link>
        {!isAuthenticated ? (<Link to="/login">Administrator Login</Link>) : (
          <>
            <Link to="/administration-panel">Panel</Link>
            <a onClick={onLogout}>Logout</a>
          </>)}
      </div>
    </nav>
  );
};

export default Navbar;