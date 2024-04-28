import {useQuery} from '@tanstack/react-query';
import api from '../utils/api';

const fetchVideoId = async (movieId) => {
  return await api.get(`/movie/${movieId}/videos`);
};

export const useVideoIdQuery = (movieId) => {
  return useQuery({
    queryKey: [`fetchVideoId-${movieId}`],
    queryFn: () => fetchVideoId(movieId),
    select: (result) => result.data,
  });
};