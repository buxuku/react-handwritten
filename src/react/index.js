import {Component} from "./Component";
import {wrapToVdom, flatten} from '../utils';
import {REACT_FORWARD_COMPONENT} from "../constants";

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
    let context = {
        _value: value,
        Provider,
        Consumer,
    };
    function Provider({value, children}){ // Provider接收一个value的props
        context._value = value;
        return children;
    }
    function Consumer({children}){ // Consumer的children是一个函数
        return children(context._value)
    }
    return context;
}

const React = {
    createElement,
    Component,
    createRef,
    createContext,
    forwardRef,
}

export default React;
