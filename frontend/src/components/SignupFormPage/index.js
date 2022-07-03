import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form onSubmit={handleSubmit} className='signupForm'>
      <ul className="signupLi">
        {errors.map((error, idx) => <li key={idx} className='signupUl'>{error}</li>)}
      </ul>
      <label className="signupLabel">
        Email
      </label>
      <input
          className="signupInput"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      <label className="signupLabel">
        Username
      </label>
      <input
          className="signupInput"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
      />
      <label className="signupLabel">
        Password
      </label>
      <input
          className="signupInput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
      />
      <label className="signupLabel">
        Confirm Password
      </label>
      <input
          className="signupInput"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
      />
      <button type="submit" className="signupButton" >Sign Up</button>
    </form>
  );
}

export default SignupFormPage;
