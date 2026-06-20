export function Card({ title, children, subtitle, actions }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      {subtitle ? <p className="muted">{subtitle}</p> : null}
      <div>{children}</div>
      {actions ? <div className="card-actions">{actions}</div> : null}
    </article>
  )
}
