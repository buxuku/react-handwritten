import {compareTwoVdoms} from '../react-dom';
import {wrapToVdom} from '../utils';
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

    forceUpdate(triggerFromUpdate = false, prevProps, prevState) {
        const oldVdom = this.oldVdom;
        if(!triggerFromUpdate && this.constructor.getDerivedStateFromProps){
            this.state = this.constructor.getDerivedStateFromProps(this.props, this.state) || this.state;
        }
        if(this.constructor.contextType){
            this.context = this.constructor.contextType._value;
        }
        const newVdom = wrapToVdom(this.render());
        let extraArgs;
        if(this.getSnapshotBeforeUpdate){
            extraArgs = this.getSnapshotBeforeUpdate();
        }
        compareTwoVdoms(oldVdom, newVdom)
        this.oldVdom = newVdom; // 将更新后的虚拟DOM更新到原来的oldVdom上面
        if(this.componentDidUpdate){
            if(triggerFromUpdate){
                this.componentDidUpdate(prevState, prevState, extraArgs);
            }else{
                this.componentDidUpdate(this.props, this.state, extraArgs);
            }
        }
    }
}
