import axios from "axios";
import { useEffect, useState } from "react";
import "./movieList.css";
import * as singleSpa from "single-spa";

type TMove = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

const MovieList = () => {
    const [movieListResults, setMovieListResults] = useState<TMove[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const redirectToUrlMovie = (movie: number) => {
        singleSpa.navigateToUrl(`/movies/${movie}`);
    };

    const getMovieList = () => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?page=${currentPage}&language=pt-BR`, {
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDk0MTU5Yzc1ZWI2YmQ3MGIyNjA2NWIzZTNmZDg3MSIsInN1YiI6IjYxZjA4MWU0NmU5MzhhMDBjNDQ3ZWU3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nHF-jsOrRuMGVcsDlWteU-Rr2afzCHu0E1BV2bssU30'
            }
        })
        .then((res) => {
            if(res.status === 200){
                setCurrentPage(res.data.page);
                setTotalPages(res.data.total_pages);
                setMovieListResults(res.data.results);
            };
            console.log(res);
        });
    };

    useEffect(() => {
        getMovieList();
    }, [currentPage]);

    return(
        <div>
            <section className="movie_container">
                {!!movieListResults.length && movieListResults.map((movie, index) => 
                    <div key={index} onClick={() => redirectToUrlMovie(movie.id)}>
                        <div>
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" />
                        </div>
                        <p>{movie.title}</p>
                    </div>
                )}
            </section>
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    {"<"}
                </button>
                <p>{currentPage} de {totalPages}</p>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    {">"}
                </button>
            </div>
        </div>
    );
};

export default MovieList;
