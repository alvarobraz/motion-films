'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/utils';
import { ReactNode, Children } from 'react';

export function PortfolioWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        initial: {},
        whileInView: { transition: { staggerChildren: 0.15 } },
      }}
      className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      {Children.map(children, (child) => (
        <motion.div variants={fadeInUp}>{child}</motion.div>
      ))}
    </motion.div>
  );
}
