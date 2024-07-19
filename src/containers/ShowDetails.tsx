import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {useEffect} from "react";
import {fetchDetails} from "./showSlice.ts";
import SearchBox from "./SearchBox.tsx";

const ShowDetails = () => {
    const {id} = useParams<{id: string | undefined}>();
    const dispatch = useAppDispatch();
    const show = useAppSelector(state => state.show.show);

    useEffect(() => {
        dispatch(fetchDetails(id));
    }, [dispatch, id]);

  return (
    <div className='container mt-4'>
        <SearchBox/>
        {show && (
            <div className='mt-4'>
                {show.image && <img src={show.image.medium} alt={show.name} className="img-fluid" />}
                <h1 className='display-4'>{show.name}</h1>
                <p>{show.summary}</p>
            </div>
        )}
    </div>
  );
};

export default ShowDetails;