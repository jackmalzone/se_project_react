import React, { createContext, useState, useContext } from "react";

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const showError = (message, timeout = 5000) => {
    setError(message);
    setTimeout(() => setError(null), timeout);
  };

  const clearError = () => setError(null);

  return (
    <ErrorContext.Provider value={{ error, showError, clearError }}>
      {children}
      {error && (
        <div className="error-toast">
          <p>{error}</p>
          <button onClick={clearError} className="error-toast__close">
            ×
          </button>
        </div>
      )}
    </ErrorContext.Provider>
  );
};

export const useError = () => useContext(ErrorContext);
