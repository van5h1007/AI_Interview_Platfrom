import { Glow, GlowArea } from "@/components/glow";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, MicVocal, BrainCircuit, BarChart3, CheckCircle2, ArrowRight, FileText, Star } from "lucide-react";

export default function CtaSection() {
	return (
		<div className="w-full flex items-center justify-center">
			<GlowArea className="py-16 md:py-24 relative inline-flex">
				<Glow color="" className="rounded-xl">
					<div className="container mx-auto ">
						<div className=" backdrop-blur-lg border bg-black/15 border-white/10 rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden">

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								viewport={{ once: true }}
								className="relative z-10 "
							>
								<h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Ace Your Next Interview?</h2>
								<p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
									Start practicing with MockMaster today and gain the confidence you need to land your dream job.
								</p>
								<Button size="lg" className="gap-2 bg-gradient-to-r from-cyan-500/80 to-purple-600/80 hover:from-cyan-600 hover:to-purple-700 text-white border-none">
									<Sparkles size={18} className="text-yellow-300" />
									Start free interview
								</Button>
							</motion.div>
						</div>
					</div>
				</Glow>
			</GlowArea>
		</div>
	)
}