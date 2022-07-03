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


  useEffect(() => {
    dispatch(getLocations());

  }, [dispatch, user])

    if(!locations) {
      <h1>Nothing Loaded</h1>
    } else {
    return (
        <>
        {user !== undefined && user !== null ? <Link to='/location/new' className='mainPageDisplayCreateButton' >Become a Host</Link> : null}

        { locations.map(location => (

          // this fixed the re render issue but why
            <div key={location.id + 7} className='mainPageDisplayDivs'>
              {console.log(location.id)}
                <h1 className='mainPageDisplayHeader' >
                    <Link to={`/location/${location.id}`} className='mainPageDisplayLink'> {location.name} </Link>
                </h1>
                { location.Images[0] ? <Link to={`/location/${location.id}`} ><img src={location.Images[0].url}  className='mainPageDisplayDivsImage' /> </Link> : null}
                <p className='mainPageDisplayInfo'>
                    {location.city}, {location.country}
                </p>
            </div>
        ))}
        </>
    );
    }
}

export default LocationsDisplay;
