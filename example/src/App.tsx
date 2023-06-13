import { useCountStore } from './stores/useCountStore';
import SyncIcon from './assets/Sync';
import UnsyncIcon from './assets/Unsync';

const tab = '    ';

const App = () => {
	const { count, increment, decrement, mode, setMode } = useCountStore((s) => ({
		count: s.count,
		increment: s.increment,
		decrement: s.decrement,
		mode: s.mode,
		setMode: s.setMode,
	}));

	return (
		<div className="flex items-center justify-center w-screen h-screen">
			<div className="mockup-code">
				<pre data-prefix="1">
					<code className="text-purple-400">
						import <span className="text-yellow-400">&#123;</span> <span className="text-blue-300">create</span>{' '}
						<span className="text-yellow-400">&#125;</span> from <span className="text-yellow-600">'zustand'</span>
						<span className="text-white">;</span>
					</code>
				</pre>
				<pre data-prefix="2">
					<code className="text-purple-400">
						import <span className="text-yellow-400">&#123;</span> <span className="text-blue-300">shared</span>{' '}
						<span className="text-yellow-400">&#125;</span> from{' '}
						<span className="text-yellow-600">'use-broadcast-ts'</span>
						<span className="text-white">;</span>
					</code>
				</pre>
				<pre data-prefix="3"></pre>
				<pre data-prefix="4">
					<code className="text-blue-400">
						type <span className="text-green-400">CountStore</span> = <span className="text-yellow-400">&#123;</span>
					</code>
				</pre>
				<pre data-prefix="5">
					<code>
						{tab}
						<span className="text-blue-300">count:</span> <span className="text-green-400">number</span>
						<span className="text-white">;</span>
					</code>
				</pre>
				<pre data-prefix="6">
					<code className="text-yellow-400">
						{tab}increment: <span className="text-purple-400">()</span> <span className="text-blue-400">=&gt;</span>{' '}
						<span className="text-green-400">void</span>
						<span className="text-white">;</span>
					</code>
				</pre>
				<pre data-prefix="7">
					<code className="text-yellow-400">
						{tab}decrement: <span className="text-purple-400">()</span> <span className="text-blue-400">=&gt;</span>{' '}
						<span className="text-green-400">void</span>
						<span className="text-white">;</span>
					</code>
				</pre>
				<pre data-prefix="8">
					<code className="text-yellow-400">&#125;;</code>
				</pre>
				<pre data-prefix="9"></pre>
				<pre data-prefix="10">
					<code>
						<span className="text-purple-400">export</span> <span className="text-blue-400">const</span>{' '}
						<span className="text-blue-300">useCountStore</span> = <span className="text-yellow-400">create{'<'}</span>
						<span className="text-green-400">CountStore</span>
						<span className="text-yellow-400">{'>('}</span>{' '}
					</code>
				</pre>
				<pre data-prefix="11">
					<code>
						{tab}
						<span className="text-yellow-400">shared</span>
						<span className="text-purple-400">{'('}</span>
					</code>
				</pre>
				<pre data-prefix="12">
					<code>
						{tab}
						{tab}
						<span className="text-blue-400">{'('}</span>
						<span className="text-yellow-400">set</span>
						<span className="text-white">, </span>
						<span className="text-yellow-400">get</span>
						<span className="text-blue-400">{') => ('}</span>
						<span className="text-yellow-400">{'{'}</span>
					</code>
				</pre>
				<pre data-prefix="13">
					<code>
						{tab}
						{tab}
						{tab}
						<span className="text-blue-300">count:</span> <span className="text-green-400">{count}</span>,
					</code>
				</pre>
				<pre data-prefix="14">
					<code>
						{tab}
						{tab}
						{tab}
						<span className="text-yellow-400">decrement</span>
						<span className="text-blue-400">:</span> <span className="text-purple-400">()</span>{' '}
						<span className="text-blue-400">=&gt;</span> <span className="text-yellow-400">set</span>
						<span className="text-purple-400">{'('}</span>
						<span className="text-yellow-400">{'{'}</span> <span className="text-blue-300">count:</span>{' '}
						<span className="text-yellow-400">get()</span>
						<span className="text-white">.</span>
						<span className="text-blue-300">count</span>
						<span className="text-white"> + </span>
						<span className="text-green-400">1</span> <span className="text-yellow-400">{'}'}</span>
						<span className="text-purple-400">{')'}</span>,
					</code>
				</pre>
				<pre data-prefix="15">
					<code>
						{tab}
						{tab}
						{tab}
						<span className="text-yellow-400">decrement</span>
						<span className="text-blue-400">:</span> <span className="text-purple-400">()</span>{' '}
						<span className="text-blue-400">=&gt;</span> <span className="text-yellow-400">set</span>
						<span className="text-purple-400">{'('}</span>
						<span className="text-yellow-400">{'{'}</span> <span className="text-blue-300">count:</span>{' '}
						<span className="text-yellow-400">get()</span>
						<span className="text-white">.</span>
						<span className="text-blue-300">count</span>
						<span className="text-white"> - </span>
						<span className="text-green-400">1</span> <span className="text-yellow-400">{'}'}</span>
						<span className="text-purple-400">{')'}</span>,
					</code>
				</pre>
				<pre data-prefix="16">
					<code>
						{tab}
						{tab}
						<span className="text-yellow-400">{'}'}</span>
						<span className="text-blue-400">{')'}</span>,
					</code>
				</pre>
				<pre data-prefix="17">
					<code>
						{tab}
						{tab}
						<span className="text-blue-400">{'{'}</span> <span className="text-blue-300">name:</span>{' '}
						<span className="text-yellow-600">'count-store'</span>
						{mode === 'Not Sync' ? (
							<>
								, <span className="text-blue-300">unsync: </span>
								<span className="text-blue-400">true</span>
							</>
						) : (
							''
						)}{' '}
						<span className="text-blue-400">{'}'}</span>
					</code>
				</pre>
				<pre data-prefix="18">
					<code>
						{tab}
						<span className="text-purple-400">{')'}</span>
					</code>
				</pre>
				<pre data-prefix="19">
					<code>
						<span className="text-yellow-400">{')'}</span>
						<span className="text-white">{';'}</span>
					</code>
				</pre>
			</div>
			<div className="flex flex-col items-center justify-center w-1/4 h-1/4 gap-4">
				<button className="btn w-40" onClick={increment}>
					<kbd className="kbd w-6 h-6">+</kbd>
					Increment
				</button>

				<button className="btn w-40" onClick={decrement}>
					<kbd className="kbd w-6 h-6">-</kbd>
					Decrement
				</button>

				<div className="dropdown">
					<label tabIndex={0} className="btn m-1 w-40">
						<kbd className="kbd w-6 h-6">{mode === 'Sync' ? <SyncIcon /> : <UnsyncIcon />}</kbd>
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

				<button className="btn btn-outline mt-4" onClick={() => window.open('.', '_blank')}>
					Open in new window
				</button>
			</div>

			{mode === 'Not Sync' && (
				<div className="toast">
					<div className="alert alert-info">
						<span>This sync mode won't work in this example.</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default App;
