import {useState, useEffect} from "react";

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';

import axios from 'axios';
import {SearchBox} from "./SearchBox";
import Movies from "./Movies";

const API_URL = 'http://www.omdbapi.com/?apikey=872871fc'

const movie1 = {
    "Title": "The Matrix Resurrections",
    "Year": "2021",
    "imdbID": "tt10838180",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMDMyNDIzYzMtZTMyMy00NjUyLWI3Y2MtYzYzOGE1NzQ1MTBiXkEyXkFqcGc@._V1_SX300.jpg"
}

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await axios.get(`${API_URL}&s=${title}`);
        const data = await response.data;
        if (data) {
            setMovies(data.Search);
        }

    }

    useEffect(() => {
        searchMovies('Titanic')

    }, []);

    const handleSearch = async (val) => {
        console.log(val)
        await searchMovies(val)
    }

    return (
        <div className="app">
            <h1>FilmFinder</h1>

            <SearchBox
                SearchIcon={SearchIcon}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                searchMovies={searchMovies}
                handleSearch={handleSearch}
            />

            {movies?.length > 0
                ? (
                    <Movies
                        movies={movies}
                    />
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}
        </div>
    );
}

export default App;