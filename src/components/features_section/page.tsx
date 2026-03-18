import { Sparkles, MicVocal, BrainCircuit, BarChart3, CheckCircle2, ArrowRight, FileText, Star } from "lucide-react";
import { motion } from "framer-motion";


export default function FeaturesSection() {
	return (
		<section className="bg-gradient-to-b from-indigo-950/20 to-slate-900/20  py-16 md:py-24 px-20">
			<div className="container mx-auto">
				<div className="text-center max-w-2xl mx-auto mb-16">
					<h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white">
						Master Every Interview with AI
					</h2>
					<p className="text-lg text-slate-300">
						MockMaster uses advanced AI to prepare you for any job interview, providing real-time feedback and personalized coaching.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{[
						{
							icon: <BrainCircuit className="w-10 h-10 text-cyan-400" />,
							title: "AI-Generated Questions",
							description: "Our AI generates tailored interview questions specific to your target role, company, and experience level.",
							bgGradient: "from-cyan-500/20 to-blue-600/5"
						},
						{
							icon: <MicVocal className="w-10 h-10 text-purple-400" />,
							title: "Voice Recording & Analysis",
							description: "Practice answering verbally while our system records and transcribes your responses for detailed feedback.",
							bgGradient: "from-purple-500/20 to-indigo-600/5"
						},
						{
							icon: <FileText className="w-10 h-10 text-indigo-400" />,
							title: "Transcript Generation",
							description: "Get complete transcripts of your mock interviews to review your answers and identify improvement areas.",
							bgGradient: "from-indigo-500/20 to-blue-600/5"
						},
						{
							icon: <BarChart3 className="w-10 h-10 text-blue-400" />,
							title: "Performance Scoring",
							description: "Receive detailed scores across multiple dimensions including content, delivery, and technical accuracy.",
							bgGradient: "from-blue-500/20 to-cyan-600/5"
						},
						{
							icon: <Sparkles className="w-10 h-10 text-amber-400" />,
							title: "Personalized Feedback",
							description: "Get actionable feedback with specific suggestions on how to improve your interview responses.",
							bgGradient: "from-amber-500/20 to-orange-600/5"
						},
						{
							icon: <CheckCircle2 className="w-10 h-10 text-emerald-400" />,
							title: "Interview Mastery",
							description: "Track your progress over time and master the skills needed to ace your next job interview.",
							bgGradient: "from-emerald-500/20 to-teal-600/5"
						}
					].map((feature, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: i * 0.1 }}
							viewport={{ once: true }}
							className={`bg-white/5 backdrop-blur-lg p-6 rounded-lg border border-white/10 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 hover:bg-white/10`}
						>
							<div className="mb-4">{feature.icon}</div>
							<h3 className="font-display text-xl font-semibold mb-2 text-white">{feature.title}</h3>


							<p className="text-slate-300">{feature.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>

	)
}