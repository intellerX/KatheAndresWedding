import { type FormEvent, useState } from 'react'
import florVerdeTl from '../../../assets/props/florVerde3.png'
import florBlancaTl from '../../../assets/props/florBlanca2.png'
import './MenuChoice.css'

export type MenuChoiceValue = 'traditional' | 'vegan'

export type MenuChoiceProps = {
  /** Se dispara al enviar con la opción elegida (conectar a tu backend o servicio) */
  onSubmit?: (choice: MenuChoiceValue) => void
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
      <img
        className="menu-choice__deco menu-choice__deco--tl"
        src={florVerdeTl}
        alt=""
        aria-hidden
        decoding="async"
      />
      <img
        className="menu-choice__deco menu-choice__deco--br"
        src={florBlancaTl}
        alt=""
        aria-hidden
        decoding="async"
      />

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

    </section>
  )
}
