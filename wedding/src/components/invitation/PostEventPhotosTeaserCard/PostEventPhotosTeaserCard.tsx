import { Link } from 'react-router-dom'
import { POST_EVENT_GALLERY_PATH } from '../AttendanceConfirm/postEventGalleryPath'
import './PostEventPhotosTeaserCard.css'

export function PostEventPhotosTeaserCard() {
  return (
    <article
      className="inv-card inv-card--cream post-event-photos-teaser"
      aria-labelledby="post-event-photos-heading"
    >
      <h2 id="post-event-photos-heading" className="post-event-photos-teaser__title">
        Recuerdos del gran día
      </h2>
      <p className="post-event-photos-teaser__lead">
      🌿Después de la celebración, aquí podrán verse las fotos del evento. Por ahora el álbum está
        vacío: las fotos aparecerán aquí cuando estén listas.🌿
      </p>
      <p className="post-event-photos-teaser__cta-wrap">
        <Link className="post-event-photos-teaser__cta" to={POST_EVENT_GALLERY_PATH}>
           Clic aquí <span className="post-event-photos-teaser__cta-hint">🎞️</span>
        </Link>
<br />
        <span className="post-event-photos-teaser__cta-hint"> para abrir la galería.</span>
      </p>
    </article>
  )
}
