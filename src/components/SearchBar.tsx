import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";

type Props = {
  onSearchBar: (value: string) => void;
};

const SearchBar = ({ onSearchBar }: Props) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [search, setSearch] = useState('')

   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      buttonRef.current?.click();
    }
  };

  return (
     <div className="w-full max-w-md mx-auto mt-6">
      <div className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search GitHub username..."
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
      <button
          ref={buttonRef}
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded px-4 py-2 transition-colors duration-200"
          onClick={() => onSearchBar(search)}
        >
          Search
        </button>
     </div>
    </div>
  );
};

export default SearchBar;
