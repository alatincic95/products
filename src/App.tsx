import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProductsPage from "./components/product/ProductsPage";
import Login from "./components/login/Login";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Header from "./components/global/Header";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={<Navigate to="/" />} // Redirect to the homepage for any non-existent route
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
