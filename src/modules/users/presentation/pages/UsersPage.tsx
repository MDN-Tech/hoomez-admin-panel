import { useState, useMemo } from "react";
import {
  Users as UsersIcon,
  ArrowUpDown,
  Eye,
  MoreHorizontal,
  CheckCircle2,
  Ban,
  Mail,
  Smartphone,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUsers } from "../hooks/useGetUsers";
import { useDebounce } from "@/app/hooks/useDebounce";
import type { UserRole } from "@/modules/auth/domain/entities/user_entity";
import type { UserType } from "../../domain/entities/user_entity";
import { useActivateUser, useDeactivateUser } from "../hooks/useUserActions";
import { toast } from "sonner";
import { getError } from "@/core/helpers/error_messages";
import { UserStatusBadge } from "../components/UserStatusBadge";
import { UserFilters } from "../components/UserFilters";
import { UserActionDialogs } from "../components/UserActionDialogs";
import { UserDetailDialog } from "../components/UserDetailDialog";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [sortBy, setBy] = useState<"firstName" | "email" | "role">("firstName");
  const [sortOrder, setOrder] = useState<"ASC" | "DESC">("ASC");

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [actionAlert, setActionAlert] = useState<{
    type: "activate" | "deactivate";
    id: string;
    userName: string;
  } | null>(null);

  const debouncedSearch = useDebounce(search, 500);

  const { data: users, isLoading } = useGetUsers({
    role: roleFilter === "all" ? undefined : roleFilter,
    search: debouncedSearch,
  });

  const { mutate: activateMutation } = useActivateUser();
  const { mutate: deactivateMutation } = useDeactivateUser();

  const handleOpenDetail = (user: UserType) => {
    setSelectedUser(user);
    setIsDetailOpen(true);
  };

  const onConfirmActivate = () => {
    if (!actionAlert) return;
    activateMutation(actionAlert.id, {
      onSuccess: () => {
        toast.success(`User "${actionAlert.userName}" activated`);
        setActionAlert(null);
      },
      onError: (err: Error) =>
        toast.error(getError(err).message || "Failed to activate user"),
    });
  };

  const onConfirmDeactivate = () => {
    if (!actionAlert) return;
    deactivateMutation(actionAlert.id, {
      onSuccess: () => {
        toast.success(`User "${actionAlert.userName}" deactivated`);
        setActionAlert(null);
      },
      onError: (err: Error) =>
        toast.error(getError(err).message || "Failed to deactivate user"),
    });
  };

  const sortedUsers = useMemo(() => {
    if (!users) return [];

    return [...users].sort((a, b) => {
      const valA = a[sortBy] as string;
      const valB = b[sortBy] as string;

      if (sortOrder === "ASC") {
        return valA.localeCompare(valB);
      } else {
        return valB.localeCompare(valA);
      }
    });
  }, [users, sortBy, sortOrder]);

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
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">
            Manage your customer base and supplier partners.
          </p>
        </div>
      </div>

      <UserFilters
        search={search}
        setSearch={setSearch}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        onClear={() => {
          setSearch("");
          setRoleFilter("all");
        }}
      />

      <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead
                className="hover:text-primary cursor-pointer font-semibold transition-colors"
                onClick={() => toggleSort("firstName")}
              >
                <div className="flex items-center gap-1">
                  Name
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead
                className="hover:text-primary cursor-pointer font-semibold transition-colors"
                onClick={() => toggleSort("email")}
              >
                <div className="flex items-center gap-1">
                  Contact Info
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead
                className="hover:text-primary cursor-pointer text-center font-semibold transition-colors"
                onClick={() => toggleSort("role")}
              >
                <div className="flex items-center justify-center gap-1">
                  Role
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="text-center font-semibold">
                Status
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
                      <Skeleton className="h-5 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="mb-1 h-4 w-48" />
                      <Skeleton className="h-3 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="mx-auto h-5 w-20 rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="mx-auto h-5 w-20 rounded-full" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="ml-auto h-8 w-8 rounded-md" />
                    </TableCell>
                  </TableRow>
                ))
            ) : sortedUsers && sortedUsers.length > 0 ? (
              sortedUsers.map((user: UserType) => (
                <TableRow
                  key={user.id}
                  className="group hover:bg-muted/30 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold">
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </div>
                      <span className="font-semibold">
                        {user.firstName} {user.lastName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Mail className="text-muted-foreground h-3.5 w-3.5" />
                        {user.email}
                      </div>
                      <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                        <Smartphone className="h-3 w-3" />
                        {user.phoneNumber}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="bg-muted text-muted-foreground inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wider uppercase">
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <UserStatusBadge isActive={user.isActive} />
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
                          User Options
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer gap-2"
                          onClick={() => handleOpenDetail(user)}
                        >
                          <Eye className="h-4 w-4" /> View Full Profile
                        </DropdownMenuItem>
                        {user.isActive ? (
                          <DropdownMenuItem
                            onClick={() =>
                              setActionAlert({
                                type: "deactivate",
                                id: user.id,
                                userName: `${user.firstName} ${user.lastName}`,
                              })
                            }
                            className="cursor-pointer gap-2 text-red-600 focus:bg-red-50 focus:text-red-600"
                          >
                            <Ban className="h-4 w-4" /> Ban/Deactivate
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() =>
                              setActionAlert({
                                type: "activate",
                                id: user.id,
                                userName: `${user.firstName} ${user.lastName}`,
                              })
                            }
                            className="cursor-pointer gap-2 text-green-600 focus:bg-green-50 focus:text-green-600"
                          >
                            <CheckCircle2 className="h-4 w-4" /> Unban/Activate
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="bg-muted rounded-full p-4">
                      <UsersIcon className="text-muted-foreground/30 h-10 w-10" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold tracking-tight">
                        No users found
                      </h3>
                      <p className="text-muted-foreground">
                        Try adjusting your filters or search terms.
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <UserActionDialogs
        actionAlert={actionAlert}
        onClose={() => setActionAlert(null)}
        onConfirmActivate={onConfirmActivate}
        onConfirmDeactivate={onConfirmDeactivate}
      />

      <UserDetailDialog
        user={selectedUser}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </div>
  );
}
