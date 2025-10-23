import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import EnhancedChangelogList from './components/changelog/EnhancedChangelogList';
import BackToTop from './components/BackToTop';
import { useTheme } from './hooks/useTheme';
import './i18n';
import './App.css';

function App() {
  const { theme } = useTheme();
  const { i18n } = useTranslation();

  useEffect(() => {
// Ensure the theme is applied correctly
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Set HTML language attribute
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="min-h-screen">


      {/* Main content */}
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <EnhancedChangelogList />
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 mt-16">
          <div className="container mx-auto px-4">
            <div className="glass-card text-center">
              <p className="text-sm opacity-60">
                &copy; 2025 Changelog Viewer. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Back to top button */}
      <BackToTop />
    </div>
  );
}

export default App;
