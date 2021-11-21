import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/auth/AuthContext';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/administration-panel');
    }

    if (error === 'Invalid Credentials') {
      console.log(error);
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
      console.log('Please fill in all fields');
    } else {
      login({
        email,
        password
      })
    }
  };

  return (
    <div className="login">
      <h1>
        Administrator Login
      </h1>
      <form onSubmit={onSubmit}>
        <div className="login-form-container">
          <label htmlFor="email">Email Address: </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="login-form-container">
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Login"
        />
      </form>
    </div>
  );
};

export default Login;