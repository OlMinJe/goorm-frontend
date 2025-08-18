import { useMemo } from 'react'

import { useSidebar } from '@/components/ui/sidebar'

export function useSidebarClosed() {
  const { state, isMobile, openMobile } = useSidebar()
  const isClosed = useMemo(
    () => (isMobile ? !openMobile : state === 'collapsed'),
    [isMobile, openMobile, state]
  )

  return { isClosed }
}
