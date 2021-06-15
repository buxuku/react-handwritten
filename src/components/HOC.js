import React from '../react';

const withLoading = (Component) => {
    return class Wrapper extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                loading: false,
            }
        }
        toggleLoading = () => {
            this.setState({loading: !this.state.loading})
        }
        render() {
            return <Component {...this.props} loading={this.state.loading} toggleLoading={this.toggleLoading} />
        }
    }
}
// 属性继承, Test组件获得到loading和toggleLoading的能力
class Test extends React.Component {
    render() {
        return <div>loading: {!!this.props.loading ? 'true' : 'false'} <button onClick={this.props.toggleLoading}>toggle</button></div>
    }
}

const WrapperTest = withLoading(Test)

export  default WrapperTest;
