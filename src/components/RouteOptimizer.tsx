import { useState } from "react";
import { Navigation, Route, Clock, Fuel, Zap, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function RouteOptimizer() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);

  const routes = [
    {
      id: 1,
      name: "Fastest Route",
      duration: "22 min",
      distance: "15.2 km",
      traffic: "Moderate",
      fuel: "₹85",
      type: "fastest",
      waypoints: ["Ring Road", "Karol Bagh", "Connaught Place"]
    },
    {
      id: 2,
      name: "Eco-Friendly Route",
      duration: "28 min",
      distance: "18.1 km",
      traffic: "Light",
      fuel: "₹65",
      type: "eco",
      waypoints: ["Outer Ring", "Metro Station", "Green Corridor"]
    },
    {
      id: 3,
      name: "Least Congested",
      duration: "25 min",
      distance: "16.8 km",
      traffic: "Free",
      fuel: "₹75",
      type: "free",
      waypoints: ["Bypass Road", "Industrial Area", "Highway"]
    }
  ];

  const handleOptimize = async () => {
    setIsOptimizing(true);
    // Simulate route calculation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsOptimizing(false);
  };

  const getTrafficColor = (traffic: string) => {
    switch (traffic.toLowerCase()) {
      case 'free': return 'bg-success text-success-foreground';
      case 'light': return 'bg-success/70 text-success-foreground';
      case 'moderate': return 'bg-warning text-warning-foreground';
      case 'heavy': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRouteIcon = (type: string) => {
    switch (type) {
      case 'fastest': return <Zap className="h-4 w-4" />;
      case 'eco': return <Fuel className="h-4 w-4" />;
      case 'free': return <Route className="h-4 w-4" />;
      default: return <Navigation className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Route Input */}
      <Card className="traffic-card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-primary" />
            Plan Your Route
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter starting location"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter destination"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          <Button 
            onClick={handleOptimize}
            disabled={!from || !to || isOptimizing}
            className="w-full"
          >
            {isOptimizing ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Optimizing Routes...
              </div>
            ) : (
              <>
                <Navigation className="mr-2 h-4 w-4" />
                Find Best Routes
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Route Results */}
      {(from && to) && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Recommended Routes</h3>
          {routes.map((route, index) => (
            <Card 
              key={route.id} 
              className="traffic-card-elevated animate-fade-in-scale cursor-pointer hover:glow-effect"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {getRouteIcon(route.type)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{route.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {route.duration} • {route.distance}
                      </div>
                    </div>
                  </div>
                  <Badge className={getTrafficColor(route.traffic)}>
                    {route.traffic} Traffic
                  </Badge>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Fuel className="h-4 w-4 text-muted-foreground" />
                      <span>{route.fuel}</span>
                    </div>
                  </div>
                  <Button size="sm">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Start Navigation
                  </Button>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Route via:</p>
                  <div className="flex flex-wrap gap-2">
                    {route.waypoints.map((waypoint, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {waypoint}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
