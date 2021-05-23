import React from './react';
import ReactDOM from './react-dom';

class Sum extends React.Component {
    constructor(props) {
        super(props);
        this.result = React.createRef();
        this.numbers = React.createRef();
    }

    handleSum = () => {
        this.result.current.value = this.numbers.current.getResult();
    }

    render() {
        return (
            <div>
                <Numbers ref={this.numbers}/>
                <WrapperResult ref={this.result}/>
                <p>
                    <button onClick={this.handleSum}>Sum</button>
                </p>
            </div>
        )
    }
}

class Numbers extends React.Component {
    constructor(props) {
        super(props);
        this.number1 = React.createRef();
        this.number2 = React.createRef();
    }

    getResult = () => {
        return parseFloat(this.number1.current.value) + parseFloat(this.number2.current.value);
    }

    render() {
        return <p><input ref={this.number1}/> + <input ref={this.number2}/> = </p>
    }
}

function Result(props, ref) {
    return <input ref={ref}/>
}

const WrapperResult = React.forwardRef(Result);

ReactDOM.render(
    <Sum/>, document.getElementById('root')
);
