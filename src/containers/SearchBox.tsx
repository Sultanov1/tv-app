import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {selectShows} from "./showSlice.ts";
import {fetchShows} from "./searchSlice.ts";
import {Link} from "react-router-dom";

const SearchBox = () => {
    const [query, setQuery] = useState('');
    const dispatch = useAppDispatch();
    const shows = useAppSelector(selectShows);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        if (e.target.value) {
            dispatch(fetchShows(e.target.value));
        }
    };


    return (
        <div className="container mt-4">
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search for TV Show"
                />
                {query && (
                    <div className="list-group position-absolute mt-2" style={{width: '134vh'}} >
                        {shows.map((show) => (
                            <Link
                                key={show.show.id}
                                to={`/shows/${show.show.id}`}
                                className="list-group-item list-group-item-action"
                            >
                                {show.show.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBox;