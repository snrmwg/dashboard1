import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Ticket } from 'lucide-react';
import { Button } from '@/components/base/Button';
import { Card } from '@/components/base/Card';
import { Modal } from '@/components/base/Modal';
import { AdmissionForm } from '../forms/AdmissionForm';
import { updateFair } from '@/api/fairs';
import { formatCurrency } from '@/lib/format';
import type { Fair } from '@/schemas/fair';

interface AdmissionCardProps {
  fair: Fair;
}

export function AdmissionCard({ fair }: AdmissionCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateFair,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fairs', fair.id] });
      setIsEditing(false);
    },
  });

  const admissions = fair.fair_dates?.[0]?.admissions_json 
    ? JSON.parse(fair.fair_dates[0].admissions_json)
    : [];

  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title>Admission & Pricing</Card.Title>
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4" />
          </Button>
        </Card.Header>
        <Card.Content>
          <div className="flex items-start space-x-3">
            <Ticket className="h-5 w-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              {admissions.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {admissions.map((admission: any, index: number) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium text-gray-900">
                          {admission.type}
                        </h4>
                        <span className="text-sm font-semibold text-gray-900">
                          {formatCurrency(admission.price)}
                        </span>
                      </div>
                      {admission.description && (
                        <p className="text-sm text-gray-500">
                          {admission.description}
                        </p>
                      )}
                      {admission.validFrom && admission.validTo && (
                        <p className="text-xs text-gray-500">
                          Valid: {admission.validFrom} - {admission.validTo}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No admission information available</p>
              )}
            </div>
          </div>
        </Card.Content>
      </Card>

      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit Admission & Pricing"
      >
        <AdmissionForm
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