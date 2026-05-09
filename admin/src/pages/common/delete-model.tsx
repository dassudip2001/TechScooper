import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CategoryService } from "@/services/category.service";

interface DeleteProp {
  recordId: number;
  isOpenDelete: boolean;
  open: (isOpen: boolean) => void;
  modelName: string;
  onReload?: () => void;
}

export default function DeleteModel({
  recordId,
  open,
  isOpenDelete,
  modelName,
  onReload,
}: DeleteProp) {
  const queryClient = useQueryClient();

  const deleteUrlMap: Record<string, string> = {
    Category: "/api/category",
  };

  const queryKeyMap: Record<string, string[]> = {
    Category: ["categories"],
  };

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => {
      if (!recordId) return;
      const baseUrl = deleteUrlMap[modelName];
      if (!baseUrl) {
        throw new Error(`Unsupported model for deletion: ${modelName}`);
      }
      if (modelName === "Category") {
        await CategoryService.delete(Number(recordId));
      } else {
        throw new Error(`Unsupported model for deletion: ${modelName}`);
      }
    },
    onSuccess: async () => {
      toast.success(`${modelName} deleted successfully`);
      const queryKey = queryKeyMap[modelName];
      if (queryKey) {
        await queryClient.invalidateQueries({ queryKey });
      }
      onReload?.();
      open(false);
    },
    onError: (error) => {
      console.error(`Error deleting ${modelName}:`, error);
      toast.error(`Failed to delete ${modelName}`);
    },
  });

  return (
    <Dialog onOpenChange={open} open={isOpenDelete}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the{" "}
            <span className="font-semibold">{modelName}</span>.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={() => mutateAsync()}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}