import './LocationHeader.css'

export function LocationHeader() {
  return (
    <section className="inv-card inv-card--forest location-head" aria-labelledby="where-heading">
      <h2 id="where-heading" className="location-head__title">
        ¿Dónde llegar?
      </h2>
      <div className="location-head__rule" aria-hidden />
    </section>
  )
}
