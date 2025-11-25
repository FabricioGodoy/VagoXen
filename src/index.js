import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { MotionConfig } from "framer-motion";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
   <MotionConfig reducedMotion="always" transition={{ duration: 0 }}>
      <App />
    </MotionConfig>
  </StrictMode>
);