import { useEffect } from "react";

export function useOutsideAlerter(ref : React.RefObject<HTMLElement>, callback: Function) {
    function handleClickOutside(event : MouseEvent) : void {
      if (ref.current && ref.current.offsetParent !== null && event.target instanceof Node && !ref.current.contains(event.target)) {
        callback()
      }
    }
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
}