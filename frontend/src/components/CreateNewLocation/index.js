import React, { useEffect, useState, useValue } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getLocations, createLocation } from '../../store/location';

function CreateNewLocation() {

    //const newLocation = useSelector(state => state.location)
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const [cookies, setCookies] = useState('cookie');
    // const [userId, setUserId] = useState();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState(0);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getLocations())
    // }, [dispatch])


    const formSubmit = async (e) => {
        const userId = (parseInt(sessionUser.id))

        e.preventDefault();
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
    if (!sessionUser) return <h1>Not Allowed</h1>
    return (
        <div>
            <h1>Create a new location</h1>
            <form onSubmit={formSubmit}>

                {/* <input type='hidden' value={userId} /> */}
                <label>Name: </label>
                <input type='text' name='name' onChange={(e) => setName(e.target.value)} value={name}></input>

                <label>Address: </label>
                <input type='text' name='address' onChange={(e) => setAddress(e.target.value)} value={address}></input>

                <label>City: </label>
                <input type='text' name='city' onChange={(e) => setCity(e.target.value)} value={city}></input>

                <label>State: </label>
                <input type='text' name='state' onChange={(e) => setState(e.target.value)} value={state}></input>

                <label>Country: </label>
                <input type='text' name='country' onChange={(e) => setCountry(e.target.value)} value={country}></input>

                <label>Price: </label>
                <input type='text' name='price' onChange={(e) => setPrice(e.target.value)} value={price}></input>

                <button type='submit'>Submit Form</button>
            </form>
        </div>
    )
};

export default CreateNewLocation;
