"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Home, Megaphone, User, Image as ImageIcon, Mail } from "lucide-react";

const Header = () => {
  const pathname = usePathname() ?? "";
  const [isLightMode, setIsLightMode] = useState(false);

  const navLinks = [
    { href: "/", icon: Home },
    { href: "/announcements", label: "Announcements", icon: Megaphone },
    { href: "/about", label: "About Us", icon: User },
    { href: "/gallery", label: "Gallery", icon: ImageIcon },
    { href: "/contact", label: "Contact Us", icon: Mail },
  ];

  useEffect(() => {
    const sections = document.querySelectorAll("[data-navbar-theme]");

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute("data-navbar-theme");
            setIsLightMode(theme === "light");
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-100px 0px -60% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <nav
        className={`px-2 py-2 rounded-full backdrop-blur-xl border shadow-xl transition-all duration-500
        ${
          isLightMode
            ? "bg-white/90 border-gray-200/50"
            : "bg-gray-900/50 border-gray-700/50"
        }`}
      >
        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            const Icon = link.icon;
            const isHome = link.href === "/";

            return (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 whitespace-nowrap
                  ${
                    isHome ? "px-2 py-2 rounded-full" : "px-5 py-2 rounded-full"
                  }
                  ${
                    isActive
                      ? "bg-[#C9A227] text-black shadow-lg shadow-[#C9A227]/20 scale-105"
                      : isLightMode
                      ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <Icon size={18} />
                  {!isHome && (
                    <span className="hidden sm:inline">{link.label}</span>
                  )}
                </Link>

                {/* Divider after Home */}
                {isHome && (
                  <div
                    className={`h-8 w-px mx-1 transition-colors duration-300 ${
                      isLightMode ? "bg-gray-300" : "bg-gray-600"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Header;
