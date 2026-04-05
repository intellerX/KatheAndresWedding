import { FormEvent, useState } from 'react'
import './AttendanceConfirm.css'

export type AttendanceValue = 'all' | 'partial' | 'none'

export type AttendancePayload = {
  attendance: AttendanceValue
  guests: string
  song: string
}

export type AttendanceConfirmProps = {
  onSubmit?: (data: AttendancePayload) => void
}

function DecoOrchid({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.05" strokeLinecap="round">
        <path d="M50 92V48M50 48c-12-8-10-24 4-30s22 2 26 16c-8-8-18-10-30 14z" />
        <path d="M28 62c6-10 16-16 28-16M72 62c-6-10-16-16-28-16" opacity="0.65" />
        <circle cx="42" cy="38" r="5" />
        <circle cx="58" cy="38" r="5" />
      </g>
    </svg>
  )
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

export function AttendanceConfirm({ onSubmit }: AttendanceConfirmProps) {
  const [attendance, setAttendance] = useState<AttendanceValue | ''>('')
  const [guests, setGuests] = useState('')
  const [song, setSong] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!attendance) return
    onSubmit?.({ attendance, guests, song })
    setSent(true)
  }

  return (
    <section
      className="inv-card inv-card--cream attendance"
      aria-labelledby="attendance-title"
    >
      <DecoOrchid className="attendance__deco attendance__deco--tl" />
      <DecoOrchid className="attendance__deco attendance__deco--br" />

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
        <form className="attendance__form" onSubmit={handleSubmit}>
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

          <div className="attendance__field">
            <label className="attendance__label" htmlFor="guests">
              ¿Quiénes asistirán?
            </label>
            <input
              id="guests"
              name="guests"
              className="attendance__input"
              type="text"
              autoComplete="name"
              placeholder="Nombres tal como en la invitación"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>

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

          <button type="submit" className="attendance__submit" disabled={sent || !attendance}>
            {sent ? 'Confirmación enviada' : 'Confirmar'}
          </button>

          {sent && (
            <p className="attendance__status" role="status">
              ¡Gracias! Hemos recibido tu respuesta.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
