import { useTranslation } from 'react-i18next';
import { BookOpen } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md">
      <div className="glass border-b border-white/10">
        <div className="container mx-auto px-4 py-4 mobile-header">
          <div className="flex items-center justify-between">
            {/* Logo and title */}
            <div className="flex items-center gap-3">
              <div className="glass-button w-12 h-12 rounded-full flex items-center justify-center float">
                <BookOpen size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">
                  {t('title')}
                </h1>
                <p className="text-sm opacity-80 mt-1">
                  {t('subtitle')}
                </p>
              </div>
            </div>

            {/* Control buttons */}
            <div className="flex items-center gap-3">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
