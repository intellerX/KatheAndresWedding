import defaultHorariosPhoto from '../../../assets/Horarios.jpeg'
import florVerdeTl from '../../../assets/props/florVerde3.png'
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
  /** Sustituye la imagen por defecto (`Horarios.jpeg`) */
  photoSrc?: string
  photoAlt?: string
  dateLine?: string
  items?: HorarioItem[]
}

export function Horarios({
  photoSrc = defaultHorariosPhoto,
  photoAlt = 'Kathe y Andres',
  dateLine = 'Junio 06 · 2026',
  items = defaultItems,
}: HorariosProps) {
  return (
    <section className="inv-card inv-card--cream horarios" aria-labelledby="horarios-heading">
      <img
        className="horarios__floral"
        src={florVerdeTl}
        alt=""
        aria-hidden
        decoding="async"
      />

      <div className="horarios__grid">
        <figure className="horarios__photo">
          <div className="horarios__frame">
            <img className="horarios__img" src={photoSrc} alt={photoAlt} loading="lazy" />
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
