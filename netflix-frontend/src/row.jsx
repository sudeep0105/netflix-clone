import { useState, useEffect } from 'react';
import './Row.css';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(fetchUrl);
                const data = await response.json();
                setMovies(data.results || []);
            } catch (error) {
                console.error("Error fetching TMDB data:", error);
            }
        }
        fetchData();
    }, [fetchUrl]);

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map((movie) => (
                    ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                        <div key={movie.id} className={`row__posterContainer ${isLargeRow ? "row__posterContainerLarge" : ""}`}>
                            <img
                                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name || movie.title}
                            />
                            <p className="row__posterTitle">
                                {movie.title || movie.name || movie.original_name}
                            </p>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}

export default Row;