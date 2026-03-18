"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, RefreshCw, Star, BarChart2, Loader2, AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { getUserInterviews } from "@/app/interview/actions"; // Adjust path as needed
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface InterviewData {
	id: number;
	title: string;
	company: string;
	position: string;
	score: number;
	duration: number; // in minutes
	feedback: string;
	createdAt: Date;
	questions: {
		id: number;
		text: string;
		expectedDuration: number;
		tips: string;
		answers: {
			id: number;
			transcript: string;
			duration: number;
		}[];
	}[];
}

export default function MyInterviewsPage() {
	const { data: session } = useSession();
	const router = useRouter();
	
	const [interviews, setInterviews] = useState<InterviewData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadInterviews = async () => {
			if (!session?.user?.id) {
				setLoading(false);
				return;
			}

			try {
				const result = await getUserInterviews(session.user.id);
				
				if (result.success) {
					// Parse the feedback JSON and transform the data
					const transformedInterviews = result.interviews.map(interview => ({
						...interview,
						createdAt: new Date(interview.createdAt),
						feedback: typeof interview.feedback === 'string' 
							? JSON.parse(interview.feedback) 
							: interview.feedback
					}));
					
					setInterviews(transformedInterviews);
					console.log("Loaded interviews:", transformedInterviews);
				} else {
					setError(result.error || "Failed to load interviews");
					toast.error("Failed to load interviews", {
						description: result.error || "Please try refreshing the page"
					});
				}
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
				setError(errorMessage);
				console.error("Error loading interviews:", err);
				toast.error("Error loading interviews", {
					description: "Please try refreshing the page"
				});
			} finally {
				setLoading(false);
			}
		};

		loadInterviews();
	}, [session?.user?.id]);

	const getScoreColor = (score: number) => {
		if (score >= 85) return "text-green-400";
		if (score >= 70) return "text-yellow-400";
		if (score >= 50) return "text-orange-400";
		return "text-red-500";
	};

	const getScoreBackground = (score: number) => {
		if (score >= 85) return "bg-green-900/30 border-green-500/30";
		if (score >= 70) return "bg-yellow-900/30 border-yellow-500/30";
		if (score >= 50) return "bg-orange-900/30 border-orange-500/30";
		return "bg-red-900/30 border-red-500/30";
	};

	const retakeInterview = (interview: InterviewData) => {
		// Navigate to interview page with the same parameters
		const params = new URLSearchParams({
			title: interview.title,
			position: interview.position,
			company: interview.company,
			description: "Retaking previous interview", // You might want to store the original description
			experience: "Previous experience level" // You might want to store this too
		});
		
		router.push(`/interview?${params.toString()}`);
	};

	const viewDetails = (interview: InterviewData) => {
		// You can implement a detailed view page or modal here
		console.log("Viewing details for interview", interview.id);
		toast.info("Feature coming soon", {
			description: "Detailed interview analysis view is being developed"
		});
	};

	const formatDuration = (minutes: number) => {
		if (minutes < 60) {
			return `${minutes}m`;
		}
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;
		return `${hours}h ${remainingMinutes}m`;
	};

	const generateTags = (interview: InterviewData) => {
		const tags = [];
		
		// Add position-based tag
		if (interview.position) {
			tags.push(interview.position);
		}
		
		// Add company tag
		if (interview.company && interview.company !== "Not specified") {
			tags.push(interview.company);
		}
		
		// Add score-based tag
		if (interview.score >= 85) {
			tags.push("Excellent");
		} else if (interview.score >= 70) {
			tags.push("Good");
		} else if (interview.score >= 50) {
			tags.push("Fair");
		} else {
			tags.push("Needs Improvement");
		}
		
		return tags;
	};

	const getMainFeedback = (feedbackData: any) => {
		if (typeof feedbackData === 'string') {
			return feedbackData;
		}
		
		// Extract key strengths and improvements from the parsed feedback
		if (feedbackData?.strengths && feedbackData?.improvements) {
			const topStrength = feedbackData.strengths[0] || "";
			const topImprovement = feedbackData.improvements[0] || "";
			
			if (topStrength && topImprovement) {
				return `${topStrength} ${topImprovement}`;
			}
		}
		
		return "Analysis completed - click Details to view full feedback";
	};

	// Loading state
	if (loading) {
		return (
			<div className="container mx-auto py-8 px-4 mt-20 mb-40">
				<div className="mb-8">
					<h1 className="text-3xl font-bold mb-2">My Interviews</h1>
					<p className="text-gray-500">Review your past interview performance and practice again</p>
				</div>
				
				<div className="flex items-center justify-center py-12">
					<div className="flex items-center gap-4">
						<Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
						<span className="text-white">Loading your interviews...</span>
					</div>
				</div>
			</div>
		);
	}

	// Error state
	if (error) {
		return (
			<div className="container mx-auto py-8 px-4 mt-20 mb-40">
				<div className="mb-8">
					<h1 className="text-3xl font-bold mb-2">My Interviews</h1>
					<p className="text-gray-500">Review your past interview performance and practice again</p>
				</div>
				
				<div className="text-center py-12">
					<div className="bg-red-900/30 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
						<AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
						<h3 className="text-xl font-medium mb-2 text-red-300">Error Loading Interviews</h3>
						<p className="text-red-200 mb-4">{error}</p>
						<Button 
							onClick={() => window.location.reload()}
							variant="outline"
							className="border-red-500/50 hover:bg-red-950/50 text-red-300"
						>
							Retry
						</Button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-8 px-4 mt-20 mb-40">
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">My Interviews</h1>
				<p className="text-gray-500">Review your past interview performance and practice again</p>
			</div>

			{interviews.length === 0 ? (
				<div className="text-center py-12">
					<h3 className="text-xl font-medium mb-2">No interviews yet</h3>
					<p className="text-gray-400 mb-6">Take your first interview to see results here</p>
					<Button onClick={() => router.push('/templates')}>
						Start an Interview
					</Button>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{interviews.map((interview) => (
						<Card key={interview.id} className="p-6 hover:bg-gray-800/50 bg-gray-800/30 transition-all">
							<div className="flex justify-between items-start mb-4">
								<div>
									<h2 className="text-xl font-bold">{interview.position}</h2>
									<p className="text-sm text-gray-400">{interview.company}</p>
								</div>
								<div className={`px-3 py-1 rounded-lg border ${getScoreBackground(interview.score)}`}>
									<span className={`font-bold text-xl ${getScoreColor(interview.score)}`}>
										{interview.score || "N/A"}
									</span>
									{interview.score && (
										<span className="text-sm ml-0.5 text-gray-400">/100</span>
									)}
								</div>
							</div>

							<div className="flex items-center text-gray-400 text-sm mb-4">
								<Calendar size={14} className="mr-1" />
								<span>{interview.createdAt.toLocaleDateString()}</span>
								<Clock size={14} className="ml-4 mr-1" />
								<span>{formatDuration(interview.duration)}</span>
							</div>

							<div className="flex flex-wrap gap-2 mb-4">
								{generateTags(interview).map((tag, index) => (
									<Badge key={index} variant="outline" className="bg-gray-700/50 text-xs">
										{tag}
									</Badge>
								))}
							</div>

							<p className="text-gray-300 text-sm mb-6 line-clamp-2">
								{getMainFeedback(interview.feedback)}
							</p>

							<div className="flex justify-between mt-auto">
								<Button
									variant="outline"
									size="sm"
									className="flex items-center gap-1"
									onClick={() => viewDetails(interview)}
								>
									<BarChart2 size={14} /> Details
								</Button>

								<Button
									size="sm"
									className="flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
									onClick={() => retakeInterview(interview)}
								>
									<RefreshCw size={14} /> Practice Again
								</Button>
							</div>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}