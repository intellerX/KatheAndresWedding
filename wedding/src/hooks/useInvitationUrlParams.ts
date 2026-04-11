import { useMemo, useSyncExternalStore } from 'react'
import {
  parseInvitationUrlSearch,
  type InvitationUrlParams,
} from '../utils/invitationUrlParams'

function subscribe(onChange: () => void) {
  window.addEventListener('popstate', onChange)
  return () => window.removeEventListener('popstate', onChange)
}

function getSearchSnapshot(): string {
  return window.location.search
}

function getServerSnapshot(): string {
  return ''
}

/** Lee `window.location.search` (p. ej. `?family=…&number=3`) y se actualiza con atrás/adelante. */
export function useInvitationUrlParams(): InvitationUrlParams {
  const search = useSyncExternalStore(subscribe, getSearchSnapshot, getServerSnapshot)
  return useMemo(() => parseInvitationUrlSearch(search), [search])
}
