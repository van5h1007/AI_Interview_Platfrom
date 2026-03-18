import { motion } from "framer-motion";



export default function HowItWorksPage() {
	return (
		<section className="container mx-auto py-16 md:py-24 px-10">
			<div className="text-center max-w-2xl mx-auto mb-16">
				<h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How MockMaster Works</h2>
				<p className="text-lg text-slate-300">
					A simple three-step process to help you prepare for your next interview
				</p>
			</div>

			<div className="relative">
				<div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-600 to-blue-500 -translate-y-1/2 z-0 opacity-30"></div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
					{[
						{
							number: "01",
							title: "Select Your Role",
							description: "Choose the specific job role, seniority level, and target company for your interview preparation.",
							gradient: "from-cyan-500 to-blue-600"
						},
						{
							number: "02",
							title: "Practice Interview",
							description: "Complete a realistic mock interview with AI-generated questions tailored to your target position.",
							gradient: "from-blue-500 to-purple-600"
						},
						{
							number: "03",
							title: "Get Feedback",
							description: "Receive instant analysis, scoring, and personalized recommendations to improve your performance.",
							gradient: "from-purple-500 to-pink-600"
						}
					].map((step, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: i * 0.2 }}
							viewport={{ once: true }}
							className="bg-white/5 backdrop-blur-lg p-6 rounded-lg border border-white/10 shadow-lg relative"
						>
							<div className={`bg-gradient-to-r ${step.gradient} w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4 text-white`}>
								{step.number}
							</div>
							<h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
							<p className="text-slate-300">{step.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}