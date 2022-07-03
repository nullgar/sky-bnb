import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { createImage, getImages } from '../../store/images';
import './CreateNewLocationImage.css'


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


        setValErrors(errors);
    }, [image])

    const addLocationImage = async (e) => {
        e.preventDefault();
        const data = {
            locationId: backup,
            url: image
        };


        const res = await dispatch(createImage(data, backup))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setValErrors(data.errors);
        });
    }

    if(images !== undefined)
    {
    return (
        <div>
            <ul className='newImageUl'>
                {valErrors.map(err => (
                    <li key={err} className='newImageLi'>{err}</li>
                ))}
            </ul>
            <input type='text' className='newImageInput' value={image} onChange={(e) => setImage(e.target.value)} placeholder='Please Enter Image Url'></input>
            <button className='newImageButton' onClick={addLocationImage} disabled={!!valErrors.length} >Add Image</button>


        </div>
    )
    }
}

export default CreateNewLocationImage;
