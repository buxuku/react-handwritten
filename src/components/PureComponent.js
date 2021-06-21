import React from '../react';

function Child(props) {
    console.log('Child render');
    return <div>
        Child: {props.name}
    </div>
}

const ChildMemo = React.memo(Child);

class PureComponnent extends React.PureComponnent {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            name: 'hello',
        }
    }

    handleAdd = (num = 1) => {
        this.setState({count: this.state.count + num})
    }
    changeName = () => {
        this.setState({
            name: this.state.name + '.'
        })
    }

    render() {
        console.log('PureComponnent render');
        return (
            <div>
                <p>count: {this.state.count}</p>
                <ChildMemo name={this.state.name}/>
                <button onClick={() => this.handleAdd(1)}>+1</button>
                <button onClick={() => this.handleAdd(0)}>nothing</button>
                <button onClick={this.changeName}>nothing</button>
            </div>
        )
    }
}

export default PureComponnent;
