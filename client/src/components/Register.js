import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/Auth/AuthContext';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [ message, setMessage ] = useState('');

  const { register, error, clearErrors, isAuthenticated } = authContext;

  const discardMessage = () => {
    setTimeout(() => {
      setMessage('')
    }, 5000);
  };

  useEffect(() => {
    if (error === 'User already exists') {
      setMessage(error);
      clearErrors();
    }
  }, [ error, isAuthenticated, history ]);

  const [ user, setUser ] = useState({
    email: '',
    password: '',
    password2: ''
  });

  const { email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setMessage('Wypełnij wszystkie pola');
      discardMessage();
    } else if (password !== password2) {
      setMessage('Hasła nie są takie same');
      discardMessage();
    } else {
      register({
        email,
        password
      });
      history.push('/administration-panel')
    }
  };

  return (
    <div className='register'>
      <h2>
        Zarejestruj nowego administratora:
      </h2>
      <form onSubmit={onSubmit}>
        <div className='form-container'>
          <label htmlFor='email'>Adres email</label>
          <input
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-container'>
          <label htmlFor='password'>Hasło</label>
          <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <div className='form-container'>
          <label htmlFor='password2'>Powtórz hasło</label>
          <input
            id='password2'
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <button className="button">Rejestruj</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
};

export default Register;