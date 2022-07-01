import { csrfFetch } from "./csrf";

const GET = 'location/GET';
const GETONE = 'location/GETONE';
const CREATE = 'location/CREATE';
const UPDATE = 'location/UPDATE';
const REMOVE = 'location/REMOVE';

const get = (locations) => ({
    type: GET,
    locations
});

const getOne = (locations, locationId) => ({
    type: GETONE,
    locations,
    locationId
});

const create = (location) => ({
    type: CREATE,
    location
});


const update = (location) => ({
    type: UPDATE,
    location
});

const remove = (locationId, userId) => ({
    type: REMOVE,
    locationId,
    userId
});





export const getLocations = () => async dispatch => {
    const res = await fetch(`/api/location/`);
    if (res.ok) {
        const locations = await res.json();
        dispatch(get(locations));
        return locations;
    }
};

export const getLocation = (id) => async dispatch => {
    const res = await fetch(`/api/location/${id}`);
    if (res.ok) {
        const location = await res.json();
        dispatch(getOne(location, id));
        return location;
    }
};

export const createLocation = (data) => async dispatch => {
    // const {userId, name, address, city, country, price} = data;

    const res = await csrfFetch(`/api/location/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const location = await res.json();
        dispatch(create(location));
        return location;
    }
};

export const updateLocation = (data, locationId) => async dispatch => {

    const res = await csrfFetch(`/api/location/${locationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const updatedLocation  = await res.json();
        dispatch(update(updatedLocation));
        return updatedLocation;
    }
}

export const removeLocation = (locationId, userId) => async dispatch => {

    const res = await csrfFetch(`/api/location/${locationId}`, {
      method: 'DELETE'
    })
    if(res.ok){

      const { id: deletedLocationId } = await res.json();
      dispatch(remove(deletedLocationId, userId))
      return deletedLocationId;
    }
}

const locationReducer = (state = [], action) => {
    const allLocations = {};
    switch (action.type) {
        case GET:

            action.locations.forEach(location => {
            state[location.id] = location;
            });
            return {
                ...allLocations,
                ...state
            };
        case CREATE:
            Object.values(action.location).forEach(location => {
                state[location.id] = location;
                });
                return {
                    ...allLocations,
                    ...state
                };
        case REMOVE:
            const newState = {...state}
            delete newState[action.locationId]

            return newState;
        case UPDATE:

            const updateState = {...state}

            Object.values(updateState).map(review => {
                if (review.id === action.location.id) {
                    updateState[action.location.id] = action.location.location
                }

            });
            return updateState


        default:
            return state;
    }
}

export default locationReducer;
