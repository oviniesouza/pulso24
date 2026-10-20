import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 border px-2 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
        secondary: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
        outline: 'border-[#1F2937] text-gray-400',
        destructive: 'border-red-500/30 bg-red-500/10 text-red-400',
        warning: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
        success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
