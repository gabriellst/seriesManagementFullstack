import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Interface from "./components/Interface";
import Login from "./components/Login";
import RequireAuth from "./components/RequireAuth";
import Redirect from "./components/Redirect";
import PersistLogin from "./components/PersistLogin";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    // <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PersistLogin />}>
            <Route path="/login" element={<Login />} />

            <Route element={<RequireAuth />}>
              <Route path="/interface" element={<Interface />} />
            </Route>

            <Route path="/*" element={<Redirect />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    // </StrictMode>
  );
}
