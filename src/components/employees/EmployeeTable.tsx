import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, MoreVertical, Edit, Trash2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useListUsers, useDeleteUser } from "@/hooks/use-users";
import { toast } from "sonner";

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
  created_at: string;
}

const EmployeeTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [skip, setSkip] = useState(0);
  const { data, isLoading, error } = useListUsers({ skip, limit: 20 });
  const { mutate: deleteUser } = useDeleteUser("");

  const filteredEmployees = (data?.users || []).filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (userId: string) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      deleteUser(undefined, {
        onSuccess: () => {
          toast.success("Employee deleted successfully");
        },
        onError: () => {
          toast.error("Failed to delete employee");
        },
      });
    }
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load employees. Please try again.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search employees..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : filteredEmployees && filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell className="text-muted-foreground">{employee.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{employee.role}</Badge>
                  </TableCell>
                  <TableCell>{employee.department || "-"}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(employee.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(employee.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <p className="text-muted-foreground">No employees found</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {data && data.total > 20 && (
        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            onClick={() => setSkip(Math.max(0, skip - 20))}
            disabled={skip === 0}
          >
            Previous
          </Button>
          <span className="flex items-center px-4 text-sm">
            Page {Math.floor(skip / 20) + 1} of {Math.ceil(data.total / 20)}
          </span>
          <Button
            variant="outline"
            onClick={() => setSkip(skip + 20)}
            disabled={skip + 20 >= data.total}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
