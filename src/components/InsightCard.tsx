
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, ArrowRight } from 'lucide-react';

interface InsightCardProps {
  title: string;
  insight: string;
  pattern: string;
  frequency: string;
}

const InsightCard: React.FC<InsightCardProps> = ({ title, insight, pattern, frequency }) => {
  return (
    <Card className="p-5 hover:shadow-md transition-shadow duration-200 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Lightbulb className="h-4 w-4 text-white" />
            </div>
            <h4 className="font-semibold text-amber-900">{title}</h4>
          </div>
          <Badge variant="secondary" className="bg-amber-100 text-amber-700 text-xs">
            {frequency}
          </Badge>
        </div>

        <p className="text-sm text-amber-800 leading-relaxed">{insight}</p>

        <div className="flex items-center gap-2 text-xs text-amber-600">
          <span>Pattern:</span>
          <span className="font-medium">{pattern}</span>
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </Card>
  );
};

export default InsightCard;
