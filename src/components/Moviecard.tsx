"use client";
import { Star } from "./svg/Star";
import { Movie } from "@/utils";
import { useRouter } from "next/navigation";
interface MoviecardProps {
  popularMovies?: Movie[];
  upcomingMovies?: Movie[];
  topratedMovies?: Movie[];
}
export const Moviecard: React.FC<MoviecardProps> = ({
  popularMovies,
  upcomingMovies,
  topratedMovies,
}) => {
  const router = useRouter();
  const handleClick = (slug: number) => {
    router.push(`/singlemovie/${slug}`);
  };
  return (
    <div>
      {upcomingMovies && (
        <div>
          <div className="movie-container">
            {upcomingMovies.map((movie) => {
              return (
                <div
                  className="movie-list"
                  onClick={() => handleClick(movie.id)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                  <div className="flex flex-col gap-1 bg-slate-100 px-2 py-2 min-h-[76px]">
                    <div className="flex gap-1">
                      <Star />
                      <p>
                        6.9<span className="text-gray-400">/10</span>
                      </p>
                    </div>
                    <p className="break-words overflow-hidden text-ellipsis whitespace-nowrap">
                      {movie.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {popularMovies && (
        <div>
          <div className="movie-container">
            {popularMovies.map((movie) => {
              return (
                <div
                  className="movie-list"
                  onClick={() => handleClick(movie.id)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                  <div className="flex flex-col gap-1 bg-slate-100 min-h-[76px] px-2 py-2">
                    <div className="flex gap-1">
                      <Star />
                      <p>
                        6.9<span className="text-gray-400">/10</span>
                      </p>
                    </div>
                    <p className="break-words overflow-hidden text-ellipsis whitespace-nowrap">
                      {movie.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {topratedMovies && (
        <div>
          <div className="movie-container">
            {topratedMovies.map((movie) => {
              return (
                <div
                  className="movie-list"
                  onClick={() => handleClick(movie.id)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                  <div className="flex flex-col gap-1 bg-slate-100 min-h-[76px] px-2 py-2">
                    <div className="flex gap-1">
                      <Star />
                      <p>
                        6.9<span className="text-gray-400">/10</span>
                      </p>
                    </div>
                    <p className="break-words overflow-hidden text-ellipsis whitespace-nowrap">
                      {movie.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
