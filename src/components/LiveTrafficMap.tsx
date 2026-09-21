import { useState } from "react";
import { Navigation, MapPin, AlertTriangle, Info, Layers, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LiveTrafficMap() {
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [mapView, setMapView] = useState("traffic");

  const trafficIncidents = [
    {
      id: 1,
      type: "Accident",
      location: "Ring Road, Sector 14",
      severity: "high",
      time: "5 min ago",
      coordinates: { x: 65, y: 35 },
      description: "Multi-vehicle collision blocking 2 lanes"
    },
    {
      id: 2,
      type: "Construction",
      location: "MG Road Junction",
      severity: "medium",
      time: "2 hours ago",
      coordinates: { x: 40, y: 60 },
      description: "Road maintenance - single lane open"
    },
    {
      id: 3,
      type: "Heavy Traffic",
      location: "Connaught Place",
      severity: "low",
      time: "ongoing",
      coordinates: { x: 55, y: 45 },
      description: "Peak hour congestion"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const mapLayers = [
    { id: "traffic", label: "Traffic Flow", active: true },
    { id: "incidents", label: "Incidents", active: true },
    { id: "construction", label: "Construction", active: false },
    { id: "weather", label: "Weather", active: false }
  ];

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant={mapView === "traffic" ? "default" : "outline"}
            size="sm"
            onClick={() => setMapView("traffic")}
          >
            Traffic View
          </Button>
          <Button 
            variant={mapView === "satellite" ? "default" : "outline"}
            size="sm"
            onClick={() => setMapView("satellite")}
          >
            Satellite
          </Button>
          <Button 
            variant={mapView === "terrain" ? "default" : "outline"}
            size="sm"
            onClick={() => setMapView("terrain")}
          >
            Terrain
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Layers className="h-4 w-4 mr-2" />
            Layers
          </Button>
          <div className="flex border rounded-lg">
            <Button variant="ghost" size="sm">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <ZoomOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Interactive Map */}
        <div className="lg:col-span-3">
          <Card className="traffic-card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5 text-primary" />
                Live Traffic Map - Ahmedabad NCR
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-96 bg-gradient-to-br from-primary/5 via-success/5 to-warning/5 rounded-lg overflow-hidden">
                {/* Mock Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-success/10">
                  {/* Traffic Flow Lines */}
                  <div className="absolute top-1/4 left-1/4 w-32 h-1 bg-success animate-pulse"></div>
                  <div className="absolute top-1/2 left-1/3 w-24 h-1 bg-warning animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute top-3/4 left-1/2 w-20 h-1 bg-destructive animate-pulse" style={{ animationDelay: '1s' }}></div>
                  
                  {/* Road Network */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-foreground"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-foreground"></div>
                    <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-foreground"></div>
                    <div className="absolute top-0 bottom-0 left-1/4 w-0.5 bg-foreground"></div>
                    <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-foreground"></div>
                    <div className="absolute top-0 bottom-0 left-3/4 w-0.5 bg-foreground"></div>
                  </div>
                </div>

                {/* Incident Markers */}
                {trafficIncidents.map((incident) => (
                  <div
                    key={incident.id}
                    className={`absolute w-4 h-4 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10 ${
                      incident.severity === 'high' ? 'bg-destructive animate-pulse' :
                      incident.severity === 'medium' ? 'bg-warning animate-pulse' :
                      'bg-success animate-pulse'
                    }`}
                    style={{ 
                      left: `${incident.coordinates.x}%`, 
                      top: `${incident.coordinates.y}%`,
                      animationDelay: `${incident.id * 0.3}s`
                    }}
                    onClick={() => setSelectedIncident(incident)}
                  >
                    <div className="absolute inset-0 rounded-full animate-ping opacity-75"></div>
                  </div>
                ))}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 space-y-2">
                  <div className="text-xs font-medium">Traffic Flow</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-1 bg-success rounded"></div>
                      <span className="text-xs">Free Flow</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-1 bg-warning rounded"></div>
                      <span className="text-xs">Moderate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-1 bg-destructive rounded"></div>
                      <span className="text-xs">Heavy</span>
                    </div>
                  </div>
                </div>

                {/* Selected Incident Popup */}
                {selectedIncident && (
                  <div 
                    className="absolute bg-background border border-border rounded-lg p-3 shadow-lg z-20 min-w-48"
                    style={{ 
                      left: `${selectedIncident.coordinates.x}%`, 
                      top: `${Math.max(selectedIncident.coordinates.y - 15, 5)}%`,
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{selectedIncident.type}</h4>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedIncident(null)}
                        className="h-6 w-6 p-0"
                      >
                        ×
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{selectedIncident.location}</p>
                    <p className="text-xs mb-2">{selectedIncident.description}</p>
                    <Badge className={`text-xs ${getSeverityColor(selectedIncident.severity)}`}>
                      {selectedIncident.severity} priority
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Incident Panel */}
        <div className="space-y-4">
          <Card className="traffic-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                Live Incidents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {trafficIncidents.map((incident) => (
                <div 
                  key={incident.id}
                  className="p-3 rounded-lg border cursor-pointer hover:bg-accent transition-smooth"
                  onClick={() => setSelectedIncident(incident)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{incident.type}</span>
                    <Badge className={`text-xs ${getSeverityColor(incident.severity)}`}>
                      {incident.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{incident.location}</p>
                  <p className="text-xs text-muted-foreground">{incident.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="traffic-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                Traffic Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Average Speed</span>
                  <span className="font-medium">32 km/h</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Active Incidents</span>
                  <span className="font-medium">23</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Traffic Index</span>
                  <span className="font-medium text-warning">Moderate</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
