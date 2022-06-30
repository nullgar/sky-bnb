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
    const [valErrors, setValErrors] = useState([]);

    useEffect(() => {
        const errors = [];
        if (review.length <= 0) {
          errors.push("Please provide a Review")
        }

        setValErrors(errors);
    }, [review])

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


    return (
        <form>
            <ul>
                {valErrors.map(err => (
                    <li key={err}>{err}</li>
                ))}
            </ul>
            <textarea type='text' name='review' value={review} onChange={(e) => setReview(e.target.value)} ></textarea>
            <button onClick={submitReview} disabled={!!valErrors.length} >Submit Review</button>
        </form>
    )
}

export default CreateNewReview;
