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

    useEffect(() => {
        dispatch(getLocations());

    }, [dispatch, user])

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



        const res = await dispatch(updateLocation(data, backup))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setValErrors(data.errors);
            });
        if (res) {

            let hide = document.querySelector('#hideEditLocation');

            hide.className = 'hideEditLocation'
            let button = document.querySelector('#locationEditButton');

            button.innerHTML = 'Edit Location'
        }
        return;

    };


    if (!user || !sessionUser) {
        return <h1>Not Allowed</h1>
    } else if (Object.values(location)) {
        return (
        <div className='hideEditLocation' id='hideEditLocation'>
            <ul className='editLocationUl'>
                {valErrors.map((err, i)=> (
                    <li key={i} className='editLocationLi'>{err}</li>
                ))}
            </ul>
            <form className='showEditLocation'>
                <label className='showEditLabel'>Name: </label>
                <input className='showEditInput' type='text' name='name' onChange={updateName} value={name}></input>

                <label className='showEditLabel'>Address: </label>
                <input className='showEditInput' type='text' name='address' onChange={updateAddress} value={address}></input>

                <label className='showEditLabel'>City: </label>
                <input className='showEditInput' type='text' name='city' onChange={updateCity} value={city}></input>

                <label className='showEditLabel'>Country: </label>
                <input className='showEditInput' type='text' name='country' onChange={updateCountry} value={country}></input>

                <label className='showEditLabel'>Price: </label>
                <input className='showEditInput' type='text' name='price' onChange={updatePrice} value={price}></input>
                <button onClick={handleSubmit} className='showEditButton' disabled={!!valErrors.length}>submit</button>
            </form>

        </div>
    )
    } else {
        return <h1>Not Allowed</h1>
    }
}

export default EditLocation
