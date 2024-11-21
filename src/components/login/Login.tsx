import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "An error occurred during login.");
    }
  };

  return (
    <div className="grid justify-content-center mt-4">
      <Card>
        <form onSubmit={handleSubmit}>
          <div className="grid">
            <div className="col-12 flex justify-content-center">
              <h2>Login</h2>
            </div>{" "}
            <div className="my-2 flex col-12 justify-content-center">
              <FloatLabel>
                <InputText
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="username">Username</label>
              </FloatLabel>
            </div>
            <div className="my-2 flex col-12 justify-content-center">
              <FloatLabel>
                <InputText
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Password</label>
              </FloatLabel>
            </div>
            {error && (
              <div className="flex col-12 justify-content-center">
                <p style={{ color: "red" }}>{error}</p>
              </div>
            )}
            <div className="flex col-12 justify-content-center">
              <Button severity="info" type="submit">
                Login
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
