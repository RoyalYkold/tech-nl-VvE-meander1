export function StaticPage({ title, content }) {
  return (
    <section className="page-shell">
      <div className="container">
        <div className="page-hero premium-panel">
          <p className="eyebrow">VvE Meander1</p>
          <h1>{title}</h1>
          <p>
            Een verzorgde, rustige presentatie van praktische informatie voor bewoners en eigenaren.
          </p>
        </div>

        {Array.isArray(content) ? (
          <div className="grid">
            {content.map((item) => (
              <article key={item.q} className="premium-panel faq-card">
                <span className="pill">FAQ</span>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        ) : (
          <article className="premium-panel rich-copy">
            <p>{content}</p>
          </article>
        )}
      </div>
    </section>
  )
}
