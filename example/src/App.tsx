import Spinner from './components/Spinner';
import { lazy, Suspense } from 'react';

const Code = lazy(() => import('./components/Code'));
const Actions = lazy(() => import('./components/Actions'));

const Github = lazy(() => import('./assets/Github'));
const Npm = lazy(() => import('./assets/Npm'));

const App = () => {
	return (
		<div className="w-screen h-screen flex items-center justify-center gap-2">
			<div className="toast toast-top toast-end animate-in">
				<div className="alert gap-2">
					<button
						className="btn btn-square btn-sm"
						onClick={() => window.open('https://www.npmjs.com/package/use-broadcast-ts', '_blank', 'noopener')}
					>
						<kbd className="kbd w-8 h-8">
							<Suspense fallback={<Spinner />}>
								<Npm />
							</Suspense>
						</kbd>
					</button>
					<button
						className="btn btn-square btn-sm"
						onClick={() => window.open('https://github.com/Romainlg29/use-broadcast', '_blank', 'noopener')}
					>
						<kbd className="kbd w-8 h-8">
							<Suspense fallback={<Spinner />}>
								<Github />
							</Suspense>
						</kbd>
					</button>
				</div>
			</div>

			<Suspense
				fallback={
					<div className="flex items-center justify-center">
						<Spinner />
					</div>
				}
			>
				<div className="mockup-code animate-in">
					<Code />
				</div>
			</Suspense>

			<div className="w-1/4 flex justify-center items-center">
				<Suspense fallback={<Spinner />}>
					<Actions />
				</Suspense>
			</div>
		</div>
	);
};

export default App;
