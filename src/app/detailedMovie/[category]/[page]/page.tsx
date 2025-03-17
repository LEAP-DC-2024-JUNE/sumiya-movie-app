"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getMovies } from "@/utils";
import { Moviecard } from "@/components/Moviecard";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
const categoryDisplayNames: { [key: string]: string } = {
  upcoming: "Upcoming Movies",
  popular: "Popular Movies",
  top_rated: "Top Rated Movies",
};
const DetailedMovie = ({ params }: { params: any }) => {
  const router = useRouter();
  const { category, page } = params;
  const currentPage = parseInt(params.page, 10) || 1;
  const [moviesData, setMoviesData] = useState(null);
  const getApiEndpoint = (category: string | null) => {
    switch (category) {
      case "upcoming":
        return "/movie/upcoming";
      case "popular":
        return "/movie/popular";
      case "top_rated":
        return "/movie/top_rated";
      default:
        return "/movie/popular";
    }
  };
  const fetchMovies = async (pageNumber: number, category: string | null) => {
    const endpoint = getApiEndpoint(category);
    try {
      const data = await getMovies(
        `${endpoint}?language=en-US&page=${pageNumber}`
      );
      setMoviesData(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  useEffect(() => {
    fetchMovies(currentPage, category);
  }, [currentPage, category]);

  if (!moviesData) {
    return <div>Loading...</div>;
  }
  const { results: movies, total_pages: totalPages } = moviesData;
  let movieProps = {};
  if (category === "upcoming") {
    movieProps = { upcomingMovies: movies };
  } else if (category === "popular") {
    movieProps = { popularMovies: movies };
  } else if (category === "top_rated") {
    movieProps = { topratedMovies: movies };
  }
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      router.push(`/detailedMovie/${category}/${newPage}`);
    }
  };
  const renderPaginationItems = () => {
    if (!moviesData) return null;
    const { total_pages: totalPages } = moviesData;
    const items = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (currentPage > 1) {
      items.push(
        <PaginationItem key="prev">
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </PaginationItem>
      );
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (currentPage < totalPages) {
      items.push(
        <PaginationItem key="next">
          <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
        </PaginationItem>
      );
    }

    return items;
  };
  return (
    <div className="md:px-[80px] md:py-[52px]">
      <h2 className="px-5 font-bold text-2xl">
        {categoryDisplayNames[category] || "Movies"}
      </h2>
      {moviesData && <Moviecard {...movieProps} />}
      <div className="py-5 md:py-8">
        <Pagination>
          <PaginationContent>{renderPaginationItems()}</PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
export default DetailedMovie;
