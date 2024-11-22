import React from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import useLogin from "../../hooks/useLogin";

const Login: React.FC = () => {
  const { error, handleSubmit, username, password, setPassword, setUsername } =
    useLogin();

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
