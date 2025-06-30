import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/Router.jsx";
import AuthProvide from "./contexts/AuthContext/AuthProvide.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient =new QueryClient()
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvide>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvide>
    </QueryClientProvider>
  </StrictMode>
);
