import { createRoot } from "react-dom/client";
import { StrictMode, Component, ReactNode, useState, useEffect } from "react";
import App from "./App.tsx";
import indexCss from "./index.css?url";
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

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

// Application storage version
// Bu sürümü her güncelleme sonrası değiştirerek local storage'ın temizlenmesini tetikleyebilirsiniz.
const APP_STORAGE_VERSION = import.meta.env.VITE_APP_VERSION;

// Storage Update Manager Component
const StorageUpdateManager = ({ children }: { children: ReactNode }) => {
  const [isUpdateRequired, setIsUpdateRequired] = useState(false);

  useEffect(() => {
    // Check for application version mismatch
    const storedVersion = localStorage.getItem('appStorageVersion');
    if (storedVersion !== APP_STORAGE_VERSION) {
      setIsUpdateRequired(true);
      
      // Apply theme from localStorage to make the update page match the user's theme
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        // next-themes stores the theme with quotes, so we remove them.
        document.documentElement.className = storedTheme.replace(/"/g, '');
      }
    }
  }, []);

  const handleConfirm = () => {
    localStorage.clear();
    localStorage.setItem('appStorageVersion', APP_STORAGE_VERSION);
    window.location.reload();
  };

  if (isUpdateRequired) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center p-8 max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Uygulama Güncellendi</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Uygulamanın en son sürümle uyumlu çalışabilmesi için tarayıcı verilerinizin temizlenmesi gerekiyor. Bu işlem, kaydedilmiş ayarlarınızı veya oturumunuzu sıfırlayabilir.
          </p>
          <button
            onClick={handleConfirm}
            className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          >
            Onayla ve Devam Et
          </button>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            Onaylamazsanız uygulama beklendiği gibi çalışmayabilir.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};


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
  inject(); // Vercel Analytics'i başlat
  injectSpeedInsights(); // Vercel Speed Insights'ı başlat
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ErrorBoundary>
        <StorageUpdateManager>
          <App />
        </StorageUpdateManager>
      </ErrorBoundary>
    </StrictMode>
  );
});
