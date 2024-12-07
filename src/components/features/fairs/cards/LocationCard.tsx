import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, MapPin } from 'lucide-react';
import { Button } from '@/components/base/Button';
import { Card } from '@/components/base/Card';
import { Modal } from '@/components/base/Modal';
import { LocationForm } from '../forms/LocationForm';
import { updateFair } from '@/api/fairs';
import type { Fair } from '@/schemas/fair';

interface LocationCardProps {
  fair: Fair;
}

export function LocationCard({ fair }: LocationCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateFair,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fairs', fair.id] });
      setIsEditing(false);
    },
  });

  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title>Location</Card.Title>
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4" />
          </Button>
        </Card.Header>
        <Card.Content>
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
            <dl className="flex-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Venue</dt>
                <dd className="mt-1 text-sm text-gray-900">{fair.venue}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">City</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {fair.venue_city_id ? 'City Name' : 'Not specified'}
                </dd>
              </div>
            </dl>
          </div>
        </Card.Content>
      </Card>

      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit Location"
      >
        <LocationForm
          initialData={fair}
          onSubmit={async (data) => {
            await mutation.mutateAsync({ ...data, id: fair.id });
          }}
          onCancel={() => setIsEditing(false)}
        />
      </Modal>
    </>
  );
}