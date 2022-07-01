import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReview, getReviews } from '../../store/review';

const CreateNewReview = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    let { locationId } = useParams();
    locationId = parseInt(locationId);


    const [review, setReview] = useState('');
    const [valErrors, setValErrors] = useState([]);

    useEffect(() => {
        const errors = [];

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


        const res = await dispatch(createReview(data))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setValErrors(data.errors);
        });
        if (res) {
            setReview('')
        }
    }


    return (
        <form>
            <ul>
                {valErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                ))}
            </ul>
            <textarea type='text' name='review' value={review} onChange={(e) => setReview(e.target.value)} id='reviewTextArea' ></textarea>
            <button onClick={submitReview} disabled={!!valErrors.length} >Submit Review</button>
        </form>
    )
}

export default CreateNewReview;
