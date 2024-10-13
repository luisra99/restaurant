import { Navigate } from "react-router-dom";
import { getCookie } from "../helpers/cookies";
import { mode } from "../config";
import { useSession } from "../session/state";

const AuthGuard = ({ children }: any) => {
  const [user, , functions, , ,] = useSession();
  const session = (): boolean => {
    if (
      (!!getCookie("JWT") || !!localStorage.getItem("offlineSessionActive")) &&
      !user?.PI &&
      !mode
    )
      functions?.restore?.();
    return (
      !!getCookie("JWT") ||
      !!localStorage.getItem("offlineSessionActive") ||
      mode
    );
  };
  return session() ? children : <Navigate to="/landing" />;
};
export default AuthGuard;
