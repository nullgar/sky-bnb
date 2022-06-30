import { csrfFetch } from "./csrf";

const GET = 'image/GET';
const CREATE = 'image/CREATE';
const REMOVE = 'image/REMOVE';

const getLocationImages = (images) => ({
    type: GET,
    images
});

const create = (image) => ({
    type: CREATE,
    image
});


export const getImages = (locationId) => async dispatch => {
    const res = await fetch(`/api/images/${locationId}`);

    if (res.ok) {
        const images = await res.json();
        // console.log('this is it---- ', images)
        dispatch(getLocationImages(images));
        return images;
    }
};

export const createImage = (data, locationId) => async dispatch => {

    const res = await csrfFetch(`/api/images/${locationId}`, {
        method: "POST",
        header: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    // if (res.ok) {
    //     const image = await res.json();
    //     // dispatch(create(image));
    //     return image;
    // };
};

const imagesReducer = (state = [], action) => {
    const allImages = {}
    switch (action.type) {
        case GET:
            action.images.forEach(image => {
                allImages[image.id] = image;
            });
            return {
                ...allImages
            }
        default:
            return state
    }

};

export default imagesReducer;
