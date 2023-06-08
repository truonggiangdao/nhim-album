import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from ".";

const UnAuthContent = ({ auth }) => {
  const navigate = useNavigate();
  const goToLogin = useCallback(() => {
    navigate("/sign-in");
  }, [navigate]);
  const goToRegister = useCallback(() => {
    navigate("/register");
  }, [navigate]);
  const goToHome = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  return (
    <main className="d-flex justify-content-center align-items-center vh-100">
      <section>
        <div className="text-center">
          {auth ? (
            <button type="button" className="btn btn-primary" onClick={goToHome}>
            Home
          </button>
          ) : (
            <>
            <h1>Hello stranger! Please choose an option below:</h1>
            <div>
              <button type="button" className="btn btn-primary" onClick={goToLogin}>
                Login
              </button>{' '}
              <button type="button" className="btn btn-primary" onClick={goToRegister}>
                Register
              </button>
            </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

const AuthGuard = ({ children }) => {
  return (
    <AuthContext.Consumer>
      {({ auth }) => (auth ? <>{children}</> : <UnAuthContent auth={false} />)}
    </AuthContext.Consumer>
  );
};

export default AuthGuard;
