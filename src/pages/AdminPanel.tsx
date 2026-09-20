import { Shield, Settings, Users, AlertTriangle, BarChart3, Radio, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AdminPanel() {
  const systemStats = [
    { label: "Active Sensors", value: "1,247", status: "online", icon: Radio },
    { label: "System Uptime", value: "99.8%", status: "healthy", icon: CheckCircle },
    { label: "Incidents Today", value: "23", status: "moderate", icon: AlertTriangle },
    { label: "Response Time", value: "< 2min", status: "optimal", icon: Clock },
  ];

  const recentIncidents = [
    { id: 1, type: "Accident", location: "Ring Road Sector 14", time: "10 min ago", status: "active" },
    { id: 2, type: "Road Block", location: "MG Road Junction", time: "25 min ago", status: "resolved" },
    { id: 3, type: "Heavy Traffic", location: "Connaught Place", time: "1 hour ago", status: "monitoring" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
      case 'healthy':
      case 'optimal':
        return 'bg-success/10 text-success border-success/20';
      case 'moderate':
      case 'monitoring':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'active':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <Shield className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">Admin Control Panel</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Manage traffic systems, monitor incidents, and control city-wide operations
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Link to="/traffic-control">
            <Button className="h-16 flex-col gap-2 bg-primary text-primary-foreground hover:bg-primary/90 w-full">
              <Settings className="h-5 w-5" />
              System Config
            </Button>
          </Link>
          <Link to="/users">
            <Button variant="outline" className="h-16 flex-col gap-2 w-full">
              <Users className="h-5 w-5" />
              User Management
            </Button>
          </Link>
          <Link to="/incidents">
            <Button variant="outline" className="h-16 flex-col gap-2 w-full">
              <AlertTriangle className="h-5 w-5" />
              Incident Log
            </Button>
          </Link>
          <Link to="/traffic-charts">
            <Button variant="outline" className="h-16 flex-col gap-2 w-full">
              <BarChart3 className="h-5 w-5" />
              Reports
            </Button>
          </Link>
        </div>

        {/* System Status */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="traffic-card-elevated p-6 animate-fade-in-scale" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className={`text-xs font-medium px-2 py-1 rounded-full border ${getStatusColor(stat.status)}`}>
                      {stat.status}
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Incidents */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Live Incident Management</h2>
          <div className="traffic-card-elevated">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recent Incidents</h3>
                <Link to="/incidents">
                  <Button size="sm">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Report Incident
                  </Button>
                </Link>
              </div>
            </div>
            <div className="divide-y divide-border">
              {recentIncidents.map((incident) => (
                <div key={incident.id} className="p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${getStatusColor(incident.status)}`}>
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{incident.type}</p>
                      <p className="text-sm text-muted-foreground">{incident.location}</p>
                      <p className="text-xs text-muted-foreground">{incident.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`text-xs font-medium px-2 py-1 rounded-full border ${getStatusColor(incident.status)}`}>
                      {incident.status}
                    </div>
                    <Link to="/incidents">
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Control Center */}
        <div className="traffic-card-elevated p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Traffic Control Center</h3>
            <Link to="/traffic-control">
              <Button>
                <Settings className="mr-2 h-4 w-4" />
                Open Control Panel
              </Button>
            </Link>
          </div>
          <div className="h-64 bg-gradient-to-br from-primary/5 via-success/5 to-warning/5 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                <Settings className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Traffic Signal Control</h4>
              <p className="text-muted-foreground mb-4">
                Real-time traffic signal management and optimization tools
              </p>
              <Link to="/traffic-control">
                <Button variant="outline">
                  Launch Control Center
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
