"use client";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import {
  getSingleMovieFromTMDB,
  MovieIdData,
  getMovies,
  Movie,
  ActorData,
  TrailerData,
} from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "@/components/svg/Star";
import { Badge } from "@/components/ui/badge";
import YouTube from "react-youtube";
import { SeeMore } from "@/components/svg/Seemore";
const SingleMovie: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;
  const movieId = slug;
  console.log(movieId);
  const { data, error, isLoading } = useSWR(
    `/movie/${movieId}?language=en-US`,
    getSingleMovieFromTMDB
  );
  const {
    data: trailerData,
    error: trailerError,
    isLoading: trailerIsLoading,
  } = useSWR<TrailerData[]>(
    `/movie/${movieId}/videos?language=en-US`,
    MovieIdData
  );
  const {
    data: actorData,
    error: actorError,
    isLoading: actorIsLoading,
  } = useSWR<ActorData>(`/movie/${movieId}/credits?language=en-US`, getMovies);
  const {
    data: similiarmovieData,
    error: similiarmovieError,
    isLoading: similiarmovieIsLoading,
  } = useSWR<Movie[]>(
    `/movie/${movieId}/similar?language=en-US&page=1`,
    MovieIdData
  );
  const handleClick = (id: string) => {
    router.push(`/morelike?id=${id}`);
  };
  if (
    isLoading ||
    trailerIsLoading ||
    actorIsLoading ||
    similiarmovieIsLoading
  ) {
    return (
      <div className="flex flex-col gap-8">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-60 w-full" />
        <div className="flex gap-4">
          <Skeleton className="h-60 w-1/2" />
          <Skeleton className="flex-1 h-60" />
        </div>
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-12 w-3/4" />
      </div>
    );
  }
  if (error) {
    return <div>Error loading movie data.</div>;
  }
  if (!data) {
    return <div>Movie not found.</div>;
  }
  if (!trailerData) {
    return <div>Movie not found.</div>;
  }
  const { title, release_date, runtime, genres, overview, poster_path } = data;
  return (
    <div className="flex flex-col gap-8 md:px-[180px] md:py-[52px] pb-5">
      <div>
        <div className="flex justify-between items-center px-5 py-5 md:px-0 md:py-0">
          <div className="flex flex-col gap-1">
            <p className="font-bold text-2xl">{title}</p>
            <div className="flex gap-2">
              <p>{release_date}</p>
              <p>PG</p>
              <p>{runtime}m</p>
            </div>
          </div>
          <div>
            <div className="flex gap-1">
              <Star />
              <p>
                6.9<span className="text-gray-400">/10</span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-screen md:hidden">
          <YouTube
            videoId={trailerData[0].key}
            opts={{
              width: "100%",
              height: 300,
            }}
          />
        </div>
      </div>
      <div className="flex flex-auto gap-[34px] px-5 md:px-0 md:flex-col">
        <div className="md:flex md:gap-8 md:flex-auto md:h-[428px]">
          <div className="px-5 w-[100px] h-[148px] object-cover md:w-1/3 md:h-full">
            <img
              className="w-full h-full object-cover"
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            />
          </div>
          <div className="hidden md:inline w-2/3 md:h-full">
            <YouTube
              videoId={trailerData[0].key}
              opts={{
                width: "100%",
                height: 428,
              }}
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-4">
            {genres.map((genre) => {
              return <Badge variant="outline">{genre.name}</Badge>;
            })}
          </div>
          <div>{overview}</div>
        </div>
      </div>
      <div className="px-5 md:px-0">
        <div className="flex flex-col gap-2">
          <div className="flex gap-[53px]">
            <p className="font-bold text-lg">Director</p>
            <div>
              {actorData &&
                actorData.crew &&
                (() => {
                  const directors = actorData.crew.filter(
                    (member) => member.job === "Director"
                  );
                  const directorNames = directors.map(
                    (director) => director.name
                  );

                  if (directorNames.length > 0) {
                    return directorNames.map((name, index) => (
                      <span key={index}>
                        {name}
                        {index < directorNames.length - 1 && ", "}
                      </span>
                    ));
                  } else {
                    return <span>No directors found.</span>;
                  }
                })()}
            </div>
          </div>
          <div className="border-b-2"></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-[53px]">
            <p className="font-bold text-lg">Writers</p>
            <div>
              {actorData &&
                actorData.crew &&
                (() => {
                  const writers = actorData.crew.filter(
                    (member) => member.job === "Writer"
                  );
                  const writernames = writers.map((writer) => writer.name);

                  if (writernames.length > 0) {
                    return writernames.map((name, index) => (
                      <span key={index}>
                        {name}
                        {index < writernames.length - 1 && ", "}
                      </span>
                    ));
                  } else {
                    return null;
                  }
                })()}
            </div>
          </div>
          <div className="border-b-2"></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-[60px]">
            <div className="font-bold text-lg">Stars</div>
            {actorData && actorData.cast && (
              <div className="flex flex-wrap gap-2">
                {actorData.cast.slice(0, 3).map((member) => (
                  <div key={member.id}>{member.name}</div>
                ))}
              </div>
            )}
          </div>
          <div className="border-b-2"></div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center px-5">
          <h1 className="font-bold text-2xl">More like this</h1>
          <button onClick={() => handleClick(movieId as string)}>
            <SeeMore />
          </button>
        </div>
        <div>
          {similiarmovieData && (
            <div className="md:flex">
              <div className="movie-container">
                {similiarmovieData.slice(0, 2).map((movie) => {
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
                <div className="hidden md:flex md:gap-8">
                  {similiarmovieData.slice(2, 7).map((movie) => (
                    <div key={movie.id} className="movie-list">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
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
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SingleMovie;
