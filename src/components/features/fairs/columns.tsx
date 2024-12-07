import { ColumnDef } from '@tanstack/react-table';
import { FairActions } from './FairActions';
import type { Fair } from '@/schemas/fair';
import { Link } from 'react-router-dom';

export const createFairColumns = (
  onEdit: (fair: Fair) => void,
  onDelete: (fair: Fair) => void
): ColumnDef<Fair>[] => [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return <Link to={`/fairs/${row.original.id}`}>{row.original.name}</Link>;
    },
  },
  {
    accessorKey: 'venue',
    header: 'Venue',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
            ${
              status === 'upcoming'
                ? 'bg-blue-100 text-blue-800'
                : status === 'ongoing'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <FairActions fair={row.original} onEdit={onEdit} onDelete={onDelete} />
    ),
  },
];
