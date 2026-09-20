import { Navigation, Car, Bus, AlertTriangle, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TrafficStatusCard from "@/components/TrafficStatusCard";
import smartTrafficHero from "@/assets/smart-traffic-hero.jpg";

export default function Dashboard() {
  const trafficData = [
    { title: "Highway Routes", status: "free" as const, count: 12, icon: Navigation },
    { title: "City Centers", status: "moderate" as const, count: 8, icon: Car },
    { title: "Metro Areas", status: "heavy" as const, count: 4, icon: Bus },
    { title: "Active Alerts", status: "heavy" as const, count: 3, icon: AlertTriangle },
  ];

  const recentAlerts = [
    { id: 1, message: "Traffic jam on Ring Road near Connaught Place", time: "5 min ago", severity: "high" },
    { id: 2, message: "Construction work on MG Road - Lane closure", time: "15 min ago", severity: "medium" },
    { id: 3, message: "Accident cleared on Outer Ring Road", time: "30 min ago", severity: "low" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={smartTrafficHero} 
          alt="Smart Traffic Management" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero opacity-80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white animate-slide-in-up">
            <h1 className="text-5xl font-bold mb-4">
              Welcome to <span className="text-warning">Raahi</span>Track
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Smart Traffic Management for Modern India
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/route-planner">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8">
                  <Navigation className="mr-2 h-5 w-5" />
                  Plan Your Route
                </Button>
              </Link>
              <Link to="/analytics">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  View Analytics
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Traffic Status Overview */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Real-time Traffic Status
          </h2>
          <p className="text-muted-foreground mb-8">
            Live monitoring of traffic conditions across Delhi NCR
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trafficData.map((item, index) => (
              <div key={index} style={{ animationDelay: `${index * 100}ms` }}>
                <TrafficStatusCard {...item} />
              </div>
            ))}
          </div>
        </div>

        {/* Live Map Placeholder */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Live Traffic Map</h2>
            <Link to="/live-map">
              <Button>
                <Navigation className="mr-2 h-4 w-4" />
                Open Full Map
              </Button>
            </Link>
          </div>
          <div className="traffic-card-elevated h-96 flex items-center justify-center bg-gradient-to-br from-primary/5 to-success/5">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                <Navigation className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Traffic Map</h3>
              <p className="text-muted-foreground mb-4">
                Real-time traffic visualization with incident markers
              </p>
              <Link to="/live-map">
                <Button variant="outline">
                  Launch Live Map
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8">Recent Traffic Alerts</h2>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="traffic-card p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    alert.severity === 'high' ? 'bg-destructive/20 text-destructive' :
                    alert.severity === 'medium' ? 'bg-warning/20 text-warning' :
                    'bg-success/20 text-success'
                  }`}>
                    {alert.severity === 'low' ? <CheckCircle2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{alert.message}</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      {alert.time}
                    </div>
                  </div>
                </div>
                <Link to="/incidents">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
