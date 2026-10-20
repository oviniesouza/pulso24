import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-emerald-500 text-white hover:bg-emerald-400 active:scale-95 border border-emerald-500 shadow-sm shadow-emerald-500/20',
        outline:
          'border border-[#1F2937] bg-transparent text-gray-300 hover:bg-[#111827] hover:border-emerald-500/50 hover:text-white active:scale-95',
        secondary:
          'bg-cyan-500 text-white hover:bg-cyan-400 active:scale-95 border border-cyan-500 shadow-sm shadow-cyan-500/20',
        ghost:
          'text-gray-400 hover:text-white hover:bg-[#1F2937] active:scale-95',
        destructive:
          'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500 active:scale-95',
        whatsapp:
          'bg-[#25D366] text-white hover:bg-[#20ba59] active:scale-95 border border-[#25D366] font-semibold shadow-sm shadow-[#25D366]/20',
        'outline-emerald':
          'border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400 active:scale-95',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
