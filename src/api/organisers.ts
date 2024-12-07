import { mockOrganisers } from './mock';

export async function getOrganisers() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockOrganisers;
}
