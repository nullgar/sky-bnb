import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { getLocation, getLocations, removeLocation } from '../../store/location';
import EditLocation from '../EditLocation';
import LocationReviews from '../LocationReviews';


function Location({hideForm}) {
  const { locationId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useSelector(state => {
    return state.location[locationId]
  });
  const user = useSelector(state => {
    return state.session.user
  })

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getLocations())
  }, [dispatch])


  const destroy = (e) => {
    e.preventDefault()
    dispatch(removeLocation(location.id, user.id))
    history.push('/')
  };
  const editRedirect = (e) => {

    e.preventDefault();
    // console.log('edit clicked', location.id);
    // history.push({pathname: `/location/${location.id}/edit` , state: {location}})
    let hide = document.querySelector('#hideEditLocation');

    console.log(hide)

    if (hide = document.querySelector('.hideEditLocation')) {
      let button = document.querySelector('#locationEditButton');
      button.innerHTML = 'Cancel Edit'
      hide.className = 'showEditLocation'

    } else {
      let hide = document.querySelector('#hideEditLocation');
      hide.className = 'hideEditLocation'
      console.log(hide)
      let button = document.querySelector('#locationEditButton');
      // console.log(button)
      button.innerHTML = 'Edit'
    }
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setErrors([]);
  //   return dispatch(sessionActions.login({ credential, password }))
  //     .catch(async (res) => {
  //       const data = await res.json();
  //       if (data && data.errors) setErrors(data.errors);
  //     });
  // }

  // useEffect(() => {
  //   dispatch(removeLocation)
  // }, [dispatch])






    if (!location) {
      return null
    } else {
      return(
      <div>
        <h1 id='locationDisplayName'>{location.name}</h1>
        <p>Located at {location.address}</p>
        <p>{location.city}, {location.state}, {location.country}</p>
        <p>Cost per night ${location.price}</p>
        {user && location.userId === user.id ? <button onClick={editRedirect} id='locationEditButton'>Edit</button>   : null}
        {user && location.userId === user.id ? <button onClick={destroy}>delete</button> : null}
        {user && location.userId === user.id ? <EditLocation /> : null}
        <LocationReviews />
      </div>
      )
    }
}

export default Location;
