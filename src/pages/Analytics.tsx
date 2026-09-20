import { BarChart3, TrendingUp, Clock, Users, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TrafficCharts from "@/components/TrafficCharts";

export default function Analytics() {
  const metrics = [
    { label: "Daily Traffic Volume", value: "2.4M", change: "+12%", icon: Car, trend: "up" },
    { label: "Average Speed", value: "32 km/h", change: "+8%", icon: TrendingUp, trend: "up" },
    { label: "Peak Hours", value: "8-10 AM", change: "Stable", icon: Clock, trend: "stable" },
    { label: "Active Users", value: "150K", change: "+25%", icon: Users, trend: "up" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Traffic Analytics</h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive insights into traffic patterns and system performance
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="traffic-card-elevated p-6 animate-fade-in-scale" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                    metric.trend === 'up' ? 'bg-success/10 text-success' :
                    metric.trend === 'down' ? 'bg-destructive/10 text-destructive' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {metric.change}
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground mb-1">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Charts */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Live Traffic Analytics</h3>
            <Link to="/traffic-charts">
              <Button>
                <BarChart3 className="mr-2 h-4 w-4" />
                View All Charts
              </Button>
            </Link>
          </div>
          <TrafficCharts />
        </div>
      </div>
    </div>
  );
}
