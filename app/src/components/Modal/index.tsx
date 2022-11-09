import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChildrenProp } from "../../myTypes";

export const Modal = ({ children }: ChildrenProp) => {
  const ref = useRef(document.createElement("div"));

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot?.appendChild(ref.current);
    return () => {
      modalRoot?.removeChild(ref.current);
    };
  }, []);

  return createPortal(children, ref.current);
};
