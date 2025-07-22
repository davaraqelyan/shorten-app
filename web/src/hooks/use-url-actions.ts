import { useDeleteUrl } from '@/hooks/use-urls';
import { getUserFriendlyMessage } from '@/lib/errors';
import { copyToClipboard } from '@/lib/utils/clipboard';
import { toast } from 'sonner';

export function useUrlActions() {
  const deleteUrlMutation = useDeleteUrl();

  const deleteUrl = async (id: string) => {
    try {
      await deleteUrlMutation.mutateAsync(id);
      toast.success('URL deleted successfully!');
    } catch (error) {
      console.error('Failed to delete URL:', error);
      toast.error(getUserFriendlyMessage(error));
    }
  };

  const copyUrl = async (url: string) => {
    await copyToClipboard(url, 'URL copied to clipboard!');
  };

  const openOriginalUrl = (url: string) => {
    window.open(url, '_blank');
  };

  return {
    deleteUrl,
    copyUrl,
    openOriginalUrl,
    isDeleting: deleteUrlMutation.isPending,
  };
}