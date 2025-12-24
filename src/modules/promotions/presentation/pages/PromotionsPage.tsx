import { useState, useMemo } from "react";
import {
  Megaphone,
  ArrowUpDown,
  Eye,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Ban,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPromotions } from "../hooks/useGetPromotions";
import { useDebounce } from "@/app/hooks/useDebounce";
import type {
  Promotion,
  PromotionStatus,
} from "../../domain/entities/promotion_entity";
import {
  useApprovePromotion,
  useRejectPromotion,
  useCancelPromotion,
  useDeletePromotion,
} from "../hooks/usePromotionActions";
import { toast } from "sonner";
import { PromotionDetailDialog } from "../components/PromotionDetailDialog";
import { PromotionStatusBadge } from "../components/PromotionStatusBadge";
import { PromotionFilters } from "../components/PromotionFilters";
import { PromotionActionDialogs } from "../components/PromotionActionDialogs";
import { CreatePromotionDialog } from "../components/CreatePromotionDialog";
import { Plus } from "lucide-react";
import { getError } from "@/core/helpers/error_messages";

export default function PromotionsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<PromotionStatus | "all">(
    "all",
  );
  const [sortBy, setBy] = useState<"title" | "startDate" | "endDate">(
    "startDate",
  );
  const [sortOrder, setOrder] = useState<"ASC" | "DESC">("DESC");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const { data: promotions, isLoading } = useGetPromotions();
  const { mutate: approveMutation } = useApprovePromotion();
  const { mutate: rejectMutation } = useRejectPromotion();
  const { mutate: cancelMutation } = useCancelPromotion();
  const { mutate: deleteMutation } = useDeletePromotion();

  const [actionAlert, setActionAlert] = useState<{
    type: "cancel" | "delete" | "reject";
    id: string;
    title: string;
  } | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleApprove = (id: string, title: string) => {
    approveMutation(id, {
      onSuccess: () => toast.success(`Promotion "${title}" approved`),
      onError: (err: Error) =>
        toast.error(getError(err).message || "Failed to approve promotion"),
    });
  };

  const onConfirmReject = () => {
    if (!actionAlert || !rejectionReason.trim()) {
      toast.error("Rejection reason is required");
      return;
    }

    rejectMutation(
      { id: actionAlert.id, params: { reason: rejectionReason } },
      {
        onSuccess: () => {
          toast.success(`Promotion "${actionAlert.title}" rejected`);
          setActionAlert(null);
          setRejectionReason("");
        },
        onError: (err: Error) =>
          toast.error(getError(err).message || "Failed to reject promotion"),
      },
    );
  };

  const onConfirmCancel = () => {
    if (!actionAlert) return;
    cancelMutation(actionAlert.id, {
      onSuccess: () => {
        toast.success(`Promotion "${actionAlert.title}" cancelled`);
        setActionAlert(null);
      },
      onError: (err: Error) =>
        toast.error(getError(err).message || "Failed to cancel promotion"),
    });
  };

  const onConfirmDelete = () => {
    if (!actionAlert) return;
    deleteMutation(actionAlert.id, {
      onSuccess: () => {
        toast.success(`Promotion "${actionAlert.title}" deleted`);
        setActionAlert(null);
      },
      onError: (err: Error) =>
        toast.error(getError(err).message || "Failed to delete promotion"),
    });
  };

  const filteredPromotions = useMemo(() => {
    if (!promotions) return [];

    return promotions
      .filter((p: Promotion) => {
        const matchesSearch =
          p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          p.productName.toLowerCase().includes(debouncedSearch.toLowerCase());
        const matchesStatus =
          statusFilter === "all" || p.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a: Promotion, b: Promotion) => {
        const valA = a[sortBy];
        const valB = b[sortBy];
        if (!valA || !valB) return 0;

        if (sortOrder === "ASC") {
          return valA > valB ? 1 : -1;
        } else {
          return valA < valB ? 1 : -1;
        }
      });
  }, [promotions, debouncedSearch, statusFilter, sortBy, sortOrder]);

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setBy(field);
      setOrder("ASC");
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Promotions</h2>
          <p className="text-muted-foreground">
            Monitor and manage product discounts and seasonal offers.
          </p>
        </div>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all hover:scale-105"
        >
          <Plus className="mr-2 h-4 w-4" /> Create Promotion
        </Button>
      </div>

      <PromotionFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onClear={() => {
          setSearch("");
          setStatusFilter("all");
        }}
      />

      <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-20 font-semibold">Banner</TableHead>
              <TableHead
                className="hover:text-primary cursor-pointer font-semibold transition-colors"
                onClick={() => toggleSort("title")}
              >
                <div className="flex items-center gap-1">
                  Title / Product
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="text-center font-semibold">
                Discount
              </TableHead>
              <TableHead className="text-center font-semibold">
                Status
              </TableHead>
              <TableHead
                className="hover:text-primary cursor-pointer font-semibold transition-colors"
                onClick={() => toggleSort("startDate")}
              >
                <div className="flex items-center gap-1">
                  Start Date
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead
                className="hover:text-primary cursor-pointer font-semibold transition-colors"
                onClick={() => toggleSort("endDate")}
              >
                <div className="flex items-center gap-1">
                  End Date
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-10 w-16 rounded-md" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="mb-1 h-5 w-40" />
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="mx-auto h-5 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="mx-auto h-5 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-24" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="ml-auto h-8 w-8" />
                    </TableCell>
                  </TableRow>
                ))
            ) : filteredPromotions && filteredPromotions.length > 0 ? (
              filteredPromotions.map((promo: Promotion) => (
                <TableRow
                  key={promo.id}
                  className="group hover:bg-muted/30 transition-colors"
                >
                  <TableCell>
                    <div className="bg-muted ring-border/50 h-10 w-16 overflow-hidden rounded-md border shadow-sm ring-1">
                      {promo.image ? (
                        <img
                          src={promo.image}
                          alt={promo.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Megaphone className="text-muted-foreground/50 h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <PromotionDetailDialog
                      trigger={
                        <div className="cursor-pointer">
                          <div className="text-foreground line-clamp-1 font-semibold">
                            {promo.title}
                          </div>
                          <div className="text-muted-foreground line-clamp-1 text-xs">
                            {promo.productName}
                          </div>
                        </div>
                      }
                      promotionId={promo.id}
                      initialData={promo}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    {promo.discountPercentage ? (
                      <Badge
                        variant="outline"
                        className="border-primary/20 bg-primary/5 text-primary"
                      >
                        -{promo.discountPercentage}%
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="border-primary/20 bg-primary/5 text-primary"
                      >
                        -${promo.discountAmount}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <PromotionStatusBadge status={promo.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm font-medium">
                    {new Date(promo.startDate).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm font-medium">
                    {new Date(promo.endDate).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-xs font-semibold tracking-wider uppercase">
                          Management
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <PromotionDetailDialog
                          promotionId={promo.id}
                          initialData={promo}
                          trigger={
                            <DropdownMenuItem
                              className="cursor-pointer gap-2"
                              onSelect={(e) => e.preventDefault()}
                            >
                              <Eye className="h-4 w-4" /> View Details
                            </DropdownMenuItem>
                          }
                        />
                        {promo.status === "pending" && (
                          <>
                            <DropdownMenuItem
                              onClick={() =>
                                handleApprove(promo.id, promo.title)
                              }
                              className="cursor-pointer gap-2 text-green-600 focus:bg-green-50 focus:text-green-600"
                            >
                              <CheckCircle2 className="h-4 w-4" /> Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                setActionAlert({
                                  type: "reject",
                                  id: promo.id,
                                  title: promo.title,
                                })
                              }
                              className="cursor-pointer gap-2 text-red-600 focus:bg-red-50 focus:text-red-600"
                            >
                              <XCircle className="h-4 w-4" /> Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        {promo.status === "approved" && (
                          <DropdownMenuItem
                            onClick={() =>
                              setActionAlert({
                                type: "cancel",
                                id: promo.id,
                                title: promo.title,
                              })
                            }
                            className="cursor-pointer gap-2 text-orange-600 focus:bg-orange-50 focus:text-orange-600"
                          >
                            <Ban className="h-4 w-4" /> Cancel
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            setActionAlert({
                              type: "delete",
                              id: promo.id,
                              title: promo.title,
                            })
                          }
                          className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer gap-2"
                        >
                          <Trash className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-100 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="bg-muted rounded-full p-4">
                      <Megaphone className="text-muted-foreground/50 h-10 w-10" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold tracking-tight">
                        No promotions found
                      </h3>
                      <p className="text-muted-foreground">
                        Adjust your search or filters to see results.
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <PromotionActionDialogs
        actionAlert={actionAlert}
        onClose={() => setActionAlert(null)}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
        onConfirmReject={onConfirmReject}
        onConfirmCancel={onConfirmCancel}
        onConfirmDelete={onConfirmDelete}
      />

      <CreatePromotionDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
