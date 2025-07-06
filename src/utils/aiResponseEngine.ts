
interface JournalEntry {
  id: string;
  content: string;
  timestamp: Date;
  emotion: string;
  aiResponse: string;
}

interface EmotionalPattern {
  trigger: string;
  emotion: string;
  frequency: number;
  lastSeen: Date;
}

// Enhanced emotion detection with more nuanced analysis
export const analyzeEmotion = (text: string): string => {
  const emotionKeywords = {
    'anxious': ['anxious', 'anxiety', 'worry', 'worried', 'nervous', 'panic', 'overwhelmed', 'stressed'],
    'depressed': ['sad', 'depressed', 'down', 'hopeless', 'empty', 'numb', 'worthless', 'lonely'],
    'angry': ['angry', 'mad', 'furious', 'frustrated', 'irritated', 'rage', 'annoyed'],
    'happy': ['happy', 'joy', 'excited', 'elated', 'cheerful', 'content', 'pleased', 'glad'],
    'grateful': ['grateful', 'thankful', 'blessed', 'appreciate', 'fortunate', 'lucky'],
    'confused': ['confused', 'lost', 'uncertain', 'unclear', 'puzzled', 'mixed up'],
    'tired': ['tired', 'exhausted', 'drained', 'worn out', 'fatigued', 'weary'],
    'hopeful': ['hopeful', 'optimistic', 'positive', 'encouraged', 'motivated'],
    'peaceful': ['calm', 'peaceful', 'serene', 'relaxed', 'tranquil', 'centered']
  };

  const lowercaseText = text.toLowerCase();
  
  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    if (keywords.some(keyword => lowercaseText.includes(keyword))) {
      return emotion.charAt(0).toUpperCase() + emotion.slice(1);
    }
  }
  
  return 'Reflective';
};

// Pattern detection in past entries
export const detectPatterns = (currentEntry: string, pastEntries: JournalEntry[]): EmotionalPattern[] => {
  const patterns: EmotionalPattern[] = [];
  const currentEmotion = analyzeEmotion(currentEntry);
  
  // Look for similar emotional states
  const similarEmotions = pastEntries.filter(entry => entry.emotion === currentEmotion);
  if (similarEmotions.length > 1) {
    patterns.push({
      trigger: `Similar ${currentEmotion.toLowerCase()} feelings`,
      emotion: currentEmotion,
      frequency: similarEmotions.length,
      lastSeen: similarEmotions[0].timestamp
    });
  }

  // Look for time-based patterns
  const currentHour = new Date().getHours();
  const currentDay = new Date().getDay();
  
  const timeBasedEntries = pastEntries.filter(entry => {
    const entryHour = entry.timestamp.getHours();
    const entryDay = entry.timestamp.getDay();
    return Math.abs(entryHour - currentHour) <= 2 && entryDay === currentDay;
  });
  
  if (timeBasedEntries.length > 1) {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    patterns.push({
      trigger: `${dayNames[currentDay]} patterns`,
      emotion: 'Temporal',
      frequency: timeBasedEntries.length,
      lastSeen: timeBasedEntries[0].timestamp
    });
  }

  return patterns;
};

// Enhanced AI response generation using the meta-prompt approach
export const generateEmpathicResponse = (
  currentEntry: string, 
  pastEntries: JournalEntry[]
): { response: string; emotion: string } => {
  const currentEmotion = analyzeEmotion(currentEntry);
  const patterns = detectPatterns(currentEntry, pastEntries);
  
  // System prompt inspired responses
  const responses = {
    'Anxious': [
      "I can sense the anxiety in your words, and I want you to know that what you're feeling is completely valid. Anxiety often shows up when our mind is trying to protect us from uncertainty.",
      "Your anxiety is speaking to me through your words. I've noticed you've shared similar feelings before - you're not alone in this pattern.",
      "This anxious energy you're describing feels familiar from our past conversations. What do you think might be at the root of these feelings today?"
    ],
    'Depressed': [
      "I can feel the weight you're carrying in your words. Depression can make everything feel heavier, but sharing this with me shows incredible strength.",
      "The sadness you're expressing reminds me of times you've opened up before. Your willingness to keep sharing, even when it's hard, speaks to your resilience.",
      "I hear the depth of what you're going through. When you've felt this way before, what helped you find even small moments of light?"
    ],
    'Happy': [
      "The joy in your words is beautiful to witness! Happiness like this is precious - what specifically brought you to this wonderful feeling today?",
      "Your happiness is contagious through your writing. I love seeing you in this space - it reminds me of other times you've shared joy with me.",
      "This positive energy you're radiating is wonderful. How does it feel in your body when you experience happiness like this?"
    ],
    'Grateful': [
      "Your gratitude is touching and powerful. Gratitude has this amazing ability to shift our entire perspective - I can feel that shift in your words.",
      "The appreciation you're expressing is beautiful. When you focus on gratitude like this, how does it change the way you see your situation?",
      "Your thankfulness comes through so clearly. I've noticed that when you express gratitude, your other reflections often become more hopeful too."
    ]
  };

  // Select appropriate response based on emotion and patterns
  let baseResponse = responses[currentEmotion as keyof typeof responses]?.[0] || 
    "Thank you for sharing this with me. I can sense the depth of your experience through your words. Every feeling you have is valid and worth exploring.";

  // Add pattern awareness if detected
  if (patterns.length > 0) {
    const pattern = patterns[0];
    if (pattern.frequency > 2) {
      baseResponse += ` I've noticed this ${pattern.trigger.toLowerCase()} has come up ${pattern.frequency} times in our conversations. What do you think this pattern might be trying to tell you?`;
    }
  }

  // Add reflective questions
  const reflectiveQuestions = [
    " What would you like to understand better about this feeling?",
    " How does this feeling show up in your body?",
    " What thoughts are accompanying this emotion?",
    " When was the last time you felt something similar?",
    " What would you tell a friend who shared this same experience with you?"
  ];

  const randomQuestion = reflectiveQuestions[Math.floor(Math.random() * reflectiveQuestions.length)];
  baseResponse += randomQuestion;

  return {
    response: baseResponse,
    emotion: currentEmotion
  };
};
