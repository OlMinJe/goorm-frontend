import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router'

import Layout from '@/components/common/Layout'
import { ThemeContext } from '@/context/ThemeContext'

export default function RootLayout() {
  const theme = 'dark'

  return (
    <div style={{ fontFamily: "'Nanum Gothic Coding', monospace" }}>
      <ThemeContext value={theme}>
        <Layout>
          <ErrorBoundary fallback={<o>오류가 발생했습니다</o>}>
            <Suspense fallback={<div className="p-6">Loading....</div>}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </Layout>
      </ThemeContext>
    </div>
  )
}
