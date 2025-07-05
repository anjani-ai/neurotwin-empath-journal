import React, { useState, useEffect } from 'react';
import JournalEntry from '@/components/JournalEntry';
import AIResponse from '@/components/AIResponse';
import EmotionChart from '@/components/EmotionChart';
import InsightCard from '@/components/InsightCard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Heart, Sparkles, TrendingUp, Calendar, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface JournalEntryData {
  id: string;
  content: string;
  timestamp: Date;
  emotion: string;
  aiResponse: string;
}

const Index = () => {
  const [entries, setEntries] = useState<JournalEntryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Sample emotion data for the chart
  const emotionData = [
    { date: 'Mon', mood: 7, stress: 4, energy: 6 },
    { date: 'Tue', mood: 6, stress: 5, energy: 5 },
    { date: 'Wed', mood: 8, stress: 3, energy: 7 },
    { date: 'Thu', mood: 5, stress: 7, energy: 4 },
    { date: 'Fri', mood: 9, stress: 2, energy: 8 },
    { date: 'Sat', mood: 8, stress: 3, energy: 7 },
    { date: 'Sun', mood: 7, stress: 4, energy: 6 },
  ];

  const generateAIResponse = async (entry: string): Promise<{ response: string; emotion: string }> => {
    // Simulate AI processing
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple emotion detection based on keywords
    const emotions = {
      'anxious': 'Anxious',
      'worried': 'Worried', 
      'stress': 'Stressed',
      'happy': 'Happy',
      'sad': 'Sad',
      'excited': 'Excited',
      'tired': 'Tired',
      'grateful': 'Grateful',
      'angry': 'Angry',
      'confused': 'Confused'
    };

    const detectedEmotion = Object.keys(emotions).find(key => 
      entry.toLowerCase().includes(key)
    ) || 'thoughtful';

    const responses = {
      'anxious': "I can sense the anxiety in your words. Remember that anxiety often comes from our mind's attempt to protect us, but sometimes it can feel overwhelming. What specific thoughts are contributing to this feeling? Let's explore them together.",
      'worried': "It sounds like you're carrying some heavy concerns. Worry can be productive when it leads to action, but destructive when it spirals. What's one small step you could take today to address what's worrying you?",
      'stress': "I hear that you're feeling stressed. Stress affects both our mind and body. Have you noticed any physical tension? Sometimes taking deep breaths or doing a quick body scan can help reset our nervous system.",
      'happy': "It's wonderful to hear the joy in your words! Happiness is precious - what specifically brought you this feeling today? Acknowledging these moments helps us recognize what truly nurtures our wellbeing.",
      'sad': "I can feel the sadness you're experiencing, and I want you to know that these feelings are valid. Sadness often signals that something meaningful to us needs attention. What do you think your sadness is trying to tell you?",
      'excited': "Your excitement is contagious! It's beautiful when we find things that energize us. What aspects of this situation are most thrilling to you? Let's capture this positive energy.",
      'tired': "Fatigue can be our mind and body's way of asking for rest or change. Are you tired physically, emotionally, or both? Sometimes understanding the type of tiredness helps us know what kind of restoration we need.",
      'grateful': "Gratitude is such a powerful emotion for mental wellbeing. What you're sharing shows real awareness of the good in your life. How does focusing on gratitude shift your perspective?",
      'angry': "Anger often masks other emotions like hurt, frustration, or feeling unheard. Your anger is valid - it's telling you something important. What boundary or value feels like it's being crossed?",
      'confused': "Confusion can be uncomfortable, but it often comes before clarity. Sometimes our mind needs to process complexity before finding understanding. What questions are you sitting with right now?",
      'default': "Thank you for sharing this with me. I can sense the depth of your experience through your words. Every feeling you have is valid and worth exploring. What would you like to understand better about this situation?"
    };

    const aiResponse = responses[detectedEmotion as keyof typeof responses] || responses.default;
    
    setIsLoading(false);
    return {
      response: aiResponse,
      emotion: emotions[detectedEmotion as keyof typeof emotions] || 'Reflective'
    };
  };

  const handleJournalSubmit = async (content: string, type: 'text' | 'voice' | 'image') => {
    try {
      const { response, emotion } = await generateAIResponse(content);
      
      const newEntry: JournalEntryData = {
        id: Date.now().toString(),
        content,
        timestamp: new Date(),
        emotion,
        aiResponse: response
      };

      setEntries(prev => [newEntry, ...prev]);
      
      toast({
        title: "Entry saved",
        description: "NeuroTwin has processed your thoughts and provided feedback.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to process your entry. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleReply = async (reply: string, entryId: string) => {
    try {
      const { response, emotion } = await generateAIResponse(reply);
      
      const replyEntry: JournalEntryData = {
        id: Date.now().toString(),
        content: reply,
        timestamp: new Date(),
        emotion,
        aiResponse: response
      };

      setEntries(prev => [replyEntry, ...prev]);
      
      toast({
        title: "Reply sent",
        description: "NeuroTwin has responded to your message.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to send reply. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient">NeuroTwin</h1>
                <p className="text-sm text-muted-foreground">Your AI Mental Health Companion</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Shield className="h-3 w-3 mr-1" />
                Private & Secure
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Journal Area */}
          <div className="lg:col-span-2 space-y-6">
            <JournalEntry onSubmit={handleJournalSubmit} />
            
            {/* Loading State */}
            {isLoading && (
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center animate-pulse">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-4 bg-purple-200 rounded animate-pulse w-40"></div>
                    <div className="h-3 bg-purple-100 rounded animate-pulse w-24"></div>
                  </div>
                </div>
              </Card>
            )}

            {/* Journal Entries */}
            <div className="space-y-4">
              {entries.map((entry) => (
                <div key={entry.id} className="space-y-4">
                  {/* User Entry */}
                  <Card className="p-4 ml-8 bg-white border-l-4 border-l-primary">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <Heart className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-sm">You</span>
                          <span className="text-xs text-muted-foreground">
                            {entry.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-gray-700">{entry.content}</p>
                      </div>
                    </div>
                  </Card>

                  {/* AI Response */}
                  <AIResponse 
                    response={entry.aiResponse}
                    emotion={entry.emotion}
                    timestamp={entry.timestamp}
                    onReply={(reply) => handleReply(reply, entry.id)}
                  />
                </div>
              ))}
            </div>

            {entries.length === 0 && !isLoading && (
              <Card className="p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                <Sparkles className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Welcome to NeuroTwin</h3>
                <p className="text-muted-foreground mb-4">
                  Start by sharing how you're feeling today. I'm here to listen, understand, and guide you through your mental health journey.
                </p>
                <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  Start Your First Entry
                </Button>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emotion Chart */}
            <EmotionChart data={emotionData} />

            {/* Insights */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Insights
              </h3>
              
              <InsightCard
                title="Stress Pattern"
                insight="You tend to experience higher stress levels on weekday mornings. Consider implementing a calming morning routine."
                pattern="Weekday mornings"
                frequency="3x this week"
              />

              <InsightCard
                title="Gratitude Practice"
                insight="Your mood significantly improves when you mention things you're grateful for. This is a powerful coping strategy."
                pattern="Gratitude → Better mood"
                frequency="5x this month"
              />
            </div>

            {/* Quick Stats */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                This Week
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Journal Entries</span>
                  <span className="font-medium">{entries.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg Mood</span>
                  <span className="font-medium text-green-600">7.2/10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Stress Level</span>
                  <span className="font-medium text-amber-600">4.1/10</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
