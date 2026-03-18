"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Search, BookOpen, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

// Question categories with icons
const categories = [
  { id: "all", name: "All Questions" },
  { id: "behavioral", name: "Behavioral Questions" },
  { id: "technical", name: "Technical Questions" },
  { id: "situational", name: "Situational Questions" },
  { id: "leadership", name: "Leadership Questions" },
  { id: "cultural", name: "Cultural Fit Questions" },
];

// Common interview questions organized by category
const commonQuestions = [
  {
    id: 1,
    category: "behavioral",
    question: "Tell me about yourself",
    answer: `
      <p>This question is typically asked at the beginning of interviews to break the ice and set the stage for the conversation.</p>
      <p class="mt-2"><strong>How to answer:</strong> Structure your response using the Present-Past-Future formula:</p>
      <ul class="mt-2 space-y-1">
        <li>• <strong>Present:</strong> Start with your current role and responsibilities</li>
        <li>• <strong>Past:</strong> Briefly explain your background and relevant experiences</li>
        <li>• <strong>Future:</strong> Describe your career goals and why you're interested in this position</li>
      </ul>
      <p class="mt-2">Keep your answer concise (1-2 minutes) and focused on professional attributes relevant to the role you're applying for.</p>
    `
  },
  {
    id: 2,
    category: "behavioral",
    question: "What is your greatest weakness?",
    answer: `
      <p>This question assesses your self-awareness and honesty.</p>
      <p class="mt-2"><strong>How to answer:</strong> Use these strategies:</p>
      <ul class="mt-2 space-y-1">
        <li>• Mention a genuine but not critical weakness</li>
        <li>• Explain how you're actively working to improve it</li>
        <li>• Share concrete steps you've taken and progress you've made</li>
      </ul>
      <p class="mt-2">Example: "I sometimes focus too much on details. I've been working on this by setting time limits for tasks and focusing on the bigger picture. Recently, I implemented a personal prioritization system that has helped me balance attention to detail with overall productivity."</p>
    `
  },
  {
    id: 3,
    category: "behavioral",
    question: "Describe a challenging situation you faced at work and how you handled it",
    answer: `
      <p>This question evaluates your problem-solving abilities and how you respond to workplace challenges.</p>
      <p class="mt-2"><strong>How to answer:</strong> Use the STAR method:</p>
      <ul class="mt-2 space-y-1">
        <li>• <strong>Situation:</strong> Briefly describe the context</li>
        <li>• <strong>Task:</strong> Explain your responsibility in that situation</li>
        <li>• <strong>Action:</strong> Detail the specific actions you took</li>
        <li>• <strong>Result:</strong> Share the outcomes and what you learned</li>
      </ul>
      <p class="mt-2">Choose a situation that demonstrates valuable skills like leadership, communication, or adaptability. Be sure to quantify the results when possible.</p>
    `
  },
  {
    id: 4,
    category: "technical",
    question: "What development tools and environments are you familiar with?",
    answer: `
      <p>This question assesses your technical proficiency and experience with industry tools.</p>
      <p class="mt-2"><strong>How to answer:</strong></p>
      <ul class="mt-2 space-y-1">
        <li>• List the IDEs, version control systems, and development tools you've used</li>
        <li>• Highlight your preferred tools and why you prefer them</li>
        <li>• Mention your experience with specific environments (local, cloud, containerized)</li>
        <li>• Discuss your adaptability to learning new tools</li>
      </ul>
      <p class="mt-2">Be honest about your proficiency levels and emphasize your willingness to learn new technologies.</p>
    `
  },
  {
    id: 5,
    category: "technical",
    question: "Explain how you optimize application performance",
    answer: `
      <p>This question evaluates your technical depth and approach to building efficient applications.</p>
      <p class="mt-2"><strong>How to answer:</strong> Structure your response around:</p>
      <ul class="mt-2 space-y-1">
        <li>• Front-end optimizations (code splitting, lazy loading, caching)</li>
        <li>• Back-end optimizations (database indexing, query optimization, caching)</li>
        <li>• Infrastructure (load balancing, CDNs, appropriate scaling)</li>
        <li>• Your process for identifying performance bottlenecks</li>
      </ul>
      <p class="mt-2">Include specific examples from your experience where you improved an application's performance and the measurable results achieved.</p>
    `
  },
  {
    id: 6,
    category: "situational",
    question: "How would you handle a disagreement with a team member about a technical approach?",
    answer: `
      <p>This question examines your conflict resolution skills and team collaboration abilities.</p>
      <p class="mt-2"><strong>How to answer:</strong></p>
      <ul class="mt-2 space-y-1">
        <li>• Express your commitment to open communication and mutual respect</li>
        <li>• Explain how you would seek to understand their perspective</li>
        <li>• Describe how you would propose evaluating both approaches objectively</li>
        <li>• Emphasize focusing on the team's and project's overall goals</li>
      </ul>
      <p class="mt-2">If possible, include a brief example of how you successfully resolved a similar situation in the past.</p>
    `
  },
  {
    id: 7,
    category: "leadership",
    question: "How do you motivate team members who are struggling?",
    answer: `
      <p>This question evaluates your leadership style and ability to support team members.</p>
      <p class="mt-2"><strong>How to answer:</strong></p>
      <ul class="mt-2 space-y-1">
        <li>• Emphasize the importance of understanding root causes</li>
        <li>• Discuss your approach to providing constructive feedback</li>
        <li>• Explain how you create opportunities for growth and development</li>
        <li>• Share your methods for recognizing improvement and celebrating wins</li>
      </ul>
      <p class="mt-2">Use a specific example that demonstrates how you've helped a team member overcome challenges and improve their performance.</p>
    `
  },
  {
    id: 8,
    category: "cultural",
    question: "What type of work environment do you thrive in?",
    answer: `
      <p>This question helps determine if you'll be a good cultural fit for the organization.</p>
      <p class="mt-2"><strong>How to answer:</strong></p>
      <ul class="mt-2 space-y-1">
        <li>• Research the company culture beforehand</li>
        <li>• Be honest about your preferences while highlighting adaptability</li>
        <li>• Connect your preferred environment to increased productivity</li>
        <li>• Mention specific aspects that align with the company's known culture</li>
      </ul>
      <p class="mt-2">For example: "I thrive in collaborative environments that also value independent work. I appreciate teams that communicate openly and provide regular feedback, while still trusting team members to manage their responsibilities."</p>
    `
  },
];

