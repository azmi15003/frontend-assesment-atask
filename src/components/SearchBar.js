import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
const SearchBar = ({ onSearchBar }) => {
    const buttonRef = useRef(null);
    const [search, setSearch] = useState('');
    const handleKeyDown = (e) => {
        var _a;
        if (e.key === "Enter") {
            (_a = buttonRef.current) === null || _a === void 0 ? void 0 : _a.click();
        }
    };
    return (_jsx("div", { className: "w-full max-w-md mx-auto mt-6", children: _jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [_jsx("input", { type: "text", onChange: (e) => setSearch(e.target.value), onKeyDown: handleKeyDown, placeholder: "Search GitHub username...", className: "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400" }), _jsx("button", { ref: buttonRef, className: "bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded px-4 py-2 transition-colors duration-200", onClick: () => onSearchBar(search), children: "Search" })] }) }));
};
export default SearchBar;
