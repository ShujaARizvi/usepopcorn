import { useEffect } from "react";

export function useKey(keyCode, callback) {
  useEffect(() => {
    function keydown(e) {
      if (e.code.toLowerCase() === keyCode.toLowerCase()) {
        callback();
      }
    }
    document.addEventListener("keydown", keydown);

    return () => document.removeEventListener("keydown", keydown);
  }, [callback, keyCode]);
}
