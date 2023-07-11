import { useState } from "react";
import { decodeUserFromTokenCookie } from "../services/utils";

export default function useCurrentUser() {
  const user = decodeUserFromTokenCookie();
  const [currentUser, setCurrentUser] = useState(user);

  return [currentUser, setCurrentUser];
}
