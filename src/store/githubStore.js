var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { create } from "zustand";
export const useGitHubStore = create((set, get) => ({
    query: "",
    users: [],
    repos: {},
    loadingUsers: false,
    setQuery: (val) => set({ query: val }),
    fetchUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        const query = get().query.trim();
        if (!query)
            return;
        set({ loadingUsers: true });
        try {
            const res = yield fetch(`https://api.github.com/search/users?q=${query}&per_page=5`);
            const data = yield res.json();
            set({ users: data.items || [] });
        }
        catch (err) {
            console.error("Error fetching users", err);
            set({ users: [] });
        }
        finally {
            set({ loadingUsers: false });
        }
    }),
    fetchRepos: (username) => __awaiter(void 0, void 0, void 0, function* () {
        const cached = get().repos[username];
        if (cached)
            return cached;
        try {
            const res = yield fetch(`https://api.github.com/users/${username}/repos`);
            const data = yield res.json();
            set((state) => ({
                repos: Object.assign(Object.assign({}, state.repos), { [username]: data }),
            }));
            return data;
        }
        catch (err) {
            console.error("Error fetching repos", err);
            return [];
        }
    }),
}));
