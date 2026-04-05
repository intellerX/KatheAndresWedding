import './HeroHeader.css'

export function HeroHeader() {
  return (
    <header className="inv-card inv-card--forest hero-header">
      <svg
        className="hero-header__floral hero-header__floral--tl"
        viewBox="0 0 120 120"
        aria-hidden
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
          <path d="M8 96c12-8 18-22 14-38 8 4 18 2 26-4-6 14-4 30 4 42-14-6-30-4-44 0z" />
          <path d="M4 72c10-18 28-28 48-26M20 104c6-20 22-34 42-38" />
        </g>
      </svg>
      <svg
        className="hero-header__floral hero-header__floral--br"
        viewBox="0 0 120 120"
        aria-hidden
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
          <path d="M112 24c-12 8-18 22-14 38-8-4-18-2-26 4 6-14 4-30-4-42 14 6 30 4 44 0z" />
          <path d="M116 48c-10 18-28 28-48 26M100 16c-6 20-22 34-42 38" />
        </g>
      </svg>

      <p className="hero-header__date">
        <span className="hero-header__date-inner">06 · 06 · 2026</span>
      </p>

      <div className="hero-header__monogram" aria-hidden>
        <svg className="hero-header__wreath" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="78"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.4"
          />
          <g fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.5">
            <ellipse cx="100" cy="36" rx="22" ry="10" />
            <ellipse cx="100" cy="164" rx="22" ry="10" />
            <ellipse cx="36" cy="100" rx="10" ry="22" />
            <ellipse cx="164" cy="100" rx="10" ry="22" />
          </g>
          <text
            x="100"
            y="114"
            textAnchor="middle"
            className="hero-header__ka"
            fill="currentColor"
          >
            KA
          </text>
        </svg>
      </div>
    </header>
  )
}
