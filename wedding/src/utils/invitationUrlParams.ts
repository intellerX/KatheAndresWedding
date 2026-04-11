/**
 * Query string for personalized invite links (no router).
 *
 * Use a normal query string, for example:
 * `http://localhost:5173/?family=Familia_Ortiz_Lopez&number=3`
 *
 * - `family` → texto en IntroSubtitle (los guiones bajos se muestran como espacio).
 * - `number` → número de invitados/lugares (opcional; por si lo usas más adelante).
 * - `intro`, `subtitle`, `text` → alternativas si no hay `family`.
 */
export type InvitationUrlParams = {
  /** Línea bajo los nombres (familia invitada, etc.) */
  introText: string
  /** Solo `?family=…` normalizado; sirve para prellenar el invitado si `number=1`. */
  familyDisplay: string
  /** Valor de ?number=… o null */
  guestCount: number | null
}

function decodeParam(value: string | null): string {
  if (value == null || value === '') return ''
  try {
    return decodeURIComponent(value.replace(/\+/g, ' '))
  } catch {
    return value
  }
}

function normalizeFamilyDisplay(raw: string): string {
  return raw.replace(/_/g, ' ').replace(/\s+/g, ' ').trim()
}

export function parseInvitationUrlSearch(search: string): InvitationUrlParams {
  const trimmed = search.startsWith('?') ? search.slice(1) : search
  const p = new URLSearchParams(trimmed)

  const familyDisplay = normalizeFamilyDisplay(decodeParam(p.get('family')))
  const introText =
    familyDisplay ||
    decodeParam(p.get('intro')) ||
    decodeParam(p.get('subtitle')) ||
    decodeParam(p.get('text')) ||
    ''

  const numRaw = p.get('number')
  let guestCount: number | null = null
  if (numRaw != null && numRaw !== '') {
    const n = Number.parseInt(numRaw, 10)
    if (!Number.isNaN(n) && n > 0) guestCount = n
  }

  return { introText, familyDisplay, guestCount }
}
