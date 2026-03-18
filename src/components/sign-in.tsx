"use client";

import { Github } from "lucide-react";
import { githubSignIn } from "@/lib/actions";

export function SignIn() {
  return (
    <form action={githubSignIn}>
      <button 
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-md bg-white/10 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/20"
      >
        <Github className="h-5 w-5" />
        <span>Continue with GitHub</span>
      </button>
    </form>
  );
}
