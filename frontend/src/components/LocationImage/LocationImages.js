import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { getImages } from '../../store/images';
import { getLocation, getLocations } from '../../store/location';
import CreateNewLocationImage from '../CreateNewLocationImage';



const LocationImages = () => {
    const { locationId } = useParams();
    const dispatch = useDispatch();
    const backupInfo = useLocation();
    const backup = parseInt(backupInfo.pathname.split('/')[2])

    const images = useSelector(state => {
        return state.images;
    })
    const user = useSelector(state => {
        return state.session.user
    })
    const location = useSelector(state => {
        return state.location[backup]
    });

    useEffect(() => {
        dispatch(getImages(backup));
        dispatch(getLocations());
    }, [dispatch])

    console.log(images)

    if(images !== undefined && user)
    {
    return (
        <div>

            {Object.values(images).map(image => (
                <div key={image.id + 7}>
                    <img src={image.url} />
                </div>
            ))}
            {user.id === location.userId ? <CreateNewLocationImage /> : null}
        </div>
    )
    }
}

export default LocationImages;
