import { FormEvent, useState } from 'react'
import './MenuChoice.css'

export type MenuChoiceValue = 'traditional' | 'vegan'

export type MenuChoiceProps = {
  /** Se dispara al enviar con la opción elegida (conectar a tu backend o servicio) */
  onSubmit?: (choice: MenuChoiceValue) => void
}

function DecoMonstera({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
        <path d="M60 118V70c-8-18-2-40 12-52M60 70c8-16 6-34-4-48M32 88c10-6 18-18 22-32M88 88c-10-6-18-18-22-32" />
        <path d="M24 44c8-12 22-18 36-14M96 44c-8-12-22-18-36-14" opacity="0.7" />
      </g>
    </svg>
  )
}

export function MenuChoice({ onSubmit }: MenuChoiceProps) {
  const [choice, setChoice] = useState<MenuChoiceValue | null>(null)
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!choice) return
    onSubmit?.(choice)
    setSent(true)
  }

  return (
    <section className="inv-card inv-card--forest menu-choice" aria-labelledby="menu-choice-title">
      <DecoMonstera className="menu-choice__deco menu-choice__deco--tl" />
      <DecoMonstera className="menu-choice__deco menu-choice__deco--br" />

      <h2 id="menu-choice-title" className="menu-choice__title">
        Elección de menú
      </h2>

      <p className="menu-choice__intro">
        Queremos que todos nuestros invitados se sientan cómodos y disfruten al máximo este día.
        Por eso hemos pensado en opciones para todos los gustos: puedes elegir entre menú tradicional
        o menú vegano, para que cada uno tenga su plato ideal y disfrute la celebración tanto como
        nosotros.
      </p>

      <h3 className="menu-choice__form-title">¿Qué quieres comer?</h3>

      <form className="menu-choice__form" onSubmit={handleSubmit}>
        <input type="hidden" name="menu" value={choice ?? ''} />

        <div className="menu-choice__options" role="group" aria-label="Tipo de menú">
          <button
            type="button"
            className={`menu-choice__option ${choice === 'traditional' ? 'menu-choice__option--selected' : ''}`}
            onClick={() => setChoice('traditional')}
            aria-pressed={choice === 'traditional'}
          >
            Menú tradicional
          </button>
          <button
            type="button"
            className={`menu-choice__option ${choice === 'vegan' ? 'menu-choice__option--selected' : ''}`}
            onClick={() => setChoice('vegan')}
            aria-pressed={choice === 'vegan'}
          >
            Menú vegano
          </button>
        </div>

        <button type="submit" className="menu-choice__submit" disabled={!choice || sent}>
          {sent ? 'Elección registrada' : 'Confirmar menú'}
        </button>

        {sent && (
          <p className="menu-choice__status" role="status">
            ¡Gracias! Hemos guardado tu preferencia.
          </p>
        )}
      </form>

      <p className="menu-choice__footer">
        No se compartirá el nombre de tu perfil de Canva.
      </p>
    </section>
  )
}
