import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import reviewReducer, { createReview, getReviews } from '../../store/review';

const CreateNewReview = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    let { locationId } = useParams();
    locationId = parseInt(locationId);
    //Things needed for reviews
    //userId
    // locationId
    // review
    // rating

    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);

    const submitReview = async (e) => {
        const userId = (parseInt(sessionUser.id));
        e.preventDefault();

        const data = {
            userId,
            locationId,
            review,
            rating
        };

        let newReview;
        newReview = await dispatch(createReview(data))

    }
    // useEffect(() => {
    //   dispatch(getReviews())

    // }, [review]);

    return (
        <form>
            <label></label>
            <textarea type='text' name='review' value={review} onChange={(e) => setReview(e.target.value)} ></textarea>
            <button onClick={submitReview}>Submit Review</button>
            <input type='number' name='rating' value={rating} onChange={(e) => setRating(e.target.value)}></input>
        </form>
    )
}

export default CreateNewReview;
