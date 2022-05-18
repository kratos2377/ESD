import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCCqLVwJ5q5hqi1IxcSvAfyWqgulFzwYCM",
  authDomain: "esd-proj.firebaseapp.com",
  databaseURL: "https://esd-proj-default-rtdb.firebaseio.com",
  projectId: "esd-proj",
  storageBucket: "esd-proj.appspot.com",
  messagingSenderId: "688023967005",
  appId: "1:688023967005:web:23bd42cebde9cb53c8fdf4",
  measurementId: "G-FGX6XPD8XL",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
