import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/base/Button';
import { Card } from '@/components/base/Card';
import { Modal } from '@/components/base/Modal';
import { BasicInfoForm } from '../forms/BasicInfoForm';
import { updateFair } from '@/api/fairs';
import type { Fair } from '@/schemas/fair';

interface BasicInfoCardProps {
  fair: Fair;
}

export function BasicInfoCard({ fair }: BasicInfoCardProps) {
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
          <Card.Title>Basic Information</Card.Title>
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4" />
          </Button>
        </Card.Header>
        <Card.Content>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{fair.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900">{fair.description}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Access Type</dt>
              <dd className="mt-1 text-sm text-gray-900">{fair.access_type}</dd>
            </div>
          </dl>
        </Card.Content>
      </Card>

      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit Basic Information"
      >
        <BasicInfoForm
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