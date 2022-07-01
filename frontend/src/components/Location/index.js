import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import { getLocation, getLocations, removeLocation } from '../../store/location';
import EditLocation from '../EditLocation';
import LocationImages from '../LocationImage/LocationImages';

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
  }, [dispatch])

  const backupInfo = useLocation();
  const backup = parseInt(backupInfo.pathname.split('/')[2])
  const destroy = (e) => {
    e.preventDefault()
    dispatch(removeLocation(backup, user.id))
    history.push('/')
  };
  const editRedirect = (e) => {

    e.preventDefault();
    // console.log('edit clicked', location.id);
    // history.push({pathname: `/location/${location.id}/edit` , state: {location}})
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

  // const imageClick = async (e) => {
  //   e.preventDefault();
  //   const images = await dispatch(getImages(locationId))
  //   console.log(images)
  // }
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setErrors([]);
  //   return dispatch(sessionActions.login({ credential, password }))
  //     .catch(async (res) => {
  //       const data = await res.json();
  //       if (data && data.errors) setErrors(data.errors);
  //     });
  // }

  // useEffect(() => {
  //   dispatch(removeLocation)
  // }, [dispatch])






    if (!location) {
      return (
        <h1>There is nothing herer</h1>
      )
    } else if (location !== undefined) {
      return(
      <div>
        <h1 id='locationDisplayName'>{location.name}</h1>
        <LocationImages />
        <p id='locationDisplayAddress'>Located at {location.address}</p>
        <p id='locationDisplayCity'>{location.city}, {location.country}</p>
        <p id='locationDisplayCost'>Cost per night ${location.price}</p>
        {user && location.userId === user.id ? <button onClick={editRedirect} id='locationEditButton'>Edit Location</button>   : null}
        {user && location.userId === user.id ? <button onClick={destroy}>Delete Location</button> : null}
        {user && location.userId === user.id ? <EditLocation /> : null}
        <LocationReviews />
      </div>
      )
    }
}

export default Location;
