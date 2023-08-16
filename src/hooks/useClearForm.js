import { useEffect, useRef } from "react";

export default function useClearForm(isIdle, errorMessage) {
  useEffect(() => {
    const form = formRef.current;

    if (!form) return;
    if (!errorMessage && isIdle) formRef.current.reset();

    form.elements.namedItem("thought").focus();
  });

  const formRef = useRef(null);

  return formRef;
}
