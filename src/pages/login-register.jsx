import { Form, useNavigation } from "react-router-dom";
import { TextInput } from "../components/form";
import useError from "../hooks/useError";
import useRegistering from "../hooks/useRegistering";

export default function LoginRegister() {
  const navigation = useNavigation();

  const [isRegistering, setIsRegistering] = useRegistering();

  let [errorMessage, isErrorShown, setIsErrorShown] = useError();

  return (
    <Form
      method="post"
      onChange={() => {
        setIsErrorShown(false);
      }}
      onSubmit={() => {
        if (navigation.state === "submitting") errorMessage = null;
      }}
    >
      <h2>{isRegistering ? "Register" : "Login"}</h2>

      {errorMessage && isErrorShown && <p className="error">{errorMessage}</p>}
      {/* Conditional Rendering (https://react.dev/learn/conditional-rendering) */}
      {/* {isRegistering && <TextInput id="name" placeholder="Your Full Name" />} */}

      <TextInput id="username" />
      <TextInput type="password" id="password" />
      {isRegistering && (
        <TextInput
          id="confirmedPassword"
          type="password"
          // Don't require the confirm password field. We will be checking it in 'handleSubmit' anyway.
          required={false}
        />
      )}

      <button type="submit" className="btn">
        {isRegistering ? "Register" : "Login"}
      </button>

      <button
        className="text-orange-500"
        type="button"
        onClick={() => setIsRegistering((prev) => !prev)}
      >
        {isRegistering ? "Already have an account?" : "Don't have an account?"}
      </button>
    </Form>
  );
}
