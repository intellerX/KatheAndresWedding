import './IntroSubtitle.css'

export type IntroSubtitleProps = {
  /** Línea bajo los nombres (p. ej. familias o lema) */
  text?: string
}

export function IntroSubtitle({ text = 'Con el cariño de sus familias' }: IntroSubtitleProps) {
  return (
    <section className="inv-card inv-card--forest intro-card">
      <p className="intro-card__text">{text}</p>
    </section>
  )
}
