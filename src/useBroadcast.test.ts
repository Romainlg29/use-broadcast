import { renderHook } from '@testing-library/react';
import { useBroadcast } from './useBroadcast';

describe('useBroadcast', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return the initial value.', () => {
		const { result } = renderHook(() => useBroadcast<string>('my-channel', 'hello'));

		expect(result.current.state).toBe('hello');
	});

	it('should return undefined if no initial value is provided.', () => {
		const { result } = renderHook(() => useBroadcast<string>('my-channel'));

		expect(result.current.state).toBeUndefined();
	});
});
