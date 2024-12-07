import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Fair, fairSchema } from '@/schemas/fair';
import { Button } from '@/components/base/Button';
import { SearchSelect } from '@/components/base/SearchSelect';
import { getVenues } from '@/api/venues';

interface LocationFormProps {
  initialData: Partial<Fair>;
  onSubmit: (data: Fair) => void;
  onCancel: () => void;
}

export function LocationForm({
  initialData,
  onSubmit,
  onCancel,
}: LocationFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Fair>({
    resolver: zodResolver(fairSchema),
    defaultValues: initialData,
  });

  const { data: venues = [] } = useQuery({
    queryKey: ['venues'],
    queryFn: getVenues,
  });

  const loadVenue = async (id: number) => {
    return venues.find((venue) => venue.id === id) || null;
  };

  const searchVenues = async (query: string) => {
    return venues.filter((venue) =>
      venue.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Venue
        </label>
        <Controller
          name="venue_id"
          control={control}
          render={({ field }) => (
            <SearchSelect
              value={field.value ?? null}
              onChange={field.onChange}
              loadItem={loadVenue}
              searchItems={searchVenues}
              getItemId={(item) => item.id}
              getItemLabel={(item) => item?.name}
              placeholder="Search for a venue..."
              error={errors.venue_id?.message}
            />
          )}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
