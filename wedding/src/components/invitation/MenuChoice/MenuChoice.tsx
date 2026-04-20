import type { ReactNode } from 'react'
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
  /**
   * Si es true (y `sumEnforced`), tradicional + vegano debe ser exactamente `partySize`.
   * Si es false, la suma puede ser menor o igual (asistencia parcial).
   */
  sumMustEqualPartySize?: boolean
  /** Suma mínima tradicional + vegano cuando aplica modo «suma ≤ partySize» (p. ej. asistencia parcial: al menos 1). */
  minMenusTotal?: number
  /** Suma máxima trad.+vegano en modo relajado (p. ej. parcial: como mucho n−1). Por defecto `partySize`. */
  maxMenusSum?: number
  /** Contenido al pie (p. ej. botón de envío del formulario padre). */
  children?: ReactNode
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
  sumMustEqualPartySize = true,
  minMenusTotal = 0,
  maxMenusSum: maxMenusSumProp,
  children,
}: MenuChoiceProps) {
  const plural = partySize > 1
  const sum = menuTraditional + menuVegan
  const maxSum = maxMenusSumProp ?? partySize
  const minSum = Math.min(Math.max(0, minMenusTotal), maxSum)
  const sumOk =
    !sumEnforced ||
    (sumMustEqualPartySize ? sum === partySize : sum <= maxSum && sum >= minSum)

  const canDecTrad =
    menuTraditional > 0 &&
    (sumMustEqualPartySize || menuTraditional - 1 + menuVegan >= minSum)
  /** Relajado: + si hay hueco en la suma o se puede restar del otro tipo para mantener el tope. */
  const canIncTrad = sumMustEqualPartySize
    ? menuTraditional < partySize
    : menuTraditional < partySize && (sum < maxSum || menuVegan > 0)
  const canDecVegan =
    menuVegan > 0 && (sumMustEqualPartySize || menuTraditional + menuVegan - 1 >= minSum)
  const canIncVegan = sumMustEqualPartySize
    ? menuVegan < partySize
    : menuVegan < partySize && (sum < maxSum || menuTraditional > 0)

  const headCounts = `${menuTraditional} tradicional + ${menuVegan} vegano`
  const relaxedSumOkMessage =
    minSum === maxSum
      ? `${headCounts} — ${maxSum} ${maxSum === 1 ? 'menú' : 'menús'} en total. Al indicar que no asistirán todos, solo puedes pedir menús para quienes sí vengan: en esta tarjeta hay ${partySize} ${plural ? 'lugares' : 'lugar'} y el máximo ahora es ${maxSum}.`
      : minSum >= 1
        ? `${headCounts} — entre ${minSum} y ${maxSum} menús en total (no asisten todos los de la tarjeta).`
        : `${headCounts} — como máximo ${maxSum} ${maxSum === 1 ? 'menú' : 'menús'}.`

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
        cuántos veganos corresponden a quienes asisten desde esta tarjeta
        {sumMustEqualPartySize || !sumEnforced
          ? ' (la suma debe coincidir con el número de lugares reservados).'
          : minSum >= 1 && maxSum < partySize
            ? ` (entre ${minSum} y ${maxSum} menús en total: no asistirán todos, la suma no puede ser ${partySize}).`
            : minSum >= 1
              ? ' (indica al menos 1 menú en total y no superes los lugares reservados).'
              : ' (la suma no puede superar el número de lugares reservados).'}
      </p>

      <h3 className="menu-choice__form-title">
        {plural ? '¿Qué quieren comer?' : '¿Qué quieres comer?'}
      </h3>

      <div className="menu-choice__counts" role="group" aria-label="Cantidad por tipo de menú">
        <div className="menu-choice__count-row">
          <span className="menu-choice__count-label" id="menu-traditional-label">
            Menú tradicional
          </span>
          <div className="menu-choice__stepper" role="group" aria-labelledby="menu-traditional-label">
            <button
              type="button"
              className="menu-choice__step-btn"
              aria-label="Un menú tradicional menos"
              disabled={!canDecTrad}
              onClick={() => onMenuTraditionalChange(menuTraditional - 1)}
            >
              −
            </button>
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
            <button
              type="button"
              className="menu-choice__step-btn"
              aria-label="Un menú tradicional más"
              disabled={!canIncTrad}
              onClick={() => onMenuTraditionalChange(menuTraditional + 1)}
            >
              +
            </button>
          </div>
        </div>
        <div className="menu-choice__count-row">
          <span className="menu-choice__count-label" id="menu-vegan-label">
            Menú vegano
          </span>
          <div className="menu-choice__stepper" role="group" aria-labelledby="menu-vegan-label">
            <button
              type="button"
              className="menu-choice__step-btn"
              aria-label="Un menú vegano menos"
              disabled={!canDecVegan}
              onClick={() => onMenuVeganChange(menuVegan - 1)}
            >
              −
            </button>
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
            <button
              type="button"
              className="menu-choice__step-btn"
              aria-label="Un menú vegano más"
              disabled={!canIncVegan}
              onClick={() => onMenuVeganChange(menuVegan + 1)}
            >
              +
            </button>
          </div>
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
          : sumMustEqualPartySize
            ? sumOk
              ? `${menuTraditional} tradicional + ${menuVegan} vegano = ${partySize} ${plural ? 'invitados' : 'invitado'}.`
              : `Suma: ${sum} de ${partySize}. Revisa los números.`
            : sumOk
              ? relaxedSumOkMessage
              : sum > maxSum
                ? `Suma: ${sum}; el máximo en este caso es ${maxSum} (no asistirán todos). Revisa los números.`
                : sum < minSum
                  ? 'Indica al menos 1 menú en total (tradicional y/o vegano) para quienes sí asisten.'
                  : 'Revisa los números.'}
      </p>

      {children != null ? <div className="menu-choice__submit-area">{children}</div> : null}
    </section>
  )
}
