import { useEffect, useState } from "react";

const useMediaQuery = (): Boolean => {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );
  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  return matches;
};
export default useMediaQuery;
