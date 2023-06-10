import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";
import { verifyToken } from "../../utils/auth";

const Register = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setAuth(user);
        verifyToken(user.stsTokenManager?.accessToken);
        navigate("/");
      })
      .catch((error) => {
        if (error?.message) {
          toast.error(error.message);
        } else {
          toast.error("OOPS! TRY AGAIN!");
        }
      });
  };

  return (
    <main className="d-flex justify-content-center align-items-center vh-100">
      <section>
        <div className="text-center">
          <h1>Register</h1>

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
              <button onClick={onSubmit} className="btn btn-primary">
                Sign up
              </button>
            </div>
          </form>

          <p>
            Already have an account? <NavLink to="/sign-in">Sign in</NavLink>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;
