import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './PostEventGalleryPage.css'

const SKELETON_LAYOUT = [
  'tall',
  'short',
  'short',
  'medium',
  'tall',
  'short',
  'medium',
  'short',
  'tall',
  'short',
  'medium',
  'short',
] as const

export function PostEventGalleryPage() {
  useEffect(() => {
    const prev = document.title
    document.title = 'Galería — Kathe & Andres'
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <main className="invitation post-gallery-page">
      <header className="post-gallery-page__header">
        <Link className="post-gallery-page__back" to="/">
          ← Volver a la invitación
        </Link>
        <h1 className="post-gallery-page__title">Galería de fotos</h1>
        <p className="post-gallery-page__subtitle">
          Las fotos aparecerán aquí después del evento...
        </p>
      </header>

      <div className="post-gallery-page__notice inv-card inv-card--forest" role="status">
        <p className="post-gallery-page__notice-text">
          Aún no hay imágenes publicadas.
        </p>
      </div>

      <div
        className="post-gallery-page__grid"
        aria-busy="true"
        aria-label="Galería de fotos (contenido pendiente)"
      >
        {SKELETON_LAYOUT.map((variant, i) => (
          <div
            key={`post-gallery-skeleton-${variant}-${i}`}
            className={`post-gallery-page__skeleton post-gallery-page__skeleton--${variant}`}
          />
        ))}
      </div>
    </main>
  )
}
