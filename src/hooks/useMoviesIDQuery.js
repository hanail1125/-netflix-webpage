import {useQuery} from '@tanstack/react-query';
import api from '../utils/api';

const API_KEY = process.env.REACT_APP_API_KEY;

const fetchMoviesId = async (movieId) => {
  return await api.get(`/movie/${movieId}?language=ko-KR&api_key=${API_KEY}`);
};

export const useMoviesIdQuery = (movieId) => {
  return useQuery({
    queryKey: [`movie-${movieId}`],
    queryFn: () => fetchMoviesId(movieId),
    select: (result) => result.data,
  });
};