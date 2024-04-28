import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchSearchMovie = async ({ keyword, page }) => {
  return keyword
    ? await api.get(`/search/movie?language=ko-KR&query=${keyword}&page=${page}`)
    : await api.get(`/movie/popular?language=ko-KR&page=${page}`);
};

export const useSearchMovieQuery = ({ keyword, page }) => {
  return useQuery({
    queryKey: ['movie-search', { keyword, page }],
    queryFn: () => fetchSearchMovie({ keyword, page }),
    select: (result) => result.data
  });
};