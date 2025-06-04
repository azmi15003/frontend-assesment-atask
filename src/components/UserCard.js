var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useGitHubStore } from "../store/githubStore";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
const UserAccordion = ({ user, isOpen, onToggle }) => {
    const { repos, fetchRepos } = useGitHubStore();
    const [loading, setLoading] = useState(false);
    const [userRepos, setUserRepos] = useState([]);
    useEffect(() => {
        const load = () => __awaiter(void 0, void 0, void 0, function* () {
            if (isOpen && !repos[user.login]) {
                setLoading(true);
                const result = yield fetchRepos(user.login);
                setUserRepos(result);
                setLoading(false);
            }
            else if (repos[user.login]) {
                setUserRepos(repos[user.login]);
            }
        });
        load();
    }, [fetchRepos, isOpen, repos, user.login]);
    return (_jsxs("div", { className: "border rounded-md shadow-sm", children: [_jsxs("button", { onClick: onToggle, className: "w-full flex justify-between items-center px-4 py-3 font-medium hover:bg-gray-100", children: [_jsx("span", { children: user.login }), _jsx("span", { className: "w-4 h-4", children: isOpen ? _jsx(ChevronUp, {}) : _jsx(ChevronDown, {}) })] }), isOpen && (_jsx("div", { className: "bg-gray-50 p-4 space-y-3", children: loading ? (_jsx("div", { className: "flex justify-center items-center py-4", children: _jsx("div", { className: "w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" }) })) : userRepos.length === 0 ? (_jsx("p", { className: "text-gray-500 text-sm", children: "No repositories found." })) : (userRepos.map((repo) => (_jsxs("div", { className: "p-3 border rounded bg-white shadow-sm", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("a", { href: repo.html_url, target: "_blank", rel: "noopener noreferrer", className: "font-bold hover:underline", children: repo.name }), _jsxs("span", { className: "text-sm flex items-center gap-1 font-bold", children: [repo.stargazers_count, _jsx(Star, { className: "w-4 h-4 text-yellow-500" })] })] }), repo.description && (_jsx("p", { className: "text-sm text-gray-600 mt-1", children: repo.description }))] }, repo.id)))) }))] }));
};
export default UserAccordion;
