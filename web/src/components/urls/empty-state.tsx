import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'lucide-react';
import { CreateUrlForm } from '@/components/forms/create-url-form';

export function EmptyState() {
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <Link className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-6" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          No URLs yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-md">
          Create your first shortened URL to get started tracking clicks and
          managing your links
        </p>
        <CreateUrlForm />
      </CardContent>
    </Card>
  );
}