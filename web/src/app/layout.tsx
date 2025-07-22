import { ErrorBoundary } from '@/components/error-boundary';
import { ThemeProvider } from '@/components/theme-provider';
import { ReactQueryProvider } from '@/components/react-query-provider';
import { AuthProvider } from '@/contexts/auth-context';
import { Toaster } from 'sonner';
import './global.css';

export const metadata = {
  title: 'ShortLink - URL Shortener',
  description:
    'Transform your long URLs into powerful, trackable short links with advanced analytics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ErrorBoundary>
              <AuthProvider>
                {children}
                <Toaster position="bottom-right" richColors closeButton />
              </AuthProvider>
            </ErrorBoundary>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
