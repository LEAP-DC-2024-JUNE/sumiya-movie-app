"use client";
import { useSearchParams } from "next/navigation";
import { Star } from "@/components/svg/Star";
import useSWR from "swr";
import { getGenresFromTMDB, getMoviesFromTMDB, Movie } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

const SearchMovies = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchValue = searchParams.get("value") || "";
  const { data, error, isLoading } = useSWR<Movie[]>(
    searchValue ? `/search/movie?query=${searchValue}&language=en-US` : null,
    getMoviesFromTMDB
  );
  const {
    data: genreData,
    error: genreError,
    isLoading: genreIsLoading,
  } = useSWR("/genre/movie/list?language=en", getGenresFromTMDB);
  const handleClick = (id: number) => {
    router.push(`genrepage?id=${id}`);
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading search results.</div>;
  if (genreIsLoading) return <div>Loading genres...</div>;
  if (genreError) return <div>Error loading genres.</div>;
  return (
    <div className="flex flex-col gap-8 md:px-[80px] md:mt-[52px]">
      <h1 className="text-2xl font-bold px-5">Search results</h1>
      <div className="md:flex md:gap-[89px]">
        <div className="">
          <p className="font-bold px-5">
            {data?.length} results for "{searchValue}"
          </p>
          <div>
            {data && (
              <div>
                <div className="movie-container">
                  {data.map((movie) => {
                    return (
                      <div className="movie-list">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        />
                        <div className="flex flex-col gap-1 bg-slate-100 h-[76px] px-2 py-2">
                          <div className="flex gap-1">
                            <Star />
                            <p>
                              6.9<span className="text-gray-400">/10</span>
                            </p>
                          </div>
                          <p>{movie.title}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col gap-1 px-5 mt-[64px]">
            <p className="font-bold text-xl">Search by genre</p>
            <p>See list of movies by genre</p>
          </div>
          <div className="px-5 pb-5 flex flex-wrap gap-4">
            {genreData?.map((genre) => {
              return (
                <div onClick={() => handleClick(genre.id)}>
                  <Badge variant="outline">{genre.name}</Badge>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchMovies;
