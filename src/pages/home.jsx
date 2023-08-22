import { Suspense } from "react";
import { Await, Form, useLoaderData, useNavigation } from "react-router-dom";
import Error from "../components/error";
import { TextInput } from "../components/form";
import Loading from "../components/loading";
import ThoughtList from "../components/thoughts/thought-list";
import useError from "../hooks/useError";
import useForm from "../hooks/useForm";
import { useSetCurrentUser } from "../hooks/useSetCurrentUser";

export default function Home() {
  const { thoughts } = useLoaderData();
  const useCurrentUser = useSetCurrentUser();
  const navigation = useNavigation();

  const [errorMessage, isErrorShown, setIsErrorShown] = useError();
  const isIdle = navigation.state === "idle";

  const { formRef, thought2Edit, setThought2Edit } = useForm(
    isIdle,
    errorMessage
  );

  const { thought } = thought2Edit || {};
  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={thoughts} errorElement={<Error />}>
        {useCurrentUser && (
          <Form
            method={thought2Edit ? "PUT" : "POST"}
            className=" mb-6"
            ref={formRef}
            onSubmit={() => {
              setIsErrorShown(false);
            }}
          >
            <TextInput
              id={"thought"}
              placeholder={"What's on your mind 🤔💭"}
              defaultValue={thought}
            />
            {errorMessage && isErrorShown && (
              <p className="error">{errorMessage}</p>
            )}
            <button className="btn" type="submit" disabled={!isIdle}>
              {thought2Edit ? "Edit" : "Add"} Thought
            </button>
            {thought2Edit && (
              <input type="hidden" name="id" value={thought2Edit.id} />
            )}
          </Form>
        )}

        <ThoughtList setThought2Edit={setThought2Edit} />
      </Await>
    </Suspense>
  );
}
