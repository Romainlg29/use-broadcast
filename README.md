# use-broadcast-ts

[![Version](https://img.shields.io/npm/v/use-broadcast-ts?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/use-broadcast-ts)
[![Build Size](https://img.shields.io/bundlephobia/minzip/use-broadcast-ts?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=zustand)
![GitHub Workflow Status (with branch)](https://img.shields.io/github/actions/workflow/status/Romainlg29/use-broadcast/basic.yml?branch=main&colorA=000000&colorB=000000)
![GitHub](https://img.shields.io/github/license/Romainlg29/use-broadcast?&colorA=000000&colorB=000000)

Use the Broadcast Channel API in React easily with hooks and Typescript!

```bash
npm install use-broadcast-ts
```

This package allows you to use the Broadcast API with a simple hook.

## Usage

```jsx
import { FC } from 'react';
import { useBroadcast } from 'use-broadcast-ts';

const MyComponent: FC = () => {
    const {
        state,
        send,
    } = useBroadcast<{ value: number }>('my-channel', { value: 0 })

    return (
        <>
            <p>My value is: {state.value}</p>
            <button onClick={() => send({value: 10})}/>
        </>
    );
};

export default MyComponent;
```

With the example above, the component will re-render when the channel receive or send a value.

```jsx
import { FC, useEffect } from 'react';
import { useBroadcast } from 'use-broadcast-ts';

const MyComponent: FC = () => {
    const {
        send,
        subscribe,
    } = useBroadcast<{ value: number }>('my-channel', { value: 0 }, { subscribe: true })

    useEffect(() => {
        const unsub = subscribe(({value}) => console.log(`My new value is: ${value}`));

        return () => unsub();
    }, []);

    return (
        <>
            <button onClick={() => send({value: 10})}/>
        </>
    );
};

export default MyComponent;
```

With the example above, the component will not re-render when the channel receive or send a value but will call the `subscribe` callback.

## API

### useBroadcast

```ts
useWasm<T>(name: string, value?: T, options?: UseBroadcastOptions): {
    state: T;
    send: (value: T) => void;
    subscribe: (callback: (e: T) => void) => () => void;
};
```

#### Parameters

##### name

Type: `string`

The name of the channel to use.

##### value

Type: `T` (default: `undefined`)

The initial value of the channel.

##### options

Type: `UseBroadcastOptions` (default: `{}`)

The options of the hook.

##### options.subscribe

Type: `boolean | undefined` (default: `undefined`)

If true, the hook will not re-render the component when the channel receive a new value but will call the `subscribe` callback.


#### Return

##### state

Type: `T`

The current value of the channel.

##### send

Type: `(value: T) => void`

Send a new value to the channel.

##### subscribe

Type: `(callback: (e: T) => void) => () => void`

Subscribe to the channel. The callback will be called when the channel receive a new value and when the options.subscribe is set to true.

## What data can I send?

You can send any of the supported types by the structured clone algorithm like :

- `String`
- `Boolean`
- `Number`
- `Array`
- `Object`
- `Date`
- `...`

In short, you cannot send :

- `Function`
- `Dom Element`
- And some other types

See the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) for more information.

## License

MIT