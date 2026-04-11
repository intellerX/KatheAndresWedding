import florVerdeTl from '../../../assets/props/florVerde3.png'
import florBlancaTl from '../../../assets/props/florBlanca2.png'
import './MenuChoice.css'

export type MenuChoiceProps = {
  /** Invitados en la tarjeta (desde `?number=` en la URL, mínimo 1). */
  partySize: number
  menuTraditional: number
  menuVegan: number
  onMenuTraditionalChange: (value: number) => void
  onMenuVeganChange: (value: number) => void
  /** Si es false, no se marca error de suma (p. ej. asistencia «no» aún no definida). */
  sumEnforced?: boolean
}

function clampCount(value: string, max: number): number {
  const n = Number.parseInt(value, 10)
  if (Number.isNaN(n)) return 0
  return Math.max(0, Math.min(max, n))
}

export function MenuChoice({
  partySize,
  menuTraditional,
  menuVegan,
  onMenuTraditionalChange,
  onMenuVeganChange,
  sumEnforced = true,
}: MenuChoiceProps) {
  const plural = partySize > 1
  const sum = menuTraditional + menuVegan
  const sumOk = !sumEnforced || sum === partySize

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
        Por eso hemos pensado en opciones para todos los gustos: indica cuántos menús tradicionales y
        cuántos veganos corresponden a los invitados de esta tarjeta (la suma debe coincidir con el
        número de lugares reservados).
      </p>

      <h3 className="menu-choice__form-title">
        {plural ? '¿Qué quieren comer?' : '¿Qué quieres comer?'}
      </h3>

      <div className="menu-choice__counts" role="group" aria-label="Cantidad por tipo de menú">
        <div className="menu-choice__count-row">
          <label className="menu-choice__count-label" htmlFor="menu-traditional">
            Menú tradicional
          </label>
          <input
            id="menu-traditional"
            name="menu_traditional"
            className="menu-choice__count-input"
            type="number"
            inputMode="numeric"
            min={0}
            max={partySize}
            value={menuTraditional}
            onChange={(e) => onMenuTraditionalChange(clampCount(e.target.value, partySize))}
            aria-invalid={sumEnforced && !sumOk}
          />
        </div>
        <div className="menu-choice__count-row">
          <label className="menu-choice__count-label" htmlFor="menu-vegan">
            Menú vegano
          </label>
          <input
            id="menu-vegan"
            name="menu_vegan"
            className="menu-choice__count-input"
            type="number"
            inputMode="numeric"
            min={0}
            max={partySize}
            value={menuVegan}
            onChange={(e) => onMenuVeganChange(clampCount(e.target.value, partySize))}
            aria-invalid={sumEnforced && !sumOk}
          />
        </div>
      </div>

      <p
        className={
          !sumEnforced
            ? 'menu-choice__sum-hint menu-choice__sum-hint--muted'
            : sumOk
              ? 'menu-choice__sum-hint menu-choice__sum-hint--ok'
              : 'menu-choice__sum-hint menu-choice__sum-hint--warn'
        }
      >
        {!sumEnforced
          ? 'Si indican que no asistirán, el reparto de menús no aplica en la confirmación.'
          : sumOk
            ? `${menuTraditional} tradicional + ${menuVegan} vegano = ${partySize} ${plural ? 'invitados' : 'invitado'}.`
            : `Suma: ${sum} de ${partySize}. Revisa los números.`}
      </p>

      <p className="menu-choice__footer">
        La confirmación final se envía con el botón «Confirmar» de la sección siguiente.
      </p>
    </section>
  )
}
