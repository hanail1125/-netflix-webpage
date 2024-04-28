import {useQuery} from '@tanstack/react-query';
import api from '../utils/api';

const API_KEY = process.env.REACT_APP_API_KEY;

const fetchMovies = async (movieType) => {
  return await api.get(`/movie/${movieType}?language=ko-KR&api_key=${API_KEY})`);
};

export const useMoviesQuery = (movieType) => {
  return useQuery({
    queryKey: [`movie-${movieType}`],
    queryFn: () => fetchMovies(movieType),
    select: (result) => result.data,
  });
};