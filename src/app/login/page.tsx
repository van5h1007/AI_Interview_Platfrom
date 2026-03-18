"use client"
import Link from "next/link";
import { motion } from "framer-motion";
import { SignIn } from "@/components/sign-in";


export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden mt-18 mb-60">
      <div className="w-full max-w-md flex flex-col items-center">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-semibold text-white text-center mb-6">Sign In</h1>
          <SignIn/>
        </motion.div>
        
        {/* Privacy notice */}
        <motion.p
          className="text-sm text-slate-500 text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-slate-400 hover:text-white underline underline-offset-2">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-slate-400 hover:text-white underline underline-offset-2">
            Privacy Policy
          </Link>
        </motion.p>
      </div>
    </div>
  );
}