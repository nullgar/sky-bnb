import { csrfFetch } from "./csrf";

const GET = 'location/GET';
const GETONE = 'location/GETONE';
const CREATE = 'location/CREATE';
// const UPDATE = 'location/UPDATE';
// const REMOVE = 'location/REMOVE';

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

// const update = (location) => ({
//     type: UPDATE,
//     location
// });

// const remove = (locationId, userId) => ({
//     type: REMOVE,
//     locationId,
//     userId
// });



// updateLocation
//removeLocation
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

const locationReducer = (state = {}, action) => {
    const allLocations = {};
    switch (action.type) {
        case GET:
            // action.locations.forEach(location => console.log(location))
            action.locations.forEach(location => {
            allLocations[location.id] = location;
            });
            return {
            ...allLocations,
            ...state
            };
        case CREATE:
            console.log('created')
            // if (!state[action.location.id]) {
            //     const newState = {
            //         ...state,
            //         [action.location.id]: action.location
            //     };

            //     const locationList = newState.allLocations.map(id => newState[id]);
            //     locationList.push(action.location);
            //     return newState;
            // }
            // return {
            //     ...state,
            //     [action.location.id]: {
            //         ...state[action.location.id],
            //         ...action.location
            //     }
            // }
        default:
            return state;
    }
}

export default locationReducer;
