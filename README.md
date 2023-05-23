# use-wasm-ts

[![Version](https://img.shields.io/npm/v/use-broadcast-ts?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/use-broadcast-ts)
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
    } = useBroadcast<{ value: number }>('my-channel', {value: 0})

    return (
        <>
            <p>My value is: {state.value}</p>
            <button onClick={() => send({value: 10})}/>
        </>
    );
};

export default MyComponent;
```


## API

### useBroadcast

```ts
useWasm<T>(name: string, value?: T): {
    state: T;
    send: (value: T) => void;
};
```

#### Parameters

##### name

Type: `string`

The name of the channel to use.

##### value

Type: `T` (default: `undefined`)

The initial value of the channel.

#### Return

##### state

Type: `T`

The current value of the channel.

##### send

Type: `(value: T) => void`

Send a new value to the channel.

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