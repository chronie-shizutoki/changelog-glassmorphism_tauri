import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useChangelog } from '../../hooks/useChangelog';
import ChangelogEntry from './ChangelogEntry';
import SearchFilter from '../SearchFilter';
import ChangelogStats from '../ChangelogStats';

const EnhancedChangelogList = () => {
  const { t, i18n } = useTranslation();
  const { changelog, loading, error, refetch } = useChangelog();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Filter and search logic
  const filteredChangelog = useMemo(() => {
    if (!changelog) return [];

    return changelog.filter(entry => {
      const currentLang = i18n.language;
      const title = entry.title[currentLang] || entry.title.en;
      const description = entry.description[currentLang] || entry.description.en;
      
      // Search filter
      const matchesSearch = searchTerm === '' || 
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.version.includes(searchTerm) ||
        entry.changes.some(change => {
          const content = change.content[currentLang] || change.content.en;
          return content.toLowerCase().includes(searchTerm.toLowerCase());
        });

      // Type filter
      const matchesType = filterType === 'all' || 
        entry.changes.some(change => change.type === filterType);

      return matchesSearch && matchesType;
    });
  }, [changelog, searchTerm, filterType, i18n.language]);

  if (loading) {
    return (
      <div className="space-y-6">
        <ChangelogStats />
        <div className="flex flex-col items-center justify-center py-16">
          <div className="glass-card text-center">
            <Loader2 size={32} className="animate-spin mx-auto mb-4 opacity-60" />
            <p className="text-lg font-medium opacity-80">{t('loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <ChangelogStats />
        <div className="flex flex-col items-center justify-center py-16">
          <div className="glass-card text-center max-w-md">
            <AlertCircle size={32} className="mx-auto mb-4 text-red-400" />
            <p className="text-lg font-medium mb-2">{t('error')}</p>
            <p className="text-sm opacity-60 mb-4">{error}</p>
            <button
              onClick={refetch}
              className="glass-button flex items-center gap-2 mx-auto"
            >
              <RefreshCw size={16} />
              <span>{t('retry')}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!changelog || changelog.length === 0) {
    return (
      <div className="space-y-6">
        <ChangelogStats />
        <div className="flex flex-col items-center justify-center py-16">
          <div className="glass-card text-center">
            <div className="w-16 h-16 mx-auto mb-4 glass rounded-full flex items-center justify-center">
              <span className="text-2xl opacity-60">📝</span>
            </div>
            <p className="text-lg font-medium opacity-80">{t('empty')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Changelog stats */}
      <ChangelogStats />
      
      {/* Search and filter */}
      <SearchFilter 
        onSearch={setSearchTerm}
        onFilter={setFilterType}
        totalCount={filteredChangelog.length}
      />

      {/* Changelog list */}
      {filteredChangelog.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="glass-card text-center">
            <div className="w-16 h-16 mx-auto mb-4 glass rounded-full flex items-center justify-center">
              <span className="text-2xl opacity-60">🔍</span>
            </div>
            <p className="text-lg font-medium opacity-80">{t('search.noResults')}</p>
            <p className="text-sm opacity-60 mt-2">{t('search.adjustFilters')}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredChangelog.map((entry, index) => (
            <ChangelogEntry 
              key={`${entry.version}-${entry.date}`} 
              entry={entry} 
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedChangelogList;
