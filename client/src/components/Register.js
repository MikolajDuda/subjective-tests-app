import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/Auth/AuthContext';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    // if (isAuthenticated) {
    //   history.push('/administration-panel');
    // }

    if (error === 'User already exists') {
      console.log(error);
      clearErrors();
    }
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      console.log('Please enter all fields');
    } else if (password !== password2) {
      console.log('Passwords do not match');
    } else {
      register({
        name,
        email,
        password
      });
      history.push('/administration-panel')
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
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
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
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
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;