import { useState } from "react";
import { Settings, Radio, Zap, Clock, RotateCcw, Play, Pause, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TrafficControlCenter() {
  const [signals, setSignals] = useState([
    {
      id: "CP-001",
      name: "Connaught Place Main",
      status: "operational",
      mode: "auto",
      greenTime: 45,
      redTime: 30,
      yellowTime: 5,
      currentPhase: "green",
      lastMaintenance: "2024-01-10",
      location: "Connaught Place, Block A"
    },
    {
      id: "RR-014",
      name: "Ring Road Sector 14",
      status: "operational",
      mode: "manual",
      greenTime: 60,
      redTime: 40,
      yellowTime: 5,
      currentPhase: "red",
      lastMaintenance: "2024-01-08",
      location: "Ring Road, Sector 14"
    },
    {
      id: "MG-003",
      name: "MG Road Junction",
      status: "maintenance",
      mode: "auto",
      greenTime: 35,
      redTime: 25,
      yellowTime: 5,
      currentPhase: "off",
      lastMaintenance: "2024-01-15",
      location: "MG Road, Central Delhi"
    },
    {
      id: "DG-007",
      name: "Delhi Gate Signal",
      status: "operational",
      mode: "auto",
      greenTime: 50,
      redTime: 35,
      yellowTime: 5,
      currentPhase: "yellow",
      lastMaintenance: "2024-01-12",
      location: "Delhi Gate, Old Delhi"
    }
  ]);

  const [selectedSignal, setSelectedSignal] = useState<string | null>(null);
  const [systemMode, setSystemMode] = useState("auto");
  const [emergencyMode, setEmergencyMode] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-success text-success-foreground';
      case 'maintenance': return 'bg-warning text-warning-foreground';
      case 'error': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'green': return 'bg-success';
      case 'yellow': return 'bg-warning';
      case 'red': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const updateSignalTiming = (signalId: string, timing: any) => {
    setSignals(prev => prev.map(signal => 
      signal.id === signalId ? { ...signal, ...timing } : signal
    ));
  };

  const toggleSignalMode = (signalId: string) => {
    setSignals(prev => prev.map(signal => 
      signal.id === signalId 
        ? { ...signal, mode: signal.mode === 'auto' ? 'manual' : 'auto' }
        : signal
    ));
  };

  const selectedSignalData = signals.find(s => s.id === selectedSignal);

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="traffic-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Signals</p>
                <p className="text-2xl font-bold">{signals.length}</p>
              </div>
              <Radio className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="traffic-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Operational</p>
                <p className="text-2xl font-bold text-success">
                  {signals.filter(s => s.status === 'operational').length}
                </p>
              </div>
              <div className="w-3 h-3 bg-success rounded-full"></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="traffic-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Auto Mode</p>
                <p className="text-2xl font-bold text-primary">
                  {signals.filter(s => s.mode === 'auto').length}
                </p>
              </div>
              <Zap className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="traffic-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Maintenance</p>
                <p className="text-2xl font-bold text-warning">
                  {signals.filter(s => s.status === 'maintenance').length}
                </p>
              </div>
              <Settings className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Controls */}
      <Card className="traffic-card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            System Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium">System Mode</label>
              <Select value={systemMode} onValueChange={setSystemMode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Automatic</SelectItem>
                  <SelectItem value="manual">Manual Override</SelectItem>
                  <SelectItem value="adaptive">Adaptive Control</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium">Emergency Mode</label>
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={emergencyMode} 
                  onCheckedChange={setEmergencyMode}
                  id="emergency-mode"
                />
                <label htmlFor="emergency-mode" className="text-sm">
                  {emergencyMode ? "Active" : "Inactive"}
                </label>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium">Actions</label>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Play className="mr-2 h-4 w-4" />
                  Sync All
                </Button>
                <Button size="sm" variant="outline">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>
          </div>
          
          {emergencyMode && (
            <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Emergency Mode Active</span>
              </div>
              <p className="text-xs text-destructive/80 mt-1">
                All signals are set to flashing mode. Manual intervention may be required.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Signal List */}
        <Card className="traffic-card-elevated">
          <CardHeader>
            <CardTitle>Traffic Signals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {signals.map((signal) => (
                <div 
                  key={signal.id}
                  className={`p-4 rounded-lg border transition-smooth cursor-pointer ${
                    selectedSignal === signal.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:bg-accent'
                  }`}
                  onClick={() => setSelectedSignal(signal.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getPhaseColor(signal.currentPhase)}`}></div>
                      <div>
                        <h4 className="font-medium">{signal.name}</h4>
                        <p className="text-xs text-muted-foreground">{signal.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(signal.status)}>
                        {signal.status}
                      </Badge>
                      <Badge variant="outline">
                        {signal.mode}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{signal.location}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>G: {signal.greenTime}s</span>
                    <span>Y: {signal.yellowTime}s</span>
                    <span>R: {signal.redTime}s</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Signal Control Panel */}
        <Card className="traffic-card-elevated">
          <CardHeader>
            <CardTitle>Signal Control Panel</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedSignalData ? (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{selectedSignalData.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedSignalData.location}</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <div className={`w-6 h-6 rounded-full ${getPhaseColor(selectedSignalData.currentPhase)}`}></div>
                    <span className="text-sm font-medium capitalize">{selectedSignalData.currentPhase} Phase</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Control Mode</label>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => toggleSignalMode(selectedSignalData.id)}
                    >
                      Switch to {selectedSignalData.mode === 'auto' ? 'Manual' : 'Auto'}
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Green Time: {selectedSignalData.greenTime}s</label>
                      <Slider
                        value={[selectedSignalData.greenTime]}
                        onValueChange={([value]) => 
                          updateSignalTiming(selectedSignalData.id, { greenTime: value })
                        }
                        max={120}
                        min={15}
                        step={5}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Red Time: {selectedSignalData.redTime}s</label>
                      <Slider
                        value={[selectedSignalData.redTime]}
                        onValueChange={([value]) => 
                          updateSignalTiming(selectedSignalData.id, { redTime: value })
                        }
                        max={90}
                        min={10}
                        step={5}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Yellow Time: {selectedSignalData.yellowTime}s</label>
                      <Slider
                        value={[selectedSignalData.yellowTime]}
                        onValueChange={([value]) => 
                          updateSignalTiming(selectedSignalData.id, { yellowTime: value })
                        }
                        max={10}
                        min={3}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Play className="mr-2 h-4 w-4" />
                      Apply Changes
                    </Button>
                    <Button size="sm" variant="outline">
                      <Pause className="mr-2 h-4 w-4" />
                      Override
                    </Button>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Last Maintenance: {selectedSignalData.lastMaintenance}</p>
                  <p>Total Cycle Time: {selectedSignalData.greenTime + selectedSignalData.redTime + selectedSignalData.yellowTime}s</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Radio className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a Signal</h3>
                <p className="text-muted-foreground">
                  Choose a traffic signal from the list to control its settings
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
