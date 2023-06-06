export const decodeUserFromTokenCookie = () => {
  const token = getTokenCookie();

  // Decode the token
  // https://developer.mozilla.org/en-US/docs/Web/API/atob
  const decoded = token ? JSON.parse(atob(token.split(".")[1])) : null;

  // Check if the token has expired
  return decoded?.exp > Math.floor(Date.now() / 1000)
    ? decoded.data.username
    : null;
};

export const delCookieToken = () => {
  document.cookie =
    "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
};

export const getTokenCookie = () => {
  return (
    document.cookie
      .split(";")
      .map((item) => item.trim())
      .find((item) => item.startsWith("token="))
      // `slice` 'token=' off the beginning (if we find it).
      ?.slice(6)
  );
};

export const setTokenCookie = (token) => {
  // Set the token as a cookie with a one-year expiration
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 365 * 24 * 60 * 60 * 1000);

  // https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie#write_a_new_cookie
  document.cookie =
    "token=" +
    token +
    "; path=/; expires=" +
    expirationDate.toUTCString() +
    "; SameSite=Lax";
};

export const validateRegistrationPasswords = (password, confirmedPassword) => {
  const errors = [];

  if (password.length < 8)
    errors.push("Password must be at least 8 characters.");

  if (password !== confirmedPassword) errors.push("Passwords do not match.");

  if (errors.length) throw new Error(errors.join("\n"));
};
