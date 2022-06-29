import React, { useEffect, useState, useValue } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { getLocations, updateLocation } from '../../store/location';
import './EditLocation.css'

const EditLocation = ({hideForm}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { locationId } = useParams();
    const location = useSelector(state => {
        return state.location[locationId];
    });
    const user = useSelector(state => {
       return state.session.user.id
    });



    const backupInfo = useLocation();
    // const backup = backupInfo.state.location.name
    //// locationInfo !== undefined ? location = locationInfo.state.location : location = locationBackup;
    const sessionUser = useSelector(state => state.session.user);

    //edit form
    const [name, setName] = useState(location ? location.name : null);
    const [address, setAddress] = useState(location.address);
    const [city, setCity] = useState(location.city);
    const [state, setState] = useState(location.state);
    const [country, setCountry] = useState(location.country);
    const [price, setPrice] = useState(location.price);

    useEffect(() => {
        dispatch(getLocations())
    }, [dispatch])


    const updateName = (e) => setName(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);

    const handleSubmit = async (e) => {
       e.preventDefault();
       const userId = user

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

        let updatedLocation;
        updatedLocation = await dispatch(updateLocation(data, location.id));
        let hide = document.querySelector('#hideEditLocation');
        hide.className = 'hideEditLocation'
        let button = document.querySelector('#locationEditButton');

        button.innerHTML = 'Edit'
        let nameField = document.querySelector('#locationDisplayName');
        nameField.innerHTML = name
        // history.push(`/location/${locationId}`)
    };


    if (!user || !sessionUser) {
        return <h1>Not Allowed</h1>
    } else if (location) {
        return (
        <div className='hideEditLocation' id='hideEditLocation'>
        <form>
        <label>Name: </label>
        <input type='text' name='name' onChange={updateName} value={name}></input>

        <label>Address: </label>
        <input type='text' name='address' onChange={updateAddress} value={address}></input>

        <label>City: </label>
        <input type='text' name='city' onChange={updateCity} value={city}></input>

        <label>State: </label>
        <input type='text' name='state' onChange={updateState} value={state}></input>

        <label>Country: </label>
        <input type='text' name='country' onChange={updateCountry} value={country}></input>

        <label>Price: </label>
        <input type='text' name='price' onChange={updatePrice} value={price}></input>
        <button onClick={handleSubmit}>submit</button>
        </form>

        </div>
    )
    } else {
        return (
            <p>Wait</p>
        )
    }
}

export default EditLocation
