import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter, Outfit, Space_Grotesk } from "next/font/google";
import { NavbarWrapper } from "@/components/nav/navbar-wrapper";
import GradientBg from "@/components/gradient_bg/page";
import Footer from "@/components/footer/page";
import SessionProviderWrapper from "../components/SessionProviderWrapper";
import { AuthProvider } from "@/components/AuthProvider";
import SmoothScroll from "../components/SmoothScroll";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "MockMaster | AI Interview Practice",
  description:
    "Prepare for job interviews with AI-powered mock interviews, personalized feedback, and interview performance scoring.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable} ${spaceGrotesk.variable}`}
    >
      <body className="font-sans antialiased">
        <SessionProviderWrapper>
          <ThemeProvider attribute="class" defaultTheme="system">
            <AuthProvider />
            <SmoothScroll>
              <div className="sticky top-0 z-50">
                <NavbarWrapper />
              </div>

              <GradientBg />
              <main>{children}</main>
              <Footer />
            </SmoothScroll>
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
