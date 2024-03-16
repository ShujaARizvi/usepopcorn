import { useEffect, useState } from "react";

import Main from "./Main";
import NavBar from "./NavBar/NavBar";
import Search from "./NavBar/Search";
import NumResults from "./NavBar/NumResults";

import Box from "./Box";
import MovieList from "./Movies/MovieList";

import MovieDetails from "./MovieDetails";
import WatchedList from "./WatchedMovies/WatchedList";
import WatchedSummary from "./WatchedMovies/WatchedSummary";

import Loader from "./Loader";
import { useMovies } from "./Hooks/useMovies";
import { useLocalStorageState } from "./Hooks/useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");

  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleMovieSelection(id) {
    setSelectedMovieId((currentSelectedId) =>
      currentSelectedId === id ? null : id
    );
  }

  function handleMovieClose() {
    setSelectedMovieId(null);
  }

  function handleMovieWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(movieId) {
    setWatched((watched) => watched.filter((w) => w.imdbID !== movieId));
  }

  return (
    <>
      <NavBar>
        <Search onQueryChange={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onMovieSelect={handleMovieSelection} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedMovieId ? (
            <MovieDetails
              key={selectedMovieId}
              movieId={selectedMovieId}
              onCloseMovie={handleMovieClose}
              onMovieWatched={handleMovieWatched}
              watchedMovies={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}
