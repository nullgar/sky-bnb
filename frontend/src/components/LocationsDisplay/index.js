import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams, Link } from 'react-router-dom';
import { getLocation, getLocations } from '../../store/location';

function LocationsDisplay() {
  const dispatch = useDispatch();
  const locations = useSelector(state => {
    return Object.values(state.location)
  });





  useEffect(() => {
    dispatch(getLocations())
  }, [dispatch])

    if(!locations) return null
    else {

    return (
        <>
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
