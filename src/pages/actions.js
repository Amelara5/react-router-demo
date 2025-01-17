import { redirect } from "react-router-dom";
import api from "../services/api";
import {
  decodeUserFromTokenCookie,
  setTokenCookie,
  validateRegistrationPasswords,
} from "../services/utils";

export const mutateThought = async ({ request }) => {
  const fd = await request.formData();
  const author = decodeUserFromTokenCookie();
  try {
    switch (request.method) {
      case "POST": {
        const data = Object.fromEntries(fd);

        await api.addThought({ thought: data.thought, author });
        break;
      }
      case "DELETE": {
        await api.deleteThought(
          Object.fromEntries(fd),
          decodeUserFromTokenCookie()
        );
        break;
      }
      case "PUT": {
        const id = fd.get("id");
        const thought = fd.get("thought");

        await api.updateThought(
          { thought: thought + " (edited)", id, author },
          decodeUserFromTokenCookie()
        );
        return null;
      }
    }

    return null;
  } catch (error) {
    return error.message;
  }
};

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

export const createThought = async ({ request }) => {
  const fd = await request.formData();
  const data = Object.fromEntries(fd);
  const author = decodeUserFromTokenCookie();

  await api.addThought({ thought: data.thought, author });

  return redirect("/");

  // *----- Manavs way -----*
  // const thought = Object.get("thought")
  // 'decodeUserFromTokenCookie' is to Revalidate the user token whenever we submit a thought
  // const author = decodeUserFromTokenCookie()
  // await api.addThought({thought, author})
  // retun redirect("/")
};
