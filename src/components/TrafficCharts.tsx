import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity } from "lucide-react";

export default function TrafficCharts() {
  const volumeData = [
    { time: '6:00', cars: 1200, buses: 80, trucks: 45 },
    { time: '7:00', cars: 2800, buses: 120, trucks: 60 },
    { time: '8:00', cars: 4200, buses: 180, trucks: 85 },
    { time: '9:00', cars: 3800, buses: 160, trucks: 70 },
    { time: '10:00', cars: 2900, buses: 110, trucks: 55 },
    { time: '11:00', cars: 2400, buses: 95, trucks: 50 },
    { time: '12:00', cars: 2700, buses: 105, trucks: 65 },
    { time: '13:00', cars: 3100, buses: 125, trucks: 75 },
    { time: '14:00', cars: 2800, buses: 115, trucks: 60 },
    { time: '15:00', cars: 3200, buses: 140, trucks: 80 },
    { time: '16:00', cars: 3900, buses: 170, trucks: 90 },
    { time: '17:00', cars: 4500, buses: 190, trucks: 95 },
    { time: '18:00', cars: 4800, buses: 200, trucks: 100 },
    { time: '19:00', cars: 3600, buses: 150, trucks: 75 },
    { time: '20:00', cars: 2200, buses: 100, trucks: 50 }
  ];

  const speedData = [
    { time: '6:00', avgSpeed: 45, targetSpeed: 40 },
    { time: '7:00', avgSpeed: 35, targetSpeed: 40 },
    { time: '8:00', avgSpeed: 25, targetSpeed: 40 },
    { time: '9:00', avgSpeed: 30, targetSpeed: 40 },
    { time: '10:00', avgSpeed: 38, targetSpeed: 40 },
    { time: '11:00', avgSpeed: 42, targetSpeed: 40 },
    { time: '12:00', avgSpeed: 40, targetSpeed: 40 },
    { time: '13:00', avgSpeed: 37, targetSpeed: 40 },
    { time: '14:00', avgSpeed: 39, targetSpeed: 40 },
    { time: '15:00', avgSpeed: 35, targetSpeed: 40 },
    { time: '16:00', avgSpeed: 28, targetSpeed: 40 },
    { time: '17:00', avgSpeed: 22, targetSpeed: 40 },
    { time: '18:00', avgSpeed: 20, targetSpeed: 40 },
    { time: '19:00', avgSpeed: 32, targetSpeed: 40 },
    { time: '20:00', avgSpeed: 44, targetSpeed: 40 }
  ];

  const vehicleDistribution = [
    { name: 'Cars', value: 65, color: 'hsl(212, 84%, 46%)' },
    { name: 'Buses', value: 15, color: 'hsl(142, 76%, 36%)' },
    { name: 'Trucks', value: 12, color: 'hsl(45, 93%, 47%)' },
    { name: 'Motorcycles', value: 8, color: 'hsl(0, 84%, 60%)' }
  ];

  const densityData = [
    { zone: 'Zone A', density: 85, incidents: 3 },
    { zone: 'Zone B', density: 92, incidents: 5 },
    { zone: 'Zone C', density: 78, incidents: 2 },
    { zone: 'Zone D', density: 88, incidents: 4 },
    { zone: 'Zone E', density: 95, incidents: 6 },
    { zone: 'Zone F', density: 82, incidents: 3 },
    { zone: 'Zone G', density: 90, incidents: 4 },
    { zone: 'Zone H', density: 76, incidents: 2 }
  ];

  return (
    <div className="space-y-6">
      {/* Traffic Volume Chart */}
      <Card className="traffic-card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Hourly Traffic Volume Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="cars" stackId="a" fill="hsl(212, 84%, 46%)" name="Cars" />
                <Bar dataKey="buses" stackId="a" fill="hsl(142, 76%, 36%)" name="Buses" />
                <Bar dataKey="trucks" stackId="a" fill="hsl(45, 93%, 47%)" name="Trucks" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Speed Analysis Chart */}
        <Card className="traffic-card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Average Speed Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={speedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="time" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="avgSpeed" 
                    stroke="hsl(142, 76%, 36%)" 
                    fill="hsl(142, 76%, 36%, 0.3)"
                    name="Average Speed (km/h)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="targetSpeed" 
                    stroke="hsl(45, 93%, 47%)" 
                    strokeDasharray="5 5"
                    name="Target Speed"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Distribution */}
        <Card className="traffic-card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-warning" />
              Vehicle Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vehicleDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {vehicleDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {vehicleDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Density Heatmap */}
      <Card className="traffic-card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-destructive" />
            Zone-wise Traffic Density & Incidents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={densityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="zone" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="density" 
                  fill="hsl(212, 84%, 46%)" 
                  name="Traffic Density %" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="incidents" 
                  fill="hsl(0, 84%, 60%)" 
                  name="Active Incidents"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
