import { useEffect, useRef, useState } from "react";

export default function useClearForm(isIdle, errorMessage) {
  const [thought2Edit, setThought2Edit] = useState(null);

  useEffect(() => {
    const form = formRef.current;

    if (!form) return;
    if (!errorMessage && isIdle) {
      formRef.current.reset();
      setThought2Edit(null);
    }

    form.elements.namedItem("thought").focus();
  }, [errorMessage, setThought2Edit, isIdle]);

  const formRef = useRef(null);

  return { formRef, thought2Edit, setThought2Edit };
}
