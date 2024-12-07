import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Image as ImageIcon, Upload, X } from 'lucide-react';
import { Button } from '@/components/base/Button';
import { Card } from '@/components/base/Card';
import { Modal } from '@/components/base/Modal';
import { ImageUploader } from '../forms/ImageUploader';
import { updateFair } from '@/api/fairs';
import type { Fair } from '@/schemas/fair';

interface MediaGalleryCardProps {
  fair: Fair;
}

export function MediaGalleryCard({ fair }: MediaGalleryCardProps) {
  const [isUploading, setIsUploading] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateFair,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fairs', fair.id] });
      setIsUploading(false);
    },
  });

  const images = fair.fair_images || [];

  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title>Media Gallery</Card.Title>
          <Button variant="outline" size="sm" onClick={() => setIsUploading(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </Card.Header>
        <Card.Content>
          {images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((fairImage) => (
                <div
                  key={fairImage.image_id}
                  className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100"
                >
                  <img
                    src={fairImage.image?.image_uri}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white"
                      onClick={() => {
                        // Handle image deletion
                      }}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                No images
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Upload images to showcase your fair
              </p>
              <div className="mt-6">
                <Button onClick={() => setIsUploading(true)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Images
                </Button>
              </div>
            </div>
          )}
        </Card.Content>
      </Card>

      <Modal
        isOpen={isUploading}
        onClose={() => setIsUploading(false)}
        title="Upload Images"
      >
        <ImageUploader
          fairId={fair.id!}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ['fairs', fair.id] });
            setIsUploading(false);
          }}
          onCancel={() => setIsUploading(false)}
        />
      </Modal>
    </>
  );
}