import { useEffect, useState } from "react";
import { useActionData } from "react-router-dom";

export default function useError() {
  const errorMessage = useActionData();

  const [isErrorShown, setIsErrorShown] = useState(false);

  useEffect(() => {
    if (errorMessage) setIsErrorShown(true);
  }, [errorMessage]);

  return [errorMessage, isErrorShown, setIsErrorShown];
}
