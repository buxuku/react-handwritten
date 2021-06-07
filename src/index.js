import React from './react';
import ReactDOM from './react-dom';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show: true};

    }

    handleClick = () => {
        this.setState((state) => ({show: !state.show}));
    }

    render() {
        return this.state.show ? (
                <ul onClick={this.handleClick}>
                    <li key="A" id="1">A</li>
                    {true}
                    <li key="B">B</li>
                    <li key="C">C</li>
                    <li key="D">D</li>
                </ul>
            )
            : (
                <ul onClick={this.handleClick}>
                    <li key="A" id="2">A</li>
                    {null}
                    <li key="C">C</li>
                    <li key="B">B</li>
                    {undefined}
                    <li key="E">E</li>
                    <li key="F">F</li>
                </ul>
            )
    }
}

ReactDOM.render(
    <Counter/>,
    document.getElementById('root')
);
