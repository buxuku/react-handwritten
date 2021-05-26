import React from './react';
import ReactDOM from './react-dom';


function Number(props) {
    return <p>parent:{props.number}</p>
}

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
        }
    }

    handleClick = () => {
        this.setState({
            count: this.state.count + 1,
        })
    }

    render() {
        return this.props.number % 2 === 0 ? <div>
            <Number number={this.props.number}/>
            <p>this.state:{this.state.count}</p>
            <button onClick={this.handleClick}>Add Count</button>
        </div> : <h1>
            <Number number={this.props.number}/>
            <p>this.state:{this.state.count}</p>
            <button onClick={this.handleClick}>Add Count</button>
        </h1>
    }
}


class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 1
        }
    }

    handleClick = () => {
        this.setState({
            number: this.state.number + 1,
        })
    }

    render() {
        const renderProps = {
            id: this.state.number,
            style: {
                color: 'red',
                backgroundColor: 'green',
            }
        };
        if (this.state.number % 2 === 0) {
            renderProps.title = 'number';
            renderProps.style = {
                backgroundColor: 'yellow',
                fontSize: '20px',
            }
        }
        const renderChild = () => {
            if (this.state.number % 2 === 0) {
                return <input/>
            }
        }
        return (
            <div>
                {true}
                {renderChild()}
                {this.state.number % 2 === 0 && <input/>}
                <p {...renderProps} readOnly>{this.state.number}</p>
                <button onClick={this.handleClick}>add number</button>
                <Counter number={this.state.number}/>
            </div>
        );
    }
}

ReactDOM.render(
    <Hello/>, document.getElementById('root')
);
