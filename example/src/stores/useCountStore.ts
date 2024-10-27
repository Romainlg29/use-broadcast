import { shared } from '../../../src/shared';
import { createWithEqualityFn as create } from 'zustand/traditional';

type CountStore = {
	count: number;
	increment: () => void;
	decrement: () => void;

	nestedObj: object,

	bigCount: bigint,

	mode: 'Sync' | 'Not Sync';
	setMode: (mode: 'Sync' | 'Not Sync') => void;
};

export const useCountStore = create<CountStore>()(
	shared(
		(set, get) => ({
			count: 0,
			increment: () => set((s) => ({ count: s.count + 1, bigCount: s.bigCount + 1n, nestedObj: { ...s.nestedObj, innerCount: s.nestedObj.innerCount += 1 } })),
			decrement: () => set((s) => ({ count: s.count - 1, bigCount: s.bigCount - 1n, nestedObj: { ...s.nestedObj, innerCount: s.nestedObj.innerCount -= 1 } })),

			nestedObj: {
				innerFunc: () => console.log("This shouldn't cause errors"),
				innerSymbol: Symbol("hi"),
				innerCount: 0,
				hugeObject: {
					key: 'a really big object'
				},
			},

			bigCount: BigInt(Number.MAX_SAFE_INTEGER)*100n,

			mode: 'Sync',
			setMode: (mode) => set({ mode }),
		}),
		{ name: 'my-store' }
	)
);
