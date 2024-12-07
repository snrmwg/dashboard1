import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Calendar } from 'lucide-react';
import { Button } from '@/components/base/Button';
import { Card } from '@/components/base/Card';
import { Modal } from '@/components/base/Modal';
import { DatesForm } from '../forms/DatesForm';
import { updateFair } from '@/api/fairs';
import { formatDate } from '@/lib/dates';
import type { Fair } from '@/schemas/fair';

interface DatesCardProps {
  fair: Fair;
}

export function DatesCard({ fair }: DatesCardProps) {
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
          <Card.Title>Dates & Schedule</Card.Title>
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4" />
          </Button>
        </Card.Header>
        <Card.Content>
          <div className="flex items-start space-x-3">
            <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {fair.fair_dates?.map((date) => (
                  <div key={date.id} className="border-b pb-4 last:border-b-0">
                    <dt className="text-sm font-medium text-gray-500">
                      {date.cancelled ? 'Cancelled' : 'Active'} Date Range
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formatDate(date.start_date)} - {formatDate(date.end_date)}
                    </dd>
                    {date.openinghours_json && (
                      <dd className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">Hours:</span>{' '}
                        {JSON.parse(date.openinghours_json).join(', ')}
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Card.Content>
      </Card>

      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit Dates & Schedule"
      >
        <DatesForm
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