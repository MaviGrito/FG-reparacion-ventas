import { Component, ErrorInfo, ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean; error?: Error }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-light p-8 text-center">
          <h1 className="font-poppins text-2xl font-bold text-navy mb-4">Algo salió mal</h1>
          <p className="text-textMain mb-6">Por favor recarga la página.</p>
          <button onClick={() => window.location.reload()} className="bg-coral text-white px-6 py-3 rounded-lg font-semibold hover:bg-coral/90 transition-colors">
            Recargar
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
