import ky from "ky";
import {
  decodeUserFromTokenCookie,
  getCurrentDateTime,
  getTokenCookie,
} from "./utils";

const authAPI = ky.create({
  // Hooks allow modifications during the request lifecycle. Hook functions may be async and are run serially.
  // These are 'ky' 🪝 hooks, not React hooks.
  hooks: {
    //  https://github.com/sindresorhus/ky#hooksbeforeerror
    beforeError: [
      async (error) => {
        /**
         * If the request received a response,
         * the error will be of type HTTPError and the Response object will be available at error.response.
         * https://github.com/sindresorhus/ky#hooksbeforeretry
         */
        const { response } = error;
        if (response && response.body) {
          // Server sets `message` property on error.
          const { message } = await response.json();
          throw new Error(
            `Authentication Error: ${message || "some other error."} (${
              response.status
            })`
          );
        }

        throw error;
      },
    ],
  },
});

export default {
  async createThought(thought) {
    /**
     * In real life, the server would manage JWT security as part of the request.
     * Here, we are doing this separately as we are managing data via JSON Server.
     */
    const validToken = await authAPI
      .post(`http://localhost:3000/users/verify`, {
        json: { token: getTokenCookie() },
      })
      .json();

    if (!validToken) {
      // This will be caught by React and we can clean up context and send the user to login.
      throw new Error("Invalid token");
    }

    return authAPI
      .post(`http://localhost:3001/thoughts`, {
        json: {
          ...thought,
          author: decodeUserFromTokenCookie(),
          ...getCurrentDateTime(),
        },
      })
      .json();
  },
  indexThoughts() {
    return ky.get(`http://localhost:3001/thoughts`).json();
  },
  async showThoughts(author) {
    const allThoughts = await this.indexThoughts();
    const thoughts4Author = allThoughts.filter(
      (thought) => thought.author === author
    );

    if (!thoughts4Author.length) {
      throw new Error("No thoughts found");
    }

    return thoughts4Author;
  },
  registerUser(newUser) {
    return authAPI
      .post(`http://localhost:3000/users/register`, { json: newUser })
      .json();
  },
  loginUser(user) {
    return authAPI
      .post(`http://localhost:3000/users/login`, { json: user })
      .json();
  },
};
