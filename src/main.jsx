import { CssBaseline } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./redux/store.js";
import { SpeedInsights } from "@vercel/speed-insights/next";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <div onContextMenu={(e) => e.preventDefault()}>
        <App />
        <SpeedInsights />
      </div>
    </Provider>
  </StrictMode>
);
