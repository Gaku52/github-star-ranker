import { useQuery } from '@tanstack/react-query';
import { fetchRepositories, fetchUserDetail, fetchUserRepos } from '../api/github';

export function useRepositories(language: string | null) {
  return useQuery({
    queryKey: ['repositories', language],
    queryFn: ({ signal }) => fetchRepositories(language!, signal),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    enabled: !!language,
  });
}

export function useUserDetail(username: string | null) {
  return useQuery({
    queryKey: ['user', username],
    queryFn: ({ signal }) => fetchUserDetail(username!, signal),
    staleTime: 10 * 60 * 1000,
    enabled: !!username,
  });
}

export function useUserRepos(username: string | null) {
  return useQuery({
    queryKey: ['userRepos', username],
    queryFn: ({ signal }) => fetchUserRepos(username!, signal),
    staleTime: 10 * 60 * 1000,
    enabled: !!username,
  });
}
