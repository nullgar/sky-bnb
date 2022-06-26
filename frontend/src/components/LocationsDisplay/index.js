import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { getLocation, getLocations } from '../../store/location';

function LocationsDisplay() {
  const dispatch = useDispatch();
  const locations = useSelector(state => {
    return Object.values(state.location)
  });





  useEffect(() => {
    dispatch(getLocations())
  }, [dispatch])

    // if(!locations) return null
    // else {

    return (
        <>
        {locations.map(location => (
            <div>{location.name}</div>
        ))}
        </>
    );
    // }
}

export default LocationsDisplay;
