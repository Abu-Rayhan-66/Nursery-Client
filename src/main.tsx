import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Routes from "./Routes/Routes.tsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store.ts";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={Routes}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
