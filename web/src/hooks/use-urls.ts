import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { urlService } from '@/lib/services/url-service';
import { UrlData, CreateUrlFormData } from '@/lib/schemas';
import { REACT_QUERY_CONFIG } from '@/lib/constants';

export const urlKeys = {
  all: ['urls'] as const,
  lists: () => [...urlKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) =>
    [...urlKeys.lists(), { filters }] as const,
  details: () => [...urlKeys.all, 'detail'] as const,
  detail: (id: string) => [...urlKeys.details(), id] as const,
  info: (shortCode: string) => [...urlKeys.all, 'info', shortCode] as const,
};

export function useMyUrls(refetchOnWindowFocus = false) {
  return useQuery({
    queryKey: urlKeys.list({}),
    queryFn: () => urlService.getMyUrls(),
    staleTime: 30 * 1000, // 30 seconds for real-time analytics
    refetchOnWindowFocus: refetchOnWindowFocus,
    refetchOnMount: true,
  });
}

export function useUrlInfo(shortCode: string) {
  return useQuery({
    queryKey: urlKeys.info(shortCode),
    queryFn: () => urlService.getUrlInfo(shortCode),
    enabled: !!shortCode,
    staleTime: REACT_QUERY_CONFIG.STALE_TIME.DEFAULT,
  });
}

export function useCreateUrl() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUrlFormData) => urlService.createShortUrl(data),
    onSuccess: (newUrl) => {
      queryClient.setQueryData<UrlData[]>(urlKeys.list({}), (old) => {
        if (!old) return [newUrl];
        return [newUrl, ...old];
      });

      queryClient.invalidateQueries({ queryKey: urlKeys.lists() });
    },
  });
}

export function useDeleteUrl() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => urlService.deleteUrl(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<UrlData[]>(urlKeys.list({}), (old) => {
        if (!old) return [];
        return old.filter((url) => url.id !== deletedId);
      });

      queryClient.invalidateQueries({ queryKey: urlKeys.lists() });
    },
  });
}
