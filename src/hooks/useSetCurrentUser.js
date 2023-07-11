import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export function useSetCurrentUser() {
  const [useCurrentUser, setCurrentUser] = useOutletContext();

  useEffect(() => {
    setCurrentUser(decodeUserFromTokenCookie);
  });
  return useCurrentUser;
}
