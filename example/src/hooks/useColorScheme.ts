import { useState, useEffect } from 'react';

export const useColorScheme = () => {
	const theme = (() => window.matchMedia('(prefers-color-scheme: dark)').matches)();

	const [isDark, setIsDark] = useState<boolean>(theme);

	useEffect(() => {
		const listener = window.matchMedia('(prefers-color-scheme: dark)');

		listener.addEventListener('change', (e) => setIsDark(e.matches));

		return () => listener.removeEventListener('change', (e) => setIsDark(e.matches));
	}, []);

	return isDark;
};
