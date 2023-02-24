import './App.css';
import { AuthProvider } from './context/AuthContext';
import Default from './layouts/Default';
import Routes from './routes';

import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role='alert'>
       <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <Default>
          <Routes />
        </Default>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
