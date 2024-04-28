import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const API_KEY = process.env.REACT_APP_API_KEY;

const fetchMovieGenre = async () => {
  return await api.get(`/genre/movie/list?language=ko-KR&api_key=${API_KEY}`);
};

export const useMoviesGenreQuery = () => {
  return (
    useQuery({
      queryKey: ['movie-genre'],
      queryFn: fetchMovieGenre,
      select: (result) => result.data.genres,
      staleTime: 300000
    })
  );
};