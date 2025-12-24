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

interface UserActionDialogsProps {
  actionAlert: {
    type: "activate" | "deactivate";
    id: string;
    userName: string;
  } | null;
  onClose: () => void;
  onConfirmActivate: () => void;
  onConfirmDeactivate: () => void;
}

export function UserActionDialogs({
  actionAlert,
  onClose,
  onConfirmActivate,
  onConfirmDeactivate,
}: UserActionDialogsProps) {
  if (!actionAlert) return null;

  const isActivate = actionAlert.type === "activate";

  return (
    <AlertDialog open={!!actionAlert} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isActivate ? "Activate User" : "Deactivate User"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to {isActivate ? "activate" : "deactivate"}{" "}
            <strong>{actionAlert.userName}</strong>?
            {isActivate
              ? " This will restore their access to the platform."
              : " This will immediately ban them from accessing the platform."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={isActivate ? onConfirmActivate : onConfirmDeactivate}
            className={
              isActivate
                ? "bg-green-600 hover:bg-green-700"
                : "bg-destructive hover:bg-destructive/90"
            }
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
