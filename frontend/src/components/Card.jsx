export function Card({ title, children, subtitle, actions }) {
  return (
    <article className="card premium-card">
      <div className="card-header">
        <h3>{title}</h3>
        {subtitle ? <p className="card-subtitle">{subtitle}</p> : null}
      </div>
      <div className="card-body">{children}</div>
      {actions ? <div className="card-actions">{actions}</div> : null}
    </article>
  )
}
