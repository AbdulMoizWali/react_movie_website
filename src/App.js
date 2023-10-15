import "./style.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";

// cbb093be

const API_URL = "https://www.omdbapi.com?apikey=cbb093be";
const movie_types = ["all", "movie", "series", "episode"];
let moviesData = [];

const App = () => {
  const [searchTerm, setSearchTerm] = useState("avengers");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(movie_types[0]);

  const fetchMovies = async (title) => {
    setIsLoading(true);
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    if (data.Response === "False") {
      // setIsLoading(false);
      // return;
      data.Search = [];
    }
    moviesData = data.Search;
    // setMovies(data.Search);
    changeMovieType(selectedType);
    setIsLoading(false);
    console.log(movies);
  }

  const changeMovieType = (type) => {
    if (type === movie_types[0]) {
      setMovies(moviesData);
      return;
    }
    const filteredMovies = moviesData.filter((movie) => {
      return movie.Type === type;
    });
    setMovies(filteredMovies);
  }


  useEffect(() => {
    fetchMovies(searchTerm);
  }, []);





  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          tabIndex={1}
          type="text"
          value={searchTerm}
          placeholder="Search..."
          onChange={(e) => { setSearchTerm(e.target.value) }}
        />
        <img
          tabIndex={0}
          src={SearchIcon}
          alt="search"
          onClick={() => { fetchMovies(searchTerm) }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              fetchMovies(searchTerm);
            }
          }} />
      </div>
      {
        isLoading
          ?
          (
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              // width: "100px",
              scale: "1.5"
            }}>
              <ScaleLoader
                color="#f9d3b4"
                radius={14}
                speedMultiplier={2}
              />
              {/* <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/cd514331234507.564a1d2324e4e.gif" alt="loading" /> */}
            </div>

          ) : (
            <>
              <div className="movieTypesContainer">
                {/* <div className="movieTypeSelected">All</div>
                    <div className="">Movie</div>
                    <div>Series</div>
                    <div>Episode</div> */}
                {
                  movie_types.map((type, i) => {
                    return (
                      <div
                        key={i}
                        className={selectedType === type ? "movieTypeSelected" : ""}
                        onClick={() => {
                          setSelectedType(type);
                          changeMovieType(type);
                        }}
                      >
                        {type.toString()[0].toUpperCase() + type.toString().slice(1)}
                      </div>
                    );
                  })
                }
              </div>
              {
                (movies.length > 0)
                  ?
                  (


                    <div className="container">
                      {
                        movies.map((movie, i) => {
                          return <MovieCard movie={movie} key={i} />
                        })
                      }
                    </div>

                  )
                  :
                  (
                    <div className="empty">
                      <h2>Nothing to show</h2>
                    </div>
                  )
              }
            </>
          )
      }
      {/* <MovieCard movie= /> */}
    </div>
  );
};

export default App;
