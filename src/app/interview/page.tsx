"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Toaster, toast } from "sonner";
import { redirect, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react"

import {
  Briefcase,
  Mic,
  MicOff,
  Loader2,
  Clock,
  AlertCircle,
  ArrowRight,
  Info
} from "lucide-react";
import Link from "next/link";
import LiveTranscription from "@/components/live_transcript/page";
import InterviewResult from "@/components/interview_result/page";
import { getIntervewQuestions, analyzeAnswers, saveInterviewResults } from "./actions";

type Questions = {
  id: number;
  text: string;
  expectedDuration: number;
  tips: string;
};

// Interview states
type InterviewState = "intro" | "inProgress" | "processingAnswers" | "completed";

// Type guard to check if the result is an error
const isErrorResult = (result: Questions[] | { error: string }): result is { error: string } => {
  return 'error' in result;
};

// Create a separate component for the interview content
function InterviewContent() {
  // Get the query parameters
  const searchParams = useSearchParams();
  const { data: session } = useSession()

  if (!session?.user) {
    redirect('/login');
  }

  // Extract template info from query parameters
  const InterviewInfo = {
    title: searchParams.get("title") || "Mock Interview",
    position: searchParams.get("position") || "Not Specified",
    experience: searchParams.get("experience") || "Not Specified",
    Description: searchParams.get("description") || "No description provided for this interview.",
    company: searchParams.get("company") || "Not Specified" // Add company field
  };

  // State management
  const [QuestionsAvailable, setQuestionsAvailable] = useState(false);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [questionsError, setQuestionsError] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [state, setState] = useState<InterviewState>("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [answers, setAnswers] = useState<Record<number, { duration: number, transcript: string }>>({});
  const [processingAnswers, setProcessingAnswers] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");

  // References
  const audioTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      if (questions.length > 0) return;
      
      setQuestionsLoading(true);
      setQuestionsError(null);
      
      try {
        console.log("Loading questions for:", InterviewInfo);
        const fetchedQuestions = await getIntervewQuestions(InterviewInfo);

        // Use type guard to check if result is an error
        if (isErrorResult(fetchedQuestions)) {
          throw new Error(fetchedQuestions.error);
        }

        if (!Array.isArray(fetchedQuestions) || fetchedQuestions.length === 0) {
          throw new Error("No questions received from the API");
        }
        
        console.log("Questions loaded successfully:", fetchedQuestions);
        setQuestions(fetchedQuestions);
        setQuestionsAvailable(true);
        
        toast.success("Questions loaded successfully!", {
          description: `${fetchedQuestions.length} questions ready for your interview.`,
        });
      } catch (error) {
        console.error("Error loading questions:", error);
        setQuestionsError(error instanceof Error ? error.message : "Failed to load questions");
        
        toast.error("Failed to load questions", {
          description: "Please refresh the page and try again.",
        });
      } finally {
        setQuestionsLoading(false);
      }
    };

    loadQuestions();
  }, [InterviewInfo.title, InterviewInfo.position, InterviewInfo.experience, InterviewInfo.Description]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Timer for recording
  useEffect(() => {
    if (isRecording) {
      audioTimerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else if (audioTimerRef.current) {
      clearInterval(audioTimerRef.current);
    }

    return () => {
      if (audioTimerRef.current) {
        clearInterval(audioTimerRef.current);
      }
    };
  }, [isRecording]);

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Start recording
  const startRecording = async () => {
    try {
      // Just checking if microphone is available
      await navigator.mediaDevices.getUserMedia({ audio: true });

      setIsRecording(true);
      setCurrentTranscript("");

      toast.info("Recording started", {
        description: "Speak clearly and take your time with your answer.",
      });
    } catch (err) {
      console.error("Error requesting microphone permission:", err);
      setPermissionDenied(true);

      toast.error("Microphone access denied", {
        description: "Please allow microphone access to record your answers.",
      });
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (isRecording) {
      setIsRecording(false);

      // Ensure we have a transcript, use fallback if empty
      const finalTranscript = currentTranscript.trim() || "No transcript available - please check your microphone settings.";

      // Save answer with duration and transcript
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: {
          duration: recordingTime,
          transcript: finalTranscript
        }
      }));

      // Reset for next recording
      setRecordingTime(0);

      toast.success("Recording complete", {
        description: "Your answer has been saved.",
      });

      // Process the answer
      Moving_to_next_question();
    }
  };

  // Start the interview
  const startInterview = () => {
    setState("inProgress");
    toast.info("Interview started", {
      description: "Good luck! Answer each question thoughtfully.",
    });
  };

  const Moving_to_next_question = async () => {
    // If this was the last question, process all answers
    if (isLastQuestion) {
      setState("processingAnswers");
      toast.info("Processing Your Answers", {
        description: "Analyzing your responses... This may take a moment.",
      });

      try {
        console.log("Starting analysis with answers:", answers);
        
        // Call the analyzeAnswers function from actions.ts
        const analysisResults = await analyzeAnswers(answers, questions, InterviewInfo);
        console.log("Analysis results:", analysisResults);
        
        // Save the interview results - use user ID instead of email
        if (session?.user?.id) {
          const saveResult = await saveInterviewResults(
            session.user.id, // Use user.id instead of email
            InterviewInfo,
            questions,
            answers,
            analysisResults
          );
          
          if (saveResult.success) {
            console.log("Interview saved successfully with ID:", saveResult.interviewId);
            toast.success("Interview saved!", {
              description: "Your results have been saved to your profile.",
            });
          } else {
            console.warn("Failed to save interview:", saveResult.error);
            toast.warning("Analysis complete", {
              description: "Results ready, but couldn't save to profile.",
            });
          }
        } else {
          console.warn("No user ID available for saving interview");
          toast.warning("Analysis complete", {
            description: "Results ready, but couldn't save to profile.",
          });
        }

        setResults(analysisResults);
        setState("completed");
        
        toast.success("Interview completed!", {
          description: "Your detailed results are ready to view.",
        });
      } catch (error) {
        console.error("Error analyzing answers:", error);
        
        // Instead of failing, provide basic feedback
        const fallbackResults = {
          overallScore: 70,
          categories: [
            {"name": "Technical Knowledge", "score": 70},
            {"name": "Communication Skills", "score": 70},
            {"name": "Problem Solving", "score": 70},
            {"name": "Role Relevance", "score": 70},
            {"name": "Overall Impression", "score": 70}
          ],
          strengths: [
            "Completed all interview questions",
            "Demonstrated commitment to the process",
            "Provided responses within reasonable time frames"
          ],
          improvements: [
            "Detailed analysis unavailable due to technical issues",
            "Consider retaking the interview for comprehensive feedback",
            "Ensure clear speech for better transcription accuracy"
          ],
          questionAnalysis: questions.map(q => ({
            id: q.id,
            score: 70,
            strengths: ["Response provided", "Engaged with the question"],
            improvements: ["Analysis temporarily unavailable", "Try again for detailed feedback"],
            timeAssessment: "Response duration was recorded",
            keyPoints: ["Response captured", "Ready for review"]
          }))
        };

        setResults(fallbackResults);
        setState("completed");
        
        toast.warning("Analysis partially completed", {
          description: "Basic feedback available. Try again for detailed analysis.",
        });
      }
    } else {
      // Move to the next question after a short delay
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        toast.success("Moving to next question");
      }, 1500);
    }
  };

  // Enhanced logging when interview completes
  useEffect(() => {
    if (state === "completed" && results) {
      console.log("=== INTERVIEW COMPLETED ===");
      console.log("Interview Info:", InterviewInfo);
      console.log("Questions:", questions);
      console.log("All Answers:", answers);
      console.log("Results:", results);
      
      // Log each answer for debugging
      Object.entries(answers).forEach(([questionId, answer]) => {
        const question = questions.find(q => q.id === parseInt(questionId));
        console.log(`\n--- Question ${questionId} ---`);
        console.log(`Q: ${question?.text}`);
        console.log(`Duration: ${formatTime(answer.duration)}`);
        console.log(`Transcript: ${answer.transcript}`);
      });
      console.log("========================");
    }
  }, [state, answers, results]);

  return (
    <>
      {/* Sonner toast container */}
      <Toaster position="top-right" theme="dark" closeButton richColors />

      <div className="min-h-screen py-8 px-4 sm:px-6 relative overflow-hidden mt-30">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Introduction Screen */}
            {state === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800/20 backdrop-blur-3xl p-8 rounded-2xl border border-white/10 shadow-xl"
              >
                <h1 className="font-display text-3xl font-bold text-white mb-2">
                  {InterviewInfo.title.charAt(0).toUpperCase() + InterviewInfo.title.slice(1)}
                </h1>
                <p className="text-slate-300 mb-6">
                  {InterviewInfo.position} | Experience - {InterviewInfo.experience}
                </p>
                <div className="bg-white/5 backdrop-blur-lg p-4 rounded-xl border border-white/10 mb-6">
                  <h3 className="text-md uppercase text-white font-semibold mb-2 flex items-center gap-2">
                    <Briefcase size={16} className="text-cyan-400" />
                    Job Description
                  </h3>
                  <p className="text-slate-300 text-md">
                    {InterviewInfo.Description.charAt(0).toUpperCase() + InterviewInfo.Description.slice(1)}
                  </p>
                </div>

                <div className="space-y-6 mb-8">
                  <div className="bg-white/3 rounded-xl p-6 border border-white/10">
                    <h2 className="flex items-center gap-2 text-xl font-medium text-white mb-4">
                      <Info size={20} className="text-cyan-400" />
                      How This Works
                    </h2>
                    <ul className="space-y-3 text-slate-300">
                      <li className="flex gap-2">
                        <div className="bg-white/10 rounded-full h-6 w-6 flex items-center justify-center shrink-0 text-sm font-medium text-cyan-400">1</div>
                        <span>You'll be presented with {QuestionsAvailable ? questions.length : '...'} interview questions one at a time.</span>
                      </li>
                      <li className="flex gap-2">
                        <div className="bg-white/10 rounded-full h-6 w-6 flex items-center justify-center shrink-0 text-sm font-medium text-cyan-400">2</div>
                        <span>Click the microphone button and speak your answer naturally, as you would in a real interview.</span>
                      </li>
                      <li className="flex gap-2">
                        <div className="bg-white/10 rounded-full h-6 w-6 flex items-center justify-center shrink-0 text-sm font-medium text-cyan-400">3</div>
                        <span>When finished with your response, click the stop button to submit and move to the next question.</span>
                      </li>
                      <li className="flex gap-2">
                        <div className="bg-white/10 rounded-full h-6 w-6 flex items-center justify-center shrink-0 text-sm font-medium text-cyan-400">4</div>
                        <span>After completing all questions, you'll receive detailed feedback and scoring on your performance.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/3 rounded-xl p-6 border border-white/10">
                    <h2 className="flex items-center gap-2 text-xl font-medium text-white mb-4">
                      <Mic size={20} className="text-cyan-400" />
                      Microphone Access
                    </h2>
                    <p className="text-slate-300 mb-4">
                      MockMaster needs access to your microphone to transcribe your interview answers.
                      You'll be prompted to allow microphone access when you begin.
                    </p>
                    <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 text-sm text-blue-300">
                      Your transcripts are processed securely and are never shared with third parties.
                      See our <Link href="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</Link> for details.
                    </div>
                  </div>
                </div>

                {questionsError && (
                  <div className="mb-6 bg-red-900/30 border border-red-500/30 rounded-lg p-4 text-sm text-red-300">
                    <div className="font-medium mb-1 flex items-center gap-2">
                      <AlertCircle size={16} />
                      Failed to load questions
                    </div>
                    <p className="mb-2">{questionsError}</p>
                    <Button
                      onClick={() => window.location.reload()}
                      variant="outline"
                      size="sm"
                      className="border-red-500/50 hover:bg-red-950/50 text-red-300"
                    >
                      Refresh Page
                    </Button>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    disabled={!QuestionsAvailable || questionsLoading}
                    onClick={startInterview}
                    className={`text-white gap-2 px-6 py-6 text-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700`}
                  >
                    {questionsLoading ? (
                      <>
                        <Loader2 size={18} className="animate-spin mr-2" />
                        Loading Questions
                      </>
                    ) : questionsError ? (
                      <>
                        <AlertCircle size={18} className="mr-2" />
                        Error Loading Questions
                      </>
                    ) : !QuestionsAvailable ? (
                      <>
                        <Loader2 size={18} className="animate-spin mr-2" />
                        Preparing Interview
                      </>
                    ) : (
                      <>
                        Start Interview
                        <ArrowRight size={18} />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Interview in Progress */}
            {state === "inProgress" && (
              <motion.div
                key="interview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Progress indicators */}
                <div className="flex justify-between items-center mb-2 text-sm text-slate-400">
                  <div>Question {currentQuestionIndex + 1} of {questions.length}</div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    Expected: ~{Math.round(currentQuestion.expectedDuration / 60)} min
                  </div>
                </div>
                <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Question Card */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`question-${currentQuestionIndex}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/3 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-xl"
                  >
                    <div className="mb-8">
                      <h2 className="font-display text-2xl font-medium text-white mb-6">
                        {currentQuestion.text}
                      </h2>

                      <div className="flex gap-2 items-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setShowTips(!showTips)}
                          className="text-xs border-white/10 hover:bg-white/10 text-slate-300"
                        >
                          {showTips ? 'Hide tips' : 'Show tips'}
                        </Button>
                      </div>

                      <AnimatePresence>
                        {showTips && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10 text-sm text-slate-300">
                              <div className="font-medium text-cyan-400 mb-1">Tips:</div>
                              {currentQuestion.tips}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Recording controls */}
                    <div className="flex flex-col items-center gap-6">
                      {permissionDenied ? (
                        <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4 text-sm text-red-300 w-full">
                          <div className="font-medium mb-1 flex items-center gap-2">
                            <AlertCircle size={16} />
                            Microphone access denied
                          </div>
                          <p className="mb-4">Please allow microphone access in your browser settings to continue the interview.</p>

                          {/* Add mic permission button */}
                          <Button
                            onClick={startRecording}
                            variant="outline"
                            className="border-red-500/50 hover:bg-red-950/50 text-red-300 mx-auto flex items-center gap-2"
                          >
                            <Mic size={16} />
                            Request Microphone Access
                          </Button>
                        </div>
                      ) : (
                        <>
                          {isRecording ? (
                            <div className="flex gap-2 items-center text-cyan-400">
                              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                              Recording... {formatTime(recordingTime)}
                            </div>
                          ) : (
                            <div className="text-slate-400 text-center">
                              <p>Click the microphone to start recording your answer</p>

                              {/* Add mic test button when not recording */}
                              <Button
                                onClick={async () => {
                                  try {
                                    await navigator.mediaDevices.getUserMedia({ audio: true });
                                    toast.success("Microphone access granted!", {
                                      description: "You're all set to record your answers."
                                    });
                                  } catch (err) {
                                    setPermissionDenied(true);
                                    toast.error("Microphone access denied", {
                                      description: "Please check your browser permissions and try again."
                                    });
                                  }
                                }}
                                variant="ghost"
                                size="sm"
                                className="mt-2 text-xs text-slate-400 hover:text-white"
                              >
                                Test microphone access
                              </Button>
                            </div>
                          )}

                          <div className="flex gap-4">
                            {!isRecording ? (
                              <Button
                                disabled={processingAnswers}
                                onClick={startRecording}
                                className="h-16 w-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                              >
                                <Mic size={24} />
                              </Button>
                            ) : (
                              <Button
                                onClick={stopRecording}
                                variant="destructive"
                                className="h-16 w-16 rounded-full"
                              >
                                <MicOff size={24} />
                              </Button>
                            )}
                          </div>

                          {isRecording && (
                            <div className="text-sm text-slate-400">
                              Click the stop button when you've finished your answer
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Add LiveTranscription component */}
                    {!permissionDenied && (
                      <LiveTranscription
                        isRecording={isRecording}
                        onTranscriptUpdate={setCurrentTranscript}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}

            {/* Results Screen - Now handles both processing and completed states */}
            {(state === "processingAnswers" || state === "completed") && (
              <InterviewResult
                results={results}
                questions={questions}
                answers={answers}
                formatTime={formatTime}
                isProcessing={state === "processingAnswers"}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

// Loading fallback component
function InterviewLoading() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 relative overflow-hidden mt-30">
      <div className="max-w-4xl mx-auto flex items-center justify-center">
        <div className="bg-gray-800/20 backdrop-blur-3xl p-8 rounded-2xl border border-white/10 shadow-xl">
          <div className="flex items-center gap-4">
            <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
            <span className="text-white">Loading interview...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense wrapper
export default function InterviewPage() {
  return (
    <Suspense fallback={<InterviewLoading />}>
      <InterviewContent />
    </Suspense>
  );
}