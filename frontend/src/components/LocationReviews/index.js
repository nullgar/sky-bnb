import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../store/review';



const LocationReviews = () => {
    const dispatch = useDispatch();

    const reviews = useSelector(state => {
        return Object.values(state.review);
    });

    console.log(reviews)
    useEffect(() => {
        dispatch(getReviews())
    }, [dispatch]);

    const pingReviews = (e) => {
        e.preventDefault();


        console.log('click')
    }
    return (
        <div>
            Reviews Go Here
            {reviews.map(review => (
                <p>{review.review}</p>
            ))}
            <button onClick={pingReviews}>Ping</button>
        </div>
    )
}

export default LocationReviews;
