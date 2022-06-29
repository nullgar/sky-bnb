import { csrfFetch } from "./csrf";

const GET = 'review/GET';
const CREATE = 'review/CREATE';
const DELETE = 'review/DELETE';


const get = (reviews) => ({
    type: GET,
    reviews
});


export const getReviews = () => async dispatch => {
    const res = await fetch(`/api/reviews/`);

    if (res.ok) {
        const reviews = await res.json();
        dispatch(get(reviews));
        return reviews;
    }
}

const reviewReducer = (state = {}, action) => {
    const allReviews = {};
    switch (action.type) {
        case GET:
            action.reviews.forEach(review => {
                state[review.id] = review;
            });
            return {
                ...allReviews,
                ...state
            }
            default:
                return state;
    }
}


export default reviewReducer;
