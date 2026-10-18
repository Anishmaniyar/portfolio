/*
 * A quiet closing quote shown between Writing and the footer.
 * Static, server-rendered content. Intentionally not added to the INDEX
 * sidebar — it is a closing thought, not a navigable section.
 */
export default function QuoteSection() {
  return (
    <section aria-label="Quote" className="quote-section">
      <blockquote className="quote">
        <p className="quote-text">
          &ldquo;He who climbs the ladder must begin at the bottom.&rdquo;
        </p>
        <footer className="quote-attribution">Haikyuu!!</footer>
      </blockquote>
    </section>
  );
}
