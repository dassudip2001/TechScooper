import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import {  useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CategoryReadT, CategoryWriteT } from "@/schema/category.schema";
import { CategoryService } from "@/services/category.service";

export enum ModalAction {
  ADD = "Add",
  EDIT = "Edit",
  DELETE = "DELETE",
}

export function AddEditCategory({
  isOpenCategory,
  setIsOpenCategory,
  action = ModalAction.ADD,
  category,
  onReload,
}: {
  isOpenCategory: boolean;
  setIsOpenCategory: (isOpen: boolean) => void;
  action?: ModalAction;
  category?: CategoryReadT;
  onReload?: () => void;
}) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryWriteT>();

  const mutation = useMutation({
    mutationFn: async (data: CategoryWriteT) => {
      if (action === ModalAction.EDIT && category?.id) {
        return CategoryService.update(category.id, data);
      }
      return CategoryService.create(data);
    },

    onSuccess: async () => {
      toast.success(
        action === ModalAction.EDIT
          ? "Category updated successfully!"
          : "Category added successfully!",
      );

      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      setIsOpenCategory(false);
      onReload?.();
    },

    onError: (error) => {
      console.error(error);
      toast.error(`Failed to ${action.toLowerCase()} category.`);
    },
  });

  useEffect(() => {
    if (action === ModalAction.EDIT && category) {
      reset({
        name: category.name,
      });
    } else {
      reset({ name: ""});
    }
  }, [action, category, reset]);

  const onSubmit: SubmitHandler<CategoryWriteT> = async (data) => {
    mutation.mutate(data);
  };
  return (
    <Dialog open={isOpenCategory} onOpenChange={setIsOpenCategory}>
      <DialogContent className="sm:max-w-106.25">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>{action} category</DialogTitle>
            <DialogDescription>
              <span>*All fields are required.</span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter the name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Loading..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}