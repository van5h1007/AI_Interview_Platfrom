"use client";

import { motion } from "framer-motion";
import { Glow, GlowArea } from "@/components/glow";
import {
  MicVocal,
  BrainCircuit,
  BarChart3,
  FileText,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Star,
  Zap,
  Users,
  MessageCircle,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen pb-20 pt-32 overflow-hidden">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-900/20 to-slate-900/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-display">
                Everything You Need to{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  Ace Your Interview
                </span>
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                MockMaster leverages cutting-edge AI technology to provide the most comprehensive interview preparation platform available.
              </p>
            </motion.div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild className="px-6 py-6 h-auto text-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                <Link href="/templates">
                  Start Practicing Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="px-6 py-6 h-auto text-lg border-white/10 hover:bg-white/5">
                <Link href="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Features Section */}
      <div className="container mx-auto px-4 py-20">
        <Tabs defaultValue="interview" className="w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 text-white">Explore Our Features</h2>
            <TabsList className="inline-flex h-11 items-center justify-center rounded-lg bg-slate-800/50 p-1 text-slate-300">
              <TabsTrigger value="interview" className="rounded-md px-6 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-700 data-[state=active]:text-white transition-all">
                Interview Simulation
              </TabsTrigger>
              <TabsTrigger value="feedback" className="rounded-md px-6 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-700 data-[state=active]:text-white transition-all">
                Feedback & Analysis
              </TabsTrigger>
              <TabsTrigger value="preparation" className="rounded-md px-6 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-700 data-[state=active]:text-white transition-all">
                Preparation Tools
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="interview" className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="inline-block p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl">
                  <BrainCircuit size={34} className="text-cyan-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">AI-Generated Interview Questions</h3>
                <p className="text-lg text-slate-300">
                  Our advanced AI analyzes thousands of real interview questions to generate relevant, challenging questions tailored specifically to:
                </p>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <div className="bg-cyan-500/20 rounded-full p-1 mt-1">
                      <CheckCircle2 size={16} className="text-cyan-400" />
                    </div>
                    <span>Your target job role and seniority level</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-cyan-500/20 rounded-full p-1 mt-1">
                      <CheckCircle2 size={16} className="text-cyan-400" />
                    </div>
                    <span>Specific companies and industries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-cyan-500/20 rounded-full p-1 mt-1">
                      <CheckCircle2 size={16} className="text-cyan-400" />
                    </div>
                    <span>Technical skills and knowledge areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-cyan-500/20 rounded-full p-1 mt-1">
                      <CheckCircle2 size={16} className="text-cyan-400" />
                    </div>
                    <span>Behavioral and situational scenarios</span>
                  </li>
                </ul>
              </motion.div>
              <div className="relative">
                <Glow color="blue"  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-6 md:p-8"
                >
                  <div className="mb-6 border-b border-white/10 pb-4">
                    <h4 className="flex items-center gap-2 text-lg font-medium text-white mb-1">
                      <Star size={18} className="text-amber-400" />
                      Senior Frontend Developer Interview
                    </h4>
                    <p className="text-slate-400 text-sm">Question 3 of 10</p>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 mb-6">
                    <p className="text-white text-lg">
                      Can you explain how you've optimized the performance of a React application in the past? What metrics did you focus on and what improvements did you achieve?
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>Expected response: 3-5 minutes</span>
                    </div>
                    <span className="text-cyan-400 cursor-pointer hover:underline">Show tips</span>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 relative">
                <Glow color="purple"  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                >
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <h4 className="text-white text-sm font-mono">Recording in progress...</h4>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-white mb-4">
                      <MicVocal size={18} className="text-purple-400 animate-pulse" />
                      <span className="text-sm">Listening to your response</span>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 bg-gray-700/50 rounded-full w-full"></div>
                      <div className="h-2 bg-gray-700/50 rounded-full w-3/4"></div>
                      <div className="h-2 bg-gray-700/50 rounded-full w-4/5"></div>
                      <div className="h-2 bg-gray-700/50 rounded-full w-2/3"></div>
                      <div className="h-2 bg-purple-600/50 rounded-full w-1/2 animate-pulse"></div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/10 text-sm text-slate-400">
                      <p className="font-mono">
                        "...I focused on reducing unnecessary re-renders by implementing React.memo and using useMemo and useCallback hooks strategically. This led to a 35% improvement in our application's load time..."
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6 order-1 md:order-2"
              >
                <div className="inline-block p-3 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl">
                  <MicVocal size={34} className="text-purple-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">Live Voice Recording & Transcription</h3>
                <p className="text-lg text-slate-300">
                  Practice answering interview questions out loud, just like you would in a real interview. Our platform:
                </p>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <div className="bg-purple-500/20 rounded-full p-1 mt-1">
                      <CheckCircle2 size={16} className="text-purple-400" />
                    </div>
                    <span>Records your spoken responses with high-quality audio capture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-purple-500/20 rounded-full p-1 mt-1">
                      <CheckCircle2 size={16} className="text-purple-400" />
                    </div>
                    <span>Transcribes your answers in real-time with advanced speech recognition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-purple-500/20 rounded-full p-1 mt-1">
                      <CheckCircle2 size={16} className="text-purple-400" />
                    </div>
                    <span>Provides a complete transcript for review after your practice session</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-purple-500/20 rounded-full p-1 mt-1">
                      <CheckCircle2 size={16} className="text-purple-400" />
                    </div>
                    <span>Securely processes all audio data with enterprise-grade privacy protections</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="inline-block p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl">
                  <BarChart3 size={34} className="text-cyan-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">Comprehensive Performance Analytics</h3>
                <p className="text-lg text-slate-300">
                  Get detailed insights into your interview performance with multi-dimensional scoring across key areas:
                </p>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <div className="bg-cyan-500/20 rounded-full p-1 mt-1">
                      <CheckCircle2 size={16} className="text-cyan-400" />
                    </div>
                    <span>Response content quality and relevance to the question</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-cyan-500/20 rounded-full p-1 mt-1">
                      <CheckCircle2 size={16} className="text-cyan-400" />
                    </div>
                    <span>Communication clarity, structure, and delivery effectiveness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-cyan-500/20 rounded-full p-1 mt-1">
                      <CheckCircle2 size={16} className="text-cyan-400" />
                    </div>
                    <span>Technical accuracy and depth of knowledge demonstration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-cyan-500/20 rounded-full p-1 mt-1">
                      <CheckCircle2 size={16} className="text-cyan-400" />
                    </div>
                    <span>Progress tracking across multiple practice sessions</span>
                  </li>
                </ul>
              </motion.div>
              <div className="relative">
                <Glow color="blue"  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-6 md:p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-medium text-white">Performance Score</h4>
                    <div className="bg-gray-800/70 px-4 py-1 rounded-full">
                      <span className="text-2xl font-bold text-cyan-400">8.5</span>
                      <span className="text-gray-400 text-sm">/10</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-slate-300">Content Quality</span>
                        <span className="text-white font-medium">9.0</span>
                      </div>
                      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-slate-300">Communication</span>
                        <span className="text-white font-medium">8.2</span>
                      </div>
                      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" style={{ width: '82%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-slate-300">Technical Accuracy</span>
                        <span className="text-white font-medium">8.7</span>
                      </div>
                      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-slate-300">Response Structure</span>
                        <span className="text-white font-medium">7.8</span>
                      </div>
                      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 relative">
                <Glow color="amber"  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-6 md:p-8"
                >
                  <h4 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
                    <MessageCircle size={18} className="text-amber-400" />
                    Feedback & Recommendations
                  </h4>
                  
                  <div className="space-y-5">
                    <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-4">
                      <h5 className="text-green-400 font-medium mb-2 flex items-start gap-2">
                        <Star size={16} className="mt-0.5" />
                        Strengths
                      </h5>
                      <ul className="space-y-2 text-sm text-slate-300">
                        <li className="flex gap-2">
                          <CheckCircle2 size={14} className="text-green-400 shrink-0 mt-1" />
                          <span>Excellent explanation of React performance optimization techniques</span>
                        </li>
                        <li className="flex gap-2">
                          <CheckCircle2 size={14} className="text-green-400 shrink-0 mt-1" />
                          <span>Strong quantifiable results (35% improvement in load time)</span>
                        </li>
                        <li className="flex gap-2">
                          <CheckCircle2 size={14} className="text-green-400 shrink-0 mt-1" />
                          <span>Clear technical knowledge of React hooks and optimization patterns</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-amber-900/20 border border-amber-800/30 rounded-lg p-4">
                      <h5 className="text-amber-400 font-medium mb-2 flex items-start gap-2">
                        <Zap size={16} className="mt-0.5" />
                        Areas for Improvement
                      </h5>
                      <ul className="space-y-2 text-sm text-slate-300">
                        <li className="flex gap-2">
                          <ArrowRight size={14} className="text-amber-400 shrink-0 mt-1" />
                          <span>Consider mentioning testing methodology for performance improvements</span>
                        </li>
                        <li className="flex gap-2">
                          <ArrowRight size={14} className="text-amber-400 shrink-0 mt-1" />
                          <span>Include browser-specific optimizations in your response</span>
                        </li>
                        <li className="flex gap-2">
                          <ArrowRight size={14} className="text-amber-400 shrink-0 mt-1" />
                          <span>Expand on team collaboration aspects of performance optimization</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6 order-1 md:order-2"
              >
                <div className="inline-block p-3 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl">
                  <Sparkles size={34} className="text-amber-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">Personalized AI Feedback</h3>
                <p className="text-lg text-slate-300">
                  Receive tailored, actionable feedback that helps you improve with each practice session:
                </p>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <div className="bg-amber-500/20 rounded-full p-1 mt-1">
                      <CheckCircle2 size={16} className="text-amber-400" />
                    </div>
                    <span>Detailed analysis of your strengths to leverage in real interviews</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-amber-500/20 rounded-full p-1 mt-1">
                      <CheckCircle2 size={16} className="text-amber-400" />
                    </div>
                    <span>Specific improvement suggestions tailored to your responses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-amber-500/20 rounded-full p-1 mt-1">
                      <CheckCircle2 size={16} className="text-amber-400" />
                    </div>
                    <span>Alternative answer approaches that might be more effective</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-amber-500/20 rounded-full p-1 mt-1">
                      <CheckCircle2 size={16} className="text-amber-400" />
                    </div>
                    <span>Industry-specific recommendations based on best practices</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="preparation" className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="inline-block p-3 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-2xl">
                  <FileText size={34} className="text-indigo-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">Comprehensive Interview Resources</h3>
                <p className="text-lg text-slate-300">
                  Access a wealth of curated resources to enhance your interview preparation:
                </p>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <div className="bg-indigo-500/20 rounded-full p-1 mt-1">
                      <CheckCircle2 size={16} className="text-indigo-400" />
                    </div>
                    <span>Library of common interview questions with expert-crafted answers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-indigo-500/20 rounded-full p-1 mt-1">
                      <CheckCircle2 size={16} className="text-indigo-400" />
                    </div>
                    <span>Industry-specific guides and question collections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-indigo-500/20 rounded-full p-1 mt-1">
                      <CheckCircle2 size={16} className="text-indigo-400" />
                    </div>
                    <span>Communication and body language best practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-indigo-500/20 rounded-full p-1 mt-1">
                      <CheckCircle2 size={16} className="text-indigo-400" />
                    </div>
                    <span>Interview strategies for different formats (panel, technical, behavioral)</span>
                  </li>
                </ul>
              </motion.div>
              <div className="relative">
                <Glow color="indigo"  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                >
                  <div className="border-b border-white/10">
                    <div className="flex text-sm">
                      <div className="px-4 py-3 font-medium border-b-2 border-indigo-500 text-white">Common Questions</div>
                      <div className="px-4 py-3 text-slate-400">Interview Tips</div>
                      <div className="px-4 py-3 text-slate-400">Resources</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-medium text-white mb-4">Technical Interview Questions</h4>
                    <div className="space-y-4">
                      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                        <h5 className="font-medium text-white mb-1">Explain the concept of closures in JavaScript.</h5>
                        <p className="text-sm text-slate-400 mb-2">Common frontend developer question</p>
                        <div className="flex justify-end">
                          <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/30 -mr-2">
                            View Answer
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                        <h5 className="font-medium text-white mb-1">How would you optimize database query performance?</h5>
                        <p className="text-sm text-slate-400 mb-2">Common backend developer question</p>
                        <div className="flex justify-end">
                          <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/30 -mr-2">
                            View Answer
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                        <h5 className="font-medium text-white mb-1">Describe a challenging project you've worked on.</h5>
                        <p className="text-sm text-slate-400 mb-2">Common behavioral question</p>
                        <div className="flex justify-end">
                          <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/30 -mr-2">
                            View Answer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 relative">
                <Glow color="emerald"  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-6 md:p-8"
                >
                  <h4 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
                    <Users size={18} className="text-emerald-400" />
                    Progress Tracking
                  </h4>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-300">Total Practice Sessions</span>
                        <span className="text-white font-medium">12</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-300">Questions Answered</span>
                        <span className="text-white font-medium">47</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-300">Practice Time</span>
                        <span className="text-white font-medium">8.5 hours</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-white/10">
                      <h5 className="text-white font-medium mb-3">Improvement Over Time</h5>
                      <div className="h-32 bg-slate-800/50 rounded-lg border border-slate-700/50 flex items-end p-4 gap-1">
                        <div className="h-[20%] w-6 bg-emerald-900/50 rounded-t-sm"></div>
                        <div className="h-[35%] w-6 bg-emerald-800/50 rounded-t-sm"></div>
                        <div className="h-[30%] w-6 bg-emerald-700/50 rounded-t-sm"></div>
                        <div className="h-[45%] w-6 bg-emerald-600/50 rounded-t-sm"></div>
                        <div className="h-[40%] w-6 bg-emerald-600/50 rounded-t-sm"></div>
                        <div className="h-[60%] w-6 bg-emerald-500/50 rounded-t-sm"></div>
												<div className="h-[75%] w-6 bg-emerald-400/50 rounded-t-sm"></div>
                        <div className="h-[65%] w-6 bg-emerald-400/50 rounded-t-sm"></div>
                        <div className="h-[90%] w-6 bg-emerald-300/60 rounded-t-sm"></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 mt-2">
                        <span>Week 1</span>
                        <span>Week 9</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6 order-1 md:order-2"
              >
                <div className="inline-block p-3 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl">
                  <Users size={34} className="text-emerald-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">Track Your Progress</h3>
                <p className="text-lg text-slate-300">
                  Monitor your interview preparation journey with comprehensive analytics and insights:
                </p>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <div className="bg-emerald-500/20 rounded-full p-1 mt-1">
                      <CheckCircle2 size={16} className="text-emerald-400" />
                    </div>
                    <span>Visualize performance improvements across multiple practice sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-emerald-500/20 rounded-full p-1 mt-1">
                      <CheckCircle2 size={16} className="text-emerald-400" />
                    </div>
                    <span>Identify specific strength areas and opportunities for improvement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-emerald-500/20 rounded-full p-1 mt-1">
                      <CheckCircle2 size={16} className="text-emerald-400" />
                    </div>
                    <span>Set goals and track your progress toward interview mastery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-emerald-500/20 rounded-full p-1 mt-1">
                      <CheckCircle2 size={16} className="text-emerald-400" />
                    </div>
                    <span>Generate reports to quantify your improvement over time</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-b from-blue-900/20 to-slate-900/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Transform</span> Your Interview Skills?
            </h2>
            <p className="text-xl text-slate-300 mb-10">
              Join thousands of successful job seekers who've improved their interview performance with MockMaster.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild className="px-8 py-6 h-auto text-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                <Link href="/templates">
                  Start Free Practice
                  <Sparkles className="ml-2 h-5 w-5 text-yellow-300" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="px-8 py-6 h-auto text-lg border-white/10 hover:bg-white/5">
                <Link href="/pricing">
                  View Plans
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}