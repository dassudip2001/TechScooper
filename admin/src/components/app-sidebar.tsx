
import * as React from "react"

import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  
  FrameIcon,
  PieChartIcon,
  MapIcon,
  FileIcon,
} from "lucide-react"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: <GalleryVerticalEndIcon />,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: <AudioLinesIcon />,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: <TerminalIcon />,
      plan: "Free",
    },
  ],

  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: <FrameIcon />,
      activeBasePaths: ["/dashboard"],
      exact: true,
    },
    {
      name: "Products",
      url: "/dashboard/products",
      icon: <PieChartIcon />,
      activeBasePaths: ["/dashboard/products", "/dashboard/product"],
    },
    {
      name: "Category",
      url: "/dashboard/category",
      icon: <MapIcon />,
      activeBasePaths: ["/dashboard/category"],
    },
  ],

  projects2: [
    {
      name: "Logs",
      url: "/dashboard/logs",
      icon: <FileIcon />,
      activeBasePaths: ["/dashboard/logs"],
      exact: true,
    },
    
  ],
}



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={data.projects} label="Projects" />
        <NavProjects projects={data.projects2}  label="Settings"/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
