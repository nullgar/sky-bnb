import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { getImages } from '../store/images';



const LocationImages = () => {
    const { locationId } = useParams();
    const dispatch = useDispatch();
    const backupInfo = useLocation();
    const backup = parseInt(backupInfo.pathname.split('/')[2])

    const images = useSelector(state => {
        return state.images;
    })

    useEffect(() => {
        dispatch(getImages(backup))
    }, [dispatch])

    console.log(images)
    if(images !== undefined)
    {
    return (
        <div>
            <button>Add Image</button>
            {Object.values(images).map(image => (
                <div key={image.id + 7}>
                    <img src={image.url} />
                </div>
            ))}

        </div>
    )
    }
}

export default LocationImages;
