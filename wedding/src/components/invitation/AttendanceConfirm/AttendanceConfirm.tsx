import { type FormEvent, useEffect, useState } from 'react'
import florVerdeTl from '../../../assets/props/florVerde3.png'
import florVerdeBr from '../../../assets/props/florVerde4.png'
import { useInvitationUrlParams } from '../../../hooks/useInvitationUrlParams'
import { missingSupabaseEnvVars, supabase } from '../../../utils/supabase'
import { MenuChoice } from '../MenuChoice/MenuChoice'
import './AttendanceConfirm.css'

export type AttendanceValue = 'all' | 'partial' | 'none'

export type AttendancePayload = {
  attendance: AttendanceValue
  /** Un nombre por invitado (longitud = `partySize` desde la URL). */
  guestNames: string[]
  song: string
  partySize: number
  menuTraditional: number
  menuVegan: number
}

export type AttendanceConfirmProps = {
  onSubmit?: (data: AttendancePayload) => void
}

const attendanceOptions: { value: AttendanceValue; label: string }[] = [
  {
    value: 'all',
    label: 'Sí, todos los invitados de esta tarjeta asistirán',
  },
  {
    value: 'partial',
    label: 'No podrán asistir todos los invitados de esta tarjeta',
  },
  {
    value: 'none',
    label: 'No podremos asistir',
  },
]

function resizeGuestNames(prev: string[], size: number): string[] {
  const next = Array.from({ length: size }, (_, i) => prev[i] ?? '')
  return next
}

function initialGuestNames(size: number, familyDisplay: string): string[] {
  const next = resizeGuestNames([], size)
  if (size === 1 && familyDisplay) {
    next[0] = familyDisplay
  }
  return next
}

/** Suma máx. trad.+vegano en asistencia parcial: como mucho asisten n−1 (mín. 1 menú en total). */
function maxMenuSumPartial(partySize: number) {
  return Math.max(1, partySize - 1)
}

/** Parcial: por defecto n−1 tradicionales (mín. 1). Resto: n tradicional. */
function defaultMenuCounts(partySize: number, attendance: AttendanceValue | '') {
  if (attendance === 'partial') {
    return {
      menuTraditional: partySize <= 1 ? 1 : partySize - 1,
      menuVegan: 0,
    }
  }
  return { menuTraditional: partySize, menuVegan: 0 }
}

