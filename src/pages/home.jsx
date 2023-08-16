import { Suspense } from "react";
import { Await, Form, useLoaderData, useNavigation } from "react-router-dom";
import Error from "../components/error";
import { TextInput } from "../components/form";
import Loading from "../components/loading";
import ThoughtList from "../components/thoughts/thought-list";
import useClearForm from "../hooks/useClearForm";
import useError from "../hooks/useError";
import { useSetCurrentUser } from "../hooks/useSetCurrentUser";

export default function Home() {
  const { thoughts } = useLoaderData();
  const useCurrentUser = useSetCurrentUser();
  const navigation = useNavigation();

  const [errorMessage, isErrorShown, setIsErrorShown] = useError();
  const isIdle = navigation.state === "idle";

  const formRef = useClearForm(isIdle, errorMessage);
  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={thoughts} errorElement={<Error />}>
        {useCurrentUser && (
          <Form
            method="post"
            className=" mb-6"
            ref={formRef}
            onSubmit={() => {
              setIsErrorShown(false);
            }}
          >
            <TextInput
              id={"thought"}
              placeholder={"What's on your mind 🤔💭"}
            />
            {errorMessage && isErrorShown && (
              <p className="error">{errorMessage}</p>
            )}
            <button className="btn" type="submit" disabled={!isIdle}>
              Add Thought
            </button>
          </Form>
        )}

        <ThoughtList />
      </Await>
    </Suspense>
  );
}
