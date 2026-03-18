"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronDown,
  Mic,
  FileText,
  Home,
  BookOpen,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { githubSignOut } from "@/lib/actions";

// Updated nav items with more relevant links
const NavItems = [
  { name: "Home", href: "/", icon: <Home size={16} /> },
  {
    name: "Practice",
    href: "/templates",
    icon: <Mic size={16} />,
  },
  {
    name: "Learn",
    href: "#",
    icon: <BookOpen size={16} />,
    dropdown: [
      { name: "Interview Tips", href: "/tips" },
      { name: "Common Questions", href: "/commonQuestions" },
    ],
  },
];

export function Navbar({
  user,
}: {
  user: { name?: string | null; image?: string | null } | null;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Check if a link is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Check if any dropdown item is active
  const isDropdownActive = (items: { name: string; href: string }[]) => {
    return items.some((item) => isActive(item.href));
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-dropdown]') && !target.closest('[data-dropdown-content]')) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activeDropdown]);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-black/60 backdrop-blur-lg shadow-lg border-b border-white/10"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="relative z-50">
          <div className="font-bold text-2xl flex items-center">
            <span className="font-display text-white">Mock</span>
            <span className="font-display bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Master
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {NavItems.map((item) => (
            <div key={item.name} className="relative">
              {item.dropdown ? (
                <div data-dropdown>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`px-4 py-2 flex items-center gap-2 rounded-lg transition-colors
                      ${
                        activeDropdown === item.name ||
                        isDropdownActive(item.dropdown)
                          ? "bg-white/10 text-white"
                          : "text-slate-300 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {item.icon}
                    {item.name}
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-1 w-48 bg-slate-900/95 backdrop-blur-lg border border-slate-700/50 rounded-lg shadow-lg overflow-hidden z-50"
                        data-dropdown-content
                      >
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={closeDropdown}
                            className={`block px-4 py-2 hover:bg-white/10 transition-colors
                              ${
                                isActive(subItem.href)
                                  ? "text-white bg-white/5 border-l-2 border-cyan-500"
                                  : "text-slate-300 hover:text-white"
                              }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`px-4 py-2 flex items-center gap-2 transition-all rounded-lg
                    ${
                      item.highlight
                        ? isActive(item.href)
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium"
                          : "bg-gradient-to-r from-cyan-500/80 to-blue-600/80 hover:from-cyan-500 hover:to-blue-600 text-white"
                        : isActive(item.href)
                        ? "bg-white/10 text-white font-medium"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {item.icon}
                  {item.name}
                  {isActive(item.href) && !item.highlight && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-cyan-500 rounded-full"></span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Auth Buttons or User Profile */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-2 px-2 py-1">
                    <span className="text-sm text-white">{user.name}</span>
                    {user.image ? (
                      <div className="h-8 w-8 rounded-full overflow-hidden border border-white/20">
                        <Image
                          src={user.image}
                          alt={user.name || "User profile"}
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {user.name?.charAt(0) || "U"}
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-slate-900/95 backdrop-blur-lg border-slate-800 text-white"
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10 cursor-pointer">
                <Link href="/profile" className="flex items-center"><User size={16} className="mr-2" /><span>Profile</span></Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-700" />
                <form action={githubSignOut}>
                  <DropdownMenuItem
                    className="hover:bg-white/10 focus:bg-white/10 cursor-pointer text-red-400 hover:text-red-300"
                    asChild
                  >
                    <button type="submit" className="w-full flex items-center">
                      <LogOut size={16} className="mr-2" /> Sign out
                    </button>
                  </DropdownMenuItem>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="ghost"
                asChild
                className="text-slate-300 hover:text-white hover:bg-white/5"
              >
                <Link href="/login">Log in</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-cyan-500/80 to-blue-600/80 hover:from-cyan-500 hover:to-blue-600 text-white border-none font-semibold"
              >
                <Link href="/login">Sign up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative z-50 text-slate-300 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 z-40 bg-slate-950/98 backdrop-blur-lg md:hidden"
            >
              <div className="flex flex-col h-full pt-20 px-6 pb-6">
                {/* User info in mobile menu */}
                {user && (
                  <div className="mb-6 flex items-center gap-3 px-4 py-3 bg-white/5 rounded-lg">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        width={40}
                        height={40}
                        className="rounded-full border border-white/20"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {user.name?.charAt(0) || "U"}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="text-white font-medium">{user.name}</div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  {NavItems.map((item) => (
                    <div key={item.name}>
                      {item.dropdown ? (
                        <div>
                          <button
                            onClick={() => toggleDropdown(item.name)}
                            className={`w-full text-left px-4 py-3 transition-colors flex items-center gap-2 justify-between rounded-lg 
                              ${
                                activeDropdown === item.name ||
                                isDropdownActive(item.dropdown)
                                  ? "bg-white/5 text-white"
                                  : "text-slate-300 hover:text-white hover:bg-white/5"
                              }`}
                          >
                            <div className="flex items-center gap-2">
                              {item.icon}
                              {item.name}
                            </div>
                            <ChevronDown
                              size={16}
                              className={`transition-transform ${
                                activeDropdown === item.name ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {activeDropdown === item.name && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="ml-4 mt-1 border-l border-slate-700 pl-4"
                              >
                                {item.dropdown.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    className={`block px-4 py-2 transition-colors 
                                      ${
                                        isActive(subItem.href)
                                          ? "text-white border-l-2 border-cyan-500 pl-3"
                                          : "text-slate-400 hover:text-white"
                                      }`}
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                      setActiveDropdown(null);
                                    }}
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={`flex items-center gap-2 px-4 py-3 transition-colors rounded-lg
                            ${
                              item.highlight
                                ? isActive(item.href)
                                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                                  : "bg-gradient-to-r from-cyan-500/80 to-blue-600/80 text-white"
                                : isActive(item.href)
                                ? "bg-white/5 text-white border-l-2 border-cyan-500 pl-3"
                                : "text-slate-300 hover:text-white hover:bg-white/5"
                            }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.icon}
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-auto border-t border-slate-800 pt-6 flex flex-col gap-3">
                  {user ? (
                    <form action="/api/auth/signout" method="post">
                      <Button
                        variant="outline"
                        type="submit"
                        className="w-full border-slate-700 text-red-400 hover:text-red-300 hover:border-red-700 justify-start gap-2"
                      >
                        <LogOut size={18} /> Sign out
                      </Button>
                    </form>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        asChild
                        className="w-full border-slate-700 text-slate-300 hover:text-white hover:border-slate-500"
                      >
                        <Link
                          href="/login"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Log in
                        </Link>
                      </Button>
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-none"
                      >
                        <Link
                          href="/signup"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Sign up
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
