import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/Auth/AuthContext';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [ message, setMessage ] = useState('');

  const { login, error, clearErrors, isAuthenticated } = authContext;

  const discardMessage = () => {
    setTimeout(() => {
      setMessage('')
    }, 5000);
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/administration-panel');
    }

    if (error === 'Invalid Credentials') {
      setMessage('Niepoprawe dane');
      discardMessage();
      clearErrors();
    }
  }, [ error, isAuthenticated, history ]);

  const [ user, setUser ] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setMessage('Wypełnij wszystkie pola');
      discardMessage();
    } else {
      login({
        email,
        password
      })
    }
  };

  return (
    <div className="login">
      <h2>
        Logowanie dla administratorów
      </h2>
      <form onSubmit={onSubmit}>
        <div className="form-container">
          <label htmlFor="email">Adres email: </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-container">
          <label htmlFor="password">Hasło: </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button className="button">Zaloguj się</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
};

export default Login;