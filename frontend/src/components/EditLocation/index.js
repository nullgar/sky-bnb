import React, { useEffect, useState, useValue } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getLocations, createLocation } from '../../store/location';

const EditLocation = () => {
    const dispatch = useDispatch();
    const { locationId } = useParams();
    const location = useSelector(state => {
        return state.location[locationId]
    });
    const user = useSelector(state => {
       return state.session.user
    })

    useEffect(() => {
        dispatch(getLocations())
      }, [dispatch])
    //edit form
    const [name, setName] = useState(location.name);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState('');


    const updateName = (e) => setName(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);

    const handleSubmit = async (e) => {
       e.preventDefault();
       console.log('click click')
    };

    const cancel = (e) => {

    }

    if (location) {
        // setName(location.name);
        // setAddress(location.address);
        // setCity(location.city);
        // setState(location.state);
        // setCountry(location.country)
        // setPrice(location.price)
    return (
        <div>
        <form>
        <label>Name: </label>
        <input type='text' name='name' onChange={(e) => updateName(e.target.value)} value={name}></input>

        <label>Address: </label>
        <input type='text' name='address' onChange={(e) => updateAddress(e.target.value)} value={address}></input>

        <label>City: </label>
        <input type='text' name='city' onChange={(e) => updateCity(e.target.value)} value={city}></input>

        <label>State: </label>
        <input type='text' name='state' onChange={(e) => updateState(e.target.value)} value={state}></input>

        <label>Country: </label>
        <input type='text' name='country' onChange={(e) => updateCountry(e.target.value)} value={country}></input>

        <label>Price: </label>
        <input type='text' name='price' onChange={(e) => updatePrice(e.target.value)} value={price}></input>
        <button onClick={handleSubmit}>submit</button>
        </form>
        <button onClick={cancel}>Cancel</button>
        </div>
    )
    }
    return (
        <div>
        {/* <form>
        <label>Name: </label>
        <input type='text' name='name' onChange={(e) => updateName(e.target.value)} value={name}></input>

        <label>Address: </label>
        <input type='text' name='address' onChange={(e) => updateAddress(e.target.value)} value={address}></input>

        <label>City: </label>
        <input type='text' name='city' onChange={(e) => updateCity(e.target.value)} value={city}></input>

        <label>State: </label>
        <input type='text' name='state' onChange={(e) => updateState(e.target.value)} value={state}></input>

        <label>Country: </label>
        <input type='text' name='country' onChange={(e) => updateCountry(e.target.value)} value={country}></input>

        <label>Price: </label>
        <input type='text' name='price' onChange={(e) => updatePrice(e.target.value)} value={price}></input>
        <button onClick={handleSubmit}>submit</button>
        </form> */}
        <button onClick={cancel}>Cancel</button>
        </div>
    )
}

export default EditLocation
