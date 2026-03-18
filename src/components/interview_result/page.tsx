"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Star,
  BarChart2,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Info,
  MessageSquare,
  Clock,
  Loader2
} from "lucide-react";
import Link from "next/link";

interface Question {
  id: number;
  text: string;
  expectedDuration: number;
  tips: string;
}

interface Category {
  name: string;
  score: number;
}

interface Answer {
  duration: number;
  transcript: string;
}

interface InterviewResultProps {
  results: {
    overallScore: number;
    categories: Category[];
    strengths: string[];
    improvements: string[];
    questionAnalysis?: {
      id: number;
      score: number;
      strengths: string[];
      improvements: string[];
      timeAssessment?: string;
      keyPoints?: string[];
    }[];
  } | null;
  questions: Question[];
  answers: Record<number, Answer>;
  formatTime?: (seconds: number) => string;
  isProcessing?: boolean;
}

export default function InterviewResult({
  results,
  questions,
  answers,
  formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  },
  isProcessing = false
}: InterviewResultProps) {
  const [activeTab, setActiveTab] = useState("summary");

  // Get letter grade based on score
  const getLetterGrade = (score: number): string => {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
  };

  // If processing, show the processing UI
  if (isProcessing || !results) {
    return (
      <motion.div
        key="processing"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-xl text-center"
      >
        <Loader2 className="animate-spin text-cyan-400 mx-auto mb-4" size={48} />
        <h2 className="font-display text-2xl font-medium text-white mb-2">
          Processing Your Answers
        </h2>
        <p className="text-slate-300">
          Please wait while we analyze your responses...
        </p>
        
        {/* Debug info while processing */}
        <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10 text-left">
          <h3 className="text-sm font-medium text-cyan-400 mb-2">Debug Info:</h3>
          <div className="text-xs text-slate-400 space-y-1">
            <p>Questions: {questions.length}</p>
            <p>Answers recorded: {Object.keys(answers).length}</p>
            {Object.entries(answers).map(([qId, answer]) => (
              <p key={qId}>Q{qId}: {answer.transcript ? 'Has transcript' : 'No transcript'} ({formatTime(answer.duration)})</p>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  // Regular result UI below
  return (
    <div className="space-y-8">
      <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-xl text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 mb-6">
          <CheckCircle size={40} className="text-emerald-500" />
        </div>

        <h1 className="font-display text-3xl font-bold text-white mb-2">
          Interview Completed!
        </h1>
        <p className="text-slate-300 mb-6 max-w-lg mx-auto">
          You've completed all the questions for your mock interview.
          Here's your detailed performance analysis.
        </p>
      </div>

      <Tabs defaultValue="summary" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 m-auto mb-10 mt-8">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="questions">Question Review</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        {/* Summary Tab */}
        <TabsContent value="summary" className="space-y-8">
          {/* Overall Score */}
          <div className="flex items-center gap-6 p-6 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-xl border border-white/10 shadow-md">
            <div className="relative">
              <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border-4 border-white/10">
                <span className="text-3xl font-bold font-mono text-white">{results.overallScore}</span>
              </div>
              <div className="absolute -right-2 -top-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {getLetterGrade(results.overallScore)}
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-medium text-white mb-1">Overall Performance</h2>
              <p className="text-slate-300 text-sm">
                {results.overallScore >= 85
                  ? "Outstanding performance! You're well prepared for real interviews."
                  : results.overallScore >= 70
                    ? "Solid performance! With some refinement, you'll be interview-ready."
                    : "There's room for improvement. Focus on the areas highlighted below."}
              </p>
            </div>
          </div>

          {/* Category Scores */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-xl"
          >
            <h2 className="text-xl font-medium text-white mb-6 flex items-center gap-2">
              <BarChart2 size={20} className="text-cyan-400" />
              Performance by Category
            </h2>

            <div className="space-y-5">
              {Array.isArray(results.categories) && results.categories.length > 0 ? (
                results.categories.map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-300">{category.name}</span>
                      <span className="font-mono text-white">{category.score}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-600"
                        style={{ width: `${category.score}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-slate-400 py-4 text-center">
                  Category analysis not available
                </div>
              )}
            </div>
          </motion.div>

          {/* Strengths and Improvements */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-xl"
            >
              <h2 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
                <Star size={18} className="text-amber-400 fill-amber-400" />
                Strengths
              </h2>

              {Array.isArray(results.strengths) && results.strengths.length > 0 ? (
                <ul className="space-y-3">
                  {results.strengths.map((strength, index) => (
                    <li key={index} className="flex gap-2 items-start">
                      <CheckCircle size={15} className="text-emerald-500 mt-1 shrink-0" />
                      <span className="text-slate-300 text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-400">No strengths analysis available</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-xl"
            >
              <h2 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
                <ArrowRight size={18} className="text-cyan-400" />
                Areas for Improvement
              </h2>

              {Array.isArray(results.improvements) && results.improvements.length > 0 ? (
                <ul className="space-y-3">
                  {results.improvements.map((improvement, index) => (
                    <li key={index} className="flex gap-2 items-start">
                      <Info size={15} className="text-cyan-400 mt-1 shrink-0" />
                      <span className="text-slate-300 text-sm">{improvement}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-400">No improvement suggestions available</p>
              )}
            </motion.div>
          </div>
        </TabsContent>

        {/* Questions Tab - Enhanced with better transcript display */}
        <TabsContent value="questions" className="space-y-6">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 shadow-md overflow-hidden">
            <Accordion type="single" collapsible className="w-full divide-y divide-white/10">
              {questions.map((question, index) => {
                const answer = answers[question.id];
                if (!answer) {
                  return (
                    <AccordionItem key={question.id} value={`q-${question.id}`}>
                      <AccordionTrigger className="px-6 py-4 hover:bg-white/5">
                        <div className="flex items-center justify-between w-full pr-4">
                          <div className="text-left">
                            <span className="text-sm text-cyan-400 block mb-1">Question {index + 1}</span>
                            <span className="text-white line-clamp-1">{question.text}</span>
                          </div>
                          <div className="px-3 py-1 rounded-full text-sm bg-gray-900/30 text-gray-400">
                            No Answer
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 py-4 bg-black/20">
                        <div className="text-slate-400 text-center py-4">
                          No answer was recorded for this question.
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                }

                // Get the AI analysis for this specific question
                const questionAnalysis = results.questionAnalysis?.find(q => q.id === question.id);

                return (
                  <AccordionItem key={question.id} value={`q-${question.id}`}>
                    <AccordionTrigger className="px-6 py-4 hover:bg-white/5">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="text-left">
                          <span className="text-sm text-cyan-400 block mb-1">Question {index + 1}</span>
                          <span className="text-white line-clamp-1">{question.text}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm ${questionAnalysis?.score ?
                            (questionAnalysis.score >= 85 ? "bg-green-900/30 text-green-400" :
                              questionAnalysis.score >= 70 ? "bg-yellow-900/30 text-yellow-400" :
                                "bg-red-900/30 text-red-400") :
                            "bg-gray-900/30 text-gray-400"
                          }`}>
                          {questionAnalysis?.score ? `${questionAnalysis.score}%` : "N/A"}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 bg-black/20">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
                            <Clock size={16} className="text-slate-400" />
                            Response Time Analysis
                          </h4>
                          <div className="bg-white/5 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-slate-300">Duration</span>
                              <span className="text-sm font-mono text-white">
                                {formatTime(answer.duration)} / {formatTime(question.expectedDuration)}
                              </span>
                            </div>
                            <div className="bg-white/10 rounded-full h-2 mb-2">
                              <div
                                className={`h-full rounded-full ${
                                  answer.duration <= question.expectedDuration 
                                    ? 'bg-green-500' 
                                    : answer.duration <= question.expectedDuration * 1.2 
                                    ? 'bg-yellow-500' 
                                    : 'bg-red-500'
                                }`}
                                style={{
                                  width: `${Math.min(100, (answer.duration / question.expectedDuration) * 100)}%`
                                }}
                              />
                            </div>
                            <div className="text-xs text-slate-400">
                              {questionAnalysis?.timeAssessment || 
                                (answer.duration <= question.expectedDuration 
                                  ? "Good timing - response within expected duration"
                                  : answer.duration <= question.expectedDuration * 1.2
                                  ? "Slightly over expected time but acceptable"
                                  : "Response exceeded recommended duration"
                                )
                              }
                            </div>
                          </div>
                        </div>

                        {/* Your Response Section - Enhanced */}
                        <div>
                          <h4 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
                            <MessageSquare size={16} className="text-slate-400" />
                            Your Response
                          </h4>
                          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            {answer.transcript && answer.transcript.trim() && answer.transcript !== "No transcript available - please check your microphone settings." ? (
                              <div className="text-slate-200 text-sm leading-relaxed">
                                {answer.transcript}
                              </div>
                            ) : (
                              <div className="text-slate-400 text-sm italic">
                                No transcript available. This may be due to microphone issues or unclear audio.
                              </div>
                            )}
                            <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center text-xs text-slate-500">
                              <span>Duration: {formatTime(answer.duration)}</span>
                              <span>
                                {answer.transcript && answer.transcript.length > 0 
                                  ? `${answer.transcript.split(' ').length} words`
                                  : 'No words detected'
                                }
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* AI Analysis Section */}
                        <div>
                          <h4 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
                            <Info size={16} className="text-cyan-400" />
                            AI Analysis & Feedback
                          </h4>

                          {questionAnalysis ? (
                            <div className="space-y-4">
                              {/* Strengths */}
                              {questionAnalysis.strengths && questionAnalysis.strengths.length > 0 && (
                                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                                  <h5 className="text-sm font-medium text-green-400 mb-2 flex items-center gap-1">
                                    <CheckCircle size={14} />
                                    What You Did Well
                                  </h5>
                                  <ul className="space-y-1">
                                    {questionAnalysis.strengths.map((strength, i) => (
                                      <li key={i} className="text-sm text-green-200 flex gap-2">
                                        <span className="text-green-400">•</span>
                                        {strength}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Improvements */}
                              {questionAnalysis.improvements && questionAnalysis.improvements.length > 0 && (
                                <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
                                  <h5 className="text-sm font-medium text-amber-400 mb-2 flex items-center gap-1">
                                    <AlertCircle size={14} />
                                    Areas for Improvement
                                  </h5>
                                  <ul className="space-y-1">
                                    {questionAnalysis.improvements.map((improvement, i) => (
                                      <li key={i} className="text-sm text-amber-200 flex gap-2">
                                        <span className="text-amber-400">•</span>
                                        {improvement}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Key Points */}
                              {questionAnalysis.keyPoints && questionAnalysis.keyPoints.length > 0 && (
                                <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
                                  <h5 className="text-sm font-medium text-cyan-400 mb-2 flex items-center gap-1">
                                    <Info size={14} />
                                    Key Observations
                                  </h5>
                                  <ul className="space-y-1">
                                    {questionAnalysis.keyPoints.map((point, i) => (
                                      <li key={i} className="text-sm text-cyan-200 flex gap-2">
                                        <span className="text-cyan-400">•</span>
                                        {point}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="bg-white/5 rounded-lg p-4 text-sm text-slate-400">
                              AI analysis not available for this question. This may occur if the response was unclear or too brief.
                            </div>
                          )}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback" className="space-y-6">
          <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-xl">
            <h2 className="text-xl font-medium text-white mb-4">Overall Assessment</h2>
            <p className="text-slate-300 mb-4">
              {results.overallScore >= 85
                ? "You've demonstrated strong interview skills across multiple areas. Your responses were well-structured and showed clear thinking. You're ready to confidently approach real interviews in your field."
                : results.overallScore >= 70
                  ? "You've shown good interview skills with solid foundational knowledge. Focus on providing more specific examples and improving your response structure to elevate your performance."
                  : "This interview revealed areas where you can significantly improve. Focus on preparing specific examples from your experience and practice articulating your thoughts more clearly."
              }
            </p>

            <h3 className="text-lg font-medium text-white mb-3 mt-6">Recommended Next Steps</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 items-start">
                <ArrowRight size={16} className="text-cyan-400 mt-1 shrink-0" />
                <div>
                  <span className="text-slate-300 text-sm block">
                    <strong className="text-white">Review your responses:</strong> Look at the question-wise feedback and identify patterns in areas needing improvement.
                  </span>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <ArrowRight size={16} className="text-cyan-400 mt-1 shrink-0" />
                <div>
                  <span className="text-slate-300 text-sm block">
                    <strong className="text-white">Practice with examples:</strong> Prepare specific stories using the STAR method (Situation, Task, Action, Result) for common interview questions.
                  </span>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <ArrowRight size={16} className="text-cyan-400 mt-1 shrink-0" />
                <div>
                  <span className="text-slate-300 text-sm block">
                    <strong className="text-white">Take another mock interview:</strong> Practice with different question types or more challenging scenarios to build confidence.
                  </span>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <ArrowRight size={16} className="text-cyan-400 mt-1 shrink-0" />
                <div>
                  <span className="text-slate-300 text-sm block">
                    <strong className="text-white">Work on timing:</strong> Practice answering questions within the expected timeframes while still providing comprehensive responses.
                  </span>
                </div>
              </li>
            </ul>

            {/* Interview Statistics */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">{questions.length}</div>
                <div className="text-xs text-slate-400">Questions</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">
                  {Object.values(answers).reduce((total, answer) => total + answer.duration, 0) > 0 
                    ? formatTime(Object.values(answers).reduce((total, answer) => total + answer.duration, 0))
                    : '0:00'
                  }
                </div>
                <div className="text-xs text-slate-400">Total Time</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">
                  {Math.round(Object.values(answers).reduce((total, answer) => total + answer.duration, 0) / questions.length) > 0
                    ? formatTime(Math.round(Object.values(answers).reduce((total, answer) => total + answer.duration, 0) / questions.length))
                    : '0:00'
                  }
                </div>
                <div className="text-xs text-slate-400">Avg Response</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">
                  {Object.values(answers).filter(answer => answer.transcript && answer.transcript.trim().length > 0).length}
                </div>
                <div className="text-xs text-slate-400">Transcribed</div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
      >
        <Button
          className="bg-white/10 hover:bg-white/20 text-white"
          asChild
        >
          <Link href="/myinterviews">Return to Dashboard</Link>
        </Button>
        <Button
          className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
          asChild
        >
          <Link href="/new-interview">
            Try Another Interview
            <ArrowRight size={18} />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}