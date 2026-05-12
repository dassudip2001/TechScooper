import { useEffect, useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import { ProductService } from "@/services/product.service"
import { CategoryService } from "@/services/category.service"
import type { CreateProductInput } from "@/schema/product.schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import UploadFile from "../common/upload"
import { getImageUrl } from "@/lib/cloudfont"

type ProductFormValues = CreateProductInput

export default function AddEditProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [imagePreview, setImagePreview] = useState<string>("")
  const isEdit = Boolean(id)
  const productId = Number(id)

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoryService.get(),
  })

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: undefined,
      imageUrl: "",
    },
  })

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => ProductService.find(productId),
    enabled: isEdit && Number.isFinite(productId),
  })

  useEffect(() => {
    if (!product) return
    reset({
      name: product.name,
      description: product.description ?? "",
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId,
      imageUrl: getImageUrl(product.imageUrl ?? ""),
    })
    setImagePreview(getImageUrl(product.imageUrl ?? ""))
  }, [product, reset])

  const mutation = useMutation({
    mutationFn: async (formData: ProductFormValues) => {
      if (isEdit) return ProductService.update(productId, formData)
      return ProductService.create(formData)
    },
    onSuccess: async () => {
      toast.success(
        isEdit ? "Product updated successfully!" : "Product added successfully!"
      )
      await queryClient.invalidateQueries({ queryKey: ["products"] })
      navigate("/dashboard/products")
    },
    onError: () => {
      toast.error("Failed to save product.")
    },
  })

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    mutation.mutate(data)
  }

  return (
    <div className="flex-1 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? "Edit Product" : "Add Product"}</CardTitle>
          <CardDescription>
            {isEdit
              ? "Update product details and image."
              : "Create a new product with one image upload."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter product name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name ? (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  {...register("price", {
                    required: "Price is required",
                    valueAsNumber: true,
                    min: { value: 0.01, message: "Price must be greater than 0" },
                  })}
                />
                {errors.price ? (
                  <p className="text-sm text-destructive">
                    {errors.price.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  {...register("stock", {
                    required: "Stock is required",
                    valueAsNumber: true,
                    min: { value: 0, message: "Stock cannot be negative" },
                  })}
                />
                {errors.stock ? (
                  <p className="text-sm text-destructive">
                    {errors.stock.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoryId">Category</Label>
                <select
                  id="categoryId"
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm"
                  {...register("categoryId", {
                    required: "Please select a category",
                    setValueAs: (value) =>
                      value === "" ? undefined : Number(value),
                  })}
                >
                  <option value="">
                    {categories.length === 0
                      ? "Loading categories..."
                      : "Select a category"}
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId ? (
                  <p className="text-sm text-destructive">
                    {errors.categoryId.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" {...register("description")} />
            </div>

            <div className="space-y-2">
              <Label>Product Image (single upload)</Label>
              <UploadFile
                accept="image/png,image/jpeg,image/webp,image/gif"
                allowedTypes={["image"]}
                onUploadComplete={({ key, url }) => {
                  setValue("imageUrl", key)
                  setImagePreview(url)
                }}
              />
              {imagePreview ? (
                <img
                  src={imagePreview || getImageUrl(product?.imageUrl ?? "")}
                  alt="Product preview"
                  className="h-20 w-20 rounded-full object-cover ring-1 ring-border"
                />
              ) : null}
            </div>

            <div className="flex justify-end gap-2 border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard/products")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending || isLoading}>
                {mutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
