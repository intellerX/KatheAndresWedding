import './ReceptionCard.css'

function MapIcon() {
  return (
    <svg className="venue-card__map" viewBox="0 0 64 64" aria-hidden>
      <rect
        x="6"
        y="10"
        width="52"
        height="44"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M14 22h36M14 32h20M14 42h28"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.55"
      />
      <circle cx="40" cy="38" r="4" fill="currentColor" opacity="0.35" />
    </svg>
  )
}

export function ReceptionCard() {
  return (
    <article className="inv-card inv-card--cream venue-card">
      <MapIcon />
      <h3 className="venue-card__title">Civil y recepción</h3>
      <p className="venue-card__address">Hotel Santa Isabel — Cerritos, Pereira</p>
    </article>
  )
}
