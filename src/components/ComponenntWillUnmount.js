import React from '../react';

class A extends React.Component {
    componentWillUnmount() {
        console.log('A');
    }

    render() {
        return (
            <div>
                {this.props.children}
                <B/>
                <C/>
            </div>
        )
    }
}

class B extends React.Component {
    componentWillUnmount() {
        console.log('B');
    }

    render() {
        return (
            <div>
                <D/>
                <E/>
            </div>
        )
    }
}

class C extends React.Component {
    componentWillUnmount() {
        console.log('C');
    }

    render() {
        return (
            <div>C
            </div>
        )
    }
}

class D extends React.Component {
    componentWillUnmount() {
        console.log('D');
    }

    render() {
        return (
            <div>D
            </div>
        )
    }
}

class E extends React.Component {
    componentWillUnmount() {
        console.log('E');
    }

    render() {
        return (
            <div>E
            </div>
        )
    }
}

function Y(){
    return <div>function component: <Z /></div>
}

class Z extends React.Component {
    componentWillUnmount() {
        console.log('Z');
    }

    render() {
        return (
            <div>Z
            </div>
        )
    }
}

class Wrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        }
    }

    render() {
        return <div onClick={() => this.setState({show: !this.state.show})}>{this.state.show ? <A /> : <Y />}</div>
    }
}

export default Wrapper;

