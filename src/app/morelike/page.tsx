"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { MovieIdData, Movie } from "@/utils";
import { Star } from "@/components/svg/Star";
import useSWR from "swr";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState, useEffect } from "react";
const MoreLike: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const movieId = searchParams.get("id");
  const initialPage = searchParams.get("page")
    ? parseInt(searchParams.get("page")!, 10)
    : 1;
  const [page, setPage] = useState(initialPage);
  const {
    data: similiarmovieData,
    error: similiarmovieError,
    isLoading: similiarmovieIsLoading,
  } = useSWR<Movie[]>(
    `/movie/${movieId}/similar?language=en-US&page=${page}`,
    MovieIdData
  );
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", newPage.toString());
    router.push(`?${newSearchParams.toString()}`);
  };
  useEffect(() => {}, [page, movieId]);
  return (
    <div className="md:px-10 md:py-10">
      <h1 className="font-bold text-2xl px-5">More like this</h1>
      <div>
        {similiarmovieData && (
          <div>
            <div className="movie-container">
              {similiarmovieData.map((movie) => {
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
      <div className="mt-5 md:mt-8 md:flex">
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
  );
};
export default MoreLike;
