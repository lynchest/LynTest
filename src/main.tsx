import { createRoot } from "react-dom/client";
import { StrictMode, Component, ReactNode } from "react";
import App from "./App.tsx";
import indexCss from "./index.css?url";

// Function to load CSS asynchronously
function loadCssAsync(url: string, callback: () => void) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  link.onload = callback;
  link.onerror = () => {
    console.error("Failed to load critical CSS.");
    callback(); // Still render the app even if CSS fails
  };
  document.head.appendChild(link);
}

// Error boundary component
interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Application error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Bir hata oluştu</h2>
            <p className="text-gray-600">Lütfen sayfayı yenileyin</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sayfayı Yenile
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Load CSS and then render the app
loadCssAsync(indexCss, () => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
});
