import { useState, useEffect } from 'react';

/**
 * Hook to fetch changelog from GitHub JSON file
 * Fetches from the specified changelog.json file in the repository
 */
export const useGitHubChangelog = (owner, repo, token) => {
  const [changelog, setChangelog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Direct URL to the raw changelog.json file on GitHub
  const changelogJsonUrl = `https://raw.githubusercontent.com/chronie-shizutoki/changelog-glassmorphism/main/public/changelog.json`;

  const fetchChangelog = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use fetch with proper headers for GitHub API
      const response = await fetch(changelogJsonUrl, {
        headers: {
          'Accept': 'application/json',
          ...(token ? { 'Authorization': `token ${token}` } : {})
        },
        // Add cache control to ensure we get fresh data
        cache: 'no-cache'
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch changelog: ${response.status} ${response.statusText}`);
      }

      // Parse the JSON directly
      const changelogData = await response.json();

      // Ensure the data is in the expected format
      // The changelog is an array nested under the 'changelog' property
      if (changelogData && changelogData.changelog && Array.isArray(changelogData.changelog)) {
        setChangelog(changelogData.changelog);
      } else if (Array.isArray(changelogData)) {
        // Fallback to direct array if the structure is different
        setChangelog(changelogData);
      } else {
        throw new Error('Invalid changelog format: Expected an object with changelog array');
      }
    } catch (err) {
      console.error('Failed to fetch changelog from JSON file:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If we have owner and repo parameters, use them instead of the fixed URL
    // This allows for more flexibility in the hook usage
    fetchChangelog();
  }, []); // Empty dependency array to fetch once on component mount

  const refetch = async () => {
    await fetchChangelog();
  };

  return { changelog, loading, error, refetch };
};

