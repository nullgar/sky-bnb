import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import LocationsDisplay from '../LocationsDisplay';
import './MainPage.css';
import Footer from '../Footer';
function MainPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const user = useSelector(state => {
    return state.session.user
  })

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
    <div className='outerMostDiv'>
    {user !== undefined && user !== null ? <Link to='/location/new' className='mainPageDisplayCreateButton' >Become a Host</Link> : null}

    <div className='mainIdexPageMasterDiv'>

        <LocationsDisplay />
        <Footer />
    </div>
    </div>
  );
}

export default MainPage;
