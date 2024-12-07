import { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from './Button';
import { Calendar } from './Calendar';
import { Popover } from './Popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !startDate && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {startDate ? (
            <>
              {format(new Date(startDate), 'LLL dd, y')} -{' '}
              {format(new Date(endDate), 'LLL dd, y')}
            </>
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={{
            from: startDate ? new Date(startDate) : undefined,
            to: endDate ? new Date(endDate) : undefined,
          }}
          onSelect={(range) => {
            if (range?.from) {
              onStartDateChange(range.from.toISOString());
            }
            if (range?.to) {
              onEndDateChange(range.to.toISOString());
            }
            setIsOpen(false);
          }}
          numberOfMonths={2}
        />
      </Popover.Content>
    </Popover>
  );
}