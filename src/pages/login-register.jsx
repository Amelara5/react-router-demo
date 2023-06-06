import { Form } from "react-router-dom";
import { TextInput } from "../components/form";
import useRegistering from "../hooks/useRegistering";

export default function LoginRegister() {
  const [isRegistering, setIsRegistering] = useRegistering();

  return (
    <Form method="POST">
      <h2>{isRegistering ? "Register" : "Login"}</h2>

      {/* Conditional Rendering (https://react.dev/learn/conditional-rendering) */}
      {isRegistering && <TextInput id="name" placeholder="Your Full Name" />}

      <TextInput id="username" />
      <TextInput type="password" id="password" />
      {isRegistering && (
        <TextInput
          id="confirm-password"
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
