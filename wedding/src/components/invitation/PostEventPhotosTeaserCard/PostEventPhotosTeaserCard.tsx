import { Link } from 'react-router-dom'
import { useInvitationLinkTo } from '../../../hooks/useInvitationLinkTo'
import { POST_EVENT_GALLERY_PATH } from '../AttendanceConfirm/postEventGalleryPath'
import './PostEventPhotosTeaserCard.css'

export function PostEventPhotosTeaserCard() {
  const fotosTo = useInvitationLinkTo(POST_EVENT_GALLERY_PATH)

  return (
    <article
      className="inv-card inv-card--cream post-event-photos-teaser"
      aria-labelledby="post-event-photos-heading"
    >
      <h2 id="post-event-photos-heading" className="post-event-photos-teaser__title">
        Recuerdos del gran día
      </h2>
      <p className="post-event-photos-teaser__lead">
      🌿Después de la celebración, aquí podrán ver las fotos del evento. Por ahora el álbum está
        vacío: las fotos aparecerán aquí cuando estén listas.🌿
      </p>
      <p className="post-event-photos-teaser__cta-wrap inv-teaser-cta-wrap">
        <Link className="inv-teaser-cta" to={fotosTo}>
          Clic aquí <span className="inv-teaser-cta-hint">🎞️</span>
        </Link>
        <br />
        <span className="inv-teaser-cta-hint"> para abrir la galería.</span>
      </p>
    </article>
  )
}
