export function StaticPage({ title, content }) {
  return (
    <section className="container page">
      <h1>{title}</h1>
      {Array.isArray(content)
        ? content.map((item) => (
            <article key={item.q} className="card">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))
        : <p>{content}</p>}
    </section>
  )
}
