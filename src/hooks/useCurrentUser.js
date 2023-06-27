import { useState } from "react";
import { getTokenCookie, decodeUserFromTokenCookie } from "../services/utils";

export default function useCurrentUser() {
  const user = decodeUserFromTokenCookie();
  //   const user = getTokenCookie(); <---- Ask why not this?
  const [currentUser, setCurrentUser] = useState(user);

  return [currentUser, setCurrentUser];
}
