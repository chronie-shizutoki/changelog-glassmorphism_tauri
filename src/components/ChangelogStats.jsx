import { useTranslation } from 'react-i18next';
import { TrendingUp, Package, Bug, Shield, Sparkles } from 'lucide-react';
import { useChangelog } from '../hooks/useChangelog';

const ChangelogStats = () => {
  const { t } = useTranslation();
  const { changelog, loading } = useChangelog();

  if (loading || !changelog.length) {
    return null;
  }

  // Calculate various types of changes
  const stats = changelog.reduce((acc, entry) => {
    acc.totalVersions++;
    
    entry.changes.forEach(change => {
      switch (change.type) {
        case 'feature':
          acc.features++;
          break;
        case 'improvement':
          acc.improvements++;
          break;
        case 'fix':
          acc.fixes++;
          break;
        case 'security':
          acc.security++;
          break;
        default:
          acc.others++;
      }
    });

    return acc;
  }, {
    totalVersions: 0,
    features: 0,
    improvements: 0,
    fixes: 0,
    security: 0,
    others: 0
  });

  const statItems = [
    {
      icon: Package,
      label: t('version.total'),
      value: stats.totalVersions,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Sparkles,
      label: t('changeType.feature'),
      value: stats.features,
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: TrendingUp,
      label: t('changeType.improvement'),
      value: stats.improvements,
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Bug,
      label: t('changeType.fix'),
      value: stats.fixes,
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Shield,
      label: t('changeType.security'),
      value: stats.security,
      color: 'from-red-500 to-rose-500'
    }
  ].filter(item => item.value > 0); // Only show stats with data

  return (
    <div className="mb-6">
      <div className="glass-card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold gradient-text flex items-center gap-2">
            📊 {t('stats.title')}
          </h2>
        </div>
        <div className="flex flex-wrap gap-3 mobile-stats">
          {statItems.map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 glass rounded-lg px-3 py-2 hover:scale-105 transition-transform duration-200"
            >
              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center flex-shrink-0`}>
                <item.icon size={14} className="text-white" />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold">
                  {item.value}
                </span>
                <span className="text-xs opacity-75">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChangelogStats;
