import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { getImages } from '../../store/images';
import { getLocation, getLocations } from '../../store/location';
import CreateNewLocationImage from '../CreateNewLocationImage';
import './LocationImages.css'


const LocationImages = () => {
    const { locationId } = useParams();
    const dispatch = useDispatch();
    const backupInfo = useLocation();
    const backup = parseInt(backupInfo.pathname.split('/')[2])
    const [isLoaded, setIsLoaded] = useState(false)
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
        setIsLoaded(true)
        dispatch(getLocations());
    }, [dispatch])


    if(Object.values(images).length > 0 && isLoaded)
    {
        console.log(images)
    return (
        <div>

            {Object.values(images).map(image => (
                <div key={image.id + 7}>

                    <img src={image.url} className='locationImages' />

                </div>
            ))}
            {user && user.id === location.userId ? <CreateNewLocationImage /> : null}
        </div>
    )
    } else {
        return (
            <div>
                <img src={'https://downtownls.org/wp-content/uploads/coming-soon.jpg'} className='locationImages' />
                {user && user.id === location.userId ? <CreateNewLocationImage /> : null}
            </div>
        )
    }
}

export default LocationImages;
