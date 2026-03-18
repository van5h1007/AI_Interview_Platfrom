export default function GradientBg() {
	return (
		<div className="fixed inset-0 overflow-hidden -z-10 opacity-40">
			<div className="absolute top-0 left-0 w-[50rem] h-[50rem] rounded-full bg-blue-500/15 blur-[10rem]" />
			<div className="absolute top-[5%] left-[5%] w-[30rem] h-[30rem] rounded-full bg-purple-600/10 blur-[8rem]" />
			<div className="absolute top-[40%] right-[10%] w-[40rem] h-[40rem] rounded-full bg-cyan-500/10 blur-[10rem]" />
			<div className="absolute bottom-[10%] left-[40%] w-[35rem] h-[35rem] rounded-full bg-indigo-500/10 blur-[9rem]" />
		</div>
	)
}