import { VenueMapEmbed } from '../VenueMapEmbed'
import './ReceptionCard.css'

const RECEPTION_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.774197950337!2d-75.8102656!3d4.8087904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e387bf5db70de8d%3A0x1adbd209cd28f4da!2sHOTEL%20SANTA%20ISABEL!5e0!3m2!1ses!2sco!4v1776615103579!5m2!1ses!2sco'

const RECEPTION_MAPS_LINK = 'https://www.google.com/maps?q=4.8087904,-75.8102656'

export function ReceptionCard() {
  return (
    <article className="inv-card inv-card--cream venue-card">
      <h3 className="venue-card__title">Civil y recepción</h3>
      <p className="venue-card__address">Hotel Santa Isabel — Cerritos, Pereira</p>
      <VenueMapEmbed
        embedSrc={RECEPTION_EMBED_SRC}
        mapTitle="Ubicación de la recepción en Google Maps"
        openInMapsHref={RECEPTION_MAPS_LINK}
      />
    </article>
  )
}
