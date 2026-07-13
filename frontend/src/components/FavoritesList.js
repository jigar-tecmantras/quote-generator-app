import QuoteCard from './QuoteCard';

function FavoritesList({ favorites, onRemove, onBrowse }) {
  const sortedFavorites = [...favorites].sort((a, b) => a.text.localeCompare(b.text));

  return (
    <section className="view-panel favorites-panel">
      <div className="favorites-header">
        <div>
          <h2 className="app-title" style={{ fontSize: '1.8rem', marginBottom: '0.25rem' }}>Saved Quotes</h2>
          <p className="app-subtitle">They stay safely stored in your browser.</p>
        </div>
        <button type="button" className="ghost-btn" onClick={onBrowse}>
          Back to generator
        </button>
      </div>

      {sortedFavorites.length === 0 ? (
        <div className="empty-favorites">
          <p>Your favorites list is empty right now.</p>
          <button type="button" className="primary-btn" onClick={onBrowse}>
            Get inspired
          </button>
        </div>
      ) : (
        <div className="favorites-grid">
          {sortedFavorites.map((quote) => (
            <div key={quote.id} className="favorites-grid__item">
              <QuoteCard quote={quote} />
              <button
                type="button"
                className="remove-btn"
                onClick={() => onRemove(quote)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default FavoritesList;
