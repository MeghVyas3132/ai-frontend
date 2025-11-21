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
import { Search, MoreVertical, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "inactive";
  joinDate: string;
}

const mockEmployees: Employee[] = [
  { id: "1", name: "John Doe", email: "john.doe@aigenthix.com", role: "Senior Developer", department: "Engineering", status: "active", joinDate: "2023-01-15" },
  { id: "2", name: "Jane Smith", email: "jane.smith@aigenthix.com", role: "Product Manager", department: "Product", status: "active", joinDate: "2023-03-20" },
  { id: "3", name: "Mike Johnson", email: "mike.j@aigenthix.com", role: "Designer", department: "Design", status: "active", joinDate: "2023-05-10" },
  { id: "4", name: "Sarah Williams", email: "sarah.w@aigenthix.com", role: "Marketing Lead", department: "Marketing", status: "inactive", joinDate: "2022-11-05" },
  { id: "5", name: "David Brown", email: "david.b@aigenthix.com", role: "Data Analyst", department: "Analytics", status: "active", joinDate: "2023-07-01" },
];

const EmployeeTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [employees] = useState<Employee[]>(mockEmployees);

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell className="text-muted-foreground">{employee.email}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>
                  <Badge
                    variant={employee.status === "active" ? "default" : "secondary"}
                    className={employee.status === "active" ? "bg-success" : ""}
                  >
                    {employee.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{employee.joinDate}</TableCell>
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
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredEmployees.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No employees found</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
