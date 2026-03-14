import { Repository, UserDetail } from '../types/github';

const GITHUB_API = 'https://api.github.com';

export async function fetchRepositories(
  language: string,
  signal?: AbortSignal
): Promise<Repository[]> {
  const query = encodeURIComponent(`language:${language} stars:>1000`);
  const response = await fetch(
    `${GITHUB_API}/search/repositories?q=${query}&sort=stars&order=desc&per_page=30`,
    {
      signal,
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    }
  );

  if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
  const data = await response.json();
  return data.items;
}

export async function fetchUserDetail(
  username: string,
  signal?: AbortSignal
): Promise<UserDetail> {
  const response = await fetch(`${GITHUB_API}/users/${username}`, {
    signal,
    headers: { 'Accept': 'application/vnd.github.v3+json' },
  });
  if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
  return response.json();
}

export async function fetchUserRepos(
  username: string,
  signal?: AbortSignal
): Promise<Repository[]> {
  const response = await fetch(
    `${GITHUB_API}/users/${username}/repos?sort=stars&direction=desc&per_page=10`,
    {
      signal,
      headers: { 'Accept': 'application/vnd.github.v3+json' },
    }
  );
  if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
  return response.json();
}
