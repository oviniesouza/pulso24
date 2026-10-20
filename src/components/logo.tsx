'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  animated?: boolean;
}

const sizes = {
  sm: { icon: 28, fontSize: 'text-lg', gap: 'gap-1.5' },
  md: { icon: 36, fontSize: 'text-xl', gap: 'gap-2' },
  lg: { icon: 48, fontSize: 'text-2xl', gap: 'gap-3' },
  xl: { icon: 64, fontSize: 'text-3xl', gap: 'gap-3' },
};

export function Logo({ size = 'md', showText = true, className, animated = true }: LogoProps) {
  const { icon, fontSize, gap } = sizes[size];
  const w = icon;
  const h = icon;

  // Heartbeat path through the chat bubble
  // Points: flat line entry → spike up → spike down → flat line exit
  const heartbeatPath = `M${w*0.12},${h*0.52} L${w*0.28},${h*0.52} L${w*0.35},${h*0.35} L${w*0.42},${h*0.68} L${w*0.50},${h*0.38} L${w*0.58},${h*0.62} L${w*0.65},${h*0.52} L${w*0.88},${h*0.52}`;

  return (
    <div className={cn('flex items-center', gap, className)}>
      <motion.div
        className="relative flex-shrink-0"
        animate={animated ? { scale: [1, 1.04, 1, 1.02, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Pulso 24 logo"
        >
          {/* Chat bubble body — sharp corners, premium feel */}
          <path
            d={`M${w*0.08},${h*0.1} L${w*0.92},${h*0.1} Q${w*0.96},${h*0.1} ${w*0.96},${h*0.14} L${w*0.96},${h*0.72} Q${w*0.96},${h*0.76} ${w*0.92},${h*0.76} L${w*0.35},${h*0.76} L${w*0.18},${h*0.92} L${w*0.22},${h*0.76} L${w*0.08},${h*0.76} Q${w*0.04},${h*0.76} ${w*0.04},${h*0.72} L${w*0.04},${h*0.14} Q${w*0.04},${h*0.1} ${w*0.08},${h*0.1} Z`}
            fill="#111827"
            stroke="#10B981"
            strokeWidth="1.5"
          />

          {/* Heartbeat / pulse line */}
          <motion.path
            d={heartbeatPath}
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          {/* Secondary cyan dot — IA indicator */}
          <motion.circle
            cx={w * 0.88}
            cy={h * 0.15}
            r={w * 0.065}
            fill="#06B6D4"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn('font-bold tracking-tight text-white', fontSize)}>
            Pulso{' '}
            <span className="text-emerald-400">24</span>
          </span>
          {size !== 'sm' && (
            <span className="text-[10px] text-gray-500 tracking-widest uppercase mt-0.5">
              Atendimento 24/7
            </span>
          )}
        </div>
      )}
    </div>
  );
}
