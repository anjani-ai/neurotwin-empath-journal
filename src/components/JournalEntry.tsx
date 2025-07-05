
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Mic, Image, Heart } from 'lucide-react';

interface JournalEntryProps {
  onSubmit: (entry: string, type: 'text' | 'voice' | 'image') => void;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ onSubmit }) => {
  const [entry, setEntry] = useState('');
  const [isWriting, setIsWriting] = useState(false);

  const handleSubmit = () => {
    if (entry.trim()) {
      onSubmit(entry, 'text');
      setEntry('');
      setIsWriting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Card className="p-6 glass-effect border-0 shadow-lg">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">How are you feeling today?</h3>
            <p className="text-sm text-muted-foreground">Share your thoughts, emotions, or experiences</p>
          </div>
        </div>

        <Textarea
          value={entry}
          onChange={(e) => {
            setEntry(e.target.value);
            setIsWriting(e.target.value.length > 0);
          }}
          onKeyPress={handleKeyPress}
          placeholder="Start writing... I'm here to listen and understand."
          className="min-h-[120px] resize-none border-0 bg-white/50 focus:bg-white/80 transition-all duration-200"
        />

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-primary"
              onClick={() => console.log('Voice recording feature coming soon')}
            >
              <Mic className="h-4 w-4 mr-2" />
              Voice
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-primary"
              onClick={() => console.log('Image upload feature coming soon')}
            >
              <Image className="h-4 w-4 mr-2" />
              Image
            </Button>
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={!entry.trim()}
            className="gradient-bg border-0 text-white hover:opacity-90 transition-opacity"
          >
            <Send className="h-4 w-4 mr-2" />
            Share with NeuroTwin
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default JournalEntry;
