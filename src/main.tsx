

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminGuard from "./pages/admin/AdminGuard";
import AdminNoticias from "./pages/admin/AdminNoticias";
import AdminNuevaNoticia from "./pages/admin/AdminNuevaNoticia";
import AdminEditarNoticia from "./pages/admin/AdminEditarNoticia";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Sitio público */}
        <Route path="/" element={<App />} />

        {/* Login administrativo */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* Área administrativa protegida */}
        <Route element={<AdminGuard />}>
        
          <Route
            path="/admin/noticias"
            element={<AdminNoticias />}
          />

          <Route
            path="/admin/noticias/nueva"
            element={<AdminNuevaNoticia />}
          />

          <Route
            path="/admin/noticias/editar/:id"
            element={<AdminEditarNoticia />}
          />

        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);