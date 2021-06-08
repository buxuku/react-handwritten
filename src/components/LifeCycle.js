import React from "../react";

class ChildOne extends React.Component{
    componentDidMount(){
        console.log('childOne componentDidMount');
    }
    render(){
        return <p>childOne</p>
    }
}

class ChildTwo extends React.Component{
    componentDidMount(){
        console.log('childTwo componentDidMount');
    }
    render(){
        return <p>childTwo</p>
    }
}

class ChildOther extends React.Component{
    componentDidMount(){
        console.log('childOther componentDidMount');
    }
    componentWillReceiveProps(nextProps){
        console.log('childOther componentWillReceiveProps', nextProps );
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('childOther shouldComponentUpdate');
        return nextProps.count % 2 === 0;
    }
    componentWillUpdate(){
        console.log('childOther componentWillUpdate');
    }
    componentDidUpdate(preProps, preState){
        console.log('childOther componentDidUpdate', preProps);
    }
    componentWillUnmount(){
        console.log('childOther componentWillUnmount');
    }
    render(){
        return this.props.count % 2 === 0 ? <Even count={this.props.count} /> : <Singular count={this.props.count} />
    }
}

class Singular extends React.Component{
    componentWillUnmount(){
        console.log('Singular componentWillUnmount');
    }
    render(){
        return <p>Singular: {this.props.count}</p>
    }
}

class Even extends React.Component{
    componentWillUnmount(){
        console.log('even componentWillUnmount');
    }
    render(){
        return <p>Even: {this.props.count} <Even1 /></p>
    }
}
class Even1 extends React.Component{
   componentWillUnmount(){
       console.log('even1 componentWillUnmount');
   }
   render(){
       return (<div><Even2 /></div>)
   }
}

class Even2 extends React.Component{
    componentWillUnmount(){
        console.log('even2 componentWillUnmount');
    }
    render(){
        return 'even2'
    }
}

class LifeCycle extends React.Component {
    static defaultProps = {
        name: 'demo',
    }

    constructor(props) {
        super(props);
        this.state = {count: 0};
        console.log('1.constructor');
    }

    handleClick = () => {
        this.setState({
            count: this.state.count + 1,
        });
    }

    componentWillMount() {
        console.log('2.componentWillMount');
    }

    componentDidMount() {
        console.log('3.componentDidMount',);
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('4.shouldComponentUpdate');
        return nextState.count !== 1;
    }
    componentWillUpdate(){
        console.log('5.componentWillUpdate');
    }
    componentDidUpdate(preProps, preState){
        console.log('6.componentDidUpdate', preState);
    }
    render() {
        const { count } = this.state;
        return (<div>{this.props.name}: {count}
            {count === 1 && <ChildOne/>}
            {count === 2 ? <ChildTwo /> : <ChildOther count={count} />}
            <button onClick={this.handleClick}>+</button>
        </div>)
    }
}

export default LifeCycle;
