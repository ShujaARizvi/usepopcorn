import { useState } from "react";

export default function Search({ onQueryChange }) {
  const [query, setQuery] = useState("");

  function handleQueryChange(query) {
    setQuery(query);
    onQueryChange(query);
  }

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => handleQueryChange(e.target.value)}
    />
  );
}
