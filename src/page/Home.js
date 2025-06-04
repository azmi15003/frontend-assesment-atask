import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useGitHubStore } from "../store/githubStore";
import SearchBar from "../components/SearchBar";
import UserAccordionList from "../components/UserList";
const useDebounce = (value, delay = 500) => {
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
        if (debouncedQuery)
            fetchUsers();
    }, [debouncedQuery, fetchUsers]);
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 p-4", children: [_jsx(SearchBar, { onSearchBar: setQuery }), _jsx(UserAccordionList, { users: users, loading: loadingUsers, query: query })] }));
};
export default Home;
