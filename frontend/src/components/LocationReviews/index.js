import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReviews } from '../../store/review';
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


    if (reviews) {
    return (
        <div>
            Reviews Go Here
            {reviews.map(review => {
               return <p key={review.id}>{review.review}</p>

                // console.log(review, sessionUser.id)
            })}
            <CreateNewReview />
        </div>
    )
    } else {<h1>wait</h1>}
}

export default LocationReviews;
