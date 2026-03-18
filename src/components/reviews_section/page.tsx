import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Star } from "lucide-react";


export default function ReviewsSection() {
	const reviewsRef = useRef<HTMLDivElement>(null);
	const reviewControls = useAnimation();

	// Reviews carousel animation
	useEffect(() => {
		const scrollReviews = async () => {
			if (!reviewsRef.current) return;

			await reviewControls.start({
				x: [0, -1920],
				transition: {
					x: {
						repeat: Infinity,
						repeatType: "loop",
						duration: 40,
						ease: "linear"
					}
				}
			});
		};

		scrollReviews();
	}, [reviewControls]);

	const reviews = [
		{
			name: "Alex Johnson",
			role: "Software Engineer",
			company: "Tech Innovate",
			image: "https://i.pravatar.cc/150?img=1",
			content: "MockMaster helped me nail my dream job interview! The AI feedback was spot-on and helped me improve my responses dramatically.",
			rating: 5
		},
		{
			name: "Sarah Chen",
			role: "Product Manager",
			company: "Growth Solutions",
			image: "https://i.pravatar.cc/150?img=5",
			content: "I was skeptical at first, but the personalized questions and detailed feedback helped me prepare in ways I hadn't thought of. Highly recommend!",
			rating: 5
		},
		{
			name: "Michael Rodriguez",
			role: "UX Designer",
			company: "Creative Designs Inc.",
			image: "https://i.pravatar.cc/150?img=11",
			content: "The interview simulation felt incredibly realistic. I went into my actual interview with so much more confidence.",
			rating: 4
		},
		{
			name: "Priya Patel",
			role: "Data Scientist",
			company: "DataTech Solutions",
			image: "https://i.pravatar.cc/150?img=9",
			content: "As someone who gets nervous during interviews, this tool was a game-changer. I practiced until I felt confident with my responses.",
			rating: 5
		},
		{
			name: "James Wilson",
			role: "Marketing Director",
			company: "Brand Elevate",
			image: "https://i.pravatar.cc/150?img=3",
			content: "The AI picked up on verbal tics I didn't even notice myself. That feedback alone was worth the investment.",
			rating: 5
		},
		{
			name: "Emma Thompson",
			role: "HR Specialist",
			company: "People First",
			image: "https://i.pravatar.cc/150?img=6",
			content: "As someone who conducts interviews, I recommend MockMaster to all candidates. It really helps them prepare properly.",
			rating: 4
		}
	];




	return (
		<section id ="reviews" className="py-16 md:py-24 overflow-hidden">
			<div className="container mx-auto mb-12">
				<div className="text-center max-w-2xl mx-auto mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Our Users Say</h2>
					<p className="text-lg text-slate-300">
						Join thousands of job seekers who have improved their interview performance with MockMaster
					</p>
				</div>
			</div>

			<div className="relative w-full overflow-hidden">
				<div className="w-[18%] z-50 h-full absolute bg-gradient-to-r from-black/50"></div>
				<div className="w-[18%] z-50 h-full right-0 absolute bg-gradient-to-r from-transparent to-black/50"></div>

				<motion.div
					ref={reviewsRef}
					animate={reviewControls}
					className="flex gap-6"
					style={{ width: "fit-content" }}
				>
					{/* First set of reviews */}
					{reviews.map((review, i) => (
						<div
							key={`review-1-${i}`}
							className="w-[350px] flex-shrink-0 bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 shadow-lg"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 rounded-full overflow-hidden bg-slate-700 relative">
									<Image
										src={review.image}
										alt={review.name}
										width={48}
										height={48}
										className="object-cover"
									/>
								</div>
								<div>
									<h4 className="font-medium text-white">{review.name}</h4>
									<p className="text-sm text-slate-400">{review.role}, {review.company}</p>
								</div>
							</div>
							<div className="flex mb-3">
								{[...Array(5)].map((_, starIndex) => (
									<Star
										key={starIndex}
										size={16}
										className={starIndex < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-600"}
									/>
								))}
							</div>
							<p className="text-slate-300 italic">{review.content}</p>
						</div>
					))}

					{/* Duplicate reviews for seamless looping */}
					{reviews.map((review, i) => (
						<div
							key={`review-2-${i}`}
							className="w-[350px] flex-shrink-0 bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 shadow-lg"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 rounded-full overflow-hidden bg-slate-700 relative">
									<Image
										src={review.image}
										alt={review.name}
										width={48}
										height={48}
										className="object-cover"
									/>
								</div>
								<div>
									<h4 className="font-medium text-white">{review.name}</h4>
									<p className="text-sm text-slate-400">{review.role}, {review.company}</p>
								</div>
							</div>
							<div className="flex mb-3">
								{[...Array(5)].map((_, starIndex) => (
									<Star
										key={starIndex}
										size={16}
										className={starIndex < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-600"}
									/>
								))}
							</div>
							<p className="text-slate-300">{review.content}</p>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	)
}