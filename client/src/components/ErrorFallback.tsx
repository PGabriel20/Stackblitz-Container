import React from 'react';

const ErrorFallback: React.FC = ({ error, resetErrorBoundary }) => {
  return (
    <div>
      <h2>Oh no! There was an error on our end.</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default ErrorFallback;
