import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App/App.jsx";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";
import { ErrorProvider } from "./contexts/ErrorContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <Router basename="/se_project_react/">
        <ErrorProvider>
          <App />
        </ErrorProvider>
      </Router>
    </ErrorBoundary>
  </StrictMode>
);
