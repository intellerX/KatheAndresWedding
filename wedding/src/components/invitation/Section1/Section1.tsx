import { useInvitationUrlParams } from '../../../hooks/useInvitationUrlParams'
import { HeroHeader } from './HeroHeader/HeroHeader'
import { IntroSubtitle } from './IntroSubtitle/IntroSubtitle'
import { Names } from './Names/Names'
import './Section1.css'

export function Section1() {
  const { introText } = useInvitationUrlParams()

  return (
    <section className="section1" aria-label="Encabezado de la invitación">
      <div className="section1__bleed">
        <HeroHeader />
        <Names />
      </div>
      <IntroSubtitle text={introText || undefined} />
    </section>
  )
}
