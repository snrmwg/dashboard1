import { useQuery } from '@tanstack/react-query';
import { DataTable } from '../../base/DataTable';
import { columns } from './columns';
import { getVenues } from '@/api/venues';

export function VenuesPage() {
  const { data: venues = [] } = useQuery({
    queryKey: ['venues'],
    queryFn: getVenues,
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Venues</h1>
      </div>
      <DataTable columns={columns} data={venues} />
    </div>
  );
}
