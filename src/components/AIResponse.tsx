
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Sparkles, MessageCircleReply, Send } from 'lucide-react';

interface AIResponseProps {
  response: string;
  emotion: string;
  timestamp: Date;
  onReply?: (reply: string) => void;
}

const AIResponse: React.FC<AIResponseProps> = ({ response, emotion, timestamp, onReply }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleSubmitReply = () => {
    if (replyText.trim() && onReply) {
      onReply(replyText.trim());
      setReplyText('');
      setIsReplying(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitReply();
    }
  };

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

        {!isReplying ? (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsReplying(true)}
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
            >
              <MessageCircleReply className="h-4 w-4 mr-2" />
              Reply
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <Textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Reply to NeuroTwin..."
              className="min-h-[80px] bg-white/80 border-purple-200 focus:border-purple-300"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsReplying(false);
                  setReplyText('');
                }}
                className="border-purple-200"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSubmitReply}
                disabled={!replyText.trim()}
                className="gradient-bg text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AIResponse;
