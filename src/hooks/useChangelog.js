import { useGitHubChangelog } from './useGitHubChangelog';
import { getGitHubConfig } from '../config/github';

/**
 * Main hook for fetching changelog
 * Currently uses GitHub Releases API as the data source
 */
export const useChangelog = () => {
  const config = getGitHubConfig();
  
  return useGitHubChangelog(
    config.owner,
    config.repo,
    config.token
  );
};

