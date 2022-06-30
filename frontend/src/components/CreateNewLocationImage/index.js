import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { createImage, getImages } from '../../store/images';



const CreateNewLocationImage = () => {
    const [image, setImage] = useState('');
    const { locationId } = useParams();
    const dispatch = useDispatch();
    const backupInfo = useLocation();
    const backup = parseInt(backupInfo.pathname.split('/')[2])

    const images = useSelector(state => {
        return state.images;
    })

    useEffect(() => {

        dispatch(createImage(backup));
    }, [dispatch])

    const addLocationImage = async (e) => {
        e.preventDefault();
        const data = {
            locationId: backup,
            url: image
        };
        //locationId
        //url

        await dispatch(createImage(data, backup));

    }

    if(images !== undefined)
    {
    return (
        <div>
            <input type='text' value={image} onChange={(e) => setImage(e.target.value)} placeholder='Pleae Enter Image Url'></input>
            <button onClick={addLocationImage}>Add Image</button>


        </div>
    )
    }
}

export default CreateNewLocationImage;
