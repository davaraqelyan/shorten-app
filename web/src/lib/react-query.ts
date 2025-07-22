import { QueryClient } from '@tanstack/react-query';
import { REACT_QUERY_CONFIG } from '@/lib/constants';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: REACT_QUERY_CONFIG.STALE_TIME.DEFAULT,
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors except for network errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < REACT_QUERY_CONFIG.RETRY_ATTEMPTS;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});