export default function CommonQuestionsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter questions based on category and search query
  const filteredQuestions = commonQuestions.filter((q) => {
    const matchesCategory = activeCategory === "all" || q.category === activeCategory;
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-20 pt-32">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900/40 to-slate-800/20 ">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4 font-display"
            >
              Common Interview Questions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-300 mb-8"
            >
              Master your responses to the questions interviewers ask most frequently
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
                placeholder="Search questions..."
                className="pl-10 py-6 bg-white/5 border-white/10 text-white placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Categories Filter */}
        <div className="mb-10 overflow-x-auto">
          <div className="flex space-x-2 min-w-max pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={`
                  ${activeCategory === category.id 
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-none" 
                    : "border-white/10 text-slate-300 hover:text-white hover:bg-white/5"
                  }
                `}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((item) => (
              <div 
                key={item.id}
                className="bg-white/3 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedQuestion(expandedQuestion === item.id ? null : item.id)}
                  className="w-full text-left px-6 py-5 flex justify-between items-start gap-4"
                >
                  <div className="flex-1">
                    <span className="text-xs uppercase tracking-wider text-cyan-400 font-medium">
                      {categories.find(c => c.id === item.category)?.name}
                    </span>
                    <h3 className="mt-1 text-lg font-medium text-white">{item.question}</h3>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`text-slate-400 mt-1 transition-transform ${expandedQuestion === item.id ? "rotate-180" : ""}`} 
                  />
                </button>
                
                {expandedQuestion === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div 
                      className="px-6 py-5 border-t border-white/10 text-slate-300 bg-white/5"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </motion.div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-slate-500 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No matching questions found</h3>
              <p className="text-slate-400">Try adjusting your search or filter criteria</p>
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
            <h2 className="text-2xl font-bold text-white mb-4">Ready to practice your answers?</h2>
            <p className="text-slate-300 mb-6">
              Knowing the questions is only the first step. Practice answering them in a simulated interview environment to truly prepare.
            </p>
            <Button asChild className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-5 py-3 h-auto text-lg">
              <Link href="/templates">
                Practice with Mock Interviews
                <CheckCircle className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}