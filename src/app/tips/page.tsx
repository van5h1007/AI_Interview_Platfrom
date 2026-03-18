"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Search, BookOpen, CheckCircle, Clock, Users, MessageCircle, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Tip categories
const categories = [
  { id: "preparation", name: "Preparation", icon: <Clock size={16} /> },
  { id: "communication", name: "Communication", icon: <MessageCircle size={16} /> },
  { id: "body-language", name: "Body Language", icon: <Users size={16} /> },
  { id: "questions", name: "Answering Questions", icon: <ThumbsUp size={16} /> },
];

// Interview tips organized by category
const interviewTips = [
  {
    id: 1,
    category: "preparation",
    title: "Research the company thoroughly",
    content: `
      <p>One of the most important aspects of interview preparation is researching the company you're applying to.</p>
      <h4 class="text-cyan-400 font-medium mt-4 mb-2">How to research effectively:</h4>
      <ul class="space-y-2">
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span>Visit the company website and read their About page, mission statement, and recent press releases</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span>Research the company on LinkedIn to learn about their culture and employees</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span>Check recent news about the company to understand current challenges and achievements</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span>Learn about their products/services and how they compare to competitors</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span>Research the industry trends and challenges to show market awareness</span>
        </li>
      </ul>
      <p class="mt-4">This information will help you tailor your answers to align with the company's values and demonstrate genuine interest during the interview.</p>
    `
  },
  {
    id: 2,
    category: "preparation",
    title: "Prepare answers to common interview questions",
    content: `
      <p>Anticipate questions you might be asked and prepare thoughtful answers ahead of time.</p>
      <h4 class="text-cyan-400 font-medium mt-4 mb-2">Questions to prepare for:</h4>
      <ul class="space-y-2">
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span>"Tell me about yourself" - Prepare a concise 2-minute summary of your professional background</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span>"Why do you want to work for us?" - Connect your career goals with the company's mission</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span>"What are your strengths and weaknesses?" - Be honest but strategic</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span>"Tell me about a challenge you faced and how you overcame it" - Use the STAR method (Situation, Task, Action, Result)</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span>"Where do you see yourself in five years?" - Show ambition that aligns with the role</span>
        </li>
      </ul>
      <p class="mt-4">Practice your answers but don't memorize them word-for-word. Focus on the key points you want to communicate while maintaining a natural conversational flow.</p>
      <p class="mt-2">For more examples, check out our <Link href="/commonquestions" class="text-cyan-400 hover:underline">Common Questions</Link> page.</p>
    `
  },
  {
    id: 3,
    category: "preparation",
    title: "Prepare insightful questions for the interviewer",
    content: `
      <p>Having thoughtful questions ready demonstrates your interest in the role and helps you determine if the company is right for you.</p>
      <h4 class="text-cyan-400 font-medium mt-4 mb-2">Strong questions to ask:</h4>
      <ul class="space-y-2">
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span>"What does success look like in this role in the first 90 days?"</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span>"How would you describe the company culture and team dynamics?"</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span>"What are the biggest challenges the team is currently facing?"</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span>"How does the company support professional development and growth?"</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span>"What are the next steps in the interview process?"</span>
        </li>
      </ul>
      <p class="mt-4">Avoid questions about salary or benefits in the first interview unless the interviewer brings them up.</p>
    `
  },
  {
    id: 4,
    category: "communication",
    title: "Master the art of clear, concise communication",
    content: `
      <p>How you communicate during an interview is just as important as what you say.</p>
      <h4 class="text-cyan-400 font-medium mt-4 mb-2">Communication best practices:</h4>
      <ul class="space-y-2">
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>Speak clearly and at a moderate pace</strong> - Avoid rushing through answers or speaking too softly</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>Use the STAR method</strong> for behavioral questions (Situation, Task, Action, Result)</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>Eliminate filler words</strong> like "um," "like," or "you know" as much as possible</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>Listen actively</strong> - Don't interrupt and make sure you understand questions before answering</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>Be concise</strong> - Aim for 1-2 minute answers that directly address the question</span>
        </li>
      </ul>
      <p class="mt-4">Practice these skills before the interview by recording yourself answering mock interview questions or practicing with a friend.</p>
    `
  },
  {
    id: 5,
    category: "communication",
    title: "Tell compelling stories",
    content: `
      <p>Storytelling is one of the most powerful ways to make your answers memorable and demonstrate your skills.</p>
      <h4 class="text-cyan-400 font-medium mt-4 mb-2">Effective storytelling techniques:</h4>
      <ul class="space-y-2">
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>Structure your stories</strong> with a clear beginning, middle, and end</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>Focus on your specific contributions</strong> and actions within the story</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>Include measurable results</strong> whenever possible (percentages, numbers, achievements)</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>Keep stories relevant</strong> to the question and role requirements</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>Prepare 5-7 flexible stories</strong> that can be adapted to different interview questions</span>
        </li>
      </ul>
      <p class="mt-4">Remember that stories create emotional connections and are more memorable than general statements about your abilities.</p>
    `
  },
  {
    id: 6,
    category: "body-language",
    title: "Master your nonverbal communication",
    content: `
      <p>Your body language can significantly impact how interviewers perceive you, especially in in-person interviews.</p>
      <h4 class="text-cyan-400 font-medium mt-4 mb-2">Body language tips:</h4>
      <ul class="space-y-2">
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>Maintain good posture</strong> - Sit up straight but remain relaxed to project confidence</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>Make appropriate eye contact</strong> - Look at the interviewer when speaking and listening</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>Offer a firm handshake</strong> at the beginning and end of the interview (when appropriate)</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>Use natural hand gestures</strong> to emphasize points, but avoid excessive movements</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>Smile genuinely</strong> - It helps establish rapport and shows enthusiasm</span>
        </li>
      </ul>
      <p class="mt-4">For video interviews, position your camera at eye level, find good lighting, and remember to look at the camera (not the screen) when speaking to simulate eye contact.</p>
    `
  },
  {
    id: 7,
    category: "body-language",
    title: "Dress appropriately",
    content: `
      <p>Your appearance makes a strong first impression before you say a word.</p>
      <h4 class="text-cyan-400 font-medium mt-4 mb-2">Dressing guidelines:</h4>
      <ul class="space-y-2">
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>Research the company culture</strong> to gauge appropriate attire</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>When in doubt, dress one level above</strong> the company's everyday dress code</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>Choose clean, wrinkle-free clothing</strong> that fits well</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>Keep accessories and fragrances minimal</strong> to avoid distractions</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>Consider color psychology</strong> - Blues convey trustworthiness; blacks show authority</span>
        </li>
      </ul>
      <p class="mt-4">For video interviews, avoid busy patterns and bright colors that might distort on camera. Also, check how your outfit looks on camera before the interview.</p>
    `
  },
  {
    id: 8,
    category: "questions",
    title: "Use the STAR method for behavioral questions",
    content: `
      <p>The STAR method is a structured way to answer behavioral questions that demonstrate your skills and experience.</p>
      <h4 class="text-cyan-400 font-medium mt-4 mb-2">STAR method breakdown:</h4>
      <ul class="space-y-3">
        <li>
          <p class="font-semibold text-white">Situation</p>
          <p class="text-slate-300">Set the scene and provide context for the story. Briefly describe the situation and your role.</p>
          <p class="text-slate-400 text-sm mt-1 italic">Example: "In my previous role as Project Manager at ABC Company, we faced a critical deadline for our main client's product launch."</p>
        </li>
        <li>
          <p class="font-semibold text-white">Task</p>
          <p class="text-slate-300">Explain the task or challenge you faced. What was required of you?</p>
          <p class="text-slate-400 text-sm mt-1 italic">Example: "I was responsible for coordinating three development teams across different time zones to ensure all features were completed on time."</p>
        </li>
        <li>
          <p class="font-semibold text-white">Action</p>
          <p class="text-slate-300">Describe what actions you took to address the situation. Focus on YOUR specific contributions.</p>
          <p class="text-slate-400 text-sm mt-1 italic">Example: "I implemented a 24-hour workflow system with clear handoff procedures and daily progress reports. I also created a risk management plan that identified potential bottlenecks."</p>
        </li>
        <li>
          <p class="font-semibold text-white">Result</p>
          <p class="text-slate-300">Share the outcomes of your actions. Quantify results whenever possible.</p>
          <p class="text-slate-400 text-sm mt-1 italic">Example: "As a result, we delivered the project two days ahead of schedule with all required features. The client was so impressed they increased their contract value by 20% the following quarter."</p>
        </li>
      </ul>
      <p class="mt-4">Practice applying the STAR method to different scenarios from your experience so you can quickly adapt it to unexpected questions.</p>
    `
  },
  {
    id: 9,
    category: "questions",
    title: "Handle difficult questions with confidence",
    content: `
      <p>Challenging questions like "What's your greatest weakness?" or explaining employment gaps require careful handling.</p>
      <h4 class="text-cyan-400 font-medium mt-4 mb-2">Strategies for difficult questions:</h4>
      <ul class="space-y-2">
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>Don't rush</strong> - Take a moment to gather your thoughts before answering</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>For weakness questions</strong> - Mention a genuine weakness that isn't critical to the role, then explain how you're actively improving</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>With employment gaps</strong> - Be honest but focus on what you learned or accomplished during that time</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>When asked about failures</strong> - Choose a genuine example but emphasize the lessons learned and how you've grown</span>
        </li>
        <li class="flex gap-2">
          <span class="text-cyan-400 font-bold">•</span>
          <span><strong>If asked about salary expectations</strong> - Research market rates beforehand and provide a range rather than a specific figure</span>
        </li>
      </ul>
      <p class="mt-4">If you're asked an illegal or inappropriate question, politely redirect the conversation back to your qualifications for the role.</p>
    `
  }
];

