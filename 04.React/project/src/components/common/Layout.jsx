import { Outlet } from 'react-router'

import { AppSidebar } from '@/components/common/AppSidebar'
import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function Layout() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <div className="flex flex-col w-full max-w-full min-h-100vh bg-gray-100">
        <Header>
          <SidebarTrigger />
        </Header>
        <div className="p-8">
          <Outlet />
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  )
}
