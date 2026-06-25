export function StaticPage({ page }) {
  return (
    <section className="page-shell">
      <div className="container">
        <div className="page-hero premium-panel">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
        </div>

        <div className="grid">
          {page.sections.map((section) => (
            <article key={section.title} className="premium-panel faq-card">
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
