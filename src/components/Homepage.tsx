import { getMoviesFromTMDB } from "@/utils";
import { Moviecard } from "@/components/Moviecard";
import CarouselCard from "@/components/CarouselCard";
import SeeMoreButton from "@/components/SeeMoreButton";
export const Homepage = async () => {
  const popularMovies = await getMoviesFromTMDB(
    "/movie/popular?language=en-US&page=1"
  );
  const upcomingMovies = await getMoviesFromTMDB(
    "/movie/upcoming?language=en-US&page=1"
  );
  const topratedMovies = await getMoviesFromTMDB(
    "/movie/top_rated?language=en-US&page=1"
  );
  const nowPlayingMovies = await getMoviesFromTMDB(
    "/movie/now_playing?language=en-US&page=1"
  );
  return (
    <div>
      <CarouselCard nowPlayingMovies={nowPlayingMovies} />
      <div className="flex flex-col md:px-10 md:py-10 md:gap-8">
        <div>
          <div className="flex px-5 justify-between">
            <h1 className="title">Upcoming</h1>
            <SeeMoreButton category="upcoming" />
          </div>
          <Moviecard upcomingMovies={upcomingMovies} />
        </div>
        <div>
          <div className="flex px-5 justify-between">
            <h1 className="title">Popular Movies</h1>
            <SeeMoreButton category="popular" />
          </div>
          <Moviecard popularMovies={popularMovies} />
        </div>
        <div>
          <div className="flex px-5 justify-between">
            <h1 className="title">Top Rated Movies</h1>
            <SeeMoreButton category="top_rated" />
          </div>
          <Moviecard topratedMovies={topratedMovies} />
        </div>
      </div>
    </div>
  );
};
