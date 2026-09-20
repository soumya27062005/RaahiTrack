import { useState } from "react";
import { Users, Search, Filter, UserPlus, Shield, Mail, Phone, MapPin, Calendar, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function UserManager() {
  const [users] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "+91 98765 43210",
      role: "admin",
      status: "active",
      location: "Delhi",
      joinDate: "2024-01-10",
      lastActive: "2 hours ago",
      totalReports: 45,
      avatar: "/api/placeholder/32/32"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 87654 32109",
      role: "traffic_officer",
      status: "active",
      location: "Gurgaon",
      joinDate: "2023-12-15",
      lastActive: "30 min ago",
      totalReports: 128,
      avatar: "/api/placeholder/32/32"
    },
    {
      id: 3,
      name: "Amit Singh",
      email: "amit@example.com",
      phone: "+91 76543 21098",
      role: "citizen",
      status: "active",
      location: "Noida",
      joinDate: "2024-01-05",
      lastActive: "1 day ago",
      totalReports: 12,
      avatar: "/api/placeholder/32/32"
    },
    {
      id: 4,
      name: "Sunita Verma",
      email: "sunita@example.com",
      phone: "+91 65432 10987",
      role: "traffic_officer",
      status: "inactive",
      location: "Faridabad",
      joinDate: "2023-11-20",
      lastActive: "1 week ago",
      totalReports: 89,
      avatar: "/api/placeholder/32/32"
    },
    {
      id: 5,
      name: "Vikram Patel",
      email: "vikram@example.com",
      phone: "+91 54321 09876",
      role: "citizen",
      status: "active",
      location: "Delhi",
      joinDate: "2023-10-12",
      lastActive: "5 hours ago",
      totalReports: 67,
      avatar: "/api/placeholder/32/32"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-primary text-primary-foreground';
      case 'traffic_officer': return 'bg-warning text-warning-foreground';
      case 'citizen': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'inactive': return 'bg-muted/10 text-muted-foreground border-border';
      case 'suspended': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'traffic_officer': return 'Traffic Officer';
      case 'citizen': return 'Citizen';
      default: return role;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            User Management
          </h2>
          <p className="text-muted-foreground">Manage system users and their permissions</p>
        </div>
        
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="traffic-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="traffic-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</p>
              </div>
              <div className="w-3 h-3 bg-success rounded-full"></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="traffic-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Traffic Officers</p>
                <p className="text-2xl font-bold">{users.filter(u => u.role === 'traffic_officer').length}</p>
              </div>
              <Shield className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="traffic-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Citizens</p>
                <p className="text-2xl font-bold">{users.filter(u => u.role === 'citizen').length}</p>
              </div>
              <Users className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Administrators</SelectItem>
            <SelectItem value="traffic_officer">Traffic Officers</SelectItem>
            <SelectItem value="citizen">Citizens</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="traffic-card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">{user.name}</h3>
                      <Badge className={getRoleColor(user.role)}>
                        {getRoleDisplayName(user.role)}
                      </Badge>
                      <Badge className={getStatusColor(user.status)} variant="outline">
                        {user.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {user.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {user.location}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Joined: {user.joinDate}
                      </div>
                      <span>Last active: {user.lastActive}</span>
                      <span>Reports: {user.totalReports}</span>
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit User</DropdownMenuItem>
                    <DropdownMenuItem>View Reports</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Suspend User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card className="traffic-card">
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No users found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Try adjusting your search criteria" : "No users match the current filters"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
