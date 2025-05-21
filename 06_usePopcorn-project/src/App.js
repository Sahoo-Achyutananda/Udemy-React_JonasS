import { useEffect, useRef, useState } from "react";
import StarComponent from "./StarComponent.js";
import useLocalStorageState from "./useLocalStorageState.js";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const api_key = "432e4d50";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const omdbURL = `http://www.omdbapi.com/?i=tt3896198&apikey=${api_key}&s=${query}`;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const controller = new AbortController();

  function handleMovieSelect(movie) {
    setSelectedId(movie.imdbID);
    document.title = movie.Title;
  }

  function handleCloseMovie() {
    setSelectedId("");
    document.title = "🍿usePopcorn";
  }

  useEffect(() => {
    function handleKeyPress() {
      document.addEventListener("keydown", (e) => {
        console.log(e);
        if (e.key === "Escape") {
          handleCloseMovie();
        }
      });
    }
    handleKeyPress();

    return () => {
      document.removeEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          handleCloseMovie();
        }
      });
    };
  });

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        setSelectedId("");

        const response = await fetch(omdbURL, { signal: controller.signal });

        if (!response.ok) {
          throw new Error("Something went wrong with fetching movies !");
        }
        const data = await response.json();
        setMovies(data.Search);
        // console.log(data.Search);
        setIsLoading(false);
      } catch (err) {
        // console.log(err.message);
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();
    return function () {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Nav>
      <Main>
        <ListBox>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onMovieSelect={handleMovieSelect} />
          )}
          {error && ErrorMessage()}
        </ListBox>
        <WatchedBox selectedId={selectedId} onCloseMovie={handleCloseMovie} />
      </Main>
    </>
  );
}

function ErrorMessage() {
  return <p className="error">⚠️Error in getting Data !</p>;
}

function Loader() {
  return <p className="loader">Loading ... </p>;
}
function Nav({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length || 0}</strong> results
    </p>
  );
}
function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(
    function () {
      function callBack(e) {
        if (document.activeElement === inputEl.current) return;
        if (e.code === "Enter") {
          inputEl.current.focus();
          setQuery("");
        }
      }

      document.addEventListener("keydown", callBack);

      return () => document.removeEventListener("keydown", callBack);
    },
    [setQuery]
  );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function ListBox({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
}

function MovieList({ movies, onMovieSelect }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} onMovieSelect={() => onMovieSelect(movie)} />
      ))}
    </ul>
  );
}

function Movie({ movie, onMovieSelect }) {
  return (
    <li key={movie.imdbID} onClick={() => onMovieSelect(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({ selectedId, onCloseMovie, onAddtoList, onUserRating }) {
  const [movie, setMovie] = useState({});
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  function handleLoadingDetails() {
    setIsLoadingDetails(true);
  }

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    async function getMovieDetails(id) {
      setIsLoadingDetails(true);
      const searchURL = `http://www.omdbapi.com/?i=${id}&apikey=${api_key}`;

      const movieData = await fetch(searchURL);
      const data = await movieData.json();

      setMovie(data);
      setIsLoadingDetails(false);
    }
    getMovieDetails(selectedId);

    // return (document.title = "🍿usePopcorn");
  }, [selectedId]);

  return isLoadingDetails ? (
    <Loader />
  ) : (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${movie} movie`} />

        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>
            <span>⭐</span> {imdbRating} IMDb rating
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          <StarComponent num={10} size={28} ratingFunction={onUserRating} />
          <button className="btn-add" onClick={() => onAddtoList(movie)}>
            {" "}
            + Add to List
          </button>
        </div>

        <p>
          <em>{plot}</em>
        </p>
        <p>Starring : {actors}</p>
        <p>Directed By : {director}</p>
      </section>
    </div>
  );
}

/*
imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
*/

function WatchedBox({ selectedId, onCloseMovie }) {
  // const [watched, setWatched] = useState([]);// Guess what??? we can pass callback functions inside usestate - it'll only be called once during the first render
  const [watched, setWatched] = useLocalStorageState("watched"); // using a custom hook
  const [isOpen2, setIsOpen2] = useState(true);
  const [rating, setRating] = useState("");
  const countRef = useRef(0);

  function handleDelete(id) {
    const updatedList = watched.filter((x) => x.imdbID !== id);
    setWatched(updatedList);
  }

  function handleUserRating(num) {
    setRating(num);
  }

  useEffect(
    function () {
      // const countRatingDecisions = useRef
      if (rating) countRef.current = countRef.current + 1;
    },
    [rating]
  );

  function handleAddtoList(movie) {
    // Checking if move already exists -
    const watchedMoviesIds = watched.map((i) => i.imdbID);

    if (watchedMoviesIds.includes(movie.imdbID)) return;

    // Object destructuring and assigning new names
    const {
      imdbID,
      Title: title,
      Year: year,
      Poster: poster,
      Runtime: runtime,
      imdbRating,
    } = movie;

    const updatedMovie = {
      imdbID,
      title,
      year,
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating: Number(rating),
      countRatingDecisions: countRef.current,
    };

    const updatedList = [...watched, updatedMovie];
    setWatched(updatedList);

    // localStorage.setItem("watched", JSON.stringify([watched])); // WRONG WAY (because setWatched() is an async call and it may not have been correctly updated)
    // localStorage.setItem("watched", JSON.stringify([...watched], updatedMovie)); // CORRECT WAY - BUT THERE IS A BETTER WAY
  }

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {selectedId !== "" ? (
        <MovieDetails
          selectedId={selectedId}
          onCloseMovie={onCloseMovie}
          onAddtoList={handleAddtoList}
          onUserRating={handleUserRating}
        />
      ) : (
        isOpen2 && (
          <>
            <WatchedSummary watched={watched} />
            <ul className="list">
              {watched.map((movie) => (
                <li key={movie.imdbID}>
                  <img src={movie.poster} alt={`${movie.title} poster`} />
                  <h3>{movie.title}</h3>
                  <div>
                    <p>
                      <span>⭐️</span>
                      <span>{movie.imdbRating}</span>
                    </p>
                    <p>
                      <span>🌟</span>
                      <span>{movie.userRating}</span>
                    </p>
                    <p>
                      <span>⏳</span>
                      <span>{movie.runtime} min</span>
                    </p>
                    <p>
                      <span>🚀</span>
                      <span>{movie.countRatingDecisions}</span>
                    </p>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(movie.imdbID)}
                    >
                      X
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )
      )}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
