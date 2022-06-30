import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReviews, removeReview } from '../../store/review';
import CreateNewReview from '../CreateNewReview';



const LocationReviews = () => {
    const dispatch = useDispatch();
    const { locationId } = useParams();
    const reviews = useSelector(state => {
        return Object.values(state.review);
    });

    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getReviews( locationId ))
    }, [dispatch]);

    const reviewDelete = (e) => {
        const reviewId = parseInt(e.target.id);
        // const locationIdReview = parseInt(locationId);
        const userReviewId = parseInt(sessionUser.id);
        dispatch(removeReview(reviewId, userReviewId));
    };

    if (reviews && sessionUser) {


    return (
        <div>
            Reviews Go Here
            {reviews.map(review => (
                <div key={review.id}>
                    <p>{review.review}</p>
                    {review.userId === sessionUser.id ? <button onClick={reviewDelete} id={review.id}>delete</button> : null}
                </div>
            ))}
            <CreateNewReview />
        </div>
    )

    } else {
        return (
            <div>
            Reviews Go Here
            {reviews.map(review => (
                <div key={review.id}>
                    <p>{review.review}</p>
                </div>
            ))}
        </div>
        )
    }
}

export default LocationReviews;
