import { csrfFetch } from "./csrf";

const GET = 'review/GET';
const CREATE = 'review/CREATE';
const REMOVE = 'review/REMOVE';

const getLocationReviews = (reviews) => ({
    type: GET,
    reviews
});

const create = (review) => ({
    type: CREATE,
    review
});

const remove = (locationId, userId) => ({
    type: REMOVE,
    locationId,
    userId
});

export const getReviews = (locationId) => async dispatch => {
    const res = await fetch(`/api/reviews/${locationId}`);

    if (res.ok) {
        const reviews = await res.json();
        // console.log('this is it---- ', reviews)
        dispatch(getLocationReviews(reviews));
        return reviews;
    }
};

export const createReview = (data) =>async dispatch => {

    const res = await csrfFetch(`/api/reviews/`, {
        method: "POST",
        header: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const review = await res.json();
        dispatch(create(review));
        return review;
    }
};

export const removeReview = (locationId, userId) => async dispatch => {
    console.log(locationId, userId)
}

const reviewReducer = (state = [], action) => {
    const allReviews = {};
    switch (action.type) {
        case GET:
            action.reviews.forEach(review => {
                allReviews[review.id] = review;

            });
            return {
                ...allReviews
            }
            case CREATE:
                console.log(action.review)
                if (!state[action.review.id]) {
                    const newState = {
                        ...state,
                        [action.review.id]: action.review
                    };
                    return newState
                }
                return {
                    ...state,
                    [action.review.id]: {
                        ...state[action.review.id],
                        ...action.review
                    }
                };
            case REMOVE:
                const newState = {...state}
                delete newState[action.locationId]

                return newState;
        default:
            return state;
    }
}


export default reviewReducer;
