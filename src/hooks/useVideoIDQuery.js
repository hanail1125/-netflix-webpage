import {useQuery} from '@tanstack/react-query';
import api from '../utils/api';

const API_KEY = process.env.REACT_APP_API_KEY;

const fetchVideoId = async (movieId) => {
  return await api.get(`/movie/${movieId}/videos?api_key=${API_KEY}`);
};

export const useVideoIdQuery = (movieId) => {
  return useQuery({
    queryKey: [`fetchVideoId-${movieId}`],
    queryFn: () => fetchVideoId(movieId),
    select: (result) => result.data,
  });
};