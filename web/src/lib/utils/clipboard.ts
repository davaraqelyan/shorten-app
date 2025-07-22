import { toast } from 'sonner';

export async function copyToClipboard(text: string, successMessage?: string): Promise<boolean> {
  try {
    if (!navigator.clipboard) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        textArea.remove();
        toast.success(successMessage || 'Copied to clipboard!');
        return true;
      } catch (err) {
        textArea.remove();
        throw new Error('Failed to copy using execCommand');
      }
    }

    await navigator.clipboard.writeText(text);
    toast.success(successMessage || 'Copied to clipboard!');
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    toast.error('Failed to copy to clipboard. Please try again.');
    return false;
  }
}