import { Suspense, useEffect, useRef } from "react";
import { Await, Form, useLoaderData } from "react-router-dom";
import Error from "../components/error";
import { TextInput } from "../components/form";
import Loading from "../components/loading";
import ThoughtList from "../components/thoughts/thought-list";
import { useSetCurrentUser } from "../hooks/useSetCurrentUser";

export default function Home() {
  useEffect(() => {
    const form = formRef.current();
    if (!form) return;

    form.elements.namedItem("thought").focus();
  });

  const formRef = useRef(null);

  const { thoughts } = useLoaderData();
  const useCurrentUser = useSetCurrentUser();
  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={thoughts} errorElement={<Error />}>
        {useCurrentUser && (
          <Form method="post" className=" mb-6" ref={formRef}>
            <TextInput
              id={"thought"}
              placeholder={"What's on your mind 🤔💭"}
            />
            <button className="btn" type="submit">
              Add Thought
            </button>
          </Form>
        )}

        <ThoughtList />
      </Await>
    </Suspense>
  );
}
