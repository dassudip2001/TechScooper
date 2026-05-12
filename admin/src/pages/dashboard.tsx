import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Package, Map, FileText, Activity, TrendingUp } from "lucide-react"
import { ProductService } from "@/services/product.service"
import { CategoryService } from "@/services/category.service"
import { logService } from "@/services/log.service"
import { Skeleton } from "@/components/ui/skeleton"
import { Link } from "react-router-dom"

export default function DahboardPage() {
  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: () => ProductService.get(""),
  })

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoryService.get(),
  })

  const { data: logsData, isLoading: isLoadingLogs } = useQuery({
    queryKey: ["logs"],
    queryFn: () => logService.get(),
  })

  const totalProducts = products?.length || 0;
  const totalCategories = categories?.length || 0;
  // Extract total logs from backend response which has shape { logs: [], total: number }
  const totalLogs = (logsData as any)?.total || 0;
  const recentLogs = Array.isArray(logsData) ? logsData.slice(0, 5) : (logsData as any)?.logs?.slice(0, 5) || [];

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
          <p className="text-muted-foreground mt-1">Here's what's happening in your store today.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {/* Total Products */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-sm transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Products
            </CardTitle>
            <div className="h-8 w-8 bg-blue-500/10 rounded-full flex items-center justify-center">
              <Package className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingProducts ? (
              <Skeleton className="h-8 w-20 mt-1" />
            ) : (
              <>
                <div className="text-3xl font-bold">{totalProducts}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">Live</span> in inventory
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Total Categories */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-sm transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Categories
            </CardTitle>
            <div className="h-8 w-8 bg-purple-500/10 rounded-full flex items-center justify-center">
              <Map className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingCategories ? (
              <Skeleton className="h-8 w-20 mt-1" />
            ) : (
              <>
                <div className="text-3xl font-bold">{totalCategories}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Organizing your catalog
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Total Logs */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-sm transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total System Actions
            </CardTitle>
            <div className="h-8 w-8 bg-emerald-500/10 rounded-full flex items-center justify-center">
              <Activity className="h-4 w-4 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingLogs ? (
              <Skeleton className="h-8 w-20 mt-1" />
            ) : (
              <>
                <div className="text-3xl font-bold">{totalLogs}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Recorded activities
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6">
        
        {/* Recent Logs List */}
        <Card className="col-span-4 border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>The latest actions performed by users.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoadingLogs ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))
              ) : recentLogs.length > 0 ? (
                recentLogs.map((log: any, i: number) => {
                  const idStr = typeof log._id === "string" ? log._id : log._id?.$oid || i;
                  return (
                    <div key={idStr} className="flex items-center gap-4 border-b border-border/50 pb-4 last:border-0 last:pb-0">
                      <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Action: <span className="text-primary font-bold">{String(log.action).toUpperCase()}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {log.payload?.name ? `Affected: ${log.payload.name}` : `Product ID: ${log.productId || 'N/A'}`}
                        </p>
                      </div>
                      <div className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
                        {log.timestamp?.$date ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "numeric" }).format(new Date(log.timestamp.$date)) : 'Recently'}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  <div className="h-12 w-12 rounded-full bg-muted mx-auto flex items-center justify-center mb-3">
                    <Activity className="h-6 w-6 opacity-50" />
                  </div>
                  No recent activities found.
                </div>
              )}
            </div>
            {!isLoadingLogs && recentLogs.length > 0 && (
              <div className="mt-6">
                <Link to="/dashboard/logs" className="text-sm text-primary hover:underline font-medium flex items-center gap-1">
                  View all logs <span aria-hidden="true">→</span>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-3 border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
           <CardHeader>
             <CardTitle>Quick Actions</CardTitle>
             <CardDescription>Shortcut links to manage your store.</CardDescription>
           </CardHeader>
           <CardContent className="grid gap-4">
              <Link to="/dashboard/product/add" className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors group">
                 <div className="h-10 w-10 bg-blue-500/10 rounded-full flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Package className="h-5 w-5 text-blue-500" />
                 </div>
                 <div>
                    <div className="text-sm font-semibold">Add New Product</div>
                    <div className="text-xs text-muted-foreground">Expand your inventory</div>
                 </div>
              </Link>
              
              <Link to="/dashboard/category" className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors group">
                 <div className="h-10 w-10 bg-purple-500/10 rounded-full flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <Map className="h-5 w-5 text-purple-500" />
                 </div>
                 <div>
                    <div className="text-sm font-semibold">Manage Categories</div>
                    <div className="text-xs text-muted-foreground">Organize product collections</div>
                 </div>
              </Link>
              
              <Link to="/dashboard/logs" className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors group">
                 <div className="h-10 w-10 bg-emerald-500/10 rounded-full flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <Activity className="h-5 w-5 text-emerald-500" />
                 </div>
                 <div>
                    <div className="text-sm font-semibold">View System Logs</div>
                    <div className="text-xs text-muted-foreground">Monitor admin activity</div>
                 </div>
              </Link>
           </CardContent>
        </Card>
      </div>
    </div>
  )
}
