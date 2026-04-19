import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DRESS_CODE_IMAGES } from './dressCodeImages'
import './DressCodeGalleryPage.css'

export function DressCodeGalleryPage() {
  useEffect(() => {
    const prev = document.title
    document.title = 'Vestimenta — Kathe & Andres'
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <main className="invitation dress-code-page">
      <header className="dress-code-page__header">
        <Link className="dress-code-page__back" to="/">
          ← Volver a la invitación
        </Link>
        <h1 className="dress-code-page__title">Código de vestimenta</h1>
        <p className="dress-code-page__subtitle">
          Referencias solo como inspiración: tonos y estilos acordes a la celebración. No hace falta
          copiar ningún look al pie de la letra.
        </p>
      </header>

      <div className="dress-code-page__notice inv-card inv-card--forest" role="note">
        <p className="dress-code-page__notice-text">
          Imágenes de referencia, recuerda ir comod@ y relajado. 🌿
        </p>
      </div>

      <ul className="dress-code-page__grid">
        {DRESS_CODE_IMAGES.map((item, i) => (
          <li key={item.src} className="dress-code-page__item">
            <figure className="dress-code-page__figure">
              <img
                className="dress-code-page__img"
                src={item.src}
                alt={item.alt}
                loading={i < 4 ? 'eager' : 'lazy'}
                decoding="async"
                sizes="(max-width: 28rem) 50vw, 14rem"
              />
            </figure>
          </li>
        ))}
      </ul>
    </main>
  )
}
