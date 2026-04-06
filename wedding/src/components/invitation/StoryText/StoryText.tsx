import type { ReactNode } from 'react'
import './StoryText.css'

type StoryTextProps = {
  children?: ReactNode
}

const defaultStory = (
  <>
    <p>
        Después de tantos años juntos… ¡por fin nos vamos a casar!
        Empezamos esta historia siendo muy jóvenes, sin imaginar todo lo que vendría: crecimos, cambiamos, maduramos… y en medio de todo eso, seguimos eligiéndonos (lo cual ya dice bastante 😄).
        Somos diferentes en muchas cosas (y sí, a veces se nota), pero en el camino aprendimos que ahí está la magia: en complementarnos, equilibrarnos y construir juntos.
    </p>
    <p>
        Hoy queremos celebrar este paso tan importante con las personas que han sido parte de nuestra historia, que nos han acompañado en distintas etapas y que, de una u otra forma, han estado presentes en este camino.
        Por eso, más que una invitación, es nuestra manera de decir gracias… y de invitarte a estar ahí, celebrando con nosotros este nuevo comienzo.
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
