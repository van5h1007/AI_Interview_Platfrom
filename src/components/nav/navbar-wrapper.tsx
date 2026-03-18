import { Navbar } from "@/components/navbar";
import { getAuthSession } from "@/components/nav/auth-provider";

export async function NavbarWrapper() {
  const { user } = await getAuthSession();
  
  return <Navbar user={user}/>;
}