export function AttendanceConfirm({ onSubmit }: AttendanceConfirmProps) {
  const { guestCount, familyDisplay } = useInvitationUrlParams()
  const partySize = Math.max(1, guestCount ?? 1)

  const [attendance, setAttendance] = useState<AttendanceValue | ''>('')
  const [guestNames, setGuestNames] = useState<string[]>(() =>
    initialGuestNames(Math.max(1, guestCount ?? 1), familyDisplay),
  )
  const [song, setSong] = useState('')
  const [menuTraditional, setMenuTraditional] = useState(partySize)
  const [menuVegan, setMenuVegan] = useState(0)
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [modal, setModal] = useState<null | 'review' | 'success' | 'error'>(null)
  const [modalError, setModalError] = useState('')

  useEffect(() => {
    setGuestNames((prev) => {
      const next = resizeGuestNames(prev, partySize)
      if (partySize === 1 && familyDisplay) {
        next[0] = familyDisplay
      }
      return next
    })
  }, [partySize, familyDisplay])

  useEffect(() => {
    const { menuTraditional: t, menuVegan: v } = defaultMenuCounts(partySize, attendance)
    setMenuTraditional(t)
    setMenuVegan(v)
  }, [partySize, attendance])

  const detailsRequired = attendance === 'all' || attendance === 'partial'
  const menuSumExact = attendance === 'all'
  /** Parcial: suma menús entre 1 y n−1; resto (sin modo exacto): hasta `partySize`. */
  const menuRelaxedMax =
    attendance === 'partial' ? maxMenuSumPartial(partySize) : partySize
  const menuSum = menuTraditional + menuVegan
  const menuSumOk =
    !detailsRequired ||
    (menuSumExact
      ? menuSum === partySize
      : menuSum >= (attendance === 'partial' ? 1 : 0) && menuSum <= menuRelaxedMax)

  const namesOk =
    !detailsRequired ||
    (attendance === 'partial'
      ? (guestNames[0] ?? '').trim() !== ''
      : guestNames.length === partySize && guestNames.every((n) => n.trim() !== ''))

  function setGuestAt(index: number, value: string) {
    setGuestNames((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  /** Total: exacta `partySize`; parcial: suma entre 1 y `menuRelaxedMax` (n−1). */
  function syncMenuTraditional(requested: number) {
    if (menuSumExact) {
      const t = Math.max(0, Math.min(partySize, requested))
      setMenuTraditional(t)
      setMenuVegan(partySize - t)
      return
    }
    const cap = menuRelaxedMax
    let t = Math.max(0, Math.min(partySize, requested))
    let v = menuVegan
    if (t + v > cap) {
      v = Math.max(0, cap - t)
    }
    if (t + v > cap) {
      t = Math.max(0, cap - v)
    }
    setMenuTraditional(t)
    setMenuVegan(v)
  }

  function syncMenuVegan(requested: number) {
    if (menuSumExact) {
      const v = Math.max(0, Math.min(partySize, requested))
      setMenuVegan(v)
      setMenuTraditional(partySize - v)
      return
    }
    const cap = menuRelaxedMax
    let v = Math.max(0, Math.min(partySize, requested))
    let t = menuTraditional
    if (t + v > cap) {
      t = Math.max(0, cap - v)
    }
    if (t + v > cap) {
      v = Math.max(0, cap - t)
    }
    setMenuTraditional(t)
    setMenuVegan(v)
  }

  function setAttendanceChoice(value: AttendanceValue) {
    setAttendance(value)
  }

  function buildPayload(): AttendancePayload {
    const attending = attendance === 'all' || attendance === 'partial'
    return {
      attendance: attendance as AttendanceValue,
      guestNames: attending ? guestNames.map((n) => n.trim()) : [],
      song: song.trim(),
      partySize,
      menuTraditional: attending ? menuTraditional : 0,
      menuVegan: attending ? menuVegan : 0,
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!attendance || !menuSumOk || !namesOk || submitting || sent) return
    setModal('review')
  }

  async function confirmSendFromReview() {
    if (!attendance || submitting || sent) return

    const payload = buildPayload()

    if (!supabase) {
      const missing = missingSupabaseEnvVars()
      setModalError(
        [
          missing.length
            ? `Faltan en la carpeta wedding/.env (y reiniciar npm run dev): ${missing.join(', ')}.`
            : 'Revisa wedding/.env y reinicia npm run dev.',
          'La clave debe ser VITE_SUPABASE_ANON_KEY (JWT eyJ… en Supabase → Project Settings → API → anon public).',
          'Si faltan esas variables, la app no crea el cliente: no se hace ninguna petición HTTP, por eso no verás nada en la pestaña Network.',
        ].join(' '),
      )
      setModal('error')
      return
    }

    setSubmitting(true)
    const { error } = await supabase.from('rsvp').insert({ payload })
    setSubmitting(false)

    if (error) {
      console.warn('[rsvp]', error.message)
      setModalError(error.message || 'No se pudo guardar. Intenta de nuevo.')
      setModal('error')
      return
    }

    onSubmit?.(payload)
    setSent(true)
    setModal('success')
  }

  function closeModal() {
    setModal(null)
    setModalError('')
  }

  useEffect(() => {
    if (!modal) return
    function onEscape(ev: KeyboardEvent) {
      if (ev.key === 'Escape') {
        setModal(null)
        setModalError('')
      }
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onEscape)
    return () => {
      window.removeEventListener('keydown', onEscape)
      document.body.style.overflow = prevOverflow
    }
  }, [modal])

  const formOk = menuSumOk && namesOk

  const attendanceLabel =
    attendanceOptions.find((o) => o.value === attendance)?.label ?? String(attendance)

  return (
    <form className="invitation-rsvp-form" onSubmit={handleSubmit}>
      {modal && (
        <div className="rsvp-modal-backdrop" role="presentation" onClick={closeModal}>
          <div
            className={`rsvp-modal rsvp-modal--${modal}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={
              modal === 'review' ? 'rsvp-review-title' : 'rsvp-modal-title'
            }
            aria-describedby={
              modal === 'review' ? 'rsvp-review-desc' : 'rsvp-modal-desc'
            }
            onClick={(ev) => ev.stopPropagation()}
          >
            {modal === 'review' ? (
              <>
                <h3 id="rsvp-review-title" className="rsvp-modal__title rsvp-modal__title--review">
                  Revisa antes de enviar
                </h3>
                <p id="rsvp-review-desc" className="rsvp-modal__text rsvp-modal__text--review">
                  Comprueba invitados y menú. Si todo es correcto, confirma el envío; si no, vuelve
                  atrás para corregir.
                </p>
                <div className="rsvp-review">
                  <div className="rsvp-review__block">
                    <span className="rsvp-review__label">Asistencia</span>
                    <span className="rsvp-review__value">{attendanceLabel}</span>
                  </div>
                  {detailsRequired ? (
                    <div className="rsvp-review__block">
                      <span className="rsvp-review__label">Invitados</span>
                      <ul className="rsvp-review__list">
                        {Array.from({ length: partySize }, (_, i) => {
                          const trimmed = (guestNames[i] ?? '').trim()
                          return (
                            <li key={i} className="rsvp-review__list-item">
                              <span className="rsvp-review__guest-label">Invitado {i + 1}</span>
                              <span className="rsvp-review__guest-name">
                                {trimmed !== '' ? trimmed : '—'}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ) : null}
                  {detailsRequired ? (
                    <div className="rsvp-review__block">
                      <span className="rsvp-review__label">Menú</span>
                      <span className="rsvp-review__value">
                        {menuTraditional}{' '}
                        {menuTraditional === 1 ? 'menú tradicional' : 'menús tradicionales'} ·{' '}
                        {menuVegan} {menuVegan === 1 ? 'menú vegano' : 'menús veganos'}
                      </span>
                    </div>
                  ) : (
                    <div className="rsvp-review__block">
                      <span className="rsvp-review__label">Menú</span>
                      <span className="rsvp-review__value">No aplica</span>
                    </div>
                  )}
                  <div className="rsvp-review__block">
                    <span className="rsvp-review__label">Canción sugerida</span>
                    <span className="rsvp-review__value">
                      {song.trim() !== '' ? song.trim() : '—'}
                    </span>
                  </div>
                </div>
                <div className="rsvp-modal__actions rsvp-modal__actions--review">
                  <button type="button" className="rsvp-modal__btn rsvp-modal__btn--secondary" onClick={closeModal}>
                    Corregir
                  </button>
                  <button
                    type="button"
                    className="rsvp-modal__btn"
                    disabled={submitting}
                    onClick={() => void confirmSendFromReview()}
                  >
                    {submitting ? 'Enviando…' : 'Sí, enviar'}
                  </button>
                </div>
              </>
            ) : modal === 'success' ? (
              <>
                <div className="rsvp-modal__icon-wrap" aria-hidden>
                  <div className="rsvp-modal__success-ring">
                    <span className="rsvp-modal__success-check" />
                  </div>
                </div>
                <h3 id="rsvp-modal-title" className="rsvp-modal__title">
                  ¡Listo!
                </h3>
                <p id="rsvp-modal-desc" className="rsvp-modal__text">
                  Hemos recibido tu respuesta: asistencia, nombres y menú. ¡Gracias!
                </p>
                <button type="button" className="rsvp-modal__btn" onClick={closeModal}>
                  Entendido
                </button>
              </>
            ) : (
              <>
                <div className="rsvp-modal__icon-wrap rsvp-modal__icon-wrap--error" aria-hidden>
                  <span className="rsvp-modal__error-mark">!</span>
                </div>
                <h3 id="rsvp-modal-title" className="rsvp-modal__title">
                  No se pudo enviar
                </h3>
                <p id="rsvp-modal-desc" className="rsvp-modal__text rsvp-modal__text--error">
                  {modalError}
                </p>
                <button type="button" className="rsvp-modal__btn" onClick={closeModal}>
                  Cerrar
                </button>
              </>
            )}
          </div>
        </div>
      )}


      <section
        className="inv-card inv-card--cream attendance"
        aria-labelledby="attendance-title"
      >
        <img
          className="attendance__deco attendance__deco--tl"
          src={florVerdeTl}
          alt=""
          aria-hidden
          decoding="async"
        />
        <img
          className="attendance__deco attendance__deco--br"
          src={florVerdeBr}
          alt=""
          aria-hidden
          decoding="async"
        />

        <h2 id="attendance-title" className="attendance__title">
          Confirmación de asistencia
        </h2>

        <p className="attendance__intro">
          Tu presencia es muy importante para nosotros, y queremos organizar todo con tiempo para que
          sea un día perfecto y sin contratiempos 💛 Por favor, confirma si asistirás y si asistirán
          todos los nombres que aparecen en la invitación, o si alguno no podrá acompañarnos. Esto nos
          ayudará a asegurarnos de que cada detalle, desde el menú hasta los asientos, esté listo
          para todos.
        </p>

        <div className="attendance__panel">
          <div className="attendance__form">
            <fieldset className="attendance__fieldset">
              <legend className="attendance__legend">¿Asistirás? *</legend>
              <div className="attendance__radios">
                {attendanceOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className={`attendance__radio ${attendance === opt.value ? 'attendance__radio--checked' : ''}`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value={opt.value}
                      checked={attendance === opt.value}
                      onChange={() => setAttendanceChoice(opt.value)}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {detailsRequired && (
              <fieldset className="attendance__fieldset attendance__fieldset--guests">
                <legend className="attendance__legend">
                  {attendance === 'partial' ? (
                    <>
                      ¿Quiénes asistirán? * Completa al menos el invitado 1, el resto es opcional.
                    </>
                  ) : (
                    <>
                      ¿Quiénes asistirán? * ({partySize}{' '}
                      {partySize === 1 ? 'nombre' : 'nombres'})
                    </>
                  )}
                </legend>
                {Array.from({ length: partySize }, (_, i) => {
                  const optionalGuest = attendance === 'partial' && i > 0
                  const showInvalid =
                    attendance === 'all' && !(guestNames[i] ?? '').trim()
                  const showInvalidPartial =
                    attendance === 'partial' && i === 0 && !(guestNames[0] ?? '').trim()
                  return (
                    <div key={i} className="attendance__field">
                      <label className="attendance__label" htmlFor={`guest-${i}`}>
                        Invitado {i + 1}
                        {optionalGuest ? (
                          <span className="attendance__label-optional"> (opcional)</span>
                        ) : (
                          ' *'
                        )}
                      </label>
                      <input
                        id={`guest-${i}`}
                        name={`guest_${i}`}
                        className="attendance__input"
                        type="text"
                        autoComplete="name"
                        placeholder={optionalGuest ? 'Nombre (si aplica)' : 'Nombre'}
                        value={guestNames[i] ?? ''}
                        onChange={(e) => setGuestAt(i, e.target.value)}
                        aria-invalid={showInvalid || showInvalidPartial}
                      />
                    </div>
                  )
                })}
                {!namesOk && (
                  <p className="attendance__names-hint" role="note">
                    {attendance === 'partial'
                      ? 'Escribe al menos el nombre del invitado 1 (quien sí asistirá).'
                      : 'Completa con el nombre de las personas que SI asistirán.'}
                  </p>
                )}
                <p className="attendance__continue-hint" role="status">
                  En la siguiente sección, <strong>Elección de menú</strong>, podrás indicar el
                  menú de cada tipo que quieres para los invitados que asisten.
                  Cuando lo tengas claro, pulsa «Confirmar» al final de esa sección para enviar tu
                  respuesta.
                </p>
              </fieldset>
            )}

            <div className="attendance__field">
              <label className="attendance__label" htmlFor="song">
                ¿Qué canción no puede faltar?
              </label>
              <input
                id="song"
                name="song"
                className="attendance__input"
                type="text"
                placeholder="Tu tema favorito para la pista"
                value={song}
                onChange={(e) => setSong(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <MenuChoice
        partySize={partySize}
        menuTraditional={menuTraditional}
        menuVegan={menuVegan}
        onMenuTraditionalChange={syncMenuTraditional}
        onMenuVeganChange={syncMenuVegan}
        sumEnforced={detailsRequired}
        sumMustEqualPartySize={detailsRequired && menuSumExact}
        minMenusTotal={attendance === 'partial' ? 1 : 0}
        maxMenusSum={menuRelaxedMax}
      >
        <button
          type="submit"
          className="attendance__submit menu-choice__submit-btn"
          disabled={sent || submitting || !attendance || !formOk}
        >
          {sent ? 'Confirmación enviada' : submitting ? 'Enviando…' : 'Confirmar'}
        </button>
      </MenuChoice>
    </form>
  )
}
