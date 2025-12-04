import { Variants } from "framer-motion";

// Core animation variants library
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 60 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -60,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -60 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.3,
    },
  },
};

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -100 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 100 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Hover interactions
export const hoverScale = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

export const hoverLift = {
  rest: { y: 0, boxShadow: "0 0 0 rgba(0,0,0,0)" },
  hover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// Scroll-based animations
export const parallax = (speed: number = 0.5) => ({
  initial: { y: 0 },
  animate: {
    y: speed * -100,
    transition: {
      duration: 0,
    },
  },
});

// Magnetic effect
export const magnetic = {
  x: 0,
  y: 0,
  transition: {
    type: "spring",
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  },
};

// Reveal animations
export const revealUp: Variants = {
  initial: { y: "100%", opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const clipReveal: Variants = {
  initial: { clipPath: "inset(0 100% 0 0)" },
  animate: {
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 1,
      ease: [0.77, 0, 0.175, 1],
    },
  },
};
