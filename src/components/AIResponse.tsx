
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Sparkles } from 'lucide-react';

interface AIResponseProps {
  response: string;
  emotion: string;
  timestamp: Date;
}

const AIResponse: React.FC<AIResponseProps> = ({ response, emotion, timestamp }) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-100 shadow-sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-purple-900">NeuroTwin</h4>
              <p className="text-sm text-purple-600">Your AI Companion</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              <Sparkles className="h-3 w-3 mr-1" />
              {emotion}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        <div className="bg-white/70 rounded-lg p-4">
          <p className="text-gray-800 leading-relaxed">{response}</p>
        </div>
      </div>
    </Card>
  );
};

export default AIResponse;
