import './StoryPhoto.css'

type StoryPhotoProps = {
  /** Optional couple photo — add a file under `src/assets` and pass the imported URL */
  src?: string
  alt?: string
}

export function StoryPhoto({
  src,
  alt = 'Kathe y Andres',
}: StoryPhotoProps) {
  return (
    <section className="inv-card inv-card--cream story-photo" aria-label="Nuestra historia">
      <div className="story-photo__frame">
        {src ? (
          <img className="story-photo__img" src={src} alt={alt} loading="lazy" />
        ) : (
          <div className="story-photo__placeholder" role="img" aria-label={alt}>
            <span className="story-photo__placeholder-label">Tu foto aquí</span>
          </div>
        )}
      </div>
    </section>
  )
}
