'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { AppError, getErrorMessage, getUserFriendlyMessage } from '@/lib/errors'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorId: string
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null,
      errorId: ''
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorId: Date.now().toString(36) + Math.random().toString(36).substring(2)
    }
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, {
      errorId: this.state.errorId,
      componentStack: errorInfo.componentStack,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorId: '' })
  }

  handleReload = () => {
    window.location.reload()
  }

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      const isAppError = AppError.isAppError(this.state.error)
      const userMessage = this.state.error ? getUserFriendlyMessage(this.state.error) : 'Something went wrong'
      const technicalMessage = this.state.error ? getErrorMessage(this.state.error) : 'Unknown error'

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-red-900 dark:text-red-100">
                Oops! Something went wrong
              </CardTitle>
              <CardDescription className="text-red-700 dark:text-red-300">
                {userMessage}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isAppError && (
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                    {technicalMessage}
                  </p>
                  {process.env.NODE_ENV === 'development' && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      Error ID: {this.state.errorId}
                    </p>
                  )}
                </div>
              )}
              
              <div className="flex flex-col gap-2">
                <Button 
                  onClick={this.handleRetry}
                  className="w-full"
                  variant="default"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                
                <Button 
                  onClick={this.handleReload}
                  className="w-full"
                  variant="outline"
                >
                  Reload Page
                </Button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    Technical Details
                  </summary>
                  <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap max-h-40 overflow-auto">
                    {this.state.error.stack}
                  </div>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) {
  const ComponentWithErrorBoundary = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  )

  ComponentWithErrorBoundary.displayName = `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`

  return ComponentWithErrorBoundary
}