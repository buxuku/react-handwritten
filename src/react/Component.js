import {compareTwoVdoms} from '../react-dom';
import {Updater} from "./Updater";

/**
 * React.Component父类
 */
export class Component {
    static isReactComponent = {};

    constructor(props) {
        this.props = props;
        this.state = {};
        this.updater = new Updater(this)
    }

    setState(partialState) {
        this.updater.addState(partialState)
    }

    forceUpdate() {
        const oldVdom = this.oldVdom;
        const newVdom = this.render();
        compareTwoVdoms(oldVdom, newVdom)
        this.oldVdom = newVdom; // 将更新后的虚拟DOM更新到原来的oldVdom上面
    }
}
