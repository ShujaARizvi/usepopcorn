import { useEffect, useState } from "react";

import StarRating from "./StarRating/StarRating";
import Loader from "./Loader";
import { useKey } from "./Hooks/useKey";

const KEY = "5aef5ea1";

export default function MovieDetails({
  movieId,
  onCloseMovie,
  onMovieWatched,
  watchedMovies,
}) {
  const [movieDetails, setMovieDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  function handleMovieRating(rating) {
    setUserRating(rating);
  }

  function handleMovieWatched() {
    onMovieWatched({
      poster,
      title,
      imdbID,
      runtime: +runtime.split(" ").at(0),
      userRating,
      imdbRating: +imdbRating,
    });
    onCloseMovie();
  }

  const isWatched = watchedMovies
    .map((movie) => movie.imdbID)
    .includes(movieId);
  const watchedUserRating = watchedMovies.find(
    (movie) => movie.imdbID === movieId
  )?.userRating;

  const {
    imdbID,
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

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => (document.title = "usePopcorn");
  }, [title]);

  useKey("Escape", onCloseMovie);

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
              {!isWatched ? (
                <>
                  <StarRating
                    size={24}
                    maxRating={10}
                    onRating={handleMovieRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleMovieWatched}>
                      Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You have already rated this movie with {watchedUserRating}{" "}
                  <span>⭐️</span>
                </p>
              )}
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
