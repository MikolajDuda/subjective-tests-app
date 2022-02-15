import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../context/Auth/AuthContext';

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
      <Link to="/"><h1>Strona główna</h1></Link>
      <div className="links">
        {!isAuthenticated ? (<Link to="/login">Logowanie</Link>) : (
          <>
            <Link to="/administration-panel">Panel</Link>
            <Link to="/register">Rejestracja</Link>
            <a href="/" onClick={onLogout}>Wyloguj</a>
          </>)}
      </div>
    </nav>
  );
};

export default Navbar;