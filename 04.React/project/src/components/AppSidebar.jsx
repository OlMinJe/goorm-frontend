import { CircleDollarSign, Home, ListCheck, User } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useSidebarClosed } from '@/hooks/useSidebarClosed'
import { cn } from '@/lib/utils'

const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'User',
    url: '/user',
    icon: User,
  },
  {
    title: 'To-Do',
    url: '/todo',
    icon: ListCheck,
  },
  {
    title: 'Rate',
    url: '/rate',
    icon: CircleDollarSign,
  },
]

export function AppSidebar() {
  const { isClosed } = useSidebarClosed()

  return (
    <Sidebar collapsible="icon" className="pt-2">
      <SidebarHeader className={cn(isClosed && 'hidden')}>Menu</SidebarHeader>
      <SidebarContent>
        <SidebarMenu className={cn(isClosed && 'items-center')}>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
