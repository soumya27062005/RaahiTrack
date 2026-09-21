import { useState } from "react";
import { AlertTriangle, Clock, MapPin, User, CheckCircle, X, Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function IncidentManager() {
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      type: "Accident",
      location: "Ring Road near Sector 14",
      description: "Multi-vehicle collision blocking 2 lanes",
      severity: "high",
      status: "active",
      reportedBy: "Traffic Officer A12",
      reportedAt: "2024-01-15 14:30",
      estimatedClearance: "45 min",
      assignedTo: "Emergency Team 3"
    },
    {
      id: 2,
      type: "Construction",
      location: "MG Road Junction",
      description: "Road maintenance work - single lane closure",
      severity: "medium",
      status: "in-progress",
      reportedBy: "Construction Manager",
      reportedAt: "2024-01-15 12:00",
      estimatedClearance: "3 hours",
      assignedTo: "Maintenance Crew B"
    },
    {
      id: 3,
      type: "Signal Failure",
      location: "Connaught Place Signal 4",
      description: "Traffic light system malfunction",
      severity: "medium",
      status: "resolved",
      reportedBy: "Citizen Report",
      reportedAt: "2024-01-15 11:15",
      estimatedClearance: "30 min",
      assignedTo: "Technical Team 1"
    },
    {
      id: 4,
      type: "Heavy Traffic",
      location: "Ahmedabad-Gurgaon Expressway",
      description: "Unusual congestion due to event",
      severity: "low",
      status: "monitoring",
      reportedBy: "AI System",
      reportedAt: "2024-01-15 16:00",
      estimatedClearance: "2 hours",
      assignedTo: "Traffic Control Center"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newIncident, setNewIncident] = useState({
    type: "",
    location: "",
    description: "",
    severity: "",
    assignedTo: ""
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'in-progress': return 'bg-warning/10 text-warning border-warning/20';
      case 'resolved': return 'bg-success/10 text-success border-success/20';
      case 'monitoring': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || incident.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateIncidentStatus = (id: number, newStatus: string) => {
    setIncidents(prev => prev.map(incident => 
      incident.id === id ? { ...incident, status: newStatus } : incident
    ));
  };

  const handleCreateIncident = () => {
    if (newIncident.type && newIncident.location && newIncident.severity) {
      const incident = {
        id: Date.now(),
        ...newIncident,
        status: "active",
        reportedBy: "Admin Panel",
        reportedAt: new Date().toLocaleString('en-GB', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        estimatedClearance: "TBD"
      };
      setIncidents(prev => [incident, ...prev]);
      setNewIncident({ type: "", location: "", description: "", severity: "", assignedTo: "" });
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Incident Management</h2>
          <p className="text-muted-foreground">Monitor and manage traffic incidents across the city</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Report Incident
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Report New Incident</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Select value={newIncident.type} onValueChange={(value) => setNewIncident(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select incident type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="accident">Accident</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="signal-failure">Signal Failure</SelectItem>
                  <SelectItem value="heavy-traffic">Heavy Traffic</SelectItem>
                  <SelectItem value="weather">Weather Related</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Location"
                value={newIncident.location}
                onChange={(e) => setNewIncident(prev => ({ ...prev, location: e.target.value }))}
              />

              <Textarea
                placeholder="Description"
                value={newIncident.description}
                onChange={(e) => setNewIncident(prev => ({ ...prev, description: e.target.value }))}
              />

              <Select value={newIncident.severity} onValueChange={(value) => setNewIncident(prev => ({ ...prev, severity: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Assign to team/person"
                value={newIncident.assignedTo}
                onChange={(e) => setNewIncident(prev => ({ ...prev, assignedTo: e.target.value }))}
              />

              <Button onClick={handleCreateIncident} className="w-full">
                Create Incident Report
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search incidents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="monitoring">Monitoring</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Incidents List */}
      <div className="space-y-4">
        {filteredIncidents.map((incident) => (
          <Card key={incident.id} className="traffic-card-elevated">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-destructive/10 rounded-lg mt-1">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{incident.type}</h3>
                        <Badge className={getSeverityColor(incident.severity)}>
                          {incident.severity} priority
                        </Badge>
                        <Badge className={getStatusColor(incident.status)} variant="outline">
                          {incident.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {incident.location}
                        </div>
                        <p className="text-sm">{incident.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            Reported by: {incident.reportedBy}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {incident.reportedAt}
                          </div>
                        </div>
                        {incident.assignedTo && (
                          <div className="text-xs text-muted-foreground">
                            Assigned to: {incident.assignedTo}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {incident.status === 'active' && (
                    <Button 
                      size="sm" 
                      onClick={() => updateIncidentStatus(incident.id, 'in-progress')}
                    >
                      Start Resolution
                    </Button>
                  )}
                  {incident.status === 'in-progress' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateIncidentStatus(incident.id, 'resolved')}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark Resolved
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredIncidents.length === 0 && (
        <Card className="traffic-card">
          <CardContent className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No incidents found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Try adjusting your search criteria" : "No incidents match the current filters"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
