import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams, Link } from 'react-router-dom';
import { getLocation, getLocations } from '../../store/location';

function LocationsDisplay() {
  const dispatch = useDispatch();
  const locations = useSelector(state => {
    return Object.values(state.location)
  });
  const user = useSelector(state => {
    return state.session.user
  })


  // if (sessionUser !== undefined) {
  //   return (
  //     <ul>
  //       <li>
  //         <NavLink exact to="/">Home</NavLink>
  //         <NavLink to ='/new-location'>Create New Location</NavLink>

  //         {isLoaded && sessionLinks}
  //       </li>
  //     </ul>
  //   );
  // }

  useEffect(() => {
    dispatch(getLocations())
  }, [dispatch, user])

    if(!locations) {
      <h1>Nothing Loaded</h1>
    } else {

    return (
        <>
        {user !== undefined && user !== null ? <Link to='/location/new'>Create New Location</Link> : null}
        {locations.map(location => (
            <div key={location.id}>

                <h1>
                    <Link to={`/location/${location.id}`}> {location.name} </Link>
                </h1>
                <p>
                    {location.city}, {location.state}
                </p>
            </div>
        ))}
        </>
    );
    }
}

export default LocationsDisplay;
