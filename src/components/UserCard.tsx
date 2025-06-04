import { useEffect, useState } from "react";
import { useGitHubStore } from "../store/githubStore";
import type { GitHubUser, GitHubRepo } from "../types/github";
import { ChevronDown, ChevronUp, Star } from "lucide-react";


type Props = {
  user: GitHubUser;
  isOpen: boolean;
  onToggle: () => void;
};

const UserAccordion = ({ user, isOpen, onToggle }: Props) => {
  const { repos, fetchRepos } = useGitHubStore();
  const [loading, setLoading] = useState(false);
  const [userRepos, setUserRepos] = useState<GitHubRepo[]>([]);

  useEffect(() => {
    const load = async () => {
      if (isOpen && !repos[user.login]) {
        setLoading(true);
        const result = await fetchRepos(user.login);
        setUserRepos(result);
        setLoading(false);
      } else if (repos[user.login]) {
        setUserRepos(repos[user.login]);
      }
    };
    load();
  }, [fetchRepos, isOpen, repos, user.login]);

  return (
    <div className="border rounded-md shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center px-4 py-3 font-medium hover:bg-gray-100"
      >
        <span>{user.login}</span>
        <span className="w-4 h-4">
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </span>
      </button>

      {isOpen && (
        <div className="bg-gray-50 p-4 space-y-3">
          {loading ? (
            <div className="flex justify-center items-center py-4">
              <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : userRepos.length === 0 ? (
            <p className="text-gray-500 text-sm">No repositories found.</p>
          ) : (
            userRepos.map((repo) => (
              <div key={repo.id} className="p-3 border rounded bg-white shadow-sm">
                <div className="flex justify-between items-center">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold hover:underline"
                  >
                    {repo.name}
                  </a>
                  <span className="text-sm flex items-center gap-1 font-bold">
                    {repo.stargazers_count}
                    <Star className="w-4 h-4 text-yellow-500" />
                  </span>
                </div>
                {repo.description && (
                  <p className="text-sm text-gray-600 mt-1">{repo.description}</p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserAccordion;