export default function InterviewTipsPage() {
  const [activeCategory, setActiveCategory] = useState("preparation");
  const [expandedTip, setExpandedTip] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tips based on category and search query
  const filteredTips = interviewTips.filter((tip) => {
    const matchesCategory = activeCategory === tip.category;
    const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tip.content.toLowerCase().includes(searchQuery.toLowerCase());
    return (matchesCategory || searchQuery) && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-20 pt-32">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900/40 to-slate-800/20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4 font-display"
            >
              Interview Tips & Strategies
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-300 mb-8"
            >
              Expert advice to help you prepare, perform, and follow up effectively
            </motion.p>
            
            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative max-w-xl mx-auto"
            >
              <Search className="absolute left-3 top-3 text-slate-400" size={18} />
              <Input 
                type="text"
                placeholder="Search tips..."
                className="pl-10 py-6 bg-white/5 border-white/10 text-white placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* If there's a search query, show all results without tabs */}
        {searchQuery ? (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">Search Results</h2>
            <p className="text-slate-400">Found {filteredTips.length} tips matching "{searchQuery}"</p>
          </div>
        ) : (
          /* Category Tabs */
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full mb-8">
            <TabsList className="grid grid-cols-4 max-w-2xl mx-auto">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                  {category.icon}
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}

        {/* Tips List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredTips.length > 0 ? (
            filteredTips.map((tip) => (
              <div 
                key={tip.id}
                className="bg-white/3 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
                  className="w-full text-left px-6 py-5 flex justify-between items-start gap-4"
                >
                  <div className="flex-1">
                    {!searchQuery && (
                      <span className="text-xs uppercase tracking-wider text-cyan-400 font-medium">
                        {categories.find(c => c.id === tip.category)?.name}
                      </span>
                    )}
                    <h3 className="mt-1 text-lg font-medium text-white">{tip.title}</h3>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`text-slate-400 mt-1 transition-transform ${expandedTip === tip.id ? "rotate-180" : ""}`} 
                  />
                </button>
                
                {expandedTip === tip.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div 
                      className="px-6 py-5 border-t border-white/10 text-slate-300 bg-white/5"
                      dangerouslySetInnerHTML={{ __html: tip.content }}
                    />
                  </motion.div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-slate-500 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No matching tips found</h3>
              <p className="text-slate-400">Try adjusting your search criteria</p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-2xl border border-cyan-500/20 p-8 text-center"
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to put these tips into practice?</h2>
            <p className="text-slate-300 mb-6">
              Knowledge is valuable, but practice makes perfect. Apply these tips in a simulated interview environment.
            </p>
            <Button asChild className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 h-auto text-lg">
              <Link href="/templates">
                Start a Mock Interview
                <CheckCircle className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}