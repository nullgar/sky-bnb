import { csrfFetch } from "./csrf";

const GET = 'location/GET';
const GETONE = 'location/GETONE';
// const UPDATE = 'location/UPDATE';
// const REMOVE = 'location/REMOVE';
// const CREATE = 'location/CREATE';

const get = (locations) => ({
    type: GET,
    locations
});

const getOne = (locations, locationId) => ({
    type: GETONE,
    locations,
    locationId
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

// const create = (location) => ({
//     type: CREATE,
//     location
// });


// updateLocation
//removeLocation
//createLocation
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
        // case GETONE:
        //     action.locations
        default:
            return state;
    }
}

export default locationReducer;
