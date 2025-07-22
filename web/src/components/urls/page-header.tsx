import { CreateUrlForm } from '@/components/forms/create-url-form';

export function PageHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          My URLs
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and track your shortened URLs
        </p>
      </div>
      <CreateUrlForm />
    </div>
  );
}