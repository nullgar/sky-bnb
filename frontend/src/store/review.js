import { csrfFetch } from "./csrf";

const GET = 'review/GET';
const CREATE = 'review/CREATE';
const DELETE = 'review/DELETE';


const get = (reviews) => ({
    type: GET,
    reviews
});
const create = (reviews) => ({
    type: CREATE,
    reviews
});


export const getReviews = () => async dispatch => {
    const res = await fetch(`/api/reviews/`);

    if (res.ok) {
        const reviews = await res.json();
        dispatch(get(reviews));
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
        dispatch(create(data));
        return review;
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
        case CREATE:
            Object.values(action.reviews).forEach(review => {
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
