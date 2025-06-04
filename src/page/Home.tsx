import { useEffect, useState } from "react";
import { useGitHubStore } from "../store/githubStore";
import SearchBar from "../components/SearchBar";
import UserAccordionList from "../components/UserList";

const useDebounce = (value: string, delay = 500) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

const Home = () => {
  const { query, setQuery, users, loadingUsers, fetchUsers } = useGitHubStore();
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) fetchUsers();
  }, [debouncedQuery, fetchUsers]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <SearchBar onSearchBar={setQuery} />
      <UserAccordionList users={users} loading={loadingUsers} query={query} />
    </div>
  );
};

export default Home;
