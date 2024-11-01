import { Navigate } from "react-router-dom";
import { getCookie } from "../helpers/cookies";
import { mode } from "../config";

const AuthGuard = ({ children }: any) => {
  const session = () => {
    if (
      (!!getCookie("JWT") || !!localStorage.getItem("offlineSessionActive")) &&
      !mode
    )
      return (
        !!getCookie("JWT") ||
        !!localStorage.getItem("offlineSessionActive") ||
        mode
      );
  };
  return session() ? children : <Navigate to="/landing" />;
};
export default AuthGuard;
