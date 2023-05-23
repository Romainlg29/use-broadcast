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
});
