import { compareTwoVdoms } from '../react-dom';
/**
 * React.Component父类
 */
export class Component {
    static isReactComponent = {};

    constructor(props) {
        this.props = props;
        this.state = {};
    }
    setState(partialState) {
        this.state = {...this.state, ...partialState};
        this.forceUpdate()
    }
    forceUpdate(){
        const oldVdom = this.oldVdom;
        const newVdom = this.render();
        compareTwoVdoms(oldVdom, newVdom)
        this.oldVdom = newVdom; // 将更新后的虚拟DOM更新到原来的oldVdom上面
    }
}
