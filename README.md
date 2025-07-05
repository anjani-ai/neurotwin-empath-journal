# 🧠 NeuroTwin

**Your Reflective AI for Mental Clarity**

NeuroTwin is a multimodal mental health journaling app that creates a personalized "AI twin" — one that understands your emotions, detects patterns in your thoughts, and gently helps you reflect using Cognitive Behavioral Therapy (CBT) techniques.

> “It’s not just a journal. It’s a mirror that listens, learns, and evolves with you.”

---

## 🚀 Features

### ✍️ Multimodal Journaling
- Write freely or speak your thoughts (via voice-to-text with Whisper)
- Upload memes or image-based thoughts — NeuroTwin extracts meaning using OCR + GPT-4 Vision
- Optional daily prompts and reflections

### 💬 AI-Powered CBT Agent
- GPT-4 analyzes your tone and suggests:
  - Reframes for negative thoughts
  - Gentle CBT-style questions
  - Mental health exercises

### 🧠 Memory-Driven Responses
- Long-term vector memory (via ChromaDB) lets the AI recall:
  - What you journaled weeks ago
  - Recurring stressors
  - Emotional cycles

### 📊 Emotion Tracker Dashboard
- View mood trends over time
- Spot triggers and behavioral patterns
- Get weekly summaries and affirmations

### 🔐 Privacy-First
- All journals stored securely (Supabase/local optional)
- Data never leaves your control unless shared
- Optional encrypted mode for voice/text/image entries

---

## 🛠️ Tech Stack

| Layer       | Tool                            |
|------------|----------------------------------|
| Frontend   | Next.js, Tailwind CSS            |
| Backend    | FastAPI or LangChain             |
| LLM Agent  | OpenAI GPT-4                     |
| Voice      | Whisper API                      |
| Vision     | GPT-4 Vision / Tesseract OCR     |
| Memory     | ChromaDB / Pinecone (Vector DB)  |
| Auth/Data  | Supabase (optional)              |

---

## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/neurotwin.git
cd neurotwin
