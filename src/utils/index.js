import {REACT_TEXT} from '../constants'

/**
 * 判断是否是一个文本节点
 * @param element
 * @returns {boolean}
 */
function isTextElement(element) {
    return typeof element === 'string' || typeof element === 'number';
}

/**
 * 如果是文本节点,包装成一个虚拟DOM对象,方便挂载真实DOM节点
 * @param element
 * @returns {{type, props: {content}}|*}
 */
export function wrapToVdom(element) {
    return isTextElement(element) ? {
        type: REACT_TEXT, props: {content: element}
    } : element
}

/**
 * 判断一个虚拟节点是否不需要渲染成真实Dom
 * @param element
 * @returns {boolean}
 */
export function isNotNeedRender(vdom){
    return vdom === null || vdom === undefined || typeof vdom === 'boolean';
}
