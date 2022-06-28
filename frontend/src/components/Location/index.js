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
    return state.session.user
  })

  useEffect(() => {
    dispatch(getLocations())
  }, [dispatch])
  //edit form
  const [name, setName] = useState(location.name);
  const [address, setAddress] = useState(location.address);
  const [city, setCity] = useState(location.city);
  const [state, setState] = useState(location.state);
  const [country, setCountry] = useState(location.country);
  const [price, setPrice] = useState(location.price);

  const updateName = (e) => setName(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);


  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const destroy = (e) => {
    e.preventDefault()
    dispatch(removeLocation(location.id, user.id))
    history.push('/')
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
        <h1>{location.name}</h1>
        <p>Located at {location.address}</p>
        <p>{location.city}, {location.state}, {location.country}</p>
        <p>Cost per night ${location.price}</p>
        {user && location.userId === user.id ? <button onClick={destroy}>delete</button> : null}
        {user && location.userId === user.id ?
        <form>
        <label>Name: </label>
        <input type='text' name='name' onChange={(e) => updateName(e.target.value)} value={name}></input>

        <label>Address: </label>
        <input type='text' name='address' onChange={(e) => updateAddress(e.target.value)} value={address}></input>

        <label>City: </label>
        <input type='text' name='city' onChange={(e) => updateCity(e.target.value)} value={city}></input>

        <label>State: </label>
        <input type='text' name='state' onChange={(e) => updateState(e.target.value)} value={state}></input>

        <label>Country: </label>
        <input type='text' name='country' onChange={(e) => updateCountry(e.target.value)} value={country}></input>

        <label>Price: </label>
        <input type='text' name='price' onChange={(e) => updatePrice(e.target.value)} value={price}></input>
        <button >submit</button>
        </form>
        : null
        }

      </div>
      )
    }
}

export default Location;
