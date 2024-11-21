import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        logout();
        navigate("/login");
      }}
      label="Logout"
      severity="danger"
    />
  );
};

export default LogoutButton;
