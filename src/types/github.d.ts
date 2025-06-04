export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  repos_url: string;
}
export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: string;
}