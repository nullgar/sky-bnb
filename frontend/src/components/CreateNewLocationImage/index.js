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

        dispatch(getImages(backup));
    }, [dispatch])

    // Example
    // useEffect(() => {
    //     const errors = [];
    //     if (sweetness < 1 || sweetness > 10) {
    //       errors.push("Sweetness must be between 1 and 10")
    //     }

    //     if (name.length < 3) {
    //       errors.push(	"Name must be 3 or more characters")
    //     } else if (name.length > 20) {
    //       errors.push(	"Name must be 20 characters or less")
    //     }

    //     if (fruits.find(fruit => fruit.name === name)) {
    //       errors.push("Name already exists.")
    //     }
    //     setValErrors(errors);
    //   }, [name, sweetness])

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
