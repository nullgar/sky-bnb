import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      let button = document.querySelector('#profileButton');
      let home = document.querySelector('#profileHome');
      button.className = 'inactiveButton';
      home.className = 'homeSessionLink'
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
    let button = document.querySelector('#profileButton');
    if (button.className === 'inactiveButton')
    { button.className = 'activeButton' }
    let home = document.querySelector('#profileHome');
    if (home.className === 'homeSessionLink');
    home.className = 'activeHomeSessionLink'
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());

  };

  return (
    <>
      <button onClick={openMenu} className='inactiveButton' id='profileButton'>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
