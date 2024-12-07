import { useState } from 'react';
import { Clock } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

interface TimeRangePickerProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function TimeRangePicker({ value, onChange }: TimeRangePickerProps) {
  const [times, setTimes] = useState(value);

  const handleTimeChange = (index: number, newTime: string) => {
    const newTimes = [...times];
    newTimes[index] = newTime;
    setTimes(newTimes);
    onChange(newTimes);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Opening Hours
      </label>
      {times.map((time, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <Input
            type="time"
            value={time.split('-')[0]}
            onChange={(e) =>
              handleTimeChange(index, `${e.target.value}-${time.split('-')[1]}`)
            }
            className="w-32"
          />
          <span className="text-gray-500">to</span>
          <Input
            type="time"
            value={time.split('-')[1]}
            onChange={(e) =>
              handleTimeChange(index, `${time.split('-')[0]}-${e.target.value}`)
            }
            className="w-32"
          />
        </div>
      ))}
    </div>
  );
}