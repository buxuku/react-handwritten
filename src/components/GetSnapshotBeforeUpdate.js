import React from '../react';

let id = 0;

class GetSnapshotBeforeUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: []
        }
        this.wrapper = React.createRef();
    }
    handleClick = () => {
        this.setState({
            message: [id++, ...this.state.message],
        })
    }
    getSnapshotBeforeUpdate(){
        return {
            prevScrollTop: this.wrapper.current.scrollTop, //更新前的滚动条位置
            prevScrollHeight: this.wrapper.current.scrollHeight, //更新前容器的高度
        }
    }
    componentDidUpdate(prevProps, prevState, {prevScrollTop, prevScrollHeight}){
        this.wrapper.current.scrollTop = prevScrollTop + (this.wrapper.current.scrollHeight - prevScrollHeight);
    }
    render() {
        return (
            <div>
                <div style={{height: '100px', overflow: 'scroll', border: '1px solid red'}} ref={this.wrapper}>
                    {this.state.message.map(item => <p key={item}>{item}</p>)}
                </div>
                <button onClick={this.handleClick}>+</button>
            </div>
        )
    }
}

export default GetSnapshotBeforeUpdate;
