// src/app/interview/actions.ts
"use server";

import { model } from "../../lib/gemini";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type InterviewInfoType = {
  title: string;
  position: string;
  experience: string;
  Description: string;
  company?: string;
};

export type QuestionType = {
  id: number;
  text: string;
  expectedDuration: number;
  tips: string;
};

export type AnswerType = {
  duration: number;
  transcript: string;
};

export type AnalysisResult = {
  overallScore: number;
  categories: Array<{
    name: string;
    score: number;
  }>;
  strengths: string[];
  improvements: string[];
  questionAnalysis: Array<{
    id: number;
    score: number;
    strengths: string[];
    improvements: string[];
    timeAssessment: string;
    keyPoints: string[];
  }>;
};

const generateQuestions = async (InterviewInfo: InterviewInfoType): Promise<QuestionType[] | { error: string }> => {
  const prompt = `
  Generate 2 interview questions for a ${InterviewInfo.position} position that requires ${InterviewInfo.experience} experience.
  
  Job Description: ${InterviewInfo.Description}
  
  For each question, include:
  1. A challenging, open-ended interview question relevant to the position
  2. The expected duration to answer in seconds (between 60-180 seconds)
  3. Tips for the candidate on how to structure a good answer
  
  Return the questions in a valid JSON array format exactly as shown below:
  [
    {
      "id": 1,
      "text": "Question text here?",
      "expectedDuration": 120,
      "tips": "Tips for answering this question effectively."
    },
    {
      "id": 2,
      "text": "Question text here?",
      "expectedDuration": 90,
      "tips": "Tips for answering this question effectively."
    }
  ]
  
  Do not include any explanations or additional text outside of the JSON array.
  Ensure the questions are challenging and specific to the ${InterviewInfo.position} role.
  `;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Extract the JSON part from the response if needed
    const jsonPattern = /\[\s*\{[\s\S]*\}\s*\]/;
    const match = responseText.match(jsonPattern);

    if (!match) {
      console.error("Failed to extract valid JSON from AI response");
      return { error: "Failed to extract valid JSON from AI response" };
    }

    // Parse the JSON
    try {
      const questions = JSON.parse(match[0]) as QuestionType[];
      return questions;
    } catch (parseError) {
      const errorMessage = parseError instanceof Error ? parseError.message : "Unknown parsing error";
      console.error("Failed to parse questions JSON:", errorMessage);
      return { error: `Failed to parse questions JSON: ${errorMessage}` };
    }
  } catch (generateError) {
    const errorMessage = generateError instanceof Error ? generateError.message : "Unknown generation error";
    console.error("Error generating questions with Gemini:", errorMessage);
    return { error: `Error generating questions with Gemini: ${errorMessage}` };
  }
};

export const getIntervewQuestions = async (
  InterviewInfo: InterviewInfoType
): Promise<QuestionType[] | { error: string }> => {
  const questions = await generateQuestions(InterviewInfo);
  return questions;
};

// Helper function to clean and extract JSON from AI response
const extractAndParseJSON = (responseText: string): any => {
  // Remove any markdown code blocks if present
  let cleanedText = responseText.replace(/```json\s*|\s*```/g, '').trim();
  
  // Try to find JSON object pattern
  const jsonPattern = /\{[\s\S]*\}/;
  const match = cleanedText.match(jsonPattern);
  
  if (match) {
    cleanedText = match[0];
  }
  
  // Additional cleaning - remove any text before opening brace
  const openBraceIndex = cleanedText.indexOf('{');
  if (openBraceIndex > 0) {
    cleanedText = cleanedText.substring(openBraceIndex);
  }
  
  // Additional cleaning - remove any text after closing brace
  const closeBraceIndex = cleanedText.lastIndexOf('}');
  if (closeBraceIndex !== -1 && closeBraceIndex < cleanedText.length - 1) {
    cleanedText = cleanedText.substring(0, closeBraceIndex + 1);
  }
  
  return JSON.parse(cleanedText);
};

