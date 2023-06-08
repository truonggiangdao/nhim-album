import React, { useCallback, useContext, useMemo } from "react";
import AuthGuard from "../../contexts/auth/AuthGuard";
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";

const Home = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const userName = useMemo(() => auth?.email.split("@")[0], [auth]);

  const onLogout = useCallback(() => {
    setAuth(null);
    toast.info("Logged Out. See you again soon!");
  }, [setAuth]);

  return (
    <AuthGuard>
      <main className="d-flex justify-content-center align-items-center vh-100">
        <section>
          <div className="text-center">
            <h1>
              Welcome, <strong>{userName}</strong>!
            </h1>
            <div>
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
