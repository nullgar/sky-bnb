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
    const backup = parseInt(backupInfo.pathname.split('/')[2])
    const sessionUser = useSelector(state => state.session.user);

    //edit form
    const [name, setName] = useState(location ? location.name : '');
    const [address, setAddress] = useState(location ? location.address : '');
    const [city, setCity] = useState(location ? location.city : '');
    const [country, setCountry] = useState(location ? location.country : '');
    const [price, setPrice] = useState(location ? location.price : '');
    const [valErrors, setValErrors] = useState([]);

    useEffect(() => {
        dispatch(getLocations())
    }, [dispatch])

    useEffect(() => {
        const errors = [];

        setValErrors(errors);
    }, [name, city, address, country, price]);

    const updateName = (e) => setName(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);

    const handleSubmit = async (e) => {
       e.preventDefault();
       const userId = user
       setValErrors([]);

        const data = {
            userId,
            name,
            address,
            city,
            country,
            price
        }

        let updatedLocation;
        updatedLocation = parseInt(location.id)


        const res = await dispatch(updateLocation(data, backup))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setValErrors(data.errors);
            });
        // await dispatch(updateLocation(data, backup));
        if (res) {

            let hide = document.querySelector('#hideEditLocation');

            hide.className = 'hideEditLocation'
            let button = document.querySelector('#locationEditButton');

            button.innerHTML = 'Edit Location'
        }


    };


    if (!user || !sessionUser) {
        return <h1>Not Allowed</h1>
    } else if (Object.values(location)) {
        return (
        <div className='hideEditLocation' id='hideEditLocation'>
            <ul>
                {valErrors.map((err, i)=> (
                    <li key={i}>{err}</li>
                ))}
            </ul>
            <form>
                <label>Name: </label>
                <input type='text' name='name' onChange={updateName} value={name}></input>

                <label>Address: </label>
                <input type='text' name='address' onChange={updateAddress} value={address}></input>

                <label>City: </label>
                <input type='text' name='city' onChange={updateCity} value={city}></input>

                <label>Country: </label>
                <input type='text' name='country' onChange={updateCountry} value={country}></input>

                <label>Price: </label>
                <input type='text' name='price' onChange={updatePrice} value={price}></input>
                <button onClick={handleSubmit} disabled={!!valErrors.length}>submit</button>
            </form>

        </div>
    )
    } else {
        return (
            <h1>You can't be here! Please go back home.</h1>

        )
    }
}

export default EditLocation
