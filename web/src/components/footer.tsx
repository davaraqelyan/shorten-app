import { Link as LinkIcon } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-12 max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                <LinkIcon className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight">ShortLink</span>
                <span className="text-xs text-muted-foreground">URL Shortener</span>
              </div>
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              The fastest and most reliable URL shortener service. Transform your long URLs into powerful, 
              trackable short links with advanced analytics.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">Features</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">API</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">Analytics</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">Status</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; 2024 ShortLink. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with Next.js and NestJS
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}