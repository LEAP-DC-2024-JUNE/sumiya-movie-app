"use client";
import { useState, ChangeEvent } from "react";
import { Search } from "./svg/Search";
import { getGenresFromTMDB, getMoviesFromTMDB } from "@/utils";
import DropDownMenu from "@/components/DropDownMenu";
import useSWR from "swr";
import { Genre } from "@/utils";
import { Star } from "./svg/Star";
import { SeeMore } from "./svg/Seemore";
import { useRouter } from "next/navigation";
import moment from "moment";
export const SearchInput = () => {
  const router = useRouter();
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleSearchClick = () => {
    setShowInput(true);
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const {
    data: genreData,
    error: genreError,
    isLoading: genreIsLoading,
  } = useSWR<Genre[]>("/genre/movie/list?language=en", getGenresFromTMDB);
  const {
    data: movieData,
    error: movieError,
    isLoading: movieIsLoading,
  } = useSWR(
    `/search/movie?query=${inputValue}&language=en-US`,
    getMoviesFromTMDB
  );
  const moveToSearchPage = (value: string) => {
    setInputValue("");
    router.push(`/searchmovies?value=${value}`);
  };
  const handleClick = (slug: number) => {
    router.push(`/singlemovie/${slug}`);
    setInputValue("");
  };
  console.log(movieData);
  return (
    <div>
      <div className="relative max-w-full md:hidden">
        {showInput ? (
          <div className="flex items-center gap-8">
            <div className="flex gap-2 items-center">
              <DropDownMenu allgeners={genreData} />
              <div>
                <div className="flex gap-1">
                  <Search />
                  <input
                    type="text"
                    placeholder="Enter search term..."
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="absolute z-50 bg-white w-[300px]">
                  {movieIsLoading ? (
                    <div className="movieloading">Loading...</div>
                  ) : movieError ? (
                    <div className="movieloading">Error loading data.</div>
                  ) : !movieData || movieData.length === 0 ? (
                    inputValue && (
                      <div className="movieloading">No result found</div>
                    )
                  ) : (
                    movieData?.slice(0, 5).map((movie) => (
                      <div
                        className="flex gap-4 border border-b-2"
                        key={movie.id}
                      >
                        <div className="w-[67px] h-[100px]">
                          <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-3 items-start">
                          <div className="flex flex-col">
                            <p>{movie.title}</p>
                            <div className="flex gap-1">
                              <Star />
                              <p>
                                6.9<span className="text-gray-400">/10</span>
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-8">
                            <p>{moment(movie.release_date).format("YYYY")}</p>
                            <button onClick={() => handleClick(movie.id)}>
                              <SeeMore />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  <div className="flex">
                    {movieData && movieData.length > 0 && (
                      <button
                        onClick={() => moveToSearchPage(inputValue)}
                        className="px-3 py-3"
                      >
                        See all results for "{inputValue}"
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <button onClick={() => setInputValue("")}>X</button>
          </div>
        ) : (
          <button onClick={handleSearchClick}>
            <Search />
          </button>
        )}
      </div>
      <div className="hidden md:block">
        <div className="flex items-center gap-8">
          <div className="flex gap-2 items-center">
            <DropDownMenu allgeners={genreData} />
            <div>
              <div className="flex gap-1">
                <Search />
                <input
                  type="text"
                  placeholder="Enter search term..."
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </div>
              <div className="absolute z-50 bg-white w-[300px]">
                {movieIsLoading ? (
                  <div className="movieloading">Loading...</div>
                ) : movieError ? (
                  <div className="movieloading">Error loading data.</div>
                ) : !movieData || movieData.length === 0 ? (
                  inputValue && (
                    <div className="movieloading">No result found</div>
                  )
                ) : (
                  movieData?.slice(0, 5).map((movie) => (
                    <div
                      className="flex gap-4 border border-b-2"
                      key={movie.id}
                    >
                      <div className="w-[67px] h-[100px]">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-3 items-start">
                        <div className="flex flex-col">
                          <p>{movie.title}</p>
                          <div className="flex gap-1">
                            <Star />
                            <p>
                              6.9<span className="text-gray-400">/10</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-8">
                          <p>{moment(movie.release_date).format("YYYY")}</p>
                          <button onClick={() => handleClick(movie.id)}>
                            <SeeMore />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div className="flex">
                  {movieData && movieData.length > 0 && (
                    <button
                      onClick={() => moveToSearchPage(inputValue)}
                      className="px-3 py-3"
                    >
                      See all results for "{inputValue}"
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchInput;
