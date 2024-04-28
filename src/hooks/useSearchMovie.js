import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const API_KEY = process.env.REACT_APP_API_KEY;

const fetchSearchMovie = async ({ keyword, page }) => {
  return keyword
    ? await api.get(`/search/movie?language=ko-KR&query=${keyword}&page=${page}&api_key=${API_KEY}`)
    : await api.get(`/movie/popular?language=ko-KR&page=${page}&api_key=${API_KEY}`);
};

export const useSearchMovieQuery = ({ keyword, page }) => {
  return useQuery({
    queryKey: ['movie-search', { keyword, page }],
    queryFn: () => fetchSearchMovie({ keyword, page }),
    select: (result) => result.data
  });
};