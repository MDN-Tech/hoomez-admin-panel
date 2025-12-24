import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PromotionActionDialogsProps {
  actionAlert: {
    type: "cancel" | "delete" | "reject";
    id: string;
    title: string;
  } | null;
  onClose: () => void;
  rejectionReason: string;
  setRejectionReason: (reason: string) => void;
  onConfirmReject: () => void;
  onConfirmCancel: () => void;
  onConfirmDelete: () => void;
}

export function PromotionActionDialogs({
  actionAlert,
  onClose,
  rejectionReason,
  setRejectionReason,
  onConfirmReject,
  onConfirmCancel,
  onConfirmDelete,
}: PromotionActionDialogsProps) {
  return (
    <AlertDialog
      open={actionAlert !== null}
      onOpenChange={(open) => !open && onClose()}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {actionAlert?.type === "reject" && "Reject Promotion"}
            {actionAlert?.type === "cancel" && "Cancel Promotion"}
            {actionAlert?.type === "delete" && "Delete Promotion"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {actionAlert?.type === "reject" &&
              `Are you sure you want to reject "${actionAlert.title}"? Please provide a reason below.`}
            {actionAlert?.type === "cancel" &&
              `Are you sure you want to cancel the approved promotion "${actionAlert.title}"?`}
            {actionAlert?.type === "delete" &&
              `This action will permanently delete "${actionAlert.title}". This cannot be undone.`}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {actionAlert?.type === "reject" && (
          <div className="py-4">
            <textarea
              className="bg-background border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-25 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter rejection reason here..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setRejectionReason("")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (actionAlert?.type === "reject") onConfirmReject();
              if (actionAlert?.type === "cancel") onConfirmCancel();
              if (actionAlert?.type === "delete") onConfirmDelete();
            }}
            className={
              actionAlert?.type === "delete" || actionAlert?.type === "reject"
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : ""
            }
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
