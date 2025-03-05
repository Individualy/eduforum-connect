
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedTransitionProps {
  children: ReactNode;
  className?: string;
  type?: 'default' | 'fade' | 'slide' | 'scale' | 'rotate';
}

const variants = {
  default: {
    initial: { opacity: 0, y: 10 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -10 }
  },
  fade: {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  },
  slide: {
    initial: { opacity: 0, x: -20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 20 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.2 }
  },
  rotate: {
    initial: { opacity: 0, rotate: -5 },
    in: { opacity: 1, rotate: 0 },
    out: { opacity: 0, rotate: 5 }
  }
};

const transitions = {
  default: {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  },
  fade: {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.4
  },
  slide: {
    type: 'spring',
    stiffness: 300,
    damping: 30
  },
  scale: {
    type: 'spring',
    stiffness: 400,
    damping: 30
  },
  rotate: {
    type: 'spring',
    stiffness: 200,
    damping: 25
  }
};

const AnimatedTransition = ({ 
  children, 
  className = '',
  type = 'default'
}: AnimatedTransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants[type]}
      transition={transitions[type]}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedTransition;
