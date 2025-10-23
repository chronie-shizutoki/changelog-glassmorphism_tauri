/**
 * GitHub repository configuration
 * This file contains the configuration for fetching changelog from GitHub
 */

export const GITHUB_CONFIG = {
  // Default repository to fetch changelog from
  owner: 'chronie-shizutoki',
  repo: 'changelog-glassmorphism',
  
  // Optional: GitHub API token for higher rate limits
  // Set via environment variable: VITE_GITHUB_TOKEN
  token: import.meta.env.VITE_GITHUB_TOKEN || null,
  
  // Cache duration in milliseconds (1 hour)
  cacheDuration: 60 * 60 * 1000,
  
  // Maximum number of releases to fetch
  maxReleases: 100
};

/**
 * Get GitHub configuration with environment variable overrides
 */
export const getGitHubConfig = () => {
  return {
    ...GITHUB_CONFIG,
    owner: import.meta.env.VITE_GITHUB_OWNER || GITHUB_CONFIG.owner,
    repo: import.meta.env.VITE_GITHUB_REPO || GITHUB_CONFIG.repo,
    token: import.meta.env.VITE_GITHUB_TOKEN || GITHUB_CONFIG.token
  };
};

