import React from '../react';

function Child() {
    const [count, setCount] = React.useState(0);
    return (
        <div>
            <p>Child: {count}</p>
            <button onClick={() => setCount(count + 1)}>Add</button>
        </div>
    )
}

function Who() {
    const [count, setCount] = React.useState(0);
    return (
        <div>
            <p>who: {count}</p>
            <button onClick={() => setCount(count + 1)}>Add</button>
        </div>
    )
}

function UseState() {
    const [count, setCount] = React.useState(0);
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Add</button>
            {count > 2 && <Who />}
            <Child />
        </div>
    )
}

export default UseState;
