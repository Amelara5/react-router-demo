import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { decodeUserFromTokenCookie } from "../services/utils";

export function useSetCurrentUser() {
  const [useCurrentUser, setCurrentUser] = useOutletContext();

  useEffect(() => {
    setCurrentUser(decodeUserFromTokenCookie());
  });
  return useCurrentUser;
}
