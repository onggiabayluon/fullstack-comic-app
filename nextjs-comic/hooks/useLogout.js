import { USER_ACTIONS } from "~/contexts/AuthProvider";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch, setAuthTokens } = useAuthContext();

  const logoutUser = () => {
    // Remove auth Token
    setAuthTokens(null);

    // Logout
    dispatch({ type: USER_ACTIONS.LOGOUT });
  };

  return { logoutUser };
};
