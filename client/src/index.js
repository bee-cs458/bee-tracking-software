import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomePage from "./routes/HomePage/HomePage";
import CounterPage from "./routes/CounterPage/CounterPage";
import ProfilePage from "./routes/ProfilePage/ProfilePage";
import CheckOutPage from "./routes/CheckOutPage/CheckOutPage";
import CheckInPage from "./routes/CheckInPage/CheckInPage";
import RecordPage from "./routes/RecordsPage/RecordsPage";
import UserPage from './routes/UserPage/UserPage';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/checkOut" element={<CheckOutPage />} />
          <Route path="/checkIn" element={<CheckInPage />} />
          <Route path="/records" element={<RecordPage />} />
          <Route path="/Users" element={<UserPage />} />
          <Route path="counter" element={<CounterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
