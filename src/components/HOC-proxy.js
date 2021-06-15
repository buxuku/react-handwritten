import React from 'react';

class Button extends React.Component {
    handleClick = () => {
        console.log('handleClick');
    }
    componentDidMount(){
        console.log('button did mount');
    }
    render() {
        return <button onClick={this.handleClick}>点击</button>
    }
}

const withLog = (Component) => {
    return class Wrapper extends Component{
        constructor(props){
            super(props);
        }
        componentDidMount(){
            console.log('Wrapper did mount');
            super.componentDidMount();
        }
        handleClick = () => {
            console.log('Wrapper handleClick' );
        }
        render() {
            return <div>{React.cloneElement(super.render(), {}, "快速点击")}</div>;
        }
    }
}

const WrapperButton = withLog(Button);

export default WrapperButton;
