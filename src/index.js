import React from './react';
import ReactDOM from './react-dom';

function Count({number}){
    return <p>countNumber: {number}</p>
}

class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
        }
    }
    handleAdd = () => {
        this.setState({
            count: this.state.count + 1,
        });
    }

    render() {
        return (
            <div>
                number: {this.state.count}
                <Count number={this.state.count} />
                <p>
                    <button onClick={this.handleAdd}>+</button>
                </p>
            </div>
        )
    }
}

ReactDOM.render(
    <Hello name='world'/>, document.getElementById('root')
);
