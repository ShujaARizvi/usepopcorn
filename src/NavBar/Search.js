import { useRef, useState } from "react";
import { useKey } from "../Hooks/useKey";

export default function Search({ onQueryChange }) {
  const [query, setQuery] = useState("");
  const searchBar = useRef(null);

  function handleQueryChange(query) {
    setQuery(query);
    onQueryChange(query);
  }

  useKey("Enter", () => {
    if (document.activeElement === searchBar.current) return;
    searchBar.current.focus();
    handleQueryChange("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => handleQueryChange(e.target.value)}
      ref={searchBar}
    />
  );
}
