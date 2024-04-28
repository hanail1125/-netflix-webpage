import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieGenre = async () => {
  return await api.get(`/genre/movie/list?language=ko-KR`);
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