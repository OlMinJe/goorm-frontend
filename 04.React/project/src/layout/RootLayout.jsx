import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router'

import Layout from '@/components/common/Layout'

export default function RootLayout() {
  return (
    <Layout>
      <ErrorBoundary fallback={<o>오류가 발생했습니다</o>}>
        <Suspense fallback={<div className="p-6">Loading....</div>}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  )
}
