import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { createImage, getImages } from '../../store/images';



const CreateNewLocationImage = () => {
    const [image, setImage] = useState('');
    const [valErrors, setValErrors] = useState([]);
    const { locationId } = useParams();
    const dispatch = useDispatch();
    const backupInfo = useLocation();
    const backup = parseInt(backupInfo.pathname.split('/')[2])

    const images = useSelector(state => {
        return state.images;
    })

    useEffect(() => {

        dispatch(getImages(backup));
    }, [dispatch])

    // Example
    useEffect(() => {
        const errors = [];
        if (image.length <= 0) {
          errors.push("Please provide a link for the image")
        }

        setValErrors(errors);
    }, [image])

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
            <ul>
                {valErrors.map(err => (
                    <li key={err}>{err}</li>
                ))}
            </ul>
            <input type='text' value={image} onChange={(e) => setImage(e.target.value)} placeholder='Pleae Enter Image Url'></input>
            <button onClick={addLocationImage} disabled={!!valErrors.length} >Add Image</button>


        </div>
    )
    }
}

export default CreateNewLocationImage;
