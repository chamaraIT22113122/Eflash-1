import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Sample searchable content (in production, fetch from backend/context)
  const searchableContent = [
    // Pages
    { type: 'page', title: 'Home', path: '/', description: 'Welcome to Eflash' },
    { type: 'page', title: 'About', path: '/about', description: 'Learn about our company' },
    { type: 'page', title: 'Services', path: '/services', description: 'Our design services' },
    { type: 'page', title: 'Portfolio', path: '/portfolio', description: 'View our work' },
    { type: 'page', title: 'Packages', path: '/packages', description: 'Pricing packages' },
    { type: 'page', title: 'Shop', path: '/shop', description: 'Browse our products' },
    { type: 'page', title: 'Contact', path: '/contact', description: 'Get in touch' },
    
    // Services (examples - customize based on your actual services)
    { type: 'service', title: 'Logo Design', path: '/services', description: 'Professional logo design services' },
    { type: 'service', title: 'Brand Identity', path: '/services', description: 'Complete branding solutions' },
    { type: 'service', title: 'Social Media Graphics', path: '/services', description: 'Eye-catching social posts' },
    { type: 'service', title: 'Flyer Design', path: '/services', description: 'Print-ready flyers' },
    { type: 'service', title: 'Web Design', path: '/services', description: 'Modern website design' },
    
    // Portfolio categories
    { type: 'portfolio', title: 'Banners', path: '/portfolio', description: 'Banner designs' },
    { type: 'portfolio', title: 'Logos', path: '/portfolio', description: 'Logo portfolio' },
    { type: 'portfolio', title: 'Flyers', path: '/portfolio', description: 'Flyer designs' },
    { type: 'portfolio', title: 'Social Media', path: '/portfolio', description: 'Social media graphics' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    
    // Simulate async search (in production, use debouncing)
    const searchTimeout = setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const filtered = searchableContent.filter(item =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery)
      );
      
      setResults(filtered.slice(0, 8)); // Limit to 8 results
      setIsOpen(filtered.length > 0);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleResultClick = (result) => {
    navigate(result.path);
    setQuery('');
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'page':
        return '📄';
      case 'service':
        return '🎨';
      case 'portfolio':
        return '🖼️';
      default:
        return '🔍';
    }
  };

  return (
    <div className="search-bar" ref={searchRef}>
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search services, portfolio..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && results.length > 0 && setIsOpen(true)}
        />
        <span className="search-icon">🔍</span>
      </div>

      {isOpen && (
        <div className="search-results">
          {isLoading ? (
            <div className="search-loading">Searching...</div>
          ) : results.length > 0 ? (
            <>
              {results.map((result, index) => (
                <div
                  key={index}
                  className="search-result-item"
                  onClick={() => handleResultClick(result)}
                >
                  <span className="result-icon">{getTypeIcon(result.type)}</span>
                  <div className="result-content">
                    <div className="result-title">{result.title}</div>
                    <div className="result-description">{result.description}</div>
                  </div>
                  <span className="result-type">{result.type}</span>
                </div>
              ))}
              {results.length > 0 && (
                <div className="search-footer">
                  Press <kbd>ESC</kbd> to close
                </div>
              )}
            </>
          ) : (
            <div className="search-no-results">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
