
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"

export function NavProjects({
  projects,
  label
}: {
  projects: {
    name: string
    url: string
    icon: React.ReactNode
    activeBasePaths?: string[]
    exact?: boolean
  }[]
  label: string
  ,
}) {
  const location = useLocation()
  const pathname = location.pathname

  const matchesPath = (basePath: string, exact?: boolean) =>
    exact
      ? pathname === basePath
      : pathname === basePath || pathname.startsWith(`${basePath}/`)

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => {
          const activeBasePaths = item.activeBasePaths ?? [item.url]
          const isActive = activeBasePaths.some((path) =>
            matchesPath(path, item.exact)
          )

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={isActive}>
                <Link to={item.url}>
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
        {/* <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontalIcon className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroup>
  )
}
