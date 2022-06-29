import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReviews } from '../../store/review';



const LocationReviews = () => {
    const dispatch = useDispatch();
    const { locationId } = useParams();
    const reviews = useSelector(state => {
        return state.review[locationId];
    });


    useEffect(() => {
        dispatch(getReviews())
    }, [dispatch]);

    const pingReviews = (e) => {
        e.preventDefault();


        console.log('click')
    }
    if (reviews) {
    return (
        <div>
            Reviews Go Here
            {/* {reviews(review => (
                <p key={review.id}>{review.review}</p>
            ))} */}
            <button onClick={pingReviews}>Ping</button>
        </div>
    )
    } else {<h1>wait</h1>}
}

export default LocationReviews;
