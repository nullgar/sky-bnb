import React, { useEffect, useState, useValue } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { getLocations, createLocation } from '../../store/location';

const EditLocation = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { locationId } = useParams();
    // const location = useSelector(state => {
    //     return state.location[locationId]
    // });
    const locationInfo = useLocation();
    const user = useSelector(state => {
       return state.session.user.id
    })
    const location = locationInfo.state.location
    // useEffect(() => {
    //     dispatch(getLocations())
    // }, [dispatch]);
    // console.log(location)

    //edit form
    const [name, setName] = useState(location.name);
    const [address, setAddress] = useState(location.address);
    const [city, setCity] = useState(location.city);
    const [state, setState] = useState(location.state);
    const [country, setCountry] = useState(location.country);
    const [price, setPrice] = useState(location.price);


    // useEffect(() => {

    //     if(location !== undefined)setName(location.name)
    //     else setName('')
    // }, [name])

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

        let newLocation;
        // newLocation = await dispatch(createLocation(data));
        // history.push(`/`)
       console.log(data)
    };

    const cancel = (e) => {
        history.push(`/location/${locationId}`)
    }

    // if (location) {
        // setName(location.name);
        // setAddress(location.address);
        // setCity(location.city);
        // setState(location.state);
        // setCountry(location.country)
        // setPrice(location.price)
    // return (
    //     <div>
    //     <form>
    //     <label>Name: </label>
    //     <input type='text' name='name' onChange={(e) => updateName(e.target.value)} value={name}></input>

    //     <label>Address: </label>
    //     <input type='text' name='address' onChange={(e) => updateAddress(e.target.value)} value={address}></input>

    //     <label>City: </label>
    //     <input type='text' name='city' onChange={(e) => updateCity(e.target.value)} value={city}></input>

    //     <label>State: </label>
    //     <input type='text' name='state' onChange={(e) => updateState(e.target.value)} value={state}></input>

    //     <label>Country: </label>
    //     <input type='text' name='country' onChange={(e) => updateCountry(e.target.value)} value={country}></input>

    //     <label>Price: </label>
    //     <input type='text' name='price' onChange={(e) => updatePrice(e.target.value)} value={price}></input>
    //     <button onClick={handleSubmit}>submit</button>
    //     </form>
    //     <button onClick={cancel}>Cancel</button>
    //     </div>
    // )
    // }
    return (
        <div>
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
        <button onClick={cancel}>Cancel</button>
        </div>
    )
}

export default EditLocation
