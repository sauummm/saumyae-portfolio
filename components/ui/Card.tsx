'use client';

import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLMotionProps<'div'> {
  hover?: boolean;
}

export function Card({ hover = true, className, children, ...props }: CardProps) {
  return (
    <motion.div
      className={cn(
        'rounded-xl border border-border bg-card p-6 shadow-sm transition-[border-color,box-shadow] duration-300',
        hover && 'hover:border-accent/40 hover:shadow-xl hover:shadow-accent/15',
        className
      )}
      {...(hover ? { whileHover: { y: -6, scale: 1.01 }, transition: { type: 'spring', stiffness: 300, damping: 22 } } : {})}
      {...props}
    >
      {children}
    </motion.div>
  );
}
