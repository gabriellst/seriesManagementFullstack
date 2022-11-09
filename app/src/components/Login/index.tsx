import { useState, FormEvent } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { AccessTokenResponse } from "../../myTypes";
import useAuth from "../../hooks/useAuth";
import axiosPrivate from "../../hooks/useAxiosPrivate";

export default function Login() {
  const [passwordInput, setPasswordInput] = useState("");
  const { token, setTokenValue } = useAuth();
  const [loginError, setLoginError] = useState(false);
  const axios = axiosPrivate();
  const navigate = useNavigate();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post<AccessTokenResponse>("/login", { password: passwordInput })
      .then((res) => {
        setTokenValue(res.data.accessToken);
        navigate("/interface");
      })
      .catch(() => {
        setPasswordInput("");
        setLoginError(true);
      });
  };

  return token ? (
    <Navigate to="/interface" />
  ) : (
    <main>
      <div className="titles">
        <h2 className="subtitle">Bem-vindo ao</h2>
        <h1 className="maintitle">Series Management</h1>
      </div>
      <form
        id="form-login"
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <input
          className={"form-input" + (loginError ? " error" : "")}
          placeholder="Digite a senha"
          type="password"
          value={passwordInput}
          autoComplete="off"
          onChange={(e) => {
            setPasswordInput(e.target.value);
            !passwordInput ? setLoginError(false) : null;
          }}
        />
        <button className="button" type="submit">
          Entrar
        </button>
      </form>
    </main>
  );
}