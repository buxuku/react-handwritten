import {Component} from "./Component";

/**
 * 生成虚拟DOM
 * @param type
 * @param props
 * @param children
 * @returns {{ref: null, $$typeof: symbol, text: null, type, key: null, props: {}}}
 */
const createElement = (type, config = {}, ...children) => {
    const {ref, ...props} = config || {};
    if (children.length) {
        props.children = children.length > 1 ? children : children[0];
    }
    return {
        $$typeof: Symbol.for('react.element'),
        type,
        props,
        key: null,
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
        $$typeof: 'REACT_FORWARD_COMPONENT',
        render,
    }
}

const React = {
    createElement,
    Component,
    createRef,
    forwardRef,
}

export default React;
