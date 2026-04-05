import './Horarios.css'

export type HorarioItem = {
  time: string
  label: string
}

const defaultItems: HorarioItem[] = [
  { time: '3:00 PM', label: 'Ceremonia religiosa' },
  { time: '5:30 PM', label: 'Ceremonia civil' },
  { time: '8:30 PM', label: 'Cena' },
  { time: '10:00 PM', label: 'Fiesta' },
]

type HorariosProps = {
  photoSrc?: string
  photoAlt?: string
  dateLine?: string
  items?: HorarioItem[]
}

export function Horarios({
  photoSrc,
  photoAlt = 'Kathe y Andres',
  dateLine = 'Junio 06 · 2026',
  items = defaultItems,
}: HorariosProps) {
  return (
    <section className="inv-card inv-card--cream horarios" aria-labelledby="horarios-heading">
      <svg className="horarios__floral" viewBox="0 0 120 120" aria-hidden>
        <g fill="none" stroke="currentColor" strokeWidth="1.05" strokeLinecap="round">
          <path d="M88 104c-10-14-8-32 4-44 10 10 26 12 40 6-12 14-18 32-16 50-10-8-22-12-36-12z" />
          <path d="M96 72c-18 4-36-2-48-16M72 112c4-18 16-32 32-40" />
          <circle cx="92" cy="96" r="2.5" fill="currentColor" stroke="none" />
        </g>
      </svg>

      <div className="horarios__grid">
        <figure className="horarios__photo">
          <div className="horarios__frame">
            {photoSrc ? (
              <img className="horarios__img" src={photoSrc} alt={photoAlt} loading="lazy" />
            ) : (
              <div className="horarios__placeholder" role="img" aria-label={photoAlt}>
                <span className="horarios__placeholder-label">Foto de la pareja</span>
              </div>
            )}
          </div>
        </figure>

        <div className="horarios__content">
          <h2 id="horarios-heading" className="horarios__title">
            Horarios
          </h2>
          <p className="horarios__date">{dateLine}</p>
          <ul className="horarios__list">
            {items.map((row) => (
              <li key={row.label} className="horarios__row">
                <span className="horarios__time">{row.time}</span>
                <span className="horarios__event">{row.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
