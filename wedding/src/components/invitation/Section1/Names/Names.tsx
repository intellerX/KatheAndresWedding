import './Names.css'

export function Names() {
  return (
    <section className="inv-card inv-card--forest names-card" aria-labelledby="couple-names">
      <h1 id="couple-names" className="names-card__title">
        <span className="names-card__name">Kathe</span>
        <span className="names-card__ampersand" aria-hidden>
          &amp;
        </span>
        <span className="names-card__name">Andres</span>
      </h1>
    </section>
  )
}
