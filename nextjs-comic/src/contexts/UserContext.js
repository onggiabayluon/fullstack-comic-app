import jwt_decode from "jwt-decode";
import Router from "next/router";
import { createContext, useState } from "react";
import { useAsyncFn } from "~/hooks/useAsync";
import useStorage from "~/hooks/useStorage";
import useUpdateEffect from "~/hooks/useUpdateEffect";
import { login, register } from "~/services/userService";

const UserContext = createContext();

export default UserContext;

export const UserProvider = ({ children }) => {
  const [authTokens, setAuthTokens, removeAuthTokens] = useStorage(
    "authTokens",
    null
  );

  const [user, setUser, removeUser] = useStorage("authTokens", null);

  const loginFn = useAsyncFn(login);
  const registerFn = useAsyncFn(register);

  const [loading, setLoading] = useState(true);

  const loginUser = (username, password) => {
    return loginFn
      .execute({ username, password })
      .then((data) => {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        Router.push("/");
      })
      .catch((err) => console.log(err));
  };

  const registerUser = (username, password, password2) => {
    return registerFn
      .execute({ username, password, password2 })
      .then(() => {
        Router.push("/login");
      })
      .catch((err) => console.log(err));
  };

  const logoutUser = () => {
    // setAuthTokens(null); ❌check here too
    // setUser(null);
    removeUser();
    removeAuthTokens();
    Router.push("/");
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,
  };

  console.log(user);

  useUpdateEffect(() => {
    // if (authTokens) {
    //   setUser(jwt_decode(authTokens.access));
    // }
    setLoading(false);
  }, [authTokens, loading, setUser]);

  return (
    <UserContext.Provider value={contextData}>
      {loading ? null : children}
    </UserContext.Provider>
  );
};
