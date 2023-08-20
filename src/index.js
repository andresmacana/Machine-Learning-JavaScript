import React from "react";
import ReactDOM from "react-dom/client";
import KMeansClustering from "./Kmeans2"; // Update the path

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <KMeansClustering />
  </React.StrictMode>
);
