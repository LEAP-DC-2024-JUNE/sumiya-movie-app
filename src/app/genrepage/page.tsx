"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useSWR from "swr";
import { getGenresFromTMDB, getMoviesFromTMDB, Movie, Genre } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Star } from "@/components/svg/Star";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const GenrePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [page, setPage] = useState(1);
  const genreId = searchParams.get("id");
  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);
  useEffect(() => {
    const queryPage = searchParams.get("page");
    const queryGenreIds = searchParams.get("genres");
    if (queryPage) {
      setPage(parseInt(queryPage, 10));
    }
    if (queryGenreIds) {
      setSelectedGenreIds(queryGenreIds.split(",").map(Number));
    } else if (genreId) {
      setSelectedGenreIds([parseInt(genreId, 10)]);
    }
  }, [searchParams, genreId]);
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    params.set("genres", selectedGenreIds.join(","));
    router.replace(`${pathname}?${params.toString()}`);
  }, [page, selectedGenreIds, router, pathname, searchParams]);
  const {
    data: genreData,
    error: genreError,
    isLoading: genreIsLoading,
  } = useSWR<Genre[]>("/genre/movie/list?language=en", getGenresFromTMDB);
  const {
    data: movieData,
    error: movieError,
    isLoading: movieIsLoading,
  } = useSWR<Movie[]>(
    `/discover/movie?language=en&with_genres=${selectedGenreIds.join(
      ","
    )}&page=${page}`,
    getMoviesFromTMDB
  );
  const handleClick = (id: number) => {
    setSelectedGenreIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((genreId) => genreId !== id);
      } else {
        return [...prevIds, id];
      }
    });
    setPage(1);
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const selectedGenreNames = genreData
    ?.filter((genre) => selectedGenreIds.includes(genre.id))
    .map((genre) => genre.name)
    .join(", ");
  if (!movieData) return null;
  return (
    <div className="flex flex-col md:gap-8 md:px-10 md:pb-8 md:pt-7">
      <p className="text-2xl font-bold px-5">Search filter</p>
      <div className="md:flex md:gap-[41px]">
        <div className="px-5 py-5">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold">Genres</h1>
            <p>See lists of movies by genre</p>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-4 mt-5 md:mt-8">
            {genreData?.map((genre) => {
              return (
                <div
                  key={genre.id}
                  onClick={() => handleClick(genre.id)}
                  className={`cursor-pointer ${
                    selectedGenreIds.includes(genre.id) ? "selected-badge" : ""
                  }`}
                >
                  <Badge variant="outline">{genre.name}</Badge>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h1 className="font-bold text-2xl px-5">
            {movieData.length} titles in {selectedGenreNames}
          </h1>
          <div>
            {movieData && (
              <div className="mt-5">
                <div className="movie-container">
                  {movieData.map((movie) => {
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
          <div className="mt-5 md:mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={(e) => {
                      if (page === 1) {
                        e.preventDefault();
                        return;
                      }
                      handlePageChange(page - 1);
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(1)}
                    isActive={page === 1}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(2)}
                    isActive={page === 2}
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(3)}
                    isActive={page === 3}
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext onClick={() => handlePageChange(page + 1)} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GenrePage;
