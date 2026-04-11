import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** GitHub Pages en subruta: VITE_BASE=/NombreDelRepo/ (lo define el workflow). Raíz: no definir o VITE_BASE=/ */
function viteBase(): string {
  const v = process.env.VITE_BASE?.trim()
  if (!v || v === '/') return '/'
  const withLeading = v.startsWith('/') ? v : `/${v}`
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: viteBase(),
  /** Permite copiar nombres tipo Next (`NEXT_PUBLIC_*`) desde la doc de Supabase. */
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
})
