import type { ReactNode } from 'react'
import './StoryText.css'

type StoryTextProps = {
  children?: ReactNode
}

const defaultStory = (
  <>
    <p>
      El amor nos encontró en el momento perfecto, y hoy queremos compartir la alegría de
      nuestro compromiso con las personas que hacen brillar nuestras vidas.
    </p>
    <p>
      Será un honor contar con tu presencia en el día en que uniremos nuestras vidas ante Dios
      y ante quienes más queremos. Prepárate para una celebración llena de gratitud, música y
      buenos recuerdos.
    </p>
  </>
)

export function StoryText({ children = defaultStory }: StoryTextProps) {
  return (
    <section className="inv-card inv-card--cream story-text">
      <svg className="story-text__vine story-text__vine--left" viewBox="0 0 40 160" aria-hidden>
        <path
          d="M28 4c-8 24-8 52 0 76s8 52 0 76"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.4"
        />
      </svg>
      <svg className="story-text__vine story-text__vine--right" viewBox="0 0 40 160" aria-hidden>
        <path
          d="M12 4c8 24 8 52 0 76s-8 52 0 76"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.4"
        />
      </svg>
      <div className="story-text__body">{children}</div>
    </section>
  )
}
