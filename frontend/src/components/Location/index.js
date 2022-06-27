import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { getLocation, getLocations, removeLocation } from '../../store/location';


function Location() {
  const { locationId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useSelector(state => {
    return state.location[locationId]
  });
  const user = useSelector(state => {
    return state.session.user.id
  })
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const destroy = (e) => {
    e.preventDefault()
    dispatch(removeLocation(location.id, user))
    return history.push("/")
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
  useEffect(() => {
    dispatch(getLocations())
  }, [dispatch])

  // useEffect(() => {
  //   dispatch(getLocation(locations, locationId))
  // }, [locationId, dispatch])




    if (!location) return null
    else {

    return (
      <div>
        <h1>{location.name}</h1>
        <p>Located at {location.address}</p>
        <p>{location.city}, {location.state}, {location.country}</p>

        <p>Cost per night ${location.price}</p>
        {location.userId === user ? <button onClick={destroy}>delete</button> : null}
      </div>
    );
    }
}

export default Location;
