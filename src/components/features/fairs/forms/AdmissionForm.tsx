import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { Fair, fairSchema } from '@/schemas/fair';
import { Button } from '@/components/base/Button';
import { Input } from '@/components/base/Input';

interface AdmissionFormProps {
  initialData: Partial<Fair>;
  onSubmit: (data: Fair) => void;
  onCancel: () => void;
}

export function AdmissionForm({ initialData, onSubmit, onCancel }: AdmissionFormProps) {
  const defaultAdmissions = initialData.fair_dates?.[0]?.admissions_json
    ? JSON.parse(initialData.fair_dates[0].admissions_json)
    : [];

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fair>({
    resolver: zodResolver(fairSchema),
    defaultValues: {
      ...initialData,
      fair_dates: [
        {
          ...initialData.fair_dates?.[0],
          admissions_json: JSON.stringify(defaultAdmissions),
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'admissions',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium text-gray-900">
                Ticket Type {index + 1}
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

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <Input
                  {...register(`admissions.${index}.type`)}
                  placeholder="e.g., Regular, Student, Early Bird"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <Input
                  type="number"
                  step="0.01"
                  {...register(`admissions.${index}.price`)}
                  placeholder="0.00"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  {...register(`admissions.${index}.description`)}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Additional information about this ticket type"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Valid From
                </label>
                <Input
                  type="date"
                  {...register(`admissions.${index}.validFrom`)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Valid To
                </label>
                <Input
                  type="date"
                  {...register(`admissions.${index}.validTo`)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append({
            type: '',
            price: 0,
            description: '',
            validFrom: '',
            validTo: '',
          })
        }
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Ticket Type
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