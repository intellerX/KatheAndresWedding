import { HeroHeader } from './HeroHeader/HeroHeader'
import { IntroSubtitle } from './IntroSubtitle/IntroSubtitle'
import { Names } from './Names/Names'
import './Section1.css'

export function Section1() {
  return (
    <section className="section1" aria-label="Encabezado de la invitación">
      <div className="section1__bleed">
        <HeroHeader />
        <Names />
      </div>
      <IntroSubtitle />
    </section>
  )
}
