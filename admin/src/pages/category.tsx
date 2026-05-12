import { useMemo, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CategoryService } from "@/services/category.service"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AddEditCategory, ModalAction } from "./category/AddEditCategoryPage"
import type { CategoryReadT } from "@/schema/category.schema"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import DeleteModel from "./common/delete-model"

export default function CategoryPage() {
  const [keyword, setKeyword] = useState("")
  const [isOpenCategory, setIsOpenCategory] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<CategoryReadT | null>(
    null
  )
  const [action, setAction] = useState<ModalAction>(ModalAction.ADD)

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [isOpenDeleteCategoryModel, setIsOpenCategoryModel] = useState(false);
  const queryClient = useQueryClient()

  const queryKeyword = useMemo(() => keyword.trim(), [keyword])

  const {
    data: categories = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["categories", queryKeyword],
    queryFn: () => CategoryService.get(queryKeyword),
  })

  const deleteMutation = useMutation({
    mutationFn: async (categoryId: number) => CategoryService.delete(categoryId),
    onSuccess: async () => {
      toast.success("Category deleted successfully!")
      await queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
    onError: () => {
      toast.error("Failed to delete category.")
    },
  })

  const onEdit = (category: CategoryReadT) => {
    setSelectedCategory(category)
    setAction(ModalAction.EDIT)
    setIsOpenCategory(true)
  }

  return (
    <>
      <div className="flex-1 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Categories</CardTitle>
                <CardDescription>
                  Browse and search your category list.
                </CardDescription>
              </div>
              <div>
                <Button
                  onClick={() => {
                    setSelectedCategory(null);
                    setAction(ModalAction.ADD);
                    setIsOpenCategory(true);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Input
                value={keyword}
                placeholder="Search category by name..."
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
                <table className="w-full min-w-[480px] border-collapse text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        ID
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Name
                      </th>
                      <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td className="px-4 py-6 text-muted-foreground" colSpan={3}>
                          Loading categories...
                        </td>
                      </tr>
                    ) : null}

                    {isError && !isLoading ? (
                      <tr>
                        <td className="px-4 py-6 text-destructive" colSpan={3}>
                          Unable to load categories. Please try again.
                        </td>
                      </tr>
                    ) : null}

                    {!isLoading && !isError && categories.length === 0 ? (
                      <tr>
                        <td className="px-4 py-6 text-muted-foreground" colSpan={3}>
                          No categories found.
                        </td>
                      </tr>
                    ) : null}

                    {!isLoading && !isError
                      ? categories.map((category) => (
                        <tr
                          key={category.id}
                          className="border-t border-border transition-colors hover:bg-muted/40"
                        >
                          <td className="px-4 py-3 align-middle">{category.id}</td>
                          <td className="px-4 py-3 align-middle">{category.name}</td>
                          <td className="px-4 py-3 align-middle">
                            <div className="flex justify-end gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => onEdit(category)}
                              >
                                Edit
                              </Button>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  setSelectedCategoryId(category.id)
                                  setIsOpenCategoryModel(true)
                                }}
                                disabled={deleteMutation.isPending}
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
      {isOpenCategory && (
        <AddEditCategory
          isOpenCategory={isOpenCategory}
          setIsOpenCategory={setIsOpenCategory}
          action={action}
          category={selectedCategory || undefined}
        />
      )}

      {isOpenDeleteCategoryModel && selectedCategoryId && (
        <DeleteModel
          recordId={selectedCategoryId}
          open={setIsOpenCategoryModel}
          isOpenDelete={isOpenDeleteCategoryModel}
          modelName="Category"
        />
      )}
    </>

  )
}
