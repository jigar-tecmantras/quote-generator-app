import { useEffect, useMemo, useState } from 'react';
import './App.css';
import QuoteCard from './components/QuoteCard';
import FavoritesList from './components/FavoritesList';
import quotes from './data/quotes';
import { loadFavorites, saveFavorites } from './utils/localStorage';

const VIEW_RANDOM = 'random';
const VIEW_FAVORITES = 'favorites';

const pickRandomQuote = (excludeId) => {
  if (!quotes.length) {
    return null;
  }
  if (quotes.length === 1) {
    return quotes[0];
  }

  let candidate;
  do {
    const index = Math.floor(Math.random() * quotes.length);
    candidate = quotes[index];
  } while (candidate.id === excludeId);

  return candidate;
};

function App() {
  const [view, setView] = useState(VIEW_RANDOM);
  const [currentQuote, setCurrentQuote] = useState(() => pickRandomQuote());
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = loadFavorites();
    if (stored.length) {
      setFavorites(stored);
    }
  }, []);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const isFavorite = currentQuote && favorites.some((quote) => quote.id === currentQuote.id);

  const handleNewQuote = () => {
    setCurrentQuote(pickRandomQuote(currentQuote?.id));
  };

  const handleToggleFavorite = () => {
    if (!currentQuote) {
      return;
    }

    setFavorites((prev) => {
      const alreadySaved = prev.some((quote) => quote.id === currentQuote.id);
      if (alreadySaved) {
        return prev.filter((quote) => quote.id !== currentQuote.id);
      }
      return [...prev, currentQuote];
    });
  };

  const handleRemoveFavorite = (quoteToRemove) => {
    setFavorites((prev) => prev.filter((quote) => quote.id !== quoteToRemove.id));
  };

  const favoritesMessage = useMemo(() => {
    return favorites.length
      ? 'Your saved quotes live inside the Favorites tab.'
      : 'Save the quotes you love and they will appear here.';
  }, [favorites.length]);

  if (!currentQuote) {
    return (
      <main className="app-shell">
        <div className="app-card">
          <p className="app-title">No quotes available right now.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <div className="app-card">
        <header className="app-header">
          <div>
            <h1 className="app-title">Quote Generator</h1>
            <p className="app-subtitle">New inspiration at every click.</p>
          </div>
          <div className="nav-tabs">
            <button
              type="button"
              className={`nav-tab ${view === VIEW_RANDOM ? 'nav-tab--active' : ''}`}
              onClick={() => setView(VIEW_RANDOM)}
            >
              Generator
            </button>
            <button
              type="button"
              className={`nav-tab ${view === VIEW_FAVORITES ? 'nav-tab--active' : ''}`}
              onClick={() => setView(VIEW_FAVORITES)}
            >
              Favorites ({favorites.length})
            </button>
          </div>
        </header>

        {view === VIEW_RANDOM ? (
          <section className="view-panel">
            <QuoteCard quote={currentQuote} />
            <div className="quote-meta">
              <p className="quote-status">
                {isFavorite ? 'Saved to favorites' : 'Store this quote for later.'}
              </p>
            </div>
            <div className="action-row">
              <button type="button" className="primary-btn" onClick={handleNewQuote}>
                New quote
              </button>
              <button type="button" className="secondary-btn" onClick={handleToggleFavorite}>
                {isFavorite ? 'Remove from favorites' : 'Save to favorites'}
              </button>
              {favorites.length ? (
                <button type="button" className="ghost-btn" onClick={() => setView(VIEW_FAVORITES)}>
                  Browse saved quotes
                </button>
              ) : null}
            </div>
            <p className="helper-text">{favoritesMessage}</p>
          </section>
        ) : (
          <FavoritesList
            favorites={favorites}
            onRemove={handleRemoveFavorite}
            onBrowse={() => setView(VIEW_RANDOM)}
          />
        )}
      </div>
    </main>
  );
}

export default App;
