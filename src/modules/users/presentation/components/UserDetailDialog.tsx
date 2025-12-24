import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { UserType, Supplier } from "../../domain/entities/user_entity";
import { UserStatusBadge } from "./UserStatusBadge";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Building2,
  MapPin,
  Briefcase,
  ShieldCheck,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface UserDetailDialogProps {
  user: UserType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserDetailDialog({
  user,
  open,
  onOpenChange,
}: UserDetailDialogProps) {
  if (!user) return null;

  const isSupplier = user.role === "supplier";
  const supplier = isSupplier ? (user as Supplier) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[80vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-150">
        <DialogHeader className="bg-muted/30 border-b p-6">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
              <User className="text-primary h-6 w-6" />
              User Profile
            </DialogTitle>
            <UserStatusBadge isActive={user.isActive} />
          </div>
        </DialogHeader>

        <ScrollArea className="min-h-0 flex-1">
          <div className="space-y-8 p-6">
            {/* Header / Basic Info */}
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 text-primary flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold">
                {user.firstName[0]}
                {user.lastName[0]}
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold">
                  {user.firstName} {user.lastName}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs font-semibold tracking-wider uppercase">
                    {user.role}
                  </span>
                  <span className="text-muted-foreground text-xs italic">
                    Member since{" "}
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "Recently"}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Detailed Contact Info */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="text-muted-foreground text-sm font-bold tracking-wider uppercase">
                  Contact Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="text-muted-foreground h-4 w-4" />
                    <span className="font-medium">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="text-muted-foreground h-4 w-4" />
                    <span className="font-medium">{user.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="text-muted-foreground h-4 w-4" />
                    <span className="font-medium">
                      Born on{" "}
                      {new Date(user.dateOfBirth).toLocaleDateString(
                        undefined,
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-muted-foreground text-sm font-bold tracking-wider uppercase">
                  Platform Status
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <ShieldCheck className="text-muted-foreground h-4 w-4" />
                    <div>
                      <p className="font-medium">
                        {user.isActive
                          ? "Verified Account"
                          : "Account Suspended"}
                      </p>
                      <p className="text-muted-foreground text-xs italic">
                        Account is managed by admin
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Supplier Specific Info */}
            {isSupplier && supplier && (
              <>
                <Separator />
                <div className="space-y-6">
                  <h4 className="text-muted-foreground text-sm font-bold tracking-wider uppercase">
                    Business Profile (Supplier)
                  </h4>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 text-sm">
                        <Building2 className="text-primary mt-0.5 h-4 w-4" />
                        <div>
                          <p className="text-muted-foreground text-xs">
                            Business Name
                          </p>
                          <p className="text-base font-bold">
                            {supplier.businessName || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <Briefcase className="text-primary mt-0.5 h-4 w-4" />
                        <div>
                          <p className="text-muted-foreground text-xs">
                            Business Type
                          </p>
                          <p className="font-medium">
                            {supplier.businessType || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <Phone className="text-primary mt-0.5 h-4 w-4" />
                        <div>
                          <p className="text-muted-foreground text-xs">
                            Business Phone
                          </p>
                          <p className="font-medium">
                            {supplier.businessPhone || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/30 space-y-3 rounded-lg border p-4">
                      <div className="mb-1 flex items-center gap-2">
                        <MapPin className="text-primary h-4 w-4" />
                        <h5 className="text-xs font-bold tracking-tight uppercase">
                          Location Details
                        </h5>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p className="font-medium">
                          {supplier.supplierStreet || "No street provided"}
                        </p>
                        <p className="font-medium">
                          {supplier.supplierCity}
                          {supplier.supplierZipCode
                            ? `, ${supplier.supplierZipCode}`
                            : ""}
                        </p>
                        <p className="font-bold">
                          {supplier.supplierCountry || "Global"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
