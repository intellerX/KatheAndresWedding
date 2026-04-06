import florVerdeDress from '../../../assets/props/florVerde3.png'
import florVerde2 from '../../../assets/props/florVerde4.png'
import './Preguntas.css'

function IconClock() {
  return (
    <svg className="preguntas__icon" viewBox="0 0 40 40" aria-hidden>
      <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M20 12v9l6 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconHeart() {
  return (
    <svg className="preguntas__icon" viewBox="0 0 40 40" aria-hidden>
      <path
        d="M20 30c-6-4.5-11-9.5-11-15.5 0-3.5 2.5-6 6-6 2.5 0 4.5 1.5 5 3.5.5-2 2.5-3.5 5-3.5 3.5 0 6 2.5 6 6 0 6-5 11-11 15.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconParking() {
  return (
    <svg className="preguntas__icon" viewBox="0 0 40 40" aria-hidden>
      <rect
        x="8"
        y="10"
        width="24"
        height="18"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M14 14h5c2.5 0 4 1.5 4 3.5s-1.5 3.5-4 3.5h-2.5V26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IllustrationDressCode() {
  return (
    <img
      className="preguntas__dress-flor"
      src={florVerdeDress}
      alt=""
      aria-hidden
      decoding="async"
    />
  )
}

function IllustrationGift() {
  return (
    <img
      className="preguntas__gift-flor"
      src={florVerde2}
      alt=""
      aria-hidden
      decoding="async"
    />
    
  )
}

export type PreguntasProps = {
  /** Enlace al tablero de Pinterest con ideas de vestuario */
  pinterestBoardUrl?: string
}

export function Preguntas({ pinterestBoardUrl }: PreguntasProps) {
  return (
    <section
      className="inv-card inv-card--cream preguntas"
      aria-labelledby="preguntas-heading"
    >
      <h2 id="preguntas-heading" className="preguntas__title">
        ¿Preguntas?
      </h2>

      <div className="preguntas__stack">
        {/* Sección anterior — logística */}
        <article className="preguntas__item preguntas__item--inline-icon">
          <header className="preguntas__head">
            <IconClock />
            <h3 className="preguntas__question">¿A qué hora debo llegar?</h3>
          </header>
          <div className="preguntas__answer">
            <p>
              Te sugerimos llegar unos 15 minutos antes de la ceremonia religiosa para acomodarte con
              tranquilidad.
            </p>
            <p>
              Después de la iglesia saldremos juntos hacia la recepción. Si no asistes a la ceremonia
              en Cartago, calcula salir con 30 a 40 minutos de anticipación según el tráfico.
            </p>
          </div>
        </article>

        <article className="preguntas__item preguntas__item--inline-icon">
          <header className="preguntas__head">
            <IconHeart />
            <h3 className="preguntas__question">¿Puedo llevar a alguien más?</h3>
          </header>
          <div className="preguntas__answer">
            <p>
              Queremos una celebración íntima; por favor confirma solo a las personas incluidas en
              tu invitación. ¡Gracias por entenderlo! 💛
            </p>
          </div>
        </article>

        <article className="preguntas__item preguntas__item--inline-icon">
          <header className="preguntas__head">
            <IconParking />
            <h3 className="preguntas__question">¿Dónde puedo parquear?</h3>
          </header>
          <div className="preguntas__answer">
            <p>
              Cerca de la iglesia suele haber parqueo en la calle según disponibilidad del sector.
            </p>
            <p>
              En el lugar de la recepción contamos con parqueadero privado para invitados.
            </p>
          </div>
        </article>

        {/* Sección actual — estilo y regalos */}
        <article className="preguntas__item preguntas__item--illustration">
          <header className="preguntas__head preguntas__head--illustration">
            <IllustrationDressCode />
            <h3 className="preguntas__question">¿Cuál es el dress code?</h3>
          </header>
          <div className="preguntas__answer">
            <p>
              Nuestra ceremonia será al aire libre, así que queremos que estés fresco, cómodo y con
              estilo 🌿✨ Nada de trajes rígidos o súper formales que te hagan sudar; piensa en algo
              elegante pero relajado, que combine con el entorno natural.
            </p>
            <p>
              Para inspirarte, puedes buscar en Pinterest «formal garden party» y ver ideas de looks
              ligeros, elegantes y cómodos para este tipo de celebración 💐 Además, te compartimos
              este tablero con referencias del estilo que buscamos
              {pinterestBoardUrl ? (
                <>
                  :{' '}
                  <a
                    href={pinterestBoardUrl}
                    className="preguntas__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    tablero en Pinterest
                  </a>
                  .
                </>
              ) : (
                <> (pronto compartiremos el enlace).</>
              )}
            </p>
          </div>
        </article>

        <article className="preguntas__item preguntas__item--illustration preguntas__item--last">
          <header className="preguntas__head preguntas__head--illustration">
            <IllustrationGift />
            <h3 className="preguntas__question">¿Debo llevar regalo?</h3>
          </header>
          <div className="preguntas__answer">
            <p>
              Llevamos varios años viviendo juntos, así que no necesitamos nada. Lo que más nos
              importa es celebrar este día con nuestra gente.
            </p>
            <p>
              Si igual quieres hacernos un detalle, nos encantaría que nos ayudes a hacer de nuestra
              luna de miel un recuerdo inolvidable 🌴✨
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
