import React from 'react';

function QuoteCard({ quote }) {
  return (
    <article className="quote-card">
      <p className="quote-card__text">“{quote.text}”</p>
      <p className="quote-card__author">— {quote.author}</p>
    </article>
  );
}

export default QuoteCard;
