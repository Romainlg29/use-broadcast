import { FC } from 'react';
import { useCountStore } from '../stores/useCountStore';

const tab = '    ';

const Code: FC = () => {
	const { count, mode } = useCountStore((s) => ({ count: s.count, mode: s.mode }));

	return (
		<>
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
		</>
	);
};

export default Code;
