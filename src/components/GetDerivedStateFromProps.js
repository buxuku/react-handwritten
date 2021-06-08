import React from '../react';

class GetDerivedStateFromProps extends React.Component{
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

    componentDidMount() {
        console.log('5.componentDidMount',);
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('3.shouldComponentUpdate');
        return nextState.count !== 1;
    }
    componentDidUpdate(preProps, preState){
        console.log('4.componentDidUpdate', preState);
    }
    static getDerivedStateFromProps(props, state){
        console.log('2.getDerivedStateFromProps', props, state);
        return {
            count: 4
        }
    }
    handleForceUpdate = () =>{
        this.forceUpdate()
    }
    render() {
        const { count } = this.state;
        return (<div>{this.props.name}: {count}
            <button onClick={this.handleClick}>+</button>
            <button onClick={this.handleForceUpdate}>forceUpdate</button>
        </div>)
    }
}

export default GetDerivedStateFromProps;
