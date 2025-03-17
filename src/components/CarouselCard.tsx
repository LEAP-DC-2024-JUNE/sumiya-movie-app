import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "./svg/Star";
import { Movie } from "@/utils";
import WatchTrailer from "./WatchTrailer";
import { Skeleton } from "@/components/ui/skeleton";
interface CarouselCardProps {
  nowPlayingMovies: Movie[] | undefined;
}
export const CarouselCard: React.FC<CarouselCardProps> = ({
  nowPlayingMovies,
}) => {
  return (
    <Carousel>
      <CarouselContent>
        {nowPlayingMovies ? (
          nowPlayingMovies?.map((movie) => (
            <CarouselItem key={movie.id}>
              <div className="relative">
                <div className="w-full md:relative md:z-10">
                  <img
                    className="w-full h-[600px]"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
                <div className="flex flex-col gap-4 px-5 py-5 md:max-w-[402px] md:pr-[100px] md:z-30 md:absolute md:top-1/2 md:left-1/4 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
                  <div className="flex justify-between md:flex-col md:gap-1">
                    <div className="flex flex-col gap-1">
                      <p className="text-lg md:text-[#FAFAFA]">Now Playing:</p>
                      <p className="font-bold text-2xl md:text-[#FAFAFA]">
                        {movie.title}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Star />
                      <p className="md:text-[#FAFAFA]">
                        6.9
                        <span className="text-gray-400 md:text-[#FAFAFA]">
                          /10
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="md:text-[#FAFAFA] md:line-clamp-5">
                    {movie.overview}
                  </p>
                  <div className="px-5 py-5">
                    <WatchTrailer id={movie.id} />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))
        ) : (
          <CarouselItem>
            <div>
              <div className="flex justify-center">
                <Skeleton className="h-60 w-40 rounded-lg" />
              </div>
              <div className="flex flex-col gap-4 px-5 py-5">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                  <div className="flex gap-1">
                    <Skeleton className="h-6 w-8" />
                  </div>
                </div>
                <Skeleton className="h-4 w-64" />
              </div>
              <div className="px-5 py-5">
                <Skeleton className="h-10 w-36" />
              </div>
            </div>
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious />
    </Carousel>
  );
};
export default CarouselCard;
