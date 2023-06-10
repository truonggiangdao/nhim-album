import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/auth";
import { verifyToken } from "../../utils/auth";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        onLoginSuccess(userCredential.user);
        toast.success("Login Successfully!");
      })
      .catch((error) => {
        if (error?.message) {
          toast.error(error.message);
        } else {
          toast.error("OOPS, TRY AGAIN!");
        }
      });
  };

  return (
    <main className="d-flex justify-content-center align-items-center vh-100">
      <section>
        <div className="text-center">
          <h1>Login</h1>

          <form>
            <div className="mb-3">
              <label htmlFor="email-address" className="form-label">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="form-control"
                placeholder="Email address"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="form-control"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div>
              <button onClick={onLogin} className="btn btn-primary">
                Login
              </button>
            </div>
          </form>

          <p>
            No account yet? <NavLink to="/register">Register</NavLink>
          </p>
        </div>
      </section>
    </main>
  );
};

const LoginWrapper = () => {
  const navigate = useNavigate();

  return (
    <AuthContext.Consumer>
      {({ setAuth }) => (
        <Login
          onLoginSuccess={(user) => {
            setAuth(user);
            verifyToken(user.stsTokenManager?.accessToken);
            navigate("/");
          }}
        />
      )}
    </AuthContext.Consumer>
  );
};

export default LoginWrapper;
