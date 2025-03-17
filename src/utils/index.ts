import axios from "axios";
// export const getPopularMovies = async () => {
//   const response = await axios.get(
//     "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
//     {
//       headers: {
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTViMmRmZGFjYjE0ZTUwNTY3M2ZjZWFhYmU3ZTdjOCIsIm5iZiI6MTczOTkzMjc0NS4wMjgsInN1YiI6IjY3YjU0NDQ5OTAyZjVlMjBhNjg4OTAyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zGQH9OC865WRC3Y60vJxueZkvZMlJaOxx_Qeo8J1oOE",
//       },
//     }
//   );
//   const data = response.data.results;
//   return data;
// };
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
  vote_average?: number;
}
export interface CastMember {
  id: number;
  name: string;
  character: string;
}
export interface CrewMember {
  id: number;
  name: string;
  job: string;
}
export interface ActorData {
  cast: CastMember[];
  crew: CrewMember[];
}
export interface Genre {
  id: number;
  name: string;
}
export interface TrailerData {
  key: string;
  id: string;
}
export const getMoviesFromTMDB = async (url: string): Promise<Movie[]> => {
  const response = await axios.get(`https://api.themoviedb.org/3${url}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTViMmRmZGFjYjE0ZTUwNTY3M2ZjZWFhYmU3ZTdjOCIsIm5iZiI6MTczOTkzMjc0NS4wMjgsInN1YiI6IjY3YjU0NDQ5OTAyZjVlMjBhNjg4OTAyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zGQH9OC865WRC3Y60vJxueZkvZMlJaOxx_Qeo8J1oOE",
    },
  });
  const data: Movie[] = response.data.results;
  return data;
};
export const getGenresFromTMDB = async (url: string): Promise<Genre[]> => {
  const response = await axios.get(`https://api.themoviedb.org/3${url}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTViMmRmZGFjYjE0ZTUwNTY3M2ZjZWFhYmU3ZTdjOCIsIm5iZiI6MTczOTkzMjc0NS4wMjgsInN1YiI6IjY3YjU0NDQ5OTAyZjVlMjBhNjg4OTAyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zGQH9OC865WRC3Y60vJxueZkvZMlJaOxx_Qeo8J1oOE",
    },
  });
  const data: Genre[] = response.data.genres;
  return data;
};
export const MovieIdData = async (url: string) => {
  const response = await axios.get(`https://api.themoviedb.org/3${url}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTViMmRmZGFjYjE0ZTUwNTY3M2ZjZWFhYmU3ZTdjOCIsIm5iZiI6MTczOTkzMjc0NS4wMjgsInN1YiI6IjY3YjU0NDQ5OTAyZjVlMjBhNjg4OTAyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zGQH9OC865WRC3Y60vJxueZkvZMlJaOxx_Qeo8J1oOE",
    },
  });
  const data = response.data.results;
  return data;
};
export const getMovies = async (url: string) => {
  const response = await axios.get(`https://api.themoviedb.org/3${url}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTViMmRmZGFjYjE0ZTUwNTY3M2ZjZWFhYmU3ZTdjOCIsIm5iZiI6MTczOTkzMjc0NS4wMjgsInN1YiI6IjY3YjU0NDQ5OTAyZjVlMjBhNjg4OTAyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zGQH9OC865WRC3Y60vJxueZkvZMlJaOxx_Qeo8J1oOE",
    },
  });
  return response.data;
};
export const getSingleMovieFromTMDB = async (
  url: string
): Promise<Movie | undefined> => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3${url}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTViMmRmZGFjYjE0ZTUwNTY3M2ZjZWFhYmU3ZTdjOCIsIm5iZiI6MTczOTkzMjc0NS4wMjgsInN1YiI6IjY3YjU0NDQ5OTAyZjVlMjBhNjg4OTAyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zGQH9OC865WRC3Y60vJxueZkvZMlJaOxx_Qeo8J1oOE",
      },
    });

    if (response.status === 200) {
      return response.data as Movie;
    } else {
      console.error("TMDB API Error:", response.status, response.data);
      return undefined;
    }
  } catch (error) {
    console.error("TMDB API Error:", error);
    return undefined;
  }
};
