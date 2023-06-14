import React, { useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AuthGuard from "../../contexts/auth/AuthGuard";
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const userName = useMemo(() => auth?.email.split("@")[0], [auth]);

  const onLogout = useCallback(() => {
    setAuth(null);
    toast.info("Logged Out. See you again soon!");
  }, [setAuth]);

  const uploadFile = useCallback(() => {
    navigate("/upload");
  }, [navigate]);

  return (
    <AuthGuard>
      <main className="d-flex justify-content-center align-items-center vh-100">
        <section>
          <div className="text-center">
            <h1>
              Welcome, <strong>{userName}</strong>!
            </h1>
            <div>
              <button onClick={uploadFile} className="btn btn-primary">
                Upload
              </button>{' '}
              <button onClick={onLogout} className="btn btn-primary">
                Logout
              </button>
            </div>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
};

export default Home;
