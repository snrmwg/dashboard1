import { mockVenues } from './mock';

export async function getVenues() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...mockVenues];
}

export function getVenueById(id: number) {
  return mockVenues.find((v) => v.id === id);
}
