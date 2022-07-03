import React, { useState } from 'react';
import './LoginForm.css';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <form onSubmit={handleSubmit} className='signupForm'>
      <ul className='loginUl'>
        {errors.map((error, idx) => <li key={idx} className='loginLi' >{error}</li>)}
      </ul>
      <label className='loginLabel' >
        Username or Email
      </label>
      <input
          className='signupInput'
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
      />
      <label className='loginLabel'>
        Password
      </label>
      <input
          className='signupInput'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
      />
      <button type="submit" className='loginButton' >Log In</button>
    </form>
  );
}

export default LoginFormPage;