export const analyzeAnswers = async (
  answers: Record<number, AnswerType>,
  questions: QuestionType[],
  interviewInfo: InterviewInfoType
): Promise<AnalysisResult> => {
  try {
    // Enhanced prompt with stricter JSON requirements
    const prompt = `
      You are an expert interviewer analyzing interview responses. You MUST return ONLY valid JSON with no additional text.
      
      INTERVIEW DETAILS:
      Position: ${interviewInfo.position}
      Experience Level: ${interviewInfo.experience}
      Job Description: ${interviewInfo.Description}
      
      QUESTIONS AND ANSWERS:
      ${questions
        .map((q) => {
          const answer = answers[q.id];
          return `
          Question ${q.id}: ${q.text}
          Expected Duration: ${q.expectedDuration} seconds
          Actual Duration: ${answer ? answer.duration : 0} seconds
          Answer: ${answer?.transcript || "No answer provided"}
        `;
        })
        .join("\n\n")}
      
      Return ONLY this exact JSON structure with no extra text:
      {
        "overallScore": 75,
        "categories": [
          {"name": "Technical Knowledge", "score": 80},
          {"name": "Communication Skills", "score": 70},
          {"name": "Problem Solving", "score": 75},
          {"name": "Role Relevance", "score": 85},
          {"name": "Overall Impression", "score": 75}
        ],
        "strengths": [
          "Clear communication style",
          "Relevant experience mentioned",
          "Good understanding of role requirements"
        ],
        "improvements": [
          "Provide more specific examples",
          "Structure answers better using STAR method",
          "Expand on technical details"
        ],
        "questionAnalysis": [
          {
            "id": 1,
            "score": 75,
            "strengths": ["Good initial approach", "Clear thinking process"],
            "improvements": ["Need more specific examples", "Could be more structured"],
            "timeAssessment": "Appropriate duration for the response",
            "keyPoints": ["Mentioned key concepts", "Showed problem-solving approach"]
          },
          {
            "id": 2,
            "score": 80,
            "strengths": ["Specific examples given", "Good technical knowledge"],
            "improvements": ["Could elaborate more", "Better conclusion needed"],
            "timeAssessment": "Good use of allocated time",
            "keyPoints": ["Demonstrated experience", "Clear explanation provided"]
          }
        ]
      }
    `;

    console.log("Sending request to Gemini API...");
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    
    console.log("Raw AI response:", responseText);

    try {
      // First attempt: direct JSON parsing
      const jsonObject = JSON.parse(responseText) as AnalysisResult;
      console.log("Successfully parsed JSON on first attempt");
      return jsonObject;
    } catch (firstError) {
      const firstErrorMessage = firstError instanceof Error ? firstError.message : "Unknown first parsing error";
      console.log("First JSON parse failed, trying extraction method...");
      
      try {
        // Second attempt: extract and clean JSON
        const jsonObject = extractAndParseJSON(responseText) as AnalysisResult;
        console.log("Successfully parsed JSON after extraction");
        return jsonObject;
      } catch (secondError) {
        const secondErrorMessage = secondError instanceof Error ? secondError.message : "Unknown second parsing error";
        console.error("Both JSON parsing methods failed:", {
          firstError: firstErrorMessage,
          secondError: secondErrorMessage,
          responseText: responseText
        });
        
        // Fallback: return a basic structure with available data
        return createFallbackAnalysis(questions);
      }
    }
  } catch (mainError) {
    const errorMessage = mainError instanceof Error ? mainError.message : "Unknown analysis error";
    console.error("Error in analyzeAnswers:", errorMessage);
    
    // Return fallback structure instead of throwing
    return createFallbackAnalysis(questions);
  }
};

const createFallbackAnalysis = (questions: QuestionType[]): AnalysisResult => {
  return {
    overallScore: 50,
    categories: [
      {"name": "Technical Knowledge", "score": 50},
      {"name": "Communication Skills", "score": 50},
      {"name": "Problem Solving", "score": 50},
      {"name": "Role Relevance", "score": 50},
      {"name": "Overall Impression", "score": 50}
    ],
    strengths: [
      "Completed the interview process",
      "Provided responses to questions",
      "Demonstrated engagement"
    ],
    improvements: [
      "Analysis unavailable due to processing error",
      "Please try the interview again for detailed feedback",
      "Consider speaking more clearly for better transcription"
    ],
    questionAnalysis: questions.map(q => ({
      id: q.id,
      score: 50,
      strengths: ["Response provided"],
      improvements: ["Analysis unavailable"],
      timeAssessment: "Analysis unavailable",
      keyPoints: ["Analysis unavailable"]
    }))
  };
};

