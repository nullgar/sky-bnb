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
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState(0);
    const [valErrors, setValErrors] = useState([]);

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

    useEffect(() => {
        const errors = [];
        if (name === '' && name.length < 3) {
            errors.push(`Location's Name must be longer than 3 characters!`)
        } else if (name.length > 100) {
            errors.push(`Location's Name must be longer than 100 characters!`)
        }
        if (name === '' && name.length < 3) {
            errors.push(`Location's Name must be longer than 3 characters!`)
        }
        if (fruits.find(fruit => fruit.name === name)) {
            errors.push("Name already exists.")
          }

        setValErrors(errors);
    }, [name])
    const formSubmit = async (e) => {
        const userId = (parseInt(sessionUser.id))
        e.preventDefault();
        setValErrors([]);
        const data = {
            userId,
            name,
            address,
            city,
            state,
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
                {/* <input type='hidden' value={userId} /> */}
                <label>Name: </label>
                <input type='text' name='name' onChange={(e) => setName(e.target.value)} value={name} required='required'></input>

                <label>Address: </label>
                <input type='text' name='address' onChange={(e) => setAddress(e.target.value)} value={address} required='required'></input>

                <label>City: </label>
                <input type='text' name='city' onChange={(e) => setCity(e.target.value)} value={city} required='required'></input>

                <label>State: </label>
                <input type='text' name='state' onChange={(e) => setState(e.target.value)} value={state} required='required'></input>

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
