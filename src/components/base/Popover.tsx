import { Fragment } from 'react';
import { Popover as HeadlessPopover, Transition } from '@headlessui/react';
import { cn } from '@/lib/utils';

interface PopoverProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Popover({ children, open, onOpenChange }: PopoverProps) {
  return (
    <HeadlessPopover className="relative">
      {({ open: internalOpen }) => (
        <>
          {children}
          {(open ?? internalOpen) && (
            <div className="fixed inset-0 z-40" onClick={() => onOpenChange?.(false)} />
          )}
        </>
      )}
    </HeadlessPopover>
  );
}

function PopoverTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  return (
    <HeadlessPopover.Button as={asChild ? 'div' : undefined}>
      {children}
    </HeadlessPopover.Button>
  );
}

function PopoverContent({
  children,
  className,
  align = 'center',
}: {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
}) {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <HeadlessPopover.Panel
        className={cn(
          'absolute z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white shadow-md animate-in',
          {
            'left-0': align === 'start',
            'left-1/2 -translate-x-1/2': align === 'center',
            'right-0': align === 'end',
          },
          className
        )}
      >
        {children}
      </HeadlessPopover.Panel>
    </Transition>
  );
}

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;

export { Popover };