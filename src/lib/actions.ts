"use server";

import { signIn,signOut } from "@/../auth";

export async function githubSignIn() {
  return await signIn("github", { 
    redirectTo: "/pricing" 
  });
}
export async function githubSignOut() {
  await signOut();
}