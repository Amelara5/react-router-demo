export const registerOrLogin = async ({ request }) => {
  console.log("Submitted");
  console.log(request);

  const fd = await request.formData();
  const submittedUser = Object.fromEntries(fd);
  console.log(submittedUser);
  return null;
};
