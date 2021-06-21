import {Component} from "./Component";
import {wrapToVdom, flatten, shallowEqual} from '../utils';
import {REACT_FORWARD_COMPONENT, REACT_CONTEXT, REACT_PROVIDER, REACT_MEMO} from "../constants";

/**
 * 生成虚拟DOM
 * @param type
 * @param props
 * @param children
 * @returns {{ref: null, $$typeof: symbol, text: null, type, key: null, props: {}}}
 */
const createElement = (type, config = {}, ...children) => {
    const {ref, __source, __self, key, ...props} = config || {};
    if (children.length) {
        children = flatten(children);
        props.children = children.length > 1 ? children.map(wrapToVdom) : wrapToVdom(children[0]);
    }
    return {
        $$typeof: Symbol.for('react.element'),
        type,
        props,
        key,
        ref,
    }
}

const createRef = () => {
    return {current: null}
}

/**
 * 返回一个指定标识符的虚拟Dom
 * @param render
 * @returns {{$$typeof: string, render}}
 */
function forwardRef(render) {
    return {
        $$typeof: REACT_FORWARD_COMPONENT,
        render,
    }
}

function createContext(value){
    const context = {$$typeof: REACT_CONTEXT, _currentValue: null};
    context.Provider = {
        $$typeof: REACT_PROVIDER,
        _context: context,
    };
    context.Consumer = {
        $$typeof: REACT_CONTEXT,
        _context: context,
    }
    return context;
}

class PureComponnent extends Component{
    shouldComponentUpdate(nextProps, nextState){
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    }
}

function memo(type, compare = shallowEqual){
    return {
        $$typeof: REACT_MEMO,
        compare,
        type,
    }
}

const React = {
    createElement,
    Component,
    PureComponnent,
    memo,
    createRef,
    createContext,
    forwardRef,
}

export default React;
