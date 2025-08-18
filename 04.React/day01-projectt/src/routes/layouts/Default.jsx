import { Outlet } from 'react-router'

import { AppSidebar } from '@/components/common/AppSidebar'
import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function DefaultLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full max-w-full min-h-screen">
        <Header>
          <SidebarTrigger />
        </Header>
        <Outlet />
        <Footer />
      </div>
    </SidebarProvider>
  )
}
