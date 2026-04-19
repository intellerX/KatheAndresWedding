import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import type { To } from 'react-router-dom'

/** Destino interno manteniendo la query actual (`?family=…&number=…`, etc.). */
export function useInvitationLinkTo(pathname: string): To {
  const { search } = useLocation()
  return useMemo(() => ({ pathname, search }), [pathname, search])
}
