import { useMemo, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProductService } from "@/services/product.service"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { getImageUrl } from "@/lib/cloudfont"
import { toast } from "sonner"

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop"

export default function ProductPage() {
  const [keyword, setKeyword] = useState("")
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const queryKeyword = useMemo(() => keyword.trim(), [keyword])

  const {
    data: products = [],
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["products", queryKeyword],
    queryFn: () => ProductService.get(queryKeyword),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => ProductService.delete(id),
    onSuccess: async () => {
      toast.success("Product deleted successfully!")
      await queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onError: () => {
      toast.error("Failed to delete product.")
    },
  })

  const onDelete = (id: number) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this product?")
    if (!shouldDelete) return
    deleteMutation.mutate(id)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Browse and search products. Image URL is shown as a circle
                thumbnail.
              </CardDescription>
            </div>
            <Button onClick={() => navigate("/dashboard/product/add")}>
              <Plus className="mr-2 h-4 w-4" />
              Add New
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Input
              value={keyword}
              placeholder="Search product by name..."
              onChange={(event) => setKeyword(event.target.value)}
            />
            <Button
              variant="outline"
              onClick={() => refetch()}
              disabled={isFetching}
              className="sm:w-auto"
            >
              Refresh
            </Button>
          </div>

          <div className="overflow-hidden rounded-lg border border-border">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Image
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Stock
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td
                        className="px-4 py-6 text-muted-foreground"
                        colSpan={6}
                      >
                        Loading products...
                      </td>
                    </tr>
                  ) : null}

                  {isError && !isLoading ? (
                    <tr>
                      <td className="px-4 py-6 text-destructive" colSpan={6}>
                        Unable to load products. Please try again.
                      </td>
                    </tr>
                  ) : null}

                  {!isLoading && !isError && products.length === 0 ? (
                    <tr>
                      <td
                        className="px-4 py-6 text-muted-foreground"
                        colSpan={6}
                      >
                        No products found.
                      </td>
                    </tr>
                  ) : null}

                  {!isLoading && !isError
                    ? products.map((product) => (
                        <tr
                          key={product.id}
                          className="border-t border-border transition-colors hover:bg-muted/40"
                        >
                          <td className="px-4 py-3 align-middle">
                            {product.id}
                          </td>
                          <td className="px-4 py-3 align-middle">
                            <img
                              src={
                                getImageUrl(product.imageUrl!) || FALLBACK_IMAGE
                              }
                              alt={product.name}
                              className="h-10 w-10 rounded-full object-cover ring-1 ring-border"
                              onError={(event) => {
                                event.currentTarget.src = FALLBACK_IMAGE
                              }}
                            />
                          </td>
                          <td className="px-4 py-3 align-middle">
                            {product.name}
                          </td>
                          <td className="px-4 py-3 align-middle">
                            {Number(product.price).toFixed(2)}
                          </td>
                          <td className="px-4 py-3 align-middle">
                            {product.stock}
                          </td>
                          <td className="px-4 py-3 align-middle">
                            <div className="flex justify-end gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  navigate(
                                    `/dashboard/product/edit/${product.id}`
                                  )
                                }
                              >
                                Edit
                              </Button>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                disabled={deleteMutation.isPending}
                                onClick={() => onDelete(product.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>

          {isFetching && !isLoading ? (
            <p className="text-xs text-muted-foreground">Updating list...</p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
