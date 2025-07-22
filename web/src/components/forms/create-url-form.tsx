'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import {
  createUrlSchema,
  type CreateUrlFormData,
  type UrlData,
} from '@/lib/schemas';
import { useCreateUrl } from '@/hooks/use-urls';
import { getUserFriendlyMessage } from '@/lib/errors';
import { toast } from 'sonner';

interface CreateUrlFormProps {
  onUrlCreated?: (url: UrlData) => void;
}

export function CreateUrlForm({ onUrlCreated }: CreateUrlFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const createUrlMutation = useCreateUrl();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUrlFormData>({
    resolver: zodResolver(createUrlSchema),
  });

  const onSubmit = async (data: CreateUrlFormData) => {
    try {
      const result = await createUrlMutation.mutateAsync(data);
      onUrlCreated?.(result);
      reset();
      setIsOpen(false);
      toast.success('Short URL created successfully!');
    } catch (error) {
      const userMessage = getUserFriendlyMessage(error);
      toast.error(userMessage);
      console.error('Failed to create short URL:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
          <Plus className="mr-2 h-4 w-4" />
          Shorten URL
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Short URL</DialogTitle>
          <DialogDescription>
            Enter a long URL to create a shortened version
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="originalUrl">Original URL</Label>
            <Input
              id="originalUrl"
              type="url"
              placeholder="https://example.com/very-long-url"
              {...register('originalUrl')}
              className="w-full"
            />
            {errors.originalUrl && (
              <p className="text-sm text-red-600">
                {errors.originalUrl.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="customCode">Custom Slug (optional)</Label>
            <Input
              id="customCode"
              type="text"
              placeholder="my-custom-link"
              {...register('customCode')}
              className="w-full"
            />
            {errors.customCode && (
              <p className="text-sm text-red-600">
                {errors.customCode.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createUrlMutation.isPending}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {createUrlMutation.isPending ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
