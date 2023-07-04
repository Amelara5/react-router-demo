import { redirect } from "react-router-dom";
import api from "../services/api";
import {
  setTokenCookie,
  validateRegistrationPasswords,
} from "../services/utils";

export const registerOrLogin = async ({ request }) => {
  const fd = await request.formData();
  const submittedUser = Object.fromEntries(fd);
  const isRegistering = "confirmedPassword" in submittedUser;

  try {
    if (isRegistering)
      validateRegistrationPasswords(
        submittedUser.password,
        submittedUser.confirmedPassword
      );

    const { token } = isRegistering
      ? await api.registerUser(submittedUser)
      : await api.loginUser(submittedUser);

    setTokenCookie(token);

    return redirect("/");
  } catch (error) {
    return error.message;
  }
};
