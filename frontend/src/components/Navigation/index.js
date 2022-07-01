import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session'
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const demoUserLogin = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential: 'nullgar', password: 'testing@1' }))

  }
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <button onClick={demoUserLogin}>Demo User</button>
      </>
    );
  }
    return (
      <div>
        <div>
          SkyBNB
        </div>
        <div>
          <NavLink exact to="/">Home</NavLink>
          {isLoaded && sessionLinks}
        </div>
      </div>
    );
  }



export default Navigation;
