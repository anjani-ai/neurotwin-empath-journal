
import React from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar } from 'lucide-react';

interface EmotionData {
  date: string;
  mood: number;
  stress: number;
  energy: number;
}

interface EmotionChartProps {
  data: EmotionData[];
}

const EmotionChart: React.FC<EmotionChartProps> = ({ data }) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Emotional Patterns</h3>
              <p className="text-sm text-muted-foreground">Your mental health journey over time</p>
            </div>
          </div>
          <Calendar className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <YAxis 
                domain={[0, 10]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                name="Mood"
              />
              <Line 
                type="monotone" 
                dataKey="energy" 
                stroke="#06b6d4" 
                strokeWidth={3}
                dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                name="Energy"
              />
              <Line 
                type="monotone" 
                dataKey="stress" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                name="Stress"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span>Mood</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
            <span>Energy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span>Stress</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EmotionChart;
