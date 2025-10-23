import { useTranslation } from 'react-i18next';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useChangelog } from '../../hooks/useChangelog';
import ChangelogEntry from './ChangelogEntry';

const ChangelogList = () => {
  const { t } = useTranslation();
  const { changelog, loading, error, refetch } = useChangelog();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="glass-card text-center">
          <Loader2 size={32} className="animate-spin mx-auto mb-4 opacity-60" />
          <p className="text-lg font-medium opacity-80">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
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
    );
  }

  if (!changelog || changelog.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="glass-card text-center">
          <div className="w-16 h-16 mx-auto mb-4 glass rounded-full flex items-center justify-center">
            <span className="text-2xl opacity-60">📝</span>
          </div>
          <p className="text-lg font-medium opacity-80">{t('empty')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {changelog.map((entry, index) => (
        <ChangelogEntry 
          key={`${entry.version}-${entry.date}`} 
          entry={entry} 
          index={index}
        />
      ))}
    </div>
  );
};

export default ChangelogList;
