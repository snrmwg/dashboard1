import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Venue, venueSchema } from '@/schemas/venue';
import { Button } from '@/components/base/Button';
import { Input } from '@/components/base/Input';

interface VenueFormProps {
  initialData?: Partial<Venue>;
  onSubmit: (data: Venue) => void;
  onCancel: () => void;
}

export function VenueForm({ initialData, onSubmit, onCancel }: VenueFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Venue>({
    resolver: zodResolver(venueSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input {...register('name')} placeholder="Venue Name" />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="flex space-x-2">
        <Button type="submit">Save Venue</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}