import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getFairById } from '@/api/fairs';
import { BasicInfoCard } from './cards/BasicInfoCard';
import { LocationCard } from './cards/LocationCard';
import { DatesCard } from './cards/DatesCard';
import { AdmissionCard } from './cards/AdmissionCard';
import { MediaGalleryCard } from './cards/MediaGalleryCard';
import { Breadcrumb } from '@/components/base/Breadcrumb';

export function FairDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const fairId = parseInt(id!, 10);

  const { data: fair, isLoading } = useQuery({
    queryKey: ['fairs', fairId],
    queryFn: () => getFairById(fairId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!fair) {
    return <div>Fair not found</div>;
  }

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Fairs', href: '/' },
          { label: fair.name, href: `/fairs/${fair.id}` },
        ]}
      />

      <div className="grid gap-6">
        <BasicInfoCard fair={fair} />
        <LocationCard fair={fair} />
        <DatesCard fair={fair} />
        <AdmissionCard fair={fair} />
        <MediaGalleryCard fair={fair} />
      </div>
    </div>
  );
}