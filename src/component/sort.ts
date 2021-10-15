import { updateStateWinners } from './update-state';
import store from '../store';

export const setSortOrder = async (sortBy: string): Promise<void> => {
  store.sortOrder = store.sortOrder === 'asc' ? 'desc' : 'asc';
  store.sortBy = sortBy;
  await updateStateWinners();
};
