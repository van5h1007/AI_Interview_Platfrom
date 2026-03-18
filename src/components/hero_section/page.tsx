import { motion } from "framer-motion";
import { Glow, GlowArea } from "@/components/glow";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, MicVocal } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
	return (
		<section className="container mx-auto py-16 md:py-24 h-screen px-[3vw]">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
						Master Your Interview Skills with <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">AI</span>
					</h1>
					<p className="text-lg md:text-xl text-slate-300 mb-8 max-w-lg">
						Prepare confidently for any job interview with personalized AI-powered mock interviews, real-time feedback, and performance analytics.
					</p>
					<div className="flex flex-col sm:flex-row gap-4">
						<Link href={`/templates`} passHref>
							<Button size="lg" className="cursor-pointer gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0">
								<Sparkles size={18} className="text-yellow-300" />
								Start free interview
							</Button>
						</Link>
						<Button size="lg" variant="outline" asChild className="border-slate-700 text-slate-300 hover:text-white hover:border-slate-500">
							<Link href="/pricing" className="gap-2 inline-flex items-center">
								View plans <ArrowRight size={16} />
							</Link>
						</Button>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.7, delay: 0.2 }}
					className="relative"
				>
					<div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-lg p-6 shadow-xl overflow-hidden relative">
						<div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 to-purple-600"></div>
						<div className="mb-8">
							<h3 className="text-lg font-medium mb-2 text-white">Front-end Developer Interview</h3>
							<p className="text-slate-400 text-sm">Tech Company Inc. • Senior Level</p>
						</div>
						<div className="space-y-4 mb-6">
							<div className="p-4 rounded-md bg-slate-800/70 border border-slate-700">
								<p className="font-medium text-slate-300">Question 2 of 10:</p>
								<p className="text-white">Explain how you would implement a responsive navigation menu that works across different device sizes.</p>
							</div>
							<div className="flex items-center gap-2 text-sm text-cyan-400">
								<MicVocal size={16} className="text-cyan-400 animate-pulse" />
								<span>Recording your answer...</span>
							</div>
						</div>
						<div className="bg-slate-800/50 p-4 rounded-md border border-slate-700/50">
							<div className="flex justify-between text-sm mb-2">
								<span className="text-slate-300">Real-time feedback</span>
								<span className="font-mono text-cyan-400">85%</span>
							</div>
							<div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
								<div className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full" style={{ width: '85%' }}></div>
							</div>
							<div className="mt-3 text-xs text-slate-400">
								Great discussion of media queries and flexbox. Consider mentioning accessibility.
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>

	)
}