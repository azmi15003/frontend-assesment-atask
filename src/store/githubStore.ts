import { create } from "zustand";
import type { GitHubUser, GitHubRepo } from "../types/github";

type Store = {
  query: string;
  users: GitHubUser[];
  repos: Record<string, GitHubRepo[]>;
  loadingUsers: boolean;
  setQuery: (val: string) => void;
  fetchUsers: () => Promise<void>;
  fetchRepos: (username: string) => Promise<GitHubRepo[]>;
};

export const useGitHubStore = create<Store>((set, get) => ({
  query: "",
  users: [],
  repos: {},
  loadingUsers: false,

  setQuery: (val) => set({ query: val }),

  fetchUsers: async () => {
    const query = get().query.trim();
    if (!query) return;

    set({ loadingUsers: true });
    try {
      const res = await fetch(`https://api.github.com/search/users?q=${query}&per_page=5`);
      const data = await res.json();
      set({ users: data.items || [] });
    } catch (err) {
      console.error("Error fetching users", err);
      set({ users: [] });
    } finally {
      set({ loadingUsers: false });
    }
  },

  fetchRepos: async (username) => {
    const cached = get().repos[username];
    if (cached) return cached;

    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos`);
      const data: GitHubRepo[] = await res.json();

      set((state) => ({
        repos: { ...state.repos, [username]: data },
      }));

      return data;
    } catch (err) {
      console.error("Error fetching repos", err);
      return [];
    }
  },
}));
