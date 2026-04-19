import type { CSSProperties } from 'react'
import florBlancaIzq from '../../../../assets/props/florBlanca5.png'
import florBlancaDer from '../../../../assets/props/florBlanca5r.png'
import logoUrl from '../../../../assets/props/logo.png'
import './HeroHeader.css'

const heroFloralVars: CSSProperties = {
  ['--hero-flor-l' as string]: `url(${florBlancaIzq})`,
  ['--hero-flor-r' as string]: `url(${florBlancaDer})`,
}

export function HeroHeader() {
  return (
    <header className="inv-card inv-card--forest hero-header" style={heroFloralVars}>
      <p className="hero-header__date">
        <span className="hero-header__date-inner">06 · 06 · 2026</span>
      </p>

      <div className="hero-header__monogram">
        <img
          src={logoUrl}
          alt="Kathe y Andres"
          className="hero-header__logo"
          decoding="async"
        />
      </div>
    </header>
  )
}
