import { useEffect } from "react";

export function useOverlayClick(ref, closeModal) {
  useEffect(() => {
    const handleOverlayClick = (e) => {
      if (e.target === ref.current) {
        closeModal();
      }
    };

    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener("mousedown", handleOverlayClick);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("mousedown", handleOverlayClick);
      }
    };
  }, [ref, closeModal]);
}
