import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Fair, fairSchema } from '@/schemas/fair';
import { Button } from '@/components/base/Button';
import { Input } from '@/components/base/Input';
import { Combobox } from '@/components/base/Combobox';
import { getVenues } from '@/api/venues';
import { getOrganisers } from '@/api/organisers';

interface FairFormProps {
  initialData?: Partial<Fair>;
  onSubmit: (data: Fair) => void;
  onCancel: () => void;
}

export function FairForm({ initialData, onSubmit, onCancel }: FairFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Fair>({
    resolver: zodResolver(fairSchema),
    defaultValues: initialData,
  });

  const { data: venues = [], isLoading: isLoadingVenues } = useQuery({
    queryKey: ['venues'],
    queryFn: getVenues,
  });

  const { data: organisers = [], isLoading: isLoadingOrganisers } = useQuery({
    queryKey: ['organisers'],
    queryFn: getOrganisers,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <Input {...register('name')} placeholder="Fair Name" />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register('description')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={3}
            placeholder="Description"
          />
        </div>

        <Controller
          control={control}
          name="venue_id"
          render={({ field }) => (
            <Combobox
              value={field.value}
              onChange={field.onChange}
              options={venues}
              label="Venue"
              placeholder="Select a venue..."
              error={errors.venue_id?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="organiser_id"
          render={({ field }) => (
            <>
            <Combobox
              value={field.value}
              onChange={field.onChange}
              options={organisers}
              label="Organiser"
              placeholder="Select an organiser..."
              error={errors.organiser_id?.message}
            />
          <p>[ORGANISER {JSON.stringify(field.value)}]</p>
            </>
          )}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Access Type
          </label>
          <select
            {...register('access_type')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="b2b">B2B</option>
            <option value="b2c">B2C</option>
          </select>
          {errors.access_type && (
            <p className="mt-1 text-sm text-red-500">
              {errors.access_type.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('dogs_allowed')}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <span className="text-sm text-gray-700">Dogs Allowed</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('handicapped_accessible')}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <span className="text-sm text-gray-700">Handicapped Accessible</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoadingVenues || isLoadingOrganisers}
        >
          {initialData ? 'Update Fair' : 'Create Fair'}
        </Button>
      </div>
    </form>
  );
}