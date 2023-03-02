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
import UserPage from './routes/UserPage/UserPage';
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

var userPermValue = localStorage.getItem("userPerms");

/**
 * Adds the userPerms value from local storage to all HTTP requests originating from the frontend
 * This value is accessed by checking the header called "Authorization"
 * The userPerms value determines whether someone is a Guest, Student, Operator, or Owner
 */
axios.defaults.headers.common['Authorization'] = userPermValue;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/Profile" element={
            <ProtectedRoute requiredPermissionLevel={0} userPermissionLevel={userPermValue}>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/CheckOut" element={
            <ProtectedRoute requiredPermissionLevel={1} userPermissionLevel={userPermValue}>
              <CheckOutPage />
            </ProtectedRoute>
          } />
          <Route path="/CheckIn" element={
            <ProtectedRoute requiredPermissionLevel={1} userPermissionLevel={userPermValue}>
              <CheckInPage />
            </ProtectedRoute>
          } />
          <Route path="/records" element={
            <ProtectedRoute requiredPermissionLevel={2} userPermissionLevel={userPermValue}>
              <RecordPage />
            </ProtectedRoute>
          } />
          <Route path="/Users" element={
            <ProtectedRoute requiredPermissionLevel={2} userPermissionLevel={userPermValue}>
              <UserPage />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
