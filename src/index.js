import React from './react';
import ReactDOM from './react-dom';

class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
        }
    }

    handleAdd = async () => {
        this.setState({
            count: this.state.count + 1,
        });
        this.setState({
            count: this.state.count + 1,
        });
        console.log('1:', this.state);
        setTimeout(() => {
            this.setState({
                count: this.state.count + 1,
            })
            console.log('2:', this.state);
            this.setState({
                count: this.state.count + 1,
            })
            console.log('3:', this.state);
        }, 0)
        this.setState({
            count: this.state.count + 1,
        })
        this.setState((state) => ({
            count: state.count + 1,
        }));
        console.log('4:', this.state);
        await new Promise(resolve => {
            setTimeout(() => {
                this.setState({
                    count: this.state.count + 1
                });
                console.log('5:', this.state);
                resolve();
            }, 0);
        })
        this.setState({
            count: this.state.count + 1,
        })
        this.setState({
            count: this.state.count + 1,
        })
        console.log('6:', this.state);
    }

    render() {
        console.log('render', this.state.count);
        return (
            <div>
                <p>number: {this.state.count}</p>
                <button onClick={this.handleAdd}>+</button>
            </div>
        )
    }
}

ReactDOM.render(
    <Hello/>, document.getElementById('root')
);
