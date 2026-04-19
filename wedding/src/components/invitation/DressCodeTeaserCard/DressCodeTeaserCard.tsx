import { Link } from 'react-router-dom'
import { DRESS_CODE_GALLERY_PATH } from '../AttendanceConfirm/postEventGalleryPath'
import './DressCodeTeaserCard.css'

export function DressCodeTeaserCard() {
  return (
    <article
      className="inv-card inv-card--cream dress-code-teaser"
      aria-labelledby="dress-code-teaser-heading"
    >
      <h2 id="dress-code-teaser-heading" className="dress-code-teaser__title">
        Vestimenta
      </h2>
      <p className="dress-code-teaser__lead">
        Preparamos una galería de inspiración para que vean tonos y estilos que encajan con la
        fiesta. Es solo una guía visual, no una lista cerrada.
      </p>
      <p className="dress-code-teaser__cta-wrap">
        <Link className="dress-code-teaser__cta" to={DRESS_CODE_GALLERY_PATH}>
           Clic aquí  <span className="dress-code-teaser__cta-hint">👗</span>
        </Link>
        <br />
        <span className="dress-code-teaser__cta-hint"> para ver las referencias de vestimenta.</span>
      </p>
    </article>
  )
}
