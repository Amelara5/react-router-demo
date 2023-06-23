import { redirect } from "react-router-dom";
import api from "../services/api";
import { validateRegistrationPasswords } from "../services/utils";

export const registerOrLogin = async ({ request }) => {
  const fd = await request.formData();
  const submittedUser = Object.fromEntries(fd);

  try {
    validateRegistrationPasswords(
      submittedUser.password,
      submittedUser.confirmedPassword
    );

    const { token } = await api.registerUser(submittedUser);
    setTokenCookie(token);

    return redirect("/");
  } catch (error) {
    return error.message;
  }
};
