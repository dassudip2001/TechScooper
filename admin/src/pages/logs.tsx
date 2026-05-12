import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Activity, Clock, Package, User, Database, LayoutList, ChevronRight } from "lucide-react"
import { logService } from "@/services/log.service"

export default function LogsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["logs"],
    queryFn: () => logService.get(),
  })

  // Extract the logs array since the backend might return { logs: [...], total: ... }
  const logsList = Array.isArray(data) ? data : (data as any)?.logs || [];

  // Helper to format date nicely
  const formatDate = (dateValue: string | { $date: string }) => {
    try {
      let rawDate = typeof dateValue === "string" ? dateValue : dateValue.$date
      // some date formats might be milliseconds as string
      if (!isNaN(Number(rawDate))) {
        //  rawDate = Number(rawDate)
      }
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format(new Date(rawDate))
    } catch {
      return "Invalid Date"
    }
  }

  // Helper to color code the actions
  const getActionStyles = (action: string) => {
    switch (action?.toUpperCase()) {
      case "CREATE":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      case "UPDATE":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "DELETE":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Activity className="h-8 w-8 text-primary" />
            System Logs
          </h2>
          <p className="text-muted-foreground mt-1">
            Monitor and track all system activities, creations, and updates in real-time.
          </p>
        </div>
      </div>

      <Card className="border-border bg-card/50 backdrop-blur-sm shadow-sm">
        <CardHeader className="border-b border-border/50 bg-muted/20">
          <CardTitle className="flex items-center gap-2 text-lg">
            <LayoutList className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            A detailed trail of actions performed within the application.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/30">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium tracking-wider">Time</th>
                  <th scope="col" className="px-6 py-4 font-medium tracking-wider">Action</th>
                  <th scope="col" className="px-6 py-4 font-medium tracking-wider">Product ID</th>
                  <th scope="col" className="px-6 py-4 font-medium tracking-wider">User ID</th>
                  <th scope="col" className="px-6 py-4 font-medium tracking-wider">Payload Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {isLoading && (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-6 w-20 rounded-full" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-48" /></td>
                    </tr>
                  ))
                )}

                {!isLoading && isError && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-destructive">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Database className="h-8 w-8 opacity-50" />
                        <p>Failed to load system logs.</p>
                      </div>
                    </td>
                  </tr>
                )}

                {!isLoading && !isError && logsList?.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                          <LayoutList className="h-6 w-6 opacity-50" />
                        </div>
                        <p className="text-lg font-medium">No logs found</p>
                        <p className="text-sm opacity-70">There are currently no recorded activities in the system.</p>
                      </div>
                    </td>
                  </tr>
                )}

                {!isLoading && logsList.map((log: any) => {
                  const idStr = typeof log._id === "string" ? log._id : log._id?.$oid;
                  return (
                    <tr 
                      key={idStr || Math.random().toString()} 
                      className="hover:bg-muted/30 transition-colors group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4 opacity-70" />
                          <span>{formatDate(log.timestamp)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getActionStyles(String(log.action))}`}>
                          {String(log.action).toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 font-medium">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          {log.productId || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 font-medium">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {log.userId || "System"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 max-w-md">
                          {log.payload?.name ? (
                            <span className="font-medium text-foreground truncate block">
                              {log.payload.name}
                            </span>
                          ) : (
                            <span className="text-muted-foreground italic text-xs">No Name</span>
                          )}
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                             {log.payload?.price !== undefined && (
                               <span className="flex items-center gap-1">
                                 <span className="font-semibold text-foreground/80">${log.payload.price}</span>
                               </span>
                             )}
                             {log.payload?.stock !== undefined && (
                               <span className="flex items-center gap-1 bg-muted px-1.5 py-0.5 rounded">
                                 Stock: <span className="font-semibold">{log.payload.stock}</span>
                               </span>
                             )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}