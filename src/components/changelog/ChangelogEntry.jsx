import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronDown, Calendar, Tag } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

const ChangelogEntry = ({ entry, index }) => {
  const { t, i18n } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(index === 0); // 默认展开第一个条目

  const currentLang = i18n.language;
  const title = entry.title[currentLang] || entry.title.en;
  const description = entry.description[currentLang] || entry.description.en;

  const getChangeTypeClass = (type) => {
    return `change-type-${type}`;
  };

  const getVersionTypeColor = (type) => {
    switch (type) {
      case 'major':
        return 'bg-gradient-to-r from-red-500 to-pink-500';
      case 'minor':
        return 'bg-gradient-to-r from-blue-500 to-indigo-500';
      case 'patch':
        return 'bg-gradient-to-r from-green-500 to-emerald-500';
      default:
        return 'bg-gradient-to-r from-gray-500 to-slate-500';
    }
  };

  return (
    <div className="glass-card glass-hover fade-in mobile-version-card" style={{ animationDelay: `${index * 0.1}s` }}>
      {/* Version header */}
      <div className="flex items-start justify-between mb-4 mobile-version-header">
        <div className="flex items-center gap-3">
          <div className={`version-badge ${getVersionTypeColor(entry.type)}`}>
            v{entry.version}
          </div>
          <div className="flex items-center gap-2 text-sm opacity-75">
            <Calendar size={14} />
            <span>{formatDate(entry.date, currentLang)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mobile-version-badges">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getVersionTypeColor(entry.type)} text-white`}>
            {t(`version.type.${entry.type}`)}
          </span>
        </div>
      </div>

      {/* Version title and description */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 gradient-text">
          {title}
        </h3>
        <p className="opacity-80 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Expand/collapse button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="glass-button w-full flex items-center justify-center gap-2 mb-4"
      >
        <span className="text-sm font-medium">
          {isExpanded ? t('details.collapse') : t('details.expand')}
        </span>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Change details */}
      {isExpanded && (
        <div className="space-y-4 slide-up">
          {entry.changes.map((change, changeIndex) => (
            <div key={changeIndex} className="glass rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Tag size={14} />
                <span className={getChangeTypeClass(change.type)}>
                  {t(`changeType.${change.type}`)}
                </span>
              </div>
              <div className="markdown-content">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // Custom render components to ensure correct styles
                    h1: ({ children }) => <h1 className="text-lg font-semibold mb-2">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-base font-semibold mb-2">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-sm font-semibold mb-1">{children}</h3>,
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                    code: ({ children }) => <code className="glass rounded px-2 py-1 text-xs font-mono bg-white/10">{children}</code>,
                    pre: ({ children }) => <pre className="glass rounded-lg p-3 overflow-x-auto bg-white/5 text-xs">{children}</pre>
                  }}
                >
                  {change.content[currentLang] || change.content.en}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChangelogEntry;
