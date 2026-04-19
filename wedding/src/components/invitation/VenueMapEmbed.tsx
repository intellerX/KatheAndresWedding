type VenueMapEmbedProps = {
  embedSrc: string
  mapTitle: string
  openInMapsHref: string
}

function ExternalLinkIcon() {
  return (
    <svg
      className="venue-map-embed__external-icon"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      aria-hidden
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"
      />
    </svg>
  )
}

export function VenueMapEmbed({ embedSrc, mapTitle, openInMapsHref }: VenueMapEmbedProps) {
  return (
    <div className="venue-map-embed">
      <div className="venue-map-embed__frame">
        <iframe
          className="venue-map-embed__iframe"
          src={embedSrc}
          title={mapTitle}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a
        className="venue-map-embed__external"
        href={openInMapsHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        Abrir en Google Maps
        <ExternalLinkIcon />
      </a>
    </div>
  )
}
