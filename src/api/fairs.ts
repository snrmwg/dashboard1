import { mockFairs as initialMockFairs } from './mock';
import type { Fair } from '@/schemas/fair';
import { getVenueById } from './venues';

let mockFairs = [...initialMockFairs];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getFairs() {
  await delay(500);
  return [...mockFairs];
}

export async function createFair(fair: Fair) {
  await delay(500);
  const newFair = {
    ...fair,
    id: Math.max(...mockFairs.map((f) => f.id)) + 1,
    venue: await getVenueById(fair.venue_id)?.name,
  };
  console.log('createFair', fair);
  mockFairs.push(newFair);
  return newFair;
}

export async function updateFair(fair: Fair) {
  await delay(500);
  const index = mockFairs.findIndex((f) => f.id === fair.id);
  if (index !== -1) {
    const updatedFair = {
      ...fair,
      venue: await getVenueById(fair.venue_id)?.name,
    };
    console.log('updateFair', index, updatedFair);
    mockFairs[index] = updatedFair;
  }
  return fair;
}

export async function deleteFair(id: number) {
  await delay(500);
  mockFairs = mockFairs.filter((f) => f.id !== id);
  return { success: true };
}

export function getFairById(id: number) {
  return mockFairs.find((f) => f.id === id);
}
