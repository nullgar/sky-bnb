import React, { useEffect, useState, useValue } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getLocations, createLocation } from '../../store/location';

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
    const [valErrors, setValErrors] = useState([]);


    useEffect(() => {
        const errors = [];
        if (name.length < 3) {
            errors.push(`Location's Name must be longer than 3 characters!`)
        } else if (name.length > 100) {
            errors.push(`Location's Name must be longer than 100 characters!`)
        }
        if (city.length <= 1) {
            errors.push(`Location's City cannot be empty!`)
        }
        if (country.length <= 1) {
            errors.push(`Location's Country cannot be empty!`)
        }
        if (price <= 0) {
            errors.push(`Location's Price connot be free!`)
        }

        setValErrors(errors);
    }, [name, city, country, price]);

    const formSubmit = async (e) => {
        const userId = (parseInt(sessionUser.id))
        e.preventDefault();
        setValErrors([]);
        const data = {
            userId,
            name,
            address,
            city,
            country,
            price
        }

        let newLocation;
        newLocation = await dispatch(createLocation(data));
        history.push(`/`)
    };
    if (!sessionUser) return history.push('/')
    return (
        <div>
            <h1>Create a new location</h1>
            <ul>
                {valErrors.map(err => (
                    <li key={err}>{err}</li>
                ))}
            </ul>
            <form onSubmit={formSubmit}>
                <label>Name: </label>
                <input type='text' name='name' onChange={(e) => setName(e.target.value)} value={name} required='required'></input>

                <label>Address: </label>
                <input type='text' name='address' onChange={(e) => setAddress(e.target.value)} value={address} required='required'></input>

                <label>City: </label>
                <input type='text' name='city' onChange={(e) => setCity(e.target.value)} value={city} required='required'></input>

                <label>Country: </label>
                <input type='text' name='country' onChange={(e) => setCountry(e.target.value)} value={country} required='required'></input>

                <label>Price: </label>
                <input type='text' name='price' onChange={(e) => setPrice(e.target.value)} value={price} required='required'></input>

                <button type='submit' disabled={!!valErrors.length}>Submit Form</button>
            </form>
        </div>
    )
};

export default CreateNewLocation;
