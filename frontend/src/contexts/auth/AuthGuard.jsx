import { useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from ".";

const UnAuthContent = ({ auth }) => {
    const navigate = useNavigate();
    const goToLogin = useCallback(() => {
        navigate('/sign-in');
    }, [navigate]);
    const goToRegister = useCallback(() => {
        navigate('/register');
    }, [navigate]);
    const goToHome = useCallback(() => {
        navigate('/home');
    }, [navigate]);

    if (auth)
        return <button type="button" onClick={goToHome}>
            Home
        </button>;

    return (
        <>
            <button type="button" onClick={goToLogin}>Login</button>
            <button type="button" onClick={goToRegister}>Register</button>
        </>
    )
};

const AuthGuard = ({ children }) => {
    return (
        <AuthContext.Consumer>
            {({ auth }) => (
                auth ? <>{children}</> : <UnAuthContent auth={false} />
            )}
        </AuthContext.Consumer>
    );
};

export default AuthGuard;
