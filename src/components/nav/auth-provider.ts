import { auth } from "@/../auth";

export async function getAuthSession() {
  const session = await auth();
  return {
    user: session?.user ? {
      name: session.user.name,
      image: session.user.image
    } : null
  };
}