import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import reviewReducer, { createReview, getReviews } from '../../store/review';

const CreateNewReview = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    let { locationId } = useParams();
    locationId = parseInt(locationId);


    const [review, setReview] = useState('');

    const submitReview = async (e) => {
        const userId = (parseInt(sessionUser.id));
        e.preventDefault();

        const data = {
            locationId,
            userId,
            review
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
        </form>
    )
}

export default CreateNewReview;
