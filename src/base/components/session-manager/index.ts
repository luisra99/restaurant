import { getCookie } from "@/base/helpers/cookies";
import { useEffect } from "react";
import { useSession } from "@/base/session/state";

function SessionManager() {
  const [status, , { create, restore }, close, setBackDrop] = useSession();
  useEffect(() => {
    if (!!getCookie("session_state")) {
      setBackDrop(true);
      restore()
        .then((userdata: any) => {
          userdata.message ? close() : create(userdata);
        })
        .finally(() => setBackDrop(false));
    }
  }, []);
}

export default SessionManager;
