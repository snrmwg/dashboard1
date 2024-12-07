import { useQuery } from '@tanstack/react-query';
import { DataTable } from '../../base/DataTable';
import { columns } from './columns';
import { getOrganisers } from '../../../api/organisers';

export function OrganisersPage() {
  const { data: organisers = [] } = useQuery({
    queryKey: ['organisers'],
    queryFn: getOrganisers,
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Organisers</h1>
      </div>
      <DataTable columns={columns} data={organisers} />
    </div>
  );
}