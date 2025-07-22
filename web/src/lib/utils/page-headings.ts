const PAGE_HEADINGS: Record<string, string> = {
  '/dashboard/analytics': 'Analytics',
  '/dashboard/urls': 'URLs',
  '/dashboard/settings': 'Settings',
};

export function getPageHeading(pathname: string): string {
  return PAGE_HEADINGS[pathname] || 'Dashboard';
}