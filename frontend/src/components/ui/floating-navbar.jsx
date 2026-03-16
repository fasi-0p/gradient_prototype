"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../lib/utils";
import { Link, useLocation } from "react-router-dom";

export const FloatingNav = ({
  navItems,
  className,
}) => {
  const { scrollYProgress } = useScroll();
  const location = useLocation();

  // set true for the initial state so that nav bar is visible in the hero section
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] px-8 py-2  items-center justify-center space-x-4",
          className
        )}
        style={{
            backdropFilter: "blur(16px) saturate(180%)",
            backgroundColor: "rgba(18, 18, 26, 0.8)",
            borderRadius: "9999px",
            border: "1px solid rgba(255, 255, 255, 0.125)",
        }}
      >
        {navItems.map((navItem, idx) => {
            const isActive = location.pathname === navItem.link;
            return (
          <Link
            key={`link=${idx}`}
            to={navItem.link}
            className="relative flex items-center space-x-1 px-4 py-2 rounded-full"
            >
            {isActive && (
                <motion.div
                layoutId="navbar-pill"
                className="absolute inset-0 bg-white/10 rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
            )}

            <span className="block sm:hidden relative z-10 text-white">
                {navItem.icon}
            </span>

            <span
                className={cn(
                "hidden sm:block text-sm font-medium relative z-10 transition-colors",
                isActive ? "text-white" : "text-white/80 hover:text-white"
                )}
            >
                {navItem.name}
            </span>
            </Link>
        )})}
        {/* <Link to="/contact" className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
          <span>Join Us</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-[#BCA4FF] to-transparent  h-px" />
        </Link> */}
      </motion.div>
    </AnimatePresence>
  );
};