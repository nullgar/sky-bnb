import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReviews, removeReview } from '../../store/review';
import CreateNewReview from '../CreateNewReview';
import './LocationReviews.css'


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
        const userReviewId = parseInt(sessionUser.id);
        dispatch(removeReview(reviewId, userReviewId));
    };

    if (reviews && sessionUser) {




    return (
        <div className='locationReviewsMasterDiv'>
            <h3 className='locationReviewsHeader'>Reviews</h3>
            {reviews.map(review => (
                <div key={review.id + 20}>
                <div key={review.id + 20} className='locationReviewDiv'>
                    {review.User && review.User.username !== undefined ? <p className='locationReviewsUser'>{review.User.username}: </p> : null}
                    <p className='locationReviewsReview' >{review.review}</p>
                </div>
                    {review.userId === sessionUser.id ? <button onClick={reviewDelete} id={review.id} className='locationReviewsDelete' >Delete</button> : null}
                </div>
            ))}
            <CreateNewReview />
        </div>
    )


    } else {
        return (
            <div className='locationReviewsMasterDiv'>
            <h3 className='locationReviewsHeader'>Reviews</h3>
            {reviews.map(review => (
                <div key={review.id + 20}>
                    <div key={review.id + 20} className='locationReviewDiv'>
                        {review.User && review.User.username !== undefined ? <p className='locationReviewsUser'>{review.User.username}: </p> : null}
                        <p className='locationReviewsReview' >{review.review}</p>
                    </div>
                </div>
            ))}

        </div>
        )
    }
}

export default LocationReviews;
