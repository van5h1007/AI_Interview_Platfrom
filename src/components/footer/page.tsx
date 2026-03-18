import Link from "next/link";

export default function Footer() {
	return (

		<footer className="bg-black/35
		backdrop-blur-sm border-t border-slate-800 py-12 mt-40">
			<div className="container mx-auto">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
					<div>
						<h3 className="font-semibold mb-4 text-white">Product</h3>
						<ul className="space-y-3">
							<li><Link href="/features" className="text-slate-400 hover:text-cyan-400 transition-colors">Features</Link></li>
							<li><Link href="/pricing" className="text-slate-400 hover:text-cyan-400 transition-colors">Pricing</Link></li>
							<li> <Link  href="/#reviews"  className="text-slate-400 hover:text-cyan-400 transition-colors">  Testimonials</Link></li>
						</ul>
					</div>
					<div>
						<h3 className="font-semibold mb-4 text-white">Company</h3>
						<ul className="space-y-3">
							<li><Link href="/about" className="text-slate-400 hover:text-cyan-400 transition-colors">About us</Link></li>
							<li><Link href="/blog" className="text-slate-400 hover:text-cyan-400 transition-colors">Blog</Link></li>
							<li><Link href="/careers" className="text-slate-400 hover:text-cyan-400 transition-colors">Careers</Link></li>
						</ul>
					</div>
					<div>
						<h3 className="font-semibold mb-4 text-white">Resources</h3>
						<ul className="space-y-3">
							<li><Link href="/help" className="text-slate-400 hover:text-cyan-400 transition-colors">Help center</Link></li>
							<li><Link href="/guides" className="text-slate-400 hover:text-cyan-400 transition-colors">Interview guides</Link></li>
							<li><Link href="/community" className="text-slate-400 hover:text-cyan-400 transition-colors">Community</Link></li>
						</ul>
					</div>
					<div>
						<h3 className="font-semibold mb-4 text-white">Legal</h3>
						<ul className="space-y-3">
							<li><Link href="/privacy" className="text-slate-400 hover:text-cyan-400 transition-colors">Privacy</Link></li>
							<li><Link href="/terms" className="text-slate-400 hover:text-cyan-400 transition-colors">Terms</Link></li>
							<li><Link href="/cookies" className="text-slate-400 hover:text-cyan-400 transition-colors">Cookies</Link></li>
						</ul>
					</div>
				</div>
				<div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
					<p className="text-slate-400 mb-4 md:mb-0">
						© {new Date().getFullYear()} MockMaster. All rights reserved.
					</p>
					<div className="flex items-center gap-4">
						<Link href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
							<span className="sr-only">Twitter</span>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
						</Link>
						<Link href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
							<span className="sr-only">LinkedIn</span>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
						</Link>
						<Link href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
							<span className="sr-only">GitHub</span>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}