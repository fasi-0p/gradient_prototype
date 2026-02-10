import React from 'react';
import { motion } from 'framer-motion';

/**
 * Page Transition Wrapper Component
 * 
 * Provides smooth page transitions with multiple animation variants
 * 
 * Usage:
 * <PageTransition variant="fade">
 *   <YourPageContent />
 * </PageTransition>
 */

// Animation variants for different transition styles
const variants = {
  // Simple fade transition
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  
  // Slide up with fade
  slideUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  
  // Slide from right
  slideRight: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  },
  
  // Scale transition (cinematic)
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 }
  },
  
  // Cinematic reveal (curtain effect)
  reveal: {
    initial: { 
      opacity: 0, 
      clipPath: 'inset(0 0 100% 0)'
    },
    animate: { 
      opacity: 1, 
      clipPath: 'inset(0 0 0% 0)'
    },
    exit: { 
      opacity: 0, 
      clipPath: 'inset(100% 0 0 0)'
    }
  },
  
  // Blur transition
  blur: {
    initial: { opacity: 0, filter: 'blur(10px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(5px)' }
  }
};

// Transition configurations
const transitions = {
  fade: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  slideUp: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  slideRight: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  reveal: { duration: 0.7, ease: [0.77, 0, 0.175, 1] },
  blur: { duration: 0.4, ease: 'easeOut' }
};

const PageTransition = ({ 
  children, 
  variant = 'slideUp',
  className = '',
  delay = 0
}) => {
  const selectedVariant = variants[variant] || variants.slideUp;
  const selectedTransition = transitions[variant] || transitions.slideUp;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={selectedVariant}
      transition={{ ...selectedTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Staggered children animation wrapper
 * Children animate one after another
 */
export const StaggerContainer = ({ 
  children, 
  staggerDelay = 0.1,
  className = ''
}) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: staggerDelay
          }
        },
        exit: {
          transition: {
            staggerChildren: staggerDelay / 2,
            staggerDirection: -1
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Individual stagger item (use inside StaggerContainer)
 */
export const StaggerItem = ({ 
  children, 
  className = '',
  variant = 'slideUp'
}) => {
  const itemVariants = {
    slideUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -15 }
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 }
    }
  };

  return (
    <motion.div
      variants={itemVariants[variant] || itemVariants.slideUp}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Full page overlay transition (for dramatic page changes)
 */
export const PageOverlayTransition = ({ isActive, color = '#030014' }) => {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: isActive ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: color,
        transformOrigin: isActive ? 'top' : 'bottom',
        zIndex: 9999,
        pointerEvents: 'none'
      }}
    />
  );
};

export default PageTransition;
