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

const remove = (reviewId, userId) => ({
    type: REMOVE,
    reviewId,
    userId
});

export const getReviews = (locationId) => async dispatch => {
    const res = await fetch(`/api/reviews/${locationId}`);

    if (res.ok) {
        const reviews = await res.json();

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

export const removeReview = (reviewId, userId) => async dispatch => {

    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const deletedReview = await res.json();

        dispatch(remove(deletedReview, userId));
        return deletedReview;
    }

};

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
                delete newState[action.reviewId]
                return newState;
        default:
            return state;
    }
}


export default reviewReducer;
