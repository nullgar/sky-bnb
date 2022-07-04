import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import { getLocation, getLocations, removeLocation } from '../../store/location';
import EditLocation from '../EditLocation';
import LocationImages from '../LocationImage/LocationImages';
import './Location.css'
import LocationReviews from '../LocationReviews';


function Location({hideForm}) {
  const { locationId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useSelector(state => {
    return state.location[locationId]
  });
  const user = useSelector(state => {
    return state.session.user
  })

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getLocations())
  }, [dispatch]);


  const backupInfo = useLocation();
  const backup = parseInt(backupInfo.pathname.split('/')[2])
  const destroy = (e) => {
    e.preventDefault()
    dispatch(removeLocation(backup, user.id))
    history.push('/')
  };
  const editRedirect = (e) => {

    e.preventDefault();

    let hide = document.querySelector('#hideEditLocation');



    if (hide = document.querySelector('.hideEditLocation')) {
      let button = document.querySelector('#locationEditButton');
      button.innerHTML = 'Cancel Edit'
      hide.className = 'showEditLocation'

    } else {
      let hide = document.querySelector('#hideEditLocation');
      hide.className = 'hideEditLocation'

      let button = document.querySelector('#locationEditButton');
      button.innerHTML = 'Edit'
    }
  }

    if (!location) {
      return (
       <h1>404 Page Not Found</h1>
      )
    } else if (location !== undefined) {
      return(
      <div className='locationMasterDiv'>
        <h1 className='locationHeader'>{location.name}</h1>
        <LocationImages />

        <p className='locationInfo'>Located at {location.address}</p>
        <p className='locationInfo'>{location.city}, {location.country}</p>
        <p className='locationInfo'>Cost per night ${location.price}</p>
        {user && location.userId === user.id ? <button onClick={editRedirect} id='locationEditButton' className='locationEditButton'>Edit Location</button>   : null}
        {user && location.userId === user.id ? <button onClick={destroy} className='locationEditDelete'>Delete Location</button> : null}
        {user && location.userId === user.id ? <EditLocation /> : null}
        <LocationReviews />
      </div>
      )
    }
}

export default Location;
