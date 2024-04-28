import {useQuery} from '@tanstack/react-query';
import api from '../utils/api';

const API_KEY = process.env.API_KEY;

const fetchMoviesReviews = async (movieId) => {
  return await api.get(`/movie/${movieId}/reviews?api_key=${API_KEY}`);
};

export const useMoviesReviewsQuery = (movieId) => {
  return useQuery({
    queryKey: [`movieReviews-${movieId}`],
    queryFn: () => fetchMoviesReviews(movieId),
    select: (result) => result.data,
  });
};