import { redirect } from "react-router-dom";
import api from "../services/api";
import { validateRegistrationPasswords } from "../services/utils";

export const registerOrLogin = async ({ request }) => {
  //   console.log("Submitted");
  //   console.log(request);

  const fd = await request.formData();
  const submittedUser = Object.fromEntries(fd);

  //   console.log(submittedUser);

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
  return token;
};
