import { useCallback, useMemo, useState } from "react";
import { AuthContext } from ".";

const user = localStorage.getItem("user") || "null";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(JSON.parse(user));
  const updateAuth = useCallback((user) => {
    setAuth(user);
    localStorage.setItem("user", JSON.stringify(user));
  }, []);
  const contextValue = useMemo(
    () => ({ auth, setAuth: updateAuth }),
    [auth, updateAuth]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
