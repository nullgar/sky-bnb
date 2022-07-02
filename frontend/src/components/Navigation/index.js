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
      <div className='sessionLinksDiv'>
        <NavLink to="/login" className='sessionLinks'>Log In</NavLink>
        <NavLink to="/signup" className='sessionLinks'>Sign Up</NavLink>
        <button onClick={demoUserLogin}>Demo User</button>
      </div>
    );
  }
    return (
      <div className='mainNavigationBar'>
        <div className='logoDiv'>
          <img src='https://i.imgur.com/8E7XT9Z.png' className='logo' />
        </div>
        <div className='userButtonsMainPage'>
          <NavLink exact to="/" className='homeSessionLink' id='profileHome'>Home</NavLink>
          {isLoaded && sessionLinks}
        </div>
      </div>
    );
  }



export default Navigation;