// Function to save interview results to database
export const saveInterviewResults = async (
  userId: string,
  interviewInfo: InterviewInfoType,
  questions: QuestionType[],
  answers: Record<number, AnswerType>,
  results: AnalysisResult
): Promise<{ success: true; interviewId: number } | { success: false; error: string }> => {
  try {
    // Calculate total duration
    const totalDuration = Object.values(answers).reduce((sum, answer) => sum + answer.duration, 0);
    
    // Start a transaction to ensure data consistency
    const savedInterview = await prisma.$transaction(async (tx) => {
      // Create the main interview record
      const interview = await tx.interview.create({
        data: {
          title: interviewInfo.title,
          company: interviewInfo.company || "Not specified",
          position: interviewInfo.position,
          score: results.overallScore,
          duration: Math.ceil(totalDuration / 60), // Convert to minutes
          feedback: JSON.stringify({
            categories: results.categories,
            strengths: results.strengths,
            improvements: results.improvements,
            questionAnalysis: results.questionAnalysis
          }),
          userId: userId,
        },
      });

      // Create questions and answers
      for (const question of questions) {
        const createdQuestion = await tx.question.create({
          data: {
            text: question.text,
            expectedDuration: question.expectedDuration,
            tips: question.tips,
            interviewId: interview.id,
          },
        });

        // Create answer if exists
        const answer = answers[question.id];
        if (answer) {
          await tx.answer.create({
            data: {
              transcript: answer.transcript,
              duration: answer.duration,
              questionId: createdQuestion.id,
            },
          });
        }
      }

      return interview;
    });

    console.log("Interview successfully saved with ID:", savedInterview.id);
    return { success: true, interviewId: savedInterview.id };

  } catch (saveError) {
    const errorMessage = saveError instanceof Error ? saveError.message : "Unknown save error";
    console.error("Error saving interview:", errorMessage);
    return { success: false, error: errorMessage };
  }
};

// Function to get user's interview history
export const getUserInterviews = async (userId: string) => {
  try {
    const interviews = await prisma.interview.findMany({
      where: {
        userId: userId,
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { success: true, interviews };
  } catch (fetchError) {
    const errorMessage = fetchError instanceof Error ? fetchError.message : "Unknown fetch error";
    console.error("Error fetching user interviews:", errorMessage);
    return { success: false, error: errorMessage };
  }
};

// Function to get a specific interview by ID
export const getInterviewById = async (interviewId: number, userId: string) => {
  try {
    const interview = await prisma.interview.findFirst({
      where: {
        id: interviewId,
        userId: userId, // Ensure user can only access their own interviews
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });

    if (!interview) {
      return { success: false, error: "Interview not found or access denied" };
    }

    return { success: true, interview };
  } catch (fetchError) {
    const errorMessage = fetchError instanceof Error ? fetchError.message : "Unknown fetch error";
    console.error("Error fetching interview:", errorMessage);
    return { success: false, error: errorMessage };
  }
};

// Function to delete an interview
export const deleteInterview = async (interviewId: number, userId: string) => {
  try {
    // Verify ownership before deletion
    const interview = await prisma.interview.findFirst({
      where: {
        id: interviewId,
        userId: userId,
      },
    });

    if (!interview) {
      return { success: false, error: "Interview not found or access denied" };
    }

    // Delete the interview (cascade will handle questions and answers)
    await prisma.interview.delete({
      where: {
        id: interviewId,
      },
    });

    return { success: true };
  } catch (deleteError) {
    const errorMessage = deleteError instanceof Error ? deleteError.message : "Unknown delete error";
    console.error("Error deleting interview:", deleteError);
    return { success: false, error: errorMessage };
  }
};