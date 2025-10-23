import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, X } from 'lucide-react';

const SearchFilter = ({ onSearch, onFilter, totalCount }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const changeTypes = [
    { value: 'all', label: t('filter.allTypes') },
    { value: 'feature', label: t('changeType.feature') },
    { value: 'improvement', label: t('changeType.improvement') },
    { value: 'fix', label: t('changeType.fix') },
    { value: 'security', label: t('changeType.security') },
    { value: 'breaking', label: t('changeType.breaking') },
    { value: 'deprecated', label: t('changeType.deprecated') }
  ];

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    onFilter(type);
    setIsFilterOpen(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="mb-6">
      <div className="glass-card">
        <div className="flex flex-col sm:flex-row gap-4 mobile-search">
          {/* Search Box */}
          <div className="flex-1 relative">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-60" />
              <input
                type="text"
                placeholder={t('search.placeholder')}
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-10 py-3 glass rounded-lg border-0 bg-white/10 placeholder-white/60 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Filter Button */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="glass-button flex items-center gap-2 min-w-[140px] justify-between"
            >
              <div className="flex items-center gap-2">
                <Filter size={16} />
                <span className="text-sm">
                  {changeTypes.find(type => type.value === selectedType)?.label}
                </span>
              </div>
            </button>

            {isFilterOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 glass rounded-lg overflow-hidden z-50 fade-in">
                {changeTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => handleTypeChange(type.value)}
                    className={`w-full px-4 py-3 text-left text-sm hover:bg-white/20 transition-colors duration-200 ${
                      type.value === selectedType ? 'bg-white/10' : ''
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results Statistics */}
        {totalCount !== undefined && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-sm opacity-75">
              {searchTerm || selectedType !== 'all' 
                ? t('search.resultsFound', { count: totalCount })
                : t('search.totalVersions', { count: totalCount })
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
