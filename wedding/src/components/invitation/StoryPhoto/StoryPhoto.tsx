import defaultNamesPhoto from '../../../assets/Names.png'
import './StoryPhoto.css'

type StoryPhotoProps = {
  /** Override default photo from `Names.jpg` */
  src?: string
  alt?: string
}

export function StoryPhoto({
  src = defaultNamesPhoto,
  alt = 'Kathe y Andres',
}: StoryPhotoProps) {
  return (
    <section className="inv-card inv-card--cream story-photo" aria-label="Nuestra historia">
      <div className="story-photo__frame">
        <img className="story-photo__img" src={src} alt={alt} loading="lazy" />
      </div>
    </section>
  )
}
