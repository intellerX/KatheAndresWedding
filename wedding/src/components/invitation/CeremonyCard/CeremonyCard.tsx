import { VenueMapEmbed } from '../VenueMapEmbed'
import './CeremonyCard.css'

const CEREMONY_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.162745000652!2d-75.9221835!3d4.7417649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e386fe74f0020c3%3A0x3f86961d6f7faa48!2sIglesia%20Catolica%20Santisima%20Trinidad!5e0!3m2!1ses!2sco!4v1776615129036!5m2!1ses!2sco'

const CEREMONY_MAPS_LINK = 'https://www.google.com/maps?q=4.7417649,-75.9221835'

export function CeremonyCard() {
  return (
    <article className="inv-card inv-card--cream venue-card">
      <h3 className="venue-card__title">Ceremonia religiosa</h3>
      <p className="venue-card__address">
        Iglesia Católica Santísima Trinidad — Cartago, Valle
      </p>
      <VenueMapEmbed
        embedSrc={CEREMONY_EMBED_SRC}
        mapTitle="Ubicación de la ceremonia en Google Maps"
        openInMapsHref={CEREMONY_MAPS_LINK}
      />
    </article>
  )
}
