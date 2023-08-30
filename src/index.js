import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import AuthProvider from "./AuthContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
// localStorage.setItem("data", false);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
