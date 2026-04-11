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
  const [modal, setModal] = useState<null | 'success' | 'error'>(null)
  const [modalError, setModalError] = useState('')

  useEffect(() => {
    setMenuTraditional(partySize)
    setMenuVegan(0)
    setGuestNames((prev) => {
      const next = resizeGuestNames(prev, partySize)
      if (partySize === 1 && familyDisplay) {
        next[0] = familyDisplay
      }
      return next
    })
  }, [partySize, familyDisplay])

  const detailsRequired = attendance === 'all' || attendance === 'partial'
  const menuSumOk =
    !detailsRequired || menuTraditional + menuVegan === partySize

  const namesOk =
    !detailsRequired ||
    (guestNames.length === partySize && guestNames.every((n) => n.trim() !== ''))

  function setGuestAt(index: number, value: string) {
    setGuestNames((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  /** Tradicional + vegano siempre = `partySize`: al subir uno, baja el otro. */
  function syncMenuTraditional(requested: number) {
    const t = Math.max(0, Math.min(partySize, requested))
    setMenuTraditional(t)
    setMenuVegan(partySize - t)
  }

  function syncMenuVegan(requested: number) {
    const v = Math.max(0, Math.min(partySize, requested))
    setMenuVegan(v)
    setMenuTraditional(partySize - v)
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!attendance || !menuSumOk || !namesOk || submitting || sent) return

    const attending = attendance === 'all' || attendance === 'partial'

    const payload: AttendancePayload = {
      attendance,
      guestNames: attending ? guestNames.map((n) => n.trim()) : [],
      song: song.trim(),
      partySize,
      menuTraditional: attending ? menuTraditional : 0,
      menuVegan: attending ? menuVegan : 0,
    }

    console.log('[Invitación — confirmación]', payload)

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

  return (
    <form className="invitation-rsvp-form" onSubmit={handleSubmit}>
      {modal && (
        <div className="rsvp-modal-backdrop" role="presentation" onClick={closeModal}>
          <div
            className={`rsvp-modal ${modal === 'success' ? 'rsvp-modal--success' : 'rsvp-modal--error'}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="rsvp-modal-title"
            aria-describedby="rsvp-modal-desc"
            onClick={(ev) => ev.stopPropagation()}
          >
            {modal === 'success' ? (
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
              </>
            )}
            <button type="button" className="rsvp-modal__btn" onClick={closeModal}>
              {modal === 'success' ? 'Entendido' : 'Cerrar'}
            </button>
          </div>
        </div>
      )}
      <MenuChoice
        partySize={partySize}
        menuTraditional={menuTraditional}
        menuVegan={menuVegan}
        onMenuTraditionalChange={syncMenuTraditional}
        onMenuVeganChange={syncMenuVegan}
        sumEnforced={detailsRequired}
      />

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
                      onChange={() => setAttendance(opt.value)}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {detailsRequired && (
              <fieldset className="attendance__fieldset attendance__fieldset--guests">
                <legend className="attendance__legend">
                  ¿Quiénes asistirán? * ({partySize}{' '}
                  {partySize === 1 ? 'nombre' : 'nombres'})
                </legend>
                {Array.from({ length: partySize }, (_, i) => (
                  <div key={i} className="attendance__field">
                    <label className="attendance__label" htmlFor={`guest-${i}`}>
                      Invitado {i + 1}
                    </label>
                    <input
                      id={`guest-${i}`}
                      name={`guest_${i}`}
                      className="attendance__input"
                      type="text"
                      autoComplete="name"
                      placeholder="Nombre tal como en la invitación"
                      value={guestNames[i] ?? ''}
                      onChange={(e) => setGuestAt(i, e.target.value)}
                      aria-invalid={detailsRequired && !(guestNames[i] ?? '').trim()}
                    />
                  </div>
                ))}
                {!namesOk && (
                  <p className="attendance__names-hint" role="note">
                    Completa el nombre de cada uno de los {partySize} invitados de esta tarjeta.
                  </p>
                )}
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

            <button
              type="submit"
              className="attendance__submit"
              disabled={sent || submitting || !attendance || !formOk}
            >
              {sent ? 'Confirmación enviada' : submitting ? 'Enviando…' : 'Confirmar'}
            </button>
          </div>
        </div>
      </section>
    </form>
  )
}
