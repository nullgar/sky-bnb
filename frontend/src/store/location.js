const GET = 'location/GET';
const UPDATE = 'location/UPDATE';
const REMOVE = 'location/REMOVE';
const CREATE = 'location/CREATE';

const get = (locations) => ({
    type: GET,
    locations
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

const create = (location) => ({
    type: CREATE,
    locations
});


// updateLocation
//removeLocation
//createLocation
export const getLocation = (id) => async dispatch => {
    const res = await fetch(`/api/location/${id}`);

    if (res.ok) {
        const location = await res.json();
        dispatch(get(location, id));
        return location;
    }
};
