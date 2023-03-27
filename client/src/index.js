import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomePage from "./routes/HomePage/HomePage";
import ProfilePage from "./routes/ProfilePage/ProfilePage";
import CheckOutPage from "./routes/CheckOutPage/CheckOutPage";
import CheckInPage from "./routes/CheckInPage/CheckInPage";
import RecordPage from "./routes/RecordsPage/RecordsPage";
import UserPage from "./routes/UserPage/UserPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { GlobalStateProvider } from "./components/Context/UserContext";
import SingleAssetPage from "./routes/SingleAssetPage/SingleAssetPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

var theme = "light";

axios.defaults.withCredentials = true;

root.render(
  <React.StrictMode>
    <GlobalStateProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route
              path="/Profile"
              element={
                <ProtectedRoute requiredPermissionLevel={0}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/CheckOut"
              element={
                <ProtectedRoute requiredPermissionLevel={1}>
                  <CheckOutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/CheckIn"
              element={
                <ProtectedRoute requiredPermissionLevel={1}>
                  <CheckInPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/records"
              element={
                <ProtectedRoute requiredPermissionLevel={2}>
                  <RecordPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Users"
              element={
                <ProtectedRoute requiredPermissionLevel={2}>
                  <UserPage />
                </ProtectedRoute>
              }
            />
            <Route path="/asset/:id" element={<SingleAssetPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalStateProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
