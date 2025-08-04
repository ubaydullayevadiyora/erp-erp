import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./routes/route.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Router />
  </QueryClientProvider>
);
