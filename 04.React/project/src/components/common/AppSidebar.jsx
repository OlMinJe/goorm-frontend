import { NavLink } from 'react-router'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { useSidebarClosed } from '@/hooks/useSidebarClosed'
import { MENU } from '@/lib/menus'
import { cn } from '@/lib/utils'

export function AppSidebar() {
  const { isClosed } = useSidebarClosed()
  const content = MENU.filter((i) => i.slot === 'content')
  const footer = MENU.filter((i) => i.slot === 'footer')

  return (
    <Sidebar collapsible="icon" className="pt-2">
      <SidebarHeader className={cn(isClosed && 'hidden')}>Menu</SidebarHeader>

      <SidebarContent>
        <SidebarMenu className={cn('list-none p-0 m-0', isClosed && 'items-center')}>
          {content.map((item) => (
            <SidebarMenuItem key={item.to || item.title}>
              <SidebarMenuButton asChild>
                <NavLink to={item.to || '#'} end>
                  {item.icon ? <item.icon /> : null}
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>

              {item.children?.length > 0 && (
                <SidebarMenuSub>
                  {item.children.map((sub) => (
                    <SidebarMenuSubItem key={sub.to}>
                      <SidebarMenuSubButton asChild>
                        <NavLink to={sub.to} end>
                          {sub.icon ? <sub.icon /> : null}
                          <span>{sub.title}</span>
                        </NavLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu className={cn('list-none p-0 m-0', isClosed && 'items-center')}>
          {footer.map((item) => (
            <SidebarMenuItem key={item.to}>
              <SidebarMenuButton asChild>
                <NavLink to={item.to} end>
                  {item.icon ? <item.icon /> : null}
                  <span className={cn(isClosed && 'sr-only')}>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
