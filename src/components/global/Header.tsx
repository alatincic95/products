import React from "react";
import "../../styles/Header.css";
import LogoutButton from "../login/Logout";
import { useAuth } from "../../context/AuthContext";

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <img src="/assets/logo.png" alt="Logo" className="logo" />
          <span className="logo-text">KING ICT</span>
        </div>
        <div className="header-text">
          <p>Ante Latinčić - King ICT task</p>
        </div>
        <div className="header-text">
          {isAuthenticated ? (
            <div>
              <LogoutButton />
            </div>
          ) : (
            <p>Please log in</p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
