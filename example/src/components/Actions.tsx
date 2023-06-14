import Spinner from './Spinner';

import { FC, lazy, Suspense } from 'react';
import { useCountStore } from '../stores/useCountStore';

const SyncIcon = lazy(() => import('../assets/Sync'));
const UnsyncIcon = lazy(() => import('../assets/Unsync'));

const Actions: FC = () => {
	const { mode, increment, decrement, setMode } = useCountStore((s) => ({
		mode: s.mode,
		increment: s.increment,
		decrement: s.decrement,
		setMode: s.setMode,
	}));

	return (
		<>
			<button className="btn w-40 in" onClick={increment}>
				<kbd className="kbd w-6 h-6">+</kbd>
				Increment
			</button>

			<button className="btn w-40 in" onClick={decrement}>
				<kbd className="kbd w-6 h-6">-</kbd>
				Decrement
			</button>

			<div className="dropdown in">
				<label tabIndex={0} className="btn m-1 w-40">
					<kbd className="kbd w-6 h-6">
						<Suspense fallback={<Spinner />}>{mode === 'Sync' ? <SyncIcon /> : <UnsyncIcon />}</Suspense>
					</kbd>
					{mode}
				</label>
				<ul tabIndex={0} className="menu dropdown-content bg-base-100 shadow-lg rounded-box w-40">
					<li>
						<a onClick={() => setMode('Sync')}>Sync</a>
					</li>
					<li>
						<a onClick={() => setMode('Not Sync')}>Not sync</a>
					</li>
				</ul>
			</div>

			<button className="btn btn-outline mt-4 in" onClick={() => window.open('.', '_blank')}>
				Open in new window
			</button>

			{mode === 'Not Sync' && (
				<div className="toast in">
					<div className="alert alert-info">
						<span>This sync mode won't work in this example.</span>
					</div>
				</div>
			)}
		</>
	);
};

export default Actions;
