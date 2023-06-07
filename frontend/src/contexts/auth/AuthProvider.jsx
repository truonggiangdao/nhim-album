import { useMemo, useState } from "react"
import { AuthContext } from ".";

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const contextValue = useMemo(() => ({ auth, setAuth }), [auth]);

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
