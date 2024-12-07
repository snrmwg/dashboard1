import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DataTable } from '../../base/DataTable';
import { createFairColumns } from './columns';
import { getFairs, createFair, updateFair, deleteFair } from '@/api/fairs';
import { Button } from '@/components/base/Button';
import { Modal } from '@/components/base/Modal';
import { FairForm } from './FairForm';
import { Plus } from 'lucide-react';
import { useDisclosure } from '@/hooks/useDisclosure';
import type { Fair } from '@/schemas/fair';

export function FairsPage() {
  const queryClient = useQueryClient();
  const { isOpen, open, close } = useDisclosure();
  const [selectedFair, setSelectedFair] = useState<Fair | null>(null);

  const { data: fairs = [] } = useQuery({
    queryKey: ['fairs'],
    queryFn: getFairs,
  });

  const createMutation = useMutation({
    mutationFn: createFair,
    onSuccess: () => {
      console.log('created fair');
      queryClient.invalidateQueries({ queryKey: ['fairs'] });
      close();
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateFair,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fairs'] });
      close();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFair,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fairs'] });
    },
  });

  const handleEdit = (fair: Fair) => {
    setSelectedFair(fair);
    open();
  };

  const handleDelete = async (fair: Fair) => {
    if (confirm('Are you sure you want to delete this fair?')) {
      await deleteMutation.mutateAsync(fair.id!);
    }
  };

  const handleSubmit = async (data: Fair) => {
    if (selectedFair) {
      await updateMutation.mutateAsync({ ...data, id: selectedFair.id });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  const handleAddNew = () => {
    setSelectedFair(null);
    open();
  };

  const columns = createFairColumns(handleEdit, handleDelete);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Fairs</h1>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add Fair
        </Button>
      </div>
      <DataTable columns={columns} data={fairs} />

      <Modal
        isOpen={isOpen}
        onClose={close}
        title={selectedFair ? 'Edit Fair' : 'Create Fair'}
      >
        <FairForm
          initialData={selectedFair || undefined}
          onSubmit={handleSubmit}
          onCancel={close}
        />
      </Modal>
    </div>
  );
}
