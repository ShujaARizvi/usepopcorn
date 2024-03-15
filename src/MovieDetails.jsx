import { useEffect, useState } from "react";

import StarRating from "./StarRating/StarRating";
import Loader from "./Loader";

const KEY = "5aef5ea1";

export default function MovieDetails({ movieId, onCloseMovie }) {
  const [movieDetails, setMovieDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleMovieRating(rating) {
    console.log(rating);
  }

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetails;

  useEffect(() => {
    async function fetchMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com?apikey=${KEY}&i=${movieId}`
      );
      const movie = await res.json();

      setMovieDetails(movie);
      setIsLoading(false);
    }

    fetchMovieDetails();
  }, [movieId]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt="" />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating
                size={24}
                maxRating={10}
                onRating={handleMovieRating}
              />
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
