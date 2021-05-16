import {Component} from "./Component";

/**
 * 生成虚拟DOM
 * @param type
 * @param props
 * @param children
 * @returns {{ref: null, $$typeof: symbol, text: null, type, key: null, props: {}}}
 */
const createElement = (type, config = {}, ...children) => {
    const props = {...config};
    if (children.length) {
        props.children = children.length > 1 ? children : children[0];
    }
    return {
        $$typeof: Symbol.for('react.element'),
        type,
        props,
        key: null,
        ref: null,
    }
}

const React = {
    createElement,
    Component,
}

export default React;
