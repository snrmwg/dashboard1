import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { Fair, fairSchema } from '@/schemas/fair';
import { Button } from '@/components/base/Button';
import { DateRangePicker } from '@/components/base/DateRangePicker';
import { TimeRangePicker } from '@/components/base/TimeRangePicker';

interface DatesFormProps {
  initialData: Partial<Fair>;
  onSubmit: (data: Fair) => void;
  onCancel: () => void;
}

export function DatesForm({ initialData, onSubmit, onCancel }: DatesFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fair>({
    resolver: zodResolver(fairSchema),
    defaultValues: {
      ...initialData,
      fair_dates: initialData.fair_dates || [{ 
        start_date: '', 
        end_date: '',
        openinghours_json: JSON.stringify(['09:00-17:00']),
        cancelled: false 
      }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fair_dates',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium text-gray-900">
                Date Range {index + 1}
              </h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>

            <DateRangePicker
              startDate={field.start_date}
              endDate={field.end_date}
              onStartDateChange={(date) => {
                // Update start date
              }}
              onEndDateChange={(date) => {
                // Update end date
              }}
            />

            <TimeRangePicker
              value={JSON.parse(field.openinghours_json || '[]')}
              onChange={(times) => {
                // Update opening hours
              }}
            />

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register(`fair_dates.${index}.cancelled`)}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">Mark as cancelled</span>
            </label>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => append({ 
          start_date: '', 
          end_date: '',
          openinghours_json: JSON.stringify(['09:00-17:00']),
          cancelled: false 
        })}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Date Range
      </Button>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}