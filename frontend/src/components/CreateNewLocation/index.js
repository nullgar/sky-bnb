import React, { useEffect, useState, useValue } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createImage } from '../../store/images';
import { getLocations, createLocation } from '../../store/location';
import CreateNewLocationImage from '../CreateNewLocationImage';
import './CreateNewLocation.css'

function CreateNewLocation() {

    //const newLocation = useSelector(state => state.location)
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [valErrors, setValErrors] = useState([]);


    useEffect(() => {
        const errors = [];
        setValErrors(errors);
    }, [name, city, address, country, price]);

    const formSubmit = async (e) => {
        e.preventDefault();
        setValErrors([]);
        const userId = (parseInt(sessionUser.id))
        const data = {
            userId,
            name,
            address,
            city,
            country,
            price
        }




        const res = await dispatch(createLocation(data))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setValErrors(data.errors);
        });

        let locationId = res;

        const addLocationImage = async () => {

            const data = {
                locationId,
                url: image
            };


            const res = await dispatch(createImage(data, locationId))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setValErrors(data.errors);
            });
        }
        addLocationImage();
        if (res) history.push(`/`)
    };

    if (!sessionUser) return history.push('/')
    return (
        <div className='createNewLocationMasterDiv'>
            <h1 className='createNewLocationHeader'>Create a New Location</h1>
            <ul className='createNewLocationUl'>
                {valErrors.map((err, i) => (
                    <li key={i} className='createNewLocationLi'>{err}</li>
                ))}
            </ul>
            <form onSubmit={formSubmit} className='createNewLocationForm'>
                <label className='createNewLocationLabel' >Name: </label>
                <input className='createNewLocationInput' type='text' name='name' onChange={(e) => setName(e.target.value)} value={name} required='required'></input>

                <label className='createNewLocationLabel'>Address: </label>
                <input className='createNewLocationInput' type='text' name='address' onChange={(e) => setAddress(e.target.value)} value={address} required='required'></input>

                <label className='createNewLocationLabel'>City: </label>
                <input className='createNewLocationInput' type='text' name='city' onChange={(e) => setCity(e.target.value)} value={city} required='required'></input>

                <label className='createNewLocationLabel'>Country: </label>
                <input className='createNewLocationInput' type='text' name='country' onChange={(e) => setCountry(e.target.value)} value={country} required='required'></input>

                <label className='createNewLocationLabel'>Price: </label>
                <input className='createNewLocationInput' type='text' name='price' onChange={(e) => setPrice(e.target.value)} value={price} required='required'></input>


                <button className='createNewLocationButton' type='submit' disabled={!!valErrors.length}>Submit Form</button>
            </form>
        </div>
    )
};

export default CreateNewLocation;
