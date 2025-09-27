import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Leaf, Zap, Car, TrendingDown } from "lucide-react";

export function DashboardPlaceholder() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium text-gray-900">Good morning!</h1>
            <p className="text-gray-600">Ready to make a green impact today?</p>
          </div>
          <div className="w-12 h-12 bg-[#22C31B] rounded-full flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Carbon Footprint Summary */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-gray-900">This Month</h2>
            <Badge className="bg-green-100 text-green-800">Estimate</Badge>
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-3xl font-medium text-gray-900">
              2.1 <span className="text-lg text-gray-600">tonnes CO₂e</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <TrendingDown className="w-4 h-4" />
              <span className="text-sm">12% less than last month</span>
            </div>
          </div>
        </Card>

        {/* Breakdown */}
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900">Breakdown</h3>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Electricity</p>
                  <p className="text-sm text-gray-600">300 kWh</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">180 kg</p>
                <p className="text-sm text-gray-600">CO₂e</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Car className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Transport</p>
                  <p className="text-sm text-gray-600">200 km/week</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">1.9 tonnes</p>
                <p className="text-sm text-gray-600">CO₂e</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 text-center space-y-2 cursor-pointer hover:shadow-md transition-shadow">
              <div className="w-8 h-8 bg-[#22C31B] rounded-lg flex items-center justify-center mx-auto">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-900">Log Usage</p>
            </Card>
            
            <Card className="p-4 text-center space-y-2 cursor-pointer hover:shadow-md transition-shadow">
              <div className="w-8 h-8 bg-[#26CC84] rounded-lg flex items-center justify-center mx-auto">
                <TrendingDown className="w-4 h-4 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-900">View Tips</p>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-4">
          <p className="text-sm text-gray-500">
            Data shown are estimates based on your inputs
          </p>
        </div>
      </div>
    </div>
  );
}