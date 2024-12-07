import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/base/Button';
import type { Fair } from '@/schemas/fair';

interface FairActionsProps {
  fair: Fair;
  onEdit: (fair: Fair) => void;
  onDelete: (fair: Fair) => void;
}

export function FairActions({ fair, onEdit, onDelete }: FairActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onEdit(fair)}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(fair)}
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
}