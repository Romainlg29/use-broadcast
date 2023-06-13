import { create } from 'zustand';
import { shared } from 'use-broadcast-ts';

type CountStore = {
	count: number;
	increment: () => void;
	decrement: () => void;

	mode: 'Sync' | 'Not Sync';
	setMode: (mode: 'Sync' | 'Not Sync') => void;
};

export const useCountStore = create<CountStore>(
	shared(
		(set, get) => ({
			count: 0,
			increment: () => set((s) => ({ count: s.count + 1 })),
			decrement: () => set({ count: get().count - 1 }),

			mode: 'Sync',
			setMode: (mode) => set({ mode }),
		}),
		{ name: 'my-store' }
	)
);